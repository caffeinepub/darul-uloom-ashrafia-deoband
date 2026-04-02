import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateCheckoutSession,
  useIsStripeConfigured,
} from "@/hooks/useQueries";
import type { Lang } from "@/i18n";
import { AlertCircle, BookOpen, Globe, Loader2 } from "lucide-react";
import { useState } from "react";

interface CourseEnrollModalProps {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  course: { id: bigint; title: string; instructor: string } | null;
}

type Currency = "inr" | "usd" | "gbp" | "eur";

const CURRENCY_CONFIG: Record<
  Currency,
  { symbol: string; amounts: number[]; labels: string[]; flag: string }
> = {
  inr: {
    symbol: "₹",
    amounts: [1000, 2500, 5000],
    labels: ["ماہانہ", "سہ ماہی", "سالانہ"],
    flag: "🇮🇳",
  },
  usd: {
    symbol: "$",
    amounts: [15, 35, 65],
    labels: ["Monthly", "Quarterly", "Annual"],
    flag: "🇺🇸",
  },
  gbp: {
    symbol: "£",
    amounts: [15, 35, 65],
    labels: ["Monthly", "Quarterly", "Annual"],
    flag: "🇬🇧",
  },
  eur: {
    symbol: "€",
    amounts: [15, 35, 65],
    labels: ["Monthly", "Quarterly", "Annual"],
    flag: "🇪🇺",
  },
};

export default function CourseEnrollModal({
  open,
  onClose,
  lang: _lang,
  course,
}: CourseEnrollModalProps) {
  const [currency, setCurrency] = useState<Currency>("inr");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");

  const { data: stripeConfigured } = useIsStripeConfigured();
  const {
    mutate: createSession,
    isPending,
    isError,
  } = useCreateCheckoutSession();

  const config = CURRENCY_CONFIG[currency];
  const selectedAmount = config.amounts[selectedIndex];

  const handleCurrencyChange = (c: Currency) => {
    setCurrency(c);
    setSelectedIndex(0);
  };

  const handleEnroll = () => {
    if (!course || !studentName.trim() || !email.trim()) return;
    const amountInSmallestUnit = Math.round(selectedAmount * 100);
    createSession(
      {
        items: [
          {
            productName: `کورس داخلہ — ${course.title}`,
            currency,
            quantity: 1n,
            priceInCents: BigInt(amountInSmallestUnit),
            productDescription: `${course.title} — استاذ: ${course.instructor} — ${config.labels[selectedIndex]} پلان`,
          },
        ],
        successUrl: `${window.location.href}?enrollment=success`,
        cancelUrl: `${window.location.href}?enrollment=cancel`,
      },
      {
        onSuccess: (url) => {
          if (url) window.location.href = url;
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-green-dark flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gold" />
            کورس میں داخلہ
          </DialogTitle>
        </DialogHeader>

        {course && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-1">
            <p className="font-bold text-green-dark text-sm">{course.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              استاذ: {course.instructor}
            </p>
          </div>
        )}

        {!stripeConfigured ? (
          <div className="py-4 text-center space-y-4">
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-5">
              <p className="font-arabic text-green-dark text-lg mb-2">
                جزاكم الله خيراً
              </p>
              <p className="text-sm text-muted-foreground">
                داخلہ پورٹل جلد آ رہا ہے۔ ابھی داخلہ کے لیے واٹس ایپ پر رابطہ
                کریں۔
              </p>
            </div>
            <a
              href="https://wa.me/919897099692"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#20c55e] transition-colors text-sm"
            >
              واٹس ایپ: +91 98970 99692
            </a>
          </div>
        ) : (
          <div className="space-y-4 py-1">
            {/* Currency Selector */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-primary" />
                کرنسی منتخب کریں
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(CURRENCY_CONFIG) as Currency[]).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => handleCurrencyChange(c)}
                    className={`py-2 px-2 rounded-lg border text-xs font-semibold transition-all flex flex-col items-center gap-0.5 ${
                      currency === c
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span className="text-base">{CURRENCY_CONFIG[c].flag}</span>
                    <span className="uppercase">{c}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Selection */}
            <div className="space-y-1.5">
              <Label>پلان منتخب کریں</Label>
              <div className="grid grid-cols-3 gap-2">
                {config.amounts.map((amt, i) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setSelectedIndex(i)}
                    className={`py-3 px-2 rounded-lg border text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      selectedIndex === i
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span className="text-sm font-bold">
                      {config.symbol}
                      {amt.toLocaleString()}
                    </span>
                    <span className="opacity-80">{config.labels[i]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Student Info */}
            <div className="space-y-1.5">
              <Label>
                طالب علم کا نام <span className="text-destructive">*</span>
              </Label>
              <Input
                data-ocid="enroll.input"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="پورا نام درج کریں"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>
                ای میل <span className="text-destructive">*</span>
              </Label>
              <Input
                data-ocid="enroll.input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ای میل ایڈریس درج کریں"
                required
              />
            </div>

            {isError && (
              <div
                data-ocid="enroll.error_state"
                className="flex items-center gap-2 text-destructive text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>ادائیگی سیٹ اپ ناکام۔ دوبارہ کوشش کریں۔</span>
              </div>
            )}

            <Button
              data-ocid="enroll.submit_button"
              className="w-full bg-gold text-accent-foreground hover:bg-gold/90 font-bold text-base"
              size="lg"
              disabled={isPending || !studentName.trim() || !email.trim()}
              onClick={handleEnroll}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  پروسیس ہو رہا ہے...
                </>
              ) : (
                `ادائیگی کی طرف بڑھیں — ${config.symbol}${selectedAmount.toLocaleString()}`
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Stripe کے ذریعے محفوظ ادائیگی۔ ملکی اور بین الاقوامی کارڈز قبول
              ہیں۔
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
