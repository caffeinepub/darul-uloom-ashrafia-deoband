import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, type Lang, tr } from "@/i18n";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  onSectionNav: (section: string) => void;
  onDonateClick: () => void;
}

export default function Navbar({
  lang,
  onLangChange,
  onSectionNav,
  onDonateClick,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "home", section: "hero", ocid: "nav.home_link" },
    { key: "about", section: "about", ocid: "nav.about_link" },
    {
      key: "departments",
      section: "departments",
      ocid: "nav.departments_link",
    },
    { key: "classrooms", section: "classrooms", ocid: "nav.classrooms_link" },
    { key: "events", section: "events", ocid: "nav.events_link" },
    { key: "contact", section: "contact", ocid: "nav.contact_link" },
  ];

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === lang)?.label ?? "EN";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-green-dark/98 backdrop-blur-lg shadow-royal border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onSectionNav("hero")}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-sm group-hover:bg-gold/30 transition-all" />
              <img
                src="/assets/generated/madrasa-logo-transparent.dim_200x200.png"
                alt="Darul Uloom Ashrafia Deoband Logo"
                className="h-10 w-10 lg:h-12 lg:w-12 object-contain relative z-10"
              />
            </div>
            <div className="hidden sm:block">
              <p
                className="font-display font-bold text-sm lg:text-base leading-tight text-white tracking-wide"
                style={{ textShadow: "0 1px 8px rgba(180,145,50,0.3)" }}
              >
                Darul Uloom Ashrafia
              </p>
              <p className="font-arabic text-xs text-gold tracking-wider">
                دیوبند
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.key}
                data-ocid={link.ocid}
                onClick={() => onSectionNav(link.section)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-white/80 hover:text-gold hover:bg-white/5"
              >
                {tr(link.key, lang)}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  data-ocid="nav.language_select"
                  className="gap-1.5 text-sm text-white/80 hover:text-gold hover:bg-white/5"
                >
                  <Globe className="h-4 w-4" />
                  {currentLangLabel}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 bg-green-dark border-gold/20"
              >
                {LANGUAGES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => onLangChange(l.code)}
                    className={
                      lang === l.code
                        ? "bg-gold/20 text-gold font-medium"
                        : "text-white/80 hover:text-gold hover:bg-white/5"
                    }
                  >
                    {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              data-ocid="nav.admission_button"
              onClick={() => onSectionNav("admission")}
              className="border border-gold/40 text-gold bg-transparent hover:bg-gold/10 hover:border-gold text-sm font-medium transition-all"
            >
              {tr("admission", lang)}
            </Button>

            <Button
              size="sm"
              data-ocid="nav.donate_button"
              onClick={onDonateClick}
              className="bg-gradient-to-r from-gold to-amber-500 text-foreground hover:opacity-90 font-bold text-sm shadow-gold transition-all gold-shimmer"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            >
              {tr("donate", lang)}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-white hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-green-dark border-t border-gold/20 shadow-royal overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.key}
                  onClick={() => {
                    onSectionNav(link.section);
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2.5 rounded-md text-white/80 hover:bg-white/5 hover:text-gold font-medium transition-colors"
                >
                  {tr(link.key, lang)}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                <div className="flex gap-2 flex-wrap">
                  {LANGUAGES.map((l) => (
                    <button
                      type="button"
                      key={l.code}
                      onClick={() => onLangChange(l.code)}
                      className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                        lang === l.code
                          ? "bg-gold text-foreground border-gold"
                          : "border-gold/30 text-white/70 hover:border-gold hover:text-gold"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full border-gold/40 text-gold hover:bg-gold/10"
                  onClick={() => {
                    onSectionNav("admission");
                    setMobileOpen(false);
                  }}
                >
                  {tr("admission", lang)}
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-gold to-amber-500 text-foreground hover:opacity-90 font-bold shadow-gold"
                  onClick={() => {
                    onDonateClick();
                    setMobileOpen(false);
                  }}
                >
                  {tr("donate", lang)}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
