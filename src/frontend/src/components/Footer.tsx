import type { Lang } from "@/i18n";
import { tr } from "@/i18n";
import { MessageCircle } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";

interface FooterProps {
  lang: Lang;
  onSectionNav: (section: string) => void;
}

export default function Footer({ lang, onSectionNav }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  const quickLinks = [
    { label: "ہوم", section: "hero" },
    { label: "ہمارے بارے میں", section: "about" },
    { label: "شعبہ جات", section: "departments" },
    { label: "آنلائن کلاسز", section: "classrooms" },
    { label: "تقریبات", section: "events" },
    { label: "داخلہ", section: "admission" },
    { label: "رابطہ", section: "contact" },
  ];

  return (
    <footer
      className="text-white"
      style={{
        background:
          "linear-gradient(to bottom, oklch(0.22 0.10 158), oklch(0.14 0.06 158))",
      }}
    >
      {/* Top gold divider — 3px */}
      <div className="gold-divider" />

      <div className="relative" style={{ backgroundImage: "none" }}>
        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 islamic-pattern-dark pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gold/15 blur-sm" />
                  <img
                    src="/assets/generated/madrasa-logo-transparent.dim_200x200.png"
                    alt="Logo"
                    className="h-12 w-12 object-contain relative z-10"
                  />
                </div>
                <div>
                  <p
                    className="font-display font-bold text-white tracking-wide"
                    style={{ textShadow: "0 1px 8px rgba(201,168,76,0.3)" }}
                  >
                    دارالعلوم اشرفیہ
                  </p>
                  <p className="font-arabic text-gold text-sm">دیوبند</p>
                </div>
              </div>

              <p className="text-white/65 text-sm leading-relaxed max-w-sm text-right">
                دیوبند، اتر پردیش، ہندوستان میں ایک معروف اسلامی تعلیمی ادارہ۔
                1947 سے حضرت اشرف علی تھانوی رحمۃ اللہ علیہ کی روایت میں مستند
                اسلامی علم کی اشاعت۔
              </p>

              <p
                className="font-arabic text-gold text-base"
                style={{ textShadow: "0 0 16px rgba(201,168,76,0.25)" }}
              >
                العلم فريضة على كل مسلم
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/919897099692"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#20c55e] transition-colors shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  واٹس ایپ
                </a>
              </div>

              {/* Social icons */}
              <div>
                <p className="text-gold font-semibold text-sm mb-2 font-display">
                  {tr("followUs", lang)}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/ashrafiadeoband"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-white/8 hover:bg-[#1877F2] border border-gold/20 hover:border-[#1877F2] transition-all duration-200"
                  >
                    <SiFacebook className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.instagram.com/ashrafiadeoband"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-white/8 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:via-30% hover:to-[#bc1888] border border-gold/20 hover:border-transparent transition-all duration-200"
                  >
                    <SiInstagram className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-gold mb-4 text-right tracking-wide">
                فوری لنکس
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.section} className="text-right">
                    <button
                      type="button"
                      onClick={() => onSectionNav(link.section)}
                      className="text-white/65 hover:text-gold text-sm transition-colors font-arabic"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-gold mb-4 text-right tracking-wide">
                رابطہ
              </h4>
              <ul className="space-y-3 text-sm text-white/65 text-right">
                <li className="leading-relaxed">
                  دیوبند، ضلع سہارنپور
                  <br />
                  اتر پردیش، ہندوستان — 247554
                </li>
                <li>
                  <a
                    href="tel:+911336000000"
                    className="hover:text-gold transition-colors"
                  >
                    +91 1336-XXXXXX
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919897099692"
                    className="hover:text-gold transition-colors"
                  >
                    +91 98970 99692 (واٹس ایپ)
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@ashrafiadeoband.org"
                    className="hover:text-gold transition-colors"
                  >
                    info@ashrafiadeoband.org
                  </a>
                </li>
                <li className="text-white/40 text-xs">ashrafiadeoband.org</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/45 text-xs">
            © {year} دارالعلوم اشرفیہ دیوبند۔ جملہ حقوق محفوظ ہیں۔
          </p>
          <p className="text-white/35 text-xs">
            ❤️ کے ساتھ بنایا گیا بذریعہ{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
