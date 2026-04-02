import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetCourses() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAnnouncements() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitApplication() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      course: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitApplication(
        data.name,
        data.email,
        data.phone,
        data.course,
        data.message,
      );
    },
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(
        data.name,
        data.email,
        data.phone,
        data.subject,
        data.message,
      );
    },
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      items: Array<{
        productName: string;
        currency: string;
        quantity: bigint;
        priceInCents: bigint;
        productDescription: string;
      }>;
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCheckoutSession(
        data.items,
        data.successUrl,
        data.cancelUrl,
      );
    },
  });
}

export function useGetCourseLiveStatus() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["courseLiveStatus"],
    queryFn: async () => {
      if (!actor) return [] as Array<[bigint, boolean]>;
      return actor.getCourseLiveStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useSetCourseLive() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { courseId: bigint; isLive: boolean }) => {
      if (!actor) throw new Error("Not connected");
      return actor.setCourseLive(data.courseId, data.isLive);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseLiveStatus"] });
    },
  });
}

export function useGetAllEnrollments() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allEnrollments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnrollments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordEnrollment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      courseId: bigint;
      studentName: string;
      email: string;
      plan: string;
      currency: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.recordEnrollment(
        data.courseId,
        data.studentName,
        data.email,
        data.plan,
        data.currency,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEnrollments"] });
    },
  });
}
