import { type Lang, tr } from "@/i18n";
import { Award, BookOpen, Building2, Users } from "lucide-react";
import { motion } from "motion/react";

interface AboutSectionProps {
  lang: Lang;
}

const stats = [
  {
    icon: Users,
    value: "1000+",
    id: "students",
    label: { en: "Students", ur: "طلباء", ar: "الطلاب", hi: "छात्र" },
  },
  {
    icon: BookOpen,
    value: "50+",
    id: "faculty",
    label: {
      en: "Faculty Members",
      ur: "اساتذہ",
      ar: "أعضاء هيئة التدريس",
      hi: "शिक्षक",
    },
  },
  {
    icon: Award,
    value: "75+",
    id: "years",
    label: {
      en: "Years Legacy",
      ur: "سال کی وراثت",
      ar: "سنة من الإرث",
      hi: "वर्षों की विरासत",
    },
  },
  {
    icon: Building2,
    value: "10+",
    id: "departments",
    label: { en: "Departments", ur: "شعبہ جات", ar: "الأقسام", hi: "विभाग" },
  },
];

export default function AboutSection({ lang }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/20 islamic-pattern"
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
            تعارف
          </p>
          <h2 className="section-heading font-display font-bold text-3xl md:text-4xl text-green-dark">
            {tr("aboutTitle", lang)}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-gold/30 rounded-full opacity-60" />
              <div className="absolute -top-8 -left-8 w-28 h-28 border border-gold/15 rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/20 rounded-full" />
              {/* Ornate quote box */}
              <div className="bg-gradient-to-br from-green-dark to-primary rounded-2xl p-8 text-white relative z-10 ornate-border">
                {/* Double gold top border via pseudo-element simulation */}
                <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-1" />
                <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6" />

                <p
                  className="font-arabic text-gold text-2xl text-right mb-4 leading-relaxed"
                  style={{ textShadow: "0 0 20px rgba(201,168,76,0.3)" }}
                >
                  العلم نور والجهل ظلام
                </p>
                <p className="text-white/80 text-sm text-right font-arabic">
                  علم نور ہے اور جہالت تاریکی
                </p>

                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
                  <span className="text-gold text-xs">◆</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
                </div>

                <p className="text-white/90 leading-relaxed text-sm text-right font-arabic">
                  دیوبند، اتر پردیش، ہندوستان میں قائم، دارالعلوم اشرفیہ دیوبند
                  بیسویں صدی کے عظیم ترین اسلامی عالم دین حضرت اشرف علی تھانوی
                  رحمۃ اللہ علیہ کی مبارک روایت کو آگے بڑھا رہا ہے۔
                </p>

                <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-6 mb-1" />
                <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="font-display font-bold text-2xl text-green-dark text-right">
              دیوبندی روایت کی جڑیں
            </h3>
            <p className="text-muted-foreground leading-relaxed text-right">
              1947 میں قائم، ہمارا ادارہ حنفی مسلک اور بابرکت دیوبندی طریقہ کار
              کی پیروی کرتے ہوئے اسلامی تعلیم کا مرکز رہا ہے۔ حکیم الامت حضرت
              مولانا اشرف علی تھانوی رحمۃ اللہ علیہ کے نام سے منسوب، ہم مستند
              اسلامی علم کی حفاظت اور اشاعت کرتے ہیں۔
            </p>
            <p className="text-muted-foreground leading-relaxed text-right">
              ہمارا نصاب درس نظامی کو جدید تعلیمی طریقوں کے ساتھ جوڑتا ہے، ایسے
              فارغین تیار کرتا ہے جو علماء، سماجی رہنما اور اسلام کے خادم ہیں۔
              پورے ہندوستان اور اس سے باہر کے طلباء ہمارے اسلامی ماحول میں تعلیم
              حاصل کرنے آتے ہیں۔
            </p>
            <div className="bg-secondary/60 border border-gold/25 rounded-xl p-5 ornate-border">
              <p className="font-arabic text-green-dark text-lg text-right leading-relaxed mb-2">
                دارالعلوم اشرفیہ دیوبند — علم، تقویٰ، خدمت
              </p>
              <p className="text-sm text-muted-foreground italic text-right">
                علم · تقویٰ · خدمت
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              data-ocid={`about.stat.${idx + 1}`}
              className="text-center bg-card rounded-2xl p-6 royal-card hover:royal-card border-t-2 border-gold/50 group transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-dark/10 rounded-xl mb-3 group-hover:bg-green-dark/15 transition-colors">
                <stat.icon className="h-6 w-6 text-green-dark" />
              </div>
              <div className="font-display font-bold text-3xl text-green-dark mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label[lang] ?? stat.label.en}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
