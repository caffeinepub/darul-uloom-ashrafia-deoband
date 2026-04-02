import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetAllEnrollments,
  useGetCourseLiveStatus,
  useSetCourseLive,
} from "@/hooks/useQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  CreditCard,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  LogIn,
  MessageSquare,
  Radio,
  Settings,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const fallbackCourseNames: Record<string, string> = {
  "1": "اسلامیات کا تعارف",
  "2": "تجوید القرآن",
  "3": "علوم الحدیث کی بنیادیں",
  "4": "عربی گرامر — صرف و نحو",
};

export default function AdminPanel() {
  const { actor, isFetching: actorFetching } = useActor();
  const { login, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const [stripeKey, setStripeKey] = useState("");
  const [allowedCountries, setAllowedCountries] = useState("IN");
  const [showKey, setShowKey] = useState(false);

  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ["isCallerAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isLoggedIn,
  });

  const { data: stripeConfigured, isLoading: stripeStatusLoading } = useQuery({
    queryKey: ["isStripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !actorFetching && !!isAdmin,
  });

  const { data: stripeConfigData } = useQuery({
    queryKey: ["stripeConfig"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStripeConfiguration();
    },
    enabled: !!actor && !actorFetching && !!isAdmin,
  });

  useEffect(() => {
    if (stripeConfigData) {
      setStripeKey(stripeConfigData.secretKey);
      setAllowedCountries(stripeConfigData.allowedCountries.join(", "));
    }
  }, [stripeConfigData]);

  const { data: donations, isLoading: donationsLoading } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDonations();
    },
    enabled: !!actor && !actorFetching && !!isAdmin,
  });

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllApplications();
    },
    enabled: !!actor && !actorFetching && !!isAdmin,
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["allContactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !actorFetching && !!isAdmin,
  });

  const { data: enrollments, isLoading: enrollmentsLoading } =
    useGetAllEnrollments();
  const { data: liveStatusData } = useGetCourseLiveStatus();
  const setCourseLiveMutation = useSetCourseLive();

  const liveMap = new Map<string, boolean>(
    (liveStatusData ?? []).map(([id, status]) => [String(id), status]),
  );

  const saveStripeMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const countries = allowedCountries
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      await actor.setStripeConfiguration({
        secretKey: stripeKey,
        allowedCountries: countries,
      });
    },
    onSuccess: () => {
      toast.success("Stripe configuration saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["isStripeConfigured"] });
      queryClient.invalidateQueries({ queryKey: ["stripeConfig"] });
    },
    onError: (err: Error) => {
      toast.error(`Failed to save: ${err.message}`);
    },
  });

  if (actorFetching || (isLoggedIn && adminLoading)) {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center">
        <div className="text-center space-y-4" data-ocid="admin.loading_state">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-body">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-border shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl text-foreground">
              Admin Panel
            </CardTitle>
            <CardDescription className="font-body text-muted-foreground">
              Darul Uloom Ashrafia Deoband
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground font-body text-center">
              Connect your Internet Identity to access the admin dashboard.
            </p>
            <Button
              data-ocid="admin.login_button"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body"
              onClick={() => login()}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {isLoggingIn ? "Connecting..." : "Connect Internet Identity"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center p-6">
        <Card
          className="w-full max-w-md border-destructive/30 shadow-xl"
          data-ocid="admin.error_state"
        >
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="font-display text-2xl text-foreground">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-body text-center">
              Your identity is not authorized as admin.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-admin-bg">
      <header className="bg-primary border-b border-primary/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl text-white font-semibold">
                Admin Panel
              </h1>
              <p className="text-xs text-white/70 font-body">
                Darul Uloom Ashrafia Deoband
              </p>
            </div>
          </div>
          <Badge className="bg-accent text-accent-foreground border-0 font-body text-xs">
            Administrator
          </Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="stripe" className="space-y-6">
          <TabsList className="bg-card border border-border flex-wrap h-auto gap-1">
            <TabsTrigger
              data-ocid="admin.stripe.tab"
              value="stripe"
              className="font-body gap-2"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Stripe Config</span>
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.donations.tab"
              value="donations"
              className="font-body gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Donations</span>
              {donations && donations.length > 0 && (
                <Badge className="ml-1 h-5 text-xs bg-primary text-primary-foreground">
                  {donations.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.applications.tab"
              value="applications"
              className="font-body gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
              {applications && applications.length > 0 && (
                <Badge className="ml-1 h-5 text-xs bg-primary text-primary-foreground">
                  {applications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.messages.tab"
              value="messages"
              className="font-body gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
              {messages && messages.length > 0 && (
                <Badge className="ml-1 h-5 text-xs bg-primary text-primary-foreground">
                  {messages.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.enrollments.tab"
              value="enrollments"
              className="font-body gap-2"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Enrollments</span>
              {enrollments && enrollments.length > 0 && (
                <Badge className="ml-1 h-5 text-xs bg-primary text-primary-foreground">
                  {enrollments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.livestatus.tab"
              value="livestatus"
              className="font-body gap-2"
            >
              <Radio className="h-4 w-4" />
              <span className="hidden sm:inline">Live Status</span>
            </TabsTrigger>
          </TabsList>

          {/* Stripe */}
          <TabsContent value="stripe">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-foreground">
                        Stripe Payment Configuration
                      </CardTitle>
                      <CardDescription className="font-body">
                        Configure payment processing for donations
                      </CardDescription>
                    </div>
                  </div>
                  {!stripeStatusLoading && (
                    <div className="flex items-center gap-2">
                      {stripeConfigured ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span
                            className="text-sm text-green-600 font-body"
                            data-ocid="admin.stripe.success_state"
                          >
                            Configured
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-amber-500" />
                          <span
                            className="text-sm text-amber-600 font-body"
                            data-ocid="admin.stripe.error_state"
                          >
                            Not configured
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="stripe-key"
                    className="font-body text-sm font-medium"
                  >
                    Stripe Secret Key
                  </Label>
                  <div className="relative">
                    <Input
                      id="stripe-key"
                      data-ocid="admin.stripe.input"
                      type={showKey ? "text" : "password"}
                      value={stripeKey}
                      onChange={(e) => setStripeKey(e.target.value)}
                      placeholder="sk_live_... or sk_test_..."
                      className="font-mono pr-10 border-border"
                    />
                    <button
                      type="button"
                      data-ocid="admin.stripe.toggle"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="countries"
                    className="font-body text-sm font-medium"
                  >
                    Allowed Countries
                  </Label>
                  <Input
                    id="countries"
                    data-ocid="admin.stripe.countries.input"
                    type="text"
                    value={allowedCountries}
                    onChange={(e) => setAllowedCountries(e.target.value)}
                    placeholder="IN, US, GB, AE"
                    className="font-body border-border"
                  />
                </div>
                <Separator className="border-border" />
                <Button
                  data-ocid="admin.stripe.save_button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-body"
                  onClick={() => saveStripeMutation.mutate()}
                  disabled={saveStripeMutation.isPending || !stripeKey.trim()}
                >
                  {saveStripeMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  )}
                  {saveStripeMutation.isPending
                    ? "Saving..."
                    : "Save Configuration"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations */}
          <TabsContent value="donations">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-foreground">
                      Recent Donations
                    </CardTitle>
                    <CardDescription className="font-body">
                      {donations
                        ? `${donations.length} total donations`
                        : "Loading..."}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {donationsLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="admin.donations.loading_state"
                  >
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : donations && donations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table data-ocid="admin.donations.table">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-body">Donor</TableHead>
                          <TableHead className="font-body">Email</TableHead>
                          <TableHead className="font-body">Amount</TableHead>
                          <TableHead className="font-body">Purpose</TableHead>
                          <TableHead className="font-body">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donations.map((d, position) => (
                          <TableRow
                            key={`${d.email}-${d.timestamp}`}
                            data-ocid={`admin.donations.row.${position + 1}`}
                          >
                            <TableCell className="font-body font-medium">
                              {d.donorName}
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground">
                              {d.email}
                            </TableCell>
                            <TableCell className="font-body">
                              <Badge
                                variant="outline"
                                className="border-primary/30 text-primary"
                              >
                                {d.currency}{" "}
                                {(Number(d.amount) / 100).toFixed(2)}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground">
                              {d.purpose}
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground text-sm">
                              {formatDate(d.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div
                    className="text-center py-10"
                    data-ocid="admin.donations.empty_state"
                  >
                    <CreditCard className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground font-body">
                      No donations recorded yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-foreground">
                      Admission Applications
                    </CardTitle>
                    <CardDescription className="font-body">
                      {applications
                        ? `${applications.length} total applications`
                        : "Loading..."}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {applicationsLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="admin.applications.loading_state"
                  >
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : applications && applications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table data-ocid="admin.applications.table">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-body">Name</TableHead>
                          <TableHead className="font-body">Email</TableHead>
                          <TableHead className="font-body">Phone</TableHead>
                          <TableHead className="font-body">Course</TableHead>
                          <TableHead className="font-body">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((a, position) => (
                          <TableRow
                            key={`${a.email}-${a.timestamp}`}
                            data-ocid={`admin.applications.row.${position + 1}`}
                          >
                            <TableCell className="font-body font-medium">
                              {a.name}
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground">
                              {a.email}
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground">
                              {a.phone}
                            </TableCell>
                            <TableCell className="font-body">
                              <Badge
                                variant="outline"
                                className="border-primary/30 text-primary"
                              >
                                {a.course}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground text-sm">
                              {formatDate(a.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div
                    className="text-center py-10"
                    data-ocid="admin.applications.empty_state"
                  >
                    <GraduationCap className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground font-body">
                      No applications submitted yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-foreground">
                      Contact Messages
                    </CardTitle>
                    <CardDescription className="font-body">
                      {messages
                        ? `${messages.length} total messages`
                        : "Loading..."}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="admin.messages.loading_state"
                  >
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : messages && messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((m, position) => (
                      <Card
                        key={`${m.email}-${m.timestamp}`}
                        data-ocid={`admin.messages.item.${position + 1}`}
                        className="border-border"
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-body font-semibold text-foreground">
                                {m.name}
                              </p>
                              <p className="text-sm text-muted-foreground font-body">
                                {m.email} · {m.phone}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant="outline"
                                className="border-primary/30 text-primary font-body text-xs"
                              >
                                {m.subject}
                              </Badge>
                              <p className="text-xs text-muted-foreground font-body mt-1">
                                {formatDate(m.timestamp)}
                              </p>
                            </div>
                          </div>
                          <Separator className="mb-3" />
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">
                            {m.message}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-center py-10"
                    data-ocid="admin.messages.empty_state"
                  >
                    <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground font-body">
                      No contact messages yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enrollments */}
          <TabsContent value="enrollments">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-foreground">
                      Course Enrollments
                    </CardTitle>
                    <CardDescription className="font-body">
                      {enrollments
                        ? `${enrollments.length} total enrollments`
                        : "Loading..."}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {enrollmentsLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="admin.enrollments.loading_state"
                  >
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : enrollments && enrollments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table data-ocid="admin.enrollments.table">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-body">Student</TableHead>
                          <TableHead className="font-body">Email</TableHead>
                          <TableHead className="font-body">Course</TableHead>
                          <TableHead className="font-body">Plan</TableHead>
                          <TableHead className="font-body">Currency</TableHead>
                          <TableHead className="font-body">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {enrollments.map((e, position) => (
                          <TableRow
                            key={`${e.email}-${e.timestamp}`}
                            data-ocid={`admin.enrollments.row.${position + 1}`}
                          >
                            <TableCell className="font-body font-medium">
                              {e.studentName}
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground">
                              {e.email}
                            </TableCell>
                            <TableCell className="font-body">
                              <Badge
                                variant="outline"
                                className="border-primary/30 text-primary"
                              >
                                {fallbackCourseNames[String(e.courseId)] ??
                                  `Course ${String(e.courseId)}`}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground">
                              {e.plan}
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground">
                              {e.currency}
                            </TableCell>
                            <TableCell className="font-body text-muted-foreground text-sm">
                              {formatDate(e.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div
                    className="text-center py-10"
                    data-ocid="admin.enrollments.empty_state"
                  >
                    <Users className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground font-body">
                      No enrollments yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Status */}
          <TabsContent value="livestatus">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Radio className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-foreground">
                      Live Class Status
                    </CardTitle>
                    <CardDescription className="font-body">
                      Toggle courses as live to let students join instantly
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-ocid="admin.livestatus.panel">
                  {[1n, 2n, 3n, 4n].map((courseId, i) => {
                    const isLive = liveMap.get(String(courseId)) ?? false;
                    const courseName =
                      fallbackCourseNames[String(courseId)] ??
                      `Course ${String(courseId)}`;
                    return (
                      <div
                        key={String(courseId)}
                        data-ocid={`admin.livestatus.item.${i + 1}`}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${isLive ? "bg-red-500 animate-pulse" : "bg-muted"}`}
                          />
                          <div>
                            <p className="font-body font-medium text-foreground text-sm">
                              {courseName}
                            </p>
                            <p className="text-xs text-muted-foreground font-body">
                              {isLive ? "Currently Live" : "Not Live"}
                            </p>
                          </div>
                        </div>
                        <Switch
                          data-ocid={`admin.livestatus.switch.${i + 1}`}
                          checked={isLive}
                          onCheckedChange={(checked) => {
                            setCourseLiveMutation.mutate(
                              { courseId, isLive: checked },
                              {
                                onSuccess: () =>
                                  toast.success(
                                    checked
                                      ? `${courseName} is now LIVE`
                                      : `${courseName} marked as offline`,
                                  ),
                                onError: () =>
                                  toast.error("Failed to update live status"),
                              },
                            );
                          }}
                          disabled={setCourseLiveMutation.isPending}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
