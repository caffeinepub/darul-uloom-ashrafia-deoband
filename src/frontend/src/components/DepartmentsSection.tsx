import { type Lang, tr } from "@/i18n";
import { motion } from "motion/react";

interface DepartmentsSectionProps {
  lang: Lang;
}

const departments = [
  {
    icon: "📖",
    id: "hifz",
    en: "Hifzul Quran",
    ur: "حفظ القرآن",
    ar: "حفظ القرآن الكريم",
    hi: "हिफ्ज़ुल क़ुरआन",
    desc: "Complete memorization of the Holy Quran with Tajweed",
    descUr: "قرآن مجید کا تجوید کے ساتھ مکمل حفظ",
  },
  {
    icon: "🎓",
    id: "nizami",
    en: "Dars-e-Nizami",
    ur: "درس نظامی",
    ar: "درس نظامي",
    hi: "दर्स-ए-निज़ामी",
    desc: "Traditional Alim course — 8-year comprehensive Islamic studies",
    descUr: "روایتی عالم کورس — 8 سالہ جامع اسلامی علوم",
  },
  {
    icon: "✨",
    id: "tafseer",
    en: "Tafseer ul Quran",
    ur: "تفسیر القرآن",
    ar: "تفسير القرآن",
    hi: "तफ़सीर उल क़ुरआन",
    desc: "Quranic exegesis and science of interpretation",
    descUr: "قرآنی تفسیر اور علم التفسیر",
  },
  {
    icon: "📜",
    id: "hadith",
    en: "Uloom ul Hadith",
    ur: "علوم الحدیث",
    ar: "علوم الحديث",
    hi: "उलूम उल हदीस",
    desc: "Prophetic traditions, chains of narration, and criticism",
    descUr: "احادیث نبوی، سلسلہ سند اور علم الجرح والتعدیل",
  },
  {
    icon: "⚖️",
    id: "fiqh",
    en: "Fiqh & Iftaa",
    ur: "فقہ و افتاء",
    ar: "الفقه والإفتاء",
    hi: "फ़िक़ह व इफ़्ता",
    desc: "Islamic jurisprudence and fatwa studies — Hanafi school",
    descUr: "اسلامی فقہ اور فتویٰ — حنفی مسلک",
  },
  {
    icon: "🌙",
    id: "arabic",
    en: "Arabic Language",
    ur: "عربی زبان و ادب",
    ar: "اللغة العربية وآدابها",
    hi: "अरबी भाषा और साहित्य",
    desc: "Classical Arabic grammar, rhetoric, and literature",
    descUr: "کلاسیکی عربی صرف و نحو، بلاغت اور ادب",
  },
  {
    icon: "🖊️",
    id: "urdu",
    en: "Urdu Literature",
    ur: "اردو ادب",
    ar: "الأدب الأردي",
    hi: "उर्दू साहित्य और अदब",
    desc: "Urdu language, Adab, and classical Islamic literature",
    descUr: "اردو زبان، ادب اور کلاسیکی اسلامی ادبیات",
  },
  {
    icon: "💻",
    id: "modern",
    en: "Modern Sciences",
    ur: "جدید علوم",
    ar: "العلوم الحديثة",
    hi: "कंप्यूटर और आधुनिक विज्ञान",
    desc: "Computer science and contemporary subjects",
    descUr: "کمپیوٹر سائنس اور عصری مضامین",
  },
];

export default function DepartmentsSection({ lang }: DepartmentsSectionProps) {
  return (
    <section
      id="departments"
      className="py-20 lg:py-28 bg-gradient-to-b from-secondary/20 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-arabic text-gold text-lg mb-2 tracking-widest">
            شعبہ جات
          </p>
          <h2 className="section-heading font-display font-bold text-3xl md:text-4xl text-green-dark">
            {tr("departmentsTitle", lang)}
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            ہمارا ادارہ متعدد مخصوص شعبوں میں جامع اسلامی اور جدید تعلیم فراہم
            کرتا ہے۔
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {departments.map((dept, idx) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              data-ocid={`departments.item.${idx + 1}`}
              className="group bg-card rounded-2xl shadow-card hover:shadow-royal transition-all duration-300 overflow-hidden border-t-4 border-gold/60 royal-card"
            >
              {/* Royal green header */}
              <div className="bg-green-dark p-5 text-white relative overflow-hidden">
                {/* Subtle gold pattern overlay */}
                <div className="absolute inset-0 islamic-pattern-dark opacity-20" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/20 border border-gold/30 text-2xl mb-2">
                    {dept.icon}
                  </div>
                  <h3 className="font-display font-bold text-sm leading-tight text-white">
                    {(dept[lang as keyof typeof dept] as string) ?? dept.en}
                  </h3>
                </div>
              </div>
              {/* Card body */}
              <div className="p-4 border-l-0 group-hover:border-l-2 group-hover:border-gold/60 transition-all duration-300">
                <p className="text-xs text-muted-foreground leading-relaxed text-right">
                  {lang === "ur" ? dept.descUr : dept.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
