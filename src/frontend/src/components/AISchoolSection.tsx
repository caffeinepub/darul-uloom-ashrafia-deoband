import { Badge } from "@/components/ui/badge";
import type { Lang } from "@/i18n";
import {
  BookOpen,
  Brain,
  Code2,
  DollarSign,
  GraduationCap,
  Lightbulb,
  Rocket,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

interface GradeLevel {
  id: string;
  range: string;
  label: string;
  icon: React.ElementType;
  bg: string;
  topics: { id: string; text: string }[];
  earning?: boolean;
  earningDesc?: string;
}

const gradeLevels: GradeLevel[] = [
  {
    id: "grade-5-6",
    range: "جماعت 5–6",
    label: "AI کی بنیادیں",
    icon: Lightbulb,
    bg: "from-sky-400 to-blue-500",
    topics: [
      { id: "t1", text: "AI کیا ہے؟" },
      { id: "t2", text: "مشین لرننگ کی بنیادیں" },
      { id: "t3", text: "روزمرہ زندگی میں AI" },
      { id: "t4", text: "AI کے دلچسپ پروجیکٹس" },
    ],
  },
  {
    id: "grade-7-8",
    range: "جماعت 7–8",
    label: "AI بنانے والے",
    icon: Code2,
    bg: "from-emerald-400 to-teal-500",
    topics: [
      { id: "t1", text: "پائتھن اور کوڈنگ" },
      { id: "t2", text: "AI ٹولز اور چیٹ بوٹس" },
      { id: "t3", text: "تصویر اور آواز AI" },
      { id: "t4", text: "چھوٹے AI پروجیکٹس" },
    ],
    earning: true,
    earningDesc:
      "طلباء اسکول لیب کے لیے AI کام اور منی پروجیکٹس مکمل کر کے سرٹیفکیٹ اور وظائف حاصل کرتے ہیں۔",
  },
  {
    id: "grade-9-10",
    range: "جماعت 9–10",
    label: "AI کمانے والے",
    icon: DollarSign,
    bg: "from-amber-400 to-orange-500",
    topics: [
      { id: "t1", text: "AI سے فری لانسنگ" },
      { id: "t2", text: "AI سے مواد بنانا" },
      { id: "t3", text: "ڈیٹا اور تجزیات" },
      { id: "t4", text: "حقیقی کلائنٹ پروجیکٹس" },
    ],
    earning: true,
    earningDesc:
      "طلباء حقیقی AI پروجیکٹس پر کام کرتے ہیں، فری لانس کام لیتے ہیں، اور اسکول میں ہی پیسے کماتے ہیں۔",
  },
  {
    id: "grade-11-12",
    range: "جماعت 11–12",
    label: "AI پیشہ ور",
    icon: Brain,
    bg: "from-purple-500 to-indigo-600",
    topics: [
      { id: "t1", text: "ڈیپ لرننگ" },
      { id: "t2", text: "AI کاروباری ماڈل" },
      { id: "t3", text: "پورٹ فولیو تیار کرنا" },
      { id: "t4", text: "اسٹارٹ اپ آئیڈیا" },
    ],
  },
  {
    id: "college",
    range: "کالج سطح",
    label: "AI اختراع کار",
    icon: Rocket,
    bg: "from-rose-500 to-pink-600",
    topics: [
      { id: "t1", text: "AI ریسرچ" },
      { id: "t2", text: "ایڈوانس ML اور NLP" },
      { id: "t3", text: "AI کاروبار" },
      { id: "t4", text: "عالمی مقابلے" },
    ],
  },
];

const features = [
  {
    id: "curriculum",
    icon: BookOpen,
    title: "منظم نصاب",
    desc: "جماعت 5 سے کالج تک درجہ وار AI پروگرام، AI ماہرین تعلیم کی طرف سے ڈیزائن کردہ۔",
  },
  {
    id: "earning",
    icon: Trophy,
    title: "سیکھتے سیکھتے کمائیں",
    desc: "جماعت 7–10 کے طلباء AI پروجیکٹس اور فری لانسنگ کے ذریعے حقیقی آمدنی حاصل کرتے ہیں۔",
  },
  {
    id: "certified",
    icon: Star,
    title: "سرٹیفائیڈ نتائج",
    desc: "کیریئر کے مواقع بڑھانے کے لیے ہر سنگ میل پر بین الاقوامی AI سرٹیفکیٹ۔",
  },
  {
    id: "handson",
    icon: Zap,
    title: "عملی مشق",
    desc: "ہر قدم پر لائیو AI ٹولز، حقیقی پروجیکٹس اور صنعت کے سرپرست۔",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface AISchoolSectionProps {
  lang: Lang;
}

export default function AISchoolSection({ lang: _lang }: AISchoolSectionProps) {
  return (
    <section
      id="ai-school"
      data-ocid="ai_school.section"
      className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-green-950 to-slate-900 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 mb-3 font-semibold tracking-wide uppercase text-xs">
            نیا اقدام
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-5xl mb-4">
            <span className="text-white">اشرفیہ </span>
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              AI اسکول
            </span>
          </h2>
          <p className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            جماعت 5 سے کالج تک طلباء کے لیے مکمل AI تعلیمی پروگرام — جہاں طلباء
            صرف AI سیکھتے نہیں بلکہ{" "}
            <span className="text-amber-300 font-semibold">
              اس سے کماتے بھی ہیں
            </span>
            ۔
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto rounded-full mt-5" />
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                variants={cardVariants}
                className="bg-white/5 border border-white/10 rounded-xl p-4 lg:p-5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/15 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-semibold text-sm lg:text-base mb-1 text-right">
                  {f.title}
                </h4>
                <p className="text-slate-400 text-xs lg:text-sm leading-relaxed text-right">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Grade Level Cards */}
        <div className="mb-8">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/70 text-sm font-semibold uppercase tracking-widest mb-8"
          >
            پروگرام کی سطحیں
          </motion.h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {gradeLevels.map((level) => {
              const Icon = level.icon;
              return (
                <motion.div
                  key={level.id}
                  variants={cardVariants}
                  className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 transition-all duration-300 flex flex-col"
                >
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${level.bg}`}
                  />

                  {level.earning && (
                    <div className="absolute top-4 right-3">
                      <span className="flex items-center gap-1 bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <DollarSign className="w-2.5 h-2.5" /> کمائیں
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex-1">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${level.bg} flex items-center justify-center mb-3 shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-white/50 font-medium">
                      {level.range}
                    </span>
                    <h4 className="font-bold text-white text-base mt-0.5 mb-3 text-right">
                      {level.label}
                    </h4>
                    <ul className="space-y-1.5">
                      {level.topics.map((topic) => (
                        <li
                          key={topic.id}
                          className="flex items-center gap-2 text-slate-300 text-xs"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${level.bg} shrink-0`}
                          />
                          {topic.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {level.earning && level.earningDesc && (
                    <div className="mx-4 mb-4 p-3 bg-amber-400/10 border border-amber-400/25 rounded-xl">
                      <p className="text-amber-300 text-xs leading-relaxed text-right">
                        {level.earningDesc}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-bold px-3 py-1.5 rounded-full text-xs mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            داخلہ جلد شروع ہو رہا ہے
          </div>
          <p className="text-slate-400 text-sm">
            ویٹنگ لسٹ میں شامل ہوں اور اشرفیہ AI اسکول کے داخلوں کے آغاز کی پہلے
            اطلاع پائیں۔
          </p>
        </motion.div>
      </div>
    </section>
  );
}
