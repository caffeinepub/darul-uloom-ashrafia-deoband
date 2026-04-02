import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Course {
    id: bigint;
    title: string;
    instructor: string;
    description: string;
    language: string;
    schedule: string;
    enrollmentOpen: boolean;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCourse(course: Course): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAnnouncement(announcement: {
        title: string;
        body: string;
        date: bigint;
        language: string;
    }): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteAnnouncement(id: bigint): Promise<void>;
    getAllApplications(): Promise<Array<{
        name: string;
        email: string;
        message: string;
        timestamp: bigint;
        phone: string;
        course: string;
    }>>;
    getAllContactMessages(): Promise<Array<{
        subject: string;
        name: string;
        email: string;
        message: string;
        timestamp: bigint;
        phone: string;
    }>>;
    getAllDonations(): Promise<Array<{
        donorName: string;
        email: string;
        currency: string;
        timestamp: bigint;
        amount: bigint;
        purpose: string;
    }>>;
    getAllEnrollments(): Promise<Array<{
        studentName: string;
        plan: string;
        email: string;
        currency: string;
        timestamp: bigint;
        courseId: bigint;
    }>>;
    getAnnouncements(): Promise<Array<{
        title: string;
        body: string;
        date: bigint;
        language: string;
    }>>;
    getCallerUserProfile(): Promise<{
        name: string;
        email: string;
        phone: string;
    } | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCourseLiveStatus(): Promise<Array<[bigint, boolean]>>;
    getCourseLiveStatusFor(courseId: bigint): Promise<boolean>;
    getCourses(): Promise<Array<Course>>;
    getStripeConfiguration(): Promise<StripeConfiguration>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<{
        name: string;
        email: string;
        phone: string;
    } | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    recordDonation(donation: {
        donorName: string;
        email: string;
        currency: string;
        timestamp: bigint;
        amount: bigint;
        purpose: string;
    }): Promise<void>;
    recordEnrollment(courseId: bigint, studentName: string, email: string, plan: string, currency: string): Promise<void>;
    saveCallerUserProfile(profile: {
        name: string;
        email: string;
        phone: string;
    }): Promise<void>;
    setCourseLive(courseId: bigint, isLive: boolean): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitApplication(name: string, email: string, phone: string, course: string, message: string): Promise<void>;
    submitContactMessage(name: string, email: string, phone: string, subject: string, message: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAnnouncement(id: bigint, announcement: {
        title: string;
        body: string;
        date: bigint;
        language: string;
    }): Promise<void>;
    updateCourse(course: Course): Promise<void>;
}
