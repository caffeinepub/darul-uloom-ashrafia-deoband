import { Button } from "@/components/ui/button";
import { useGetAnnouncements } from "@/hooks/useQueries";
import { type Lang, tr } from "@/i18n";
import { motion } from "motion/react";

interface HeroSectionProps {
  lang: Lang;
  onApplyClick: () => void;
  onLearnMoreClick: () => void;
}

const fallbackAnnouncements = [
  "Admissions Open for 2025-26 — Apply Now | داخلہ کے لیے درخواست دیں",
  "New Batch: Hifzul Quran starts January 2025 | نئے بیچ کا آغاز",
  "Online Hadith Sciences course now available in Urdu | آنلائن کورس دستیاب",
  "Annual Convocation & Eid Milad un Nabi Gathering | سالانہ تقریب",
];

/* ── Shamsa: 16-point Islamic sun-rosette (inline SVG, gold) ── */
function Shamsa() {
  const pts16 = Array.from({ length: 16 }, (_, i) => {
    const outer = 34;
    const inner = 18;
    const angle = (i * Math.PI * 2) / 16 - Math.PI / 2;
    const mid = ((i + 0.5) * Math.PI * 2) / 16 - Math.PI / 2;
    const ox = 36 + outer * Math.cos(angle);
    const oy = 36 + outer * Math.sin(angle);
    const ix = 36 + inner * Math.cos(mid);
    const iy = 36 + inner * Math.sin(mid);
    return `${ox.toFixed(2)},${oy.toFixed(2)} ${ix.toFixed(2)},${iy.toFixed(2)}`;
  });
  const starPoints = pts16.join(" ");

  return (
    <svg
      viewBox="0 0 72 72"
      width="72"
      height="72"
      xmlns="http://www.w3.org/2000/svg"
      className="shamsa"
      aria-hidden="true"
    >
      {/* Outer glow ring */}
      <circle
        cx="36"
        cy="36"
        r="34"
        fill="none"
        stroke="rgba(201,168,76,0.18)"
        strokeWidth="1"
      />
      <circle
        cx="36"
        cy="36"
        r="30"
        fill="none"
        stroke="rgba(201,168,76,0.12)"
        strokeWidth="0.5"
      />
      {/* 16-point star */}
      <polygon
        points={starPoints}
        fill="rgba(201,168,76,0.15)"
        stroke="rgba(201,168,76,0.75)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Inner concentric rings */}
      <circle
        cx="36"
        cy="36"
        r="14"
        fill="rgba(201,168,76,0.10)"
        stroke="rgba(201,168,76,0.5)"
        strokeWidth="0.7"
      />
      <circle
        cx="36"
        cy="36"
        r="8"
        fill="rgba(201,168,76,0.20)"
        stroke="rgba(201,168,76,0.6)"
        strokeWidth="0.7"
      />
      {/* Centre dot */}
      <circle cx="36" cy="36" r="3" fill="rgba(201,168,76,0.85)" />
      {/* 8 radial spokes */}
      <line
        key="spoke-0"
        x1="36"
        y1="36"
        x2="36.0"
        y2="10.0"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
      />
      <line
        key="spoke-45"
        x1="36"
        y1="36"
        x2="54.38"
        y2="17.62"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
      />
      <line
        key="spoke-90"
        x1="36"
        y1="36"
        x2="62.0"
        y2="36.0"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
      />
      <line
        key="spoke-135"
        x1="36"
        y1="36"
        x2="54.38"
        y2="54.38"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
      />
      <line
        key="spoke-180"
        x1="36"
        y1="36"
        x2="36.0"
        y2="62.0"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
      />
      <line
        key="spoke-225"
        x1="36"
        y1="36"
        x2="17.62"
        y2="54.38"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
      />
      <line
        key="spoke-270"
        x1="36"
        y1="36"
        x2="10.0"
        y2="36.0"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
      />
      <line
        key="spoke-315"
        x1="36"
        y1="36"
        x2="17.62"
        y2="17.62"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

/* ── Shamsa Medallion Divider ── */
function MedallionDivider() {
  return (
    <div
      className="flex items-center justify-center gap-0 w-full my-4"
      aria-hidden="true"
    >
      {/* left arm: thick → thin → dot sequence */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 4,
        }}
      >
        <span
          style={{
            display: "block",
            height: 1,
            width: "30%",
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.6))",
          }}
        />
        <span
          style={{
            display: "block",
            height: 1,
            width: "15%",
            background: "rgba(201,168,76,0.5)",
          }}
        />
        <span
          style={{
            display: "block",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.55)",
          }}
        />
        <span
          style={{
            display: "block",
            height: 1,
            width: "8%",
            background: "rgba(201,168,76,0.4)",
          }}
        />
        <span
          style={{
            display: "block",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.4)",
          }}
        />
      </div>
      {/* central medallion */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.6)",
          background:
            "radial-gradient(circle, rgba(55,50,18,0.9) 60%, rgba(38,36,12,0.95) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow:
            "0 0 12px rgba(201,168,76,0.3), inset 0 0 8px rgba(201,168,76,0.1)",
          margin: "0 8px",
        }}
      >
        <span
          style={{ color: "rgba(201,168,76,0.9)", fontSize: 14, lineHeight: 1 }}
        >
          ✦
        </span>
      </div>
      {/* right arm */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 4,
        }}
      >
        <span
          style={{
            display: "block",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.4)",
          }}
        />
        <span
          style={{
            display: "block",
            height: 1,
            width: "8%",
            background: "rgba(201,168,76,0.4)",
          }}
        />
        <span
          style={{
            display: "block",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.55)",
          }}
        />
        <span
          style={{
            display: "block",
            height: 1,
            width: "15%",
            background: "rgba(201,168,76,0.5)",
          }}
        />
        <span
          style={{
            display: "block",
            height: 1,
            width: "30%",
            background:
              "linear-gradient(90deg, rgba(201,168,76,0.6), transparent)",
          }}
        />
      </div>
    </div>
  );
}

/* ── Colophon footer ornament ── */
function ColophonOrnament() {
  return (
    <div
      className="flex flex-col items-center gap-1 mt-6 mb-2"
      aria-hidden="true"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            height: 1,
            width: 60,
            display: "block",
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))",
          }}
        />
        <span style={{ color: "rgba(201,168,76,0.6)", fontSize: 10 }}>❋</span>
        <span style={{ color: "rgba(201,168,76,0.8)", fontSize: 14 }}>◆</span>
        <span style={{ color: "rgba(201,168,76,0.6)", fontSize: 10 }}>❋</span>
        <span
          style={{
            height: 1,
            width: 60,
            display: "block",
            background:
              "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)",
          }}
        />
      </div>
      {/* inverted-triangle chevrons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <span
          style={{
            color: "rgba(201,168,76,0.55)",
            fontSize: 10,
            letterSpacing: 4,
          }}
        >
          ▼ ▼ ▼
        </span>
        <span
          style={{
            color: "rgba(201,168,76,0.35)",
            fontSize: 8,
            letterSpacing: 6,
          }}
        >
          ▽ ▽
        </span>
      </div>
    </div>
  );
}

export default function HeroSection({
  lang,
  onApplyClick,
  onLearnMoreClick,
}: HeroSectionProps) {
  const { data: announcements } = useGetAnnouncements();

  const tickerItems =
    announcements && announcements.length > 0
      ? announcements.map((a) => a.title)
      : fallbackAnnouncements;

  const doubledItems = [...tickerItems, ...tickerItems];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col">
      <div className="relative flex-1 flex items-center justify-center min-h-screen">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-banner.dim_1200x600.jpg')",
          }}
        />

        {/* Deep olive gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(22,22,8,0.92) 0%, rgba(42,42,16,0.72) 45%, rgba(31,31,14,0.92) 100%)",
          }}
        />

        {/* Quranic Islamic star pattern overlay */}
        <div className="absolute inset-0 islamic-pattern-dark opacity-55" />

        {/* ================================================================
            MAIN CONTENT
            ================================================================ */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 pb-6 w-full">
          {/* ── 1. TOP SHAMSA ROSETTE ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex justify-center mb-4"
          >
            <Shamsa />
          </motion.div>

          {/* ── 2. BASMALA UNWAN PANEL ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-2 flex justify-center"
          >
            <div className="unwan-panel">
              {/* inner fine-line border for double-rule effect */}
              <div
                style={{
                  position: "absolute",
                  inset: "4px 6px",
                  borderTop: "0.5px solid rgba(201,168,76,0.3)",
                  borderBottom: "0.5px solid rgba(201,168,76,0.3)",
                  pointerEvents: "none",
                }}
              />
              <p
                className="basmala-shimmer text-2xl md:text-3xl lg:text-4xl relative z-10"
                style={{
                  fontFamily: "Amiri, serif",
                  letterSpacing: "0.04em",
                  lineHeight: 1.6,
                }}
              >
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </p>
            </div>
          </motion.div>

          {/* ── Quranic Ayah ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm md:text-base mb-1"
            style={{
              fontFamily: "Amiri, serif",
              color: "rgba(201,168,76,0.78)",
              textShadow:
                "0 0 10px rgba(201,168,76,0.35), 0 0 28px rgba(180,140,50,0.18)",
              direction: "rtl",
            }}
          >
            ﴿ وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ ﴾
          </motion.p>

          {/* ── 4. MEDALLION DIVIDER (between Ayah and heading) ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <MedallionDivider />
          </motion.div>

          {/* ── 3. MAIN HEADING with double-line illumination frame + side bars ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative inline-block mb-6 quranic-border"
          >
            {/* Left manuscript side bar */}
            <div className="manuscript-side-bar left hidden md:flex">
              <span className="node">◆</span>
              <span className="line" />
              <span className="node">✦</span>
              <span className="line" />
              <span className="node">◆</span>
            </div>

            {/* Right manuscript side bar */}
            <div className="manuscript-side-bar right hidden md:flex">
              <span className="node">◆</span>
              <span className="line" />
              <span className="node">✦</span>
              <span className="line" />
              <span className="node">◆</span>
            </div>

            {/* Corner rosettes */}
            {(
              ["top-left", "top-right", "bottom-left", "bottom-right"] as const
            ).map((pos) => {
              const [v, h] = pos.split("-") as [
                "top" | "bottom",
                "left" | "right",
              ];
              return (
                <span
                  key={pos}
                  className="absolute text-gold/55 pointer-events-none"
                  style={{
                    [v]: "-6px",
                    [h]: "-6px",
                    fontSize: 10,
                    lineHeight: 1,
                  }}
                >
                  ✦
                </span>
              );
            })}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-tight px-8 py-4"
              style={{
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.7), 0 0 60px rgba(201,168,76,0.14), 0 0 120px rgba(201,168,76,0.06)",
              }}
            >
              {tr("siteTitle", lang)}
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="font-medium text-base md:text-xl mb-2 tracking-wide"
            style={{
              color: "oklch(0.75 0.14 75)",
              textShadow:
                "0 0 12px rgba(201,168,76,0.5), 0 0 32px rgba(180,140,50,0.25)",
            }}
          >
            {tr("tagline", lang)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-sm md:text-base mb-4"
            style={{
              fontFamily: "Amiri, serif",
              color: "rgba(255,255,255,0.75)",
              textShadow:
                "0 0 8px rgba(201,168,76,0.25), 0 0 20px rgba(180,140,50,0.12)",
            }}
          >
            دارالعلوم اشرفیہ دیوبند
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              onClick={onApplyClick}
              className="bg-gradient-to-r from-gold to-amber-500 text-foreground hover:opacity-90 font-bold text-base px-8 py-3 shadow-gold gold-shimmer"
            >
              {tr("applyNow", lang)}
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero.secondary_button"
              onClick={onLearnMoreClick}
              className="border-2 font-semibold text-base px-8 py-3 transition-all backdrop-blur-sm"
              style={{
                borderColor: "rgba(201,168,76,0.55)",
                color: "rgba(201,168,76,0.9)",
                background: "rgba(42,42,16,0.35)",
              }}
            >
              {tr("learnMore", lang)}
            </Button>
          </motion.div>

          {/* ── 5. COLOPHON FOOTER ORNAMENT ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <ColophonOrnament />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-gold/60 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* ── Announcement Ticker — olive gradient ── */}
      <div
        className="border-t-2 border-gold/50 py-2.5 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, #1a1a0a 0%, #2d2d12 40%, #35310f 50%, #2d2d12 60%, #1a1a0a 100%)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 bg-gradient-to-r from-gold to-amber-500 text-foreground text-xs font-bold px-3 py-1 mx-4 rounded tracking-wide shadow-gold">
            📢 NEWS
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="ticker-content inline-block">
              {doubledItems.map((item, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: ticker items are display-only duplicated array
                <span key={i} className="text-white/90 text-sm mx-8">
                  {item}
                  <span className="text-gold mx-4">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
