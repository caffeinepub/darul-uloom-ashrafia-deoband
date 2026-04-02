import { Badge } from "@/components/ui/badge";
import type { Lang } from "@/i18n";
import { Building2, FlaskConical, GraduationCap } from "lucide-react";
import { type Variants, motion } from "motion/react";

interface Project {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  tag: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "اشرفیہ فیوچر ٹیکنالوجی لیب",
    description:
      "دارالعلوم اشرفیہ دیوبند کے تحت ایک جدید ترین ٹیکنالوجی لیبارٹری جو جدید علوم کو اسلامی اقدار کے ساتھ جوڑنے کے لیے وقف ہے۔ یہ لیب طلباء کو کمپیوٹر سائنس، ڈیجیٹل خواندگی اور جدید ٹیکنالوجیز میں عملی تجربہ فراہم کرے گی۔",
    icon: FlaskConical,
    color: "from-emerald-500 to-teal-600",
    tag: "ٹیکنالوجی",
  },
  {
    id: 2,
    name: "تزکیہ ایجوکیشنل ٹرسٹ",
    description:
      "ایک خیراتی تعلیمی ٹرسٹ جو غریب گھرانوں کے ذہین طلباء کی مالی مدد کے لیے قائم کیا جا رہا ہے۔ یہ ٹرسٹ وظائف، تعلیمی مواد اور پیشہ وارانہ تربیت فراہم کر کے مسلمان علماء اور پیشہ ور افراد کی اگلی نسل کو بااختیار بنائے گا۔",
    icon: Building2,
    color: "from-amber-500 to-yellow-600",
    tag: "ٹرسٹ",
  },
  {
    id: 3,
    name: "تزکیہ فیوچر انٹرنیشنل اسکول",
    description:
      "ایک آنے والا بین الاقوامی اسکول جو عالمی معیار کے نصاب کو اسلامی اخلاقیات کے ساتھ جوڑتا ہے۔ یہ اسکول ابتدائی سے اعلیٰ ثانوی تعلیم تک یکجا تعلیم فراہم کرے گا، طلباء کو عالمی مواقع کے لیے تیار کرتے ہوئے ان کی روحانی اور اخلاقی نشوونما کرے گا۔",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    tag: "اسکول",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface UpcomingProjectsProps {
  lang: Lang;
}

export default function UpcomingProjects({
  lang: _lang,
}: UpcomingProjectsProps) {
  return (
    <section
      id="upcoming-projects"
      data-ocid="upcoming_projects.section"
      className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white"
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
          <Badge className="bg-gold/15 text-gold border-gold/30 mb-3 font-semibold tracking-wide uppercase text-xs">
            جلد آ رہا ہے
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-green-dark mb-3">
            آنے والے منصوبے
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            ہم ان آنے والے اقدامات کا اعلان کرتے ہوئے خوش ہیں جو معیاری تعلیم
            اور اسلامی اقدار کے امتزاج کے ہمارے مشن کو وسعت دیں گے۔
          </p>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                data-ocid={`upcoming_projects.item.${i + 1}`}
                className="group relative bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Gradient top bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${project.color}`}
                />

                {/* Icon block */}
                <div className="px-6 pt-8 pb-4 flex items-start gap-4">
                  <div
                    className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-1">
                      {project.tag}
                    </span>
                    <h3 className="font-display font-bold text-green-dark text-lg leading-tight group-hover:text-primary transition-colors text-right">
                      {project.name}
                    </h3>
                  </div>
                </div>

                <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed flex-1 text-right">
                  {project.description}
                </p>

                {/* Footer tag */}
                <div className="px-6 pb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    منصوبہ بندی جاری ہے
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
