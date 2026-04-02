import AISchoolSection from "@/components/AISchoolSection";
import AboutSection from "@/components/AboutSection";
import AdminPanel from "@/components/AdminPanel";
import AdmissionSection from "@/components/AdmissionSection";
import ContactSection from "@/components/ContactSection";
import CourseEnrollModal from "@/components/CourseEnrollModal";
import DepartmentsSection from "@/components/DepartmentsSection";
import DonateModal from "@/components/DonateModal";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LiveClassroomModal from "@/components/LiveClassroomModal";
import Navbar from "@/components/Navbar";
import OnlineClassrooms from "@/components/OnlineClassrooms";
import UpcomingProjects from "@/components/UpcomingProjects";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { LANGUAGES, type Lang } from "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const queryClient = new QueryClient();

function MadrasaApp() {
  const [lang, setLang] = useState<Lang>("ur");
  const [donateOpen, setDonateOpen] = useState(false);
  const [enrollCourse, setEnrollCourse] = useState<{
    id: bigint;
    title: string;
    instructor: string;
  } | null>(null);
  const [liveClassroomCourse, setLiveClassroomCourse] = useState<{
    id: bigint;
    title: string;
    instructor: string;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("madrasa-lang") as Lang | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    const langData = LANGUAGES.find((l) => l.code === lang);
    document.documentElement.dir = langData?.dir ?? "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("madrasa-lang", lang);
    document.body.classList.remove("font-arabic", "font-urdu");
    if (lang === "ar") document.body.classList.add("font-arabic");
    if (lang === "ur") document.body.classList.add("font-urdu");
  }, [lang]);

  // Check URL params for success notifications
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const enrollment = params.get("enrollment");
    const donation = params.get("donation");

    if (enrollment === "success") {
      toast.success(
        "✅ کورس میں داخلہ کامیاب! کلاس شیڈول کے مطابق جوائن کریں۔",
        {
          duration: 6000,
        },
      );
    } else if (donation === "success") {
      toast.success("✅ عطیہ کامیابی سے موصول ہوا۔ جزاک اللہ خیراً!", {
        duration: 6000,
      });
    }

    if (enrollment === "success" || donation === "success") {
      const url = new URL(window.location.href);
      url.searchParams.delete("enrollment");
      url.searchParams.delete("donation");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        lang={lang}
        onLangChange={setLang}
        onSectionNav={scrollToSection}
        onDonateClick={() => setDonateOpen(true)}
      />

      <main>
        <HeroSection
          lang={lang}
          onApplyClick={() => scrollToSection("admission")}
          onLearnMoreClick={() => scrollToSection("about")}
        />
        <AboutSection lang={lang} />
        <DepartmentsSection lang={lang} />
        <OnlineClassrooms
          lang={lang}
          onEnrollClick={() => scrollToSection("admission")}
          onEnrollCourse={(course) => setEnrollCourse(course)}
          onJoinLive={(course) => setLiveClassroomCourse(course)}
        />
        <EventsSection lang={lang} />
        <AISchoolSection lang={lang} />
        <UpcomingProjects lang={lang} />
        <AdmissionSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} onSectionNav={scrollToSection} />

      <DonateModal
        open={donateOpen}
        onClose={() => setDonateOpen(false)}
        lang={lang}
      />

      <CourseEnrollModal
        open={!!enrollCourse}
        onClose={() => setEnrollCourse(null)}
        lang={lang}
        course={enrollCourse}
      />

      <LiveClassroomModal
        open={!!liveClassroomCourse}
        onClose={() => setLiveClassroomCourse(null)}
        course={liveClassroomCourse}
      />

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}

export default function App() {
  const isAdminRoute = window.location.pathname === "/admin";

  return (
    <QueryClientProvider client={queryClient}>
      {isAdminRoute ? (
        <>
          <AdminPanel />
          <Toaster />
        </>
      ) : (
        <MadrasaApp />
      )}
    </QueryClientProvider>
  );
}
