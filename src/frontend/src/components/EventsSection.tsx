import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Lang, tr } from "@/i18n";
import { CalendarDays, Clock, Tag } from "lucide-react";
import { type Variants, motion } from "motion/react";

interface EventItem {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  categoryColor: string;
}

const upcomingEvents: EventItem[] = [
  {
    id: 1,
    title: "سالانہ تقریب تقسیم اسناد 2026",
    date: "28 مارچ 2026",
    description:
      "عالم اور حفظ پروگرام کی سالانہ تقریب فراغت۔ ایک اہم موقع جو ہمارے فارغین علماء کی کامیابیوں کا جشن مناتا ہے۔",
    category: "تقریب",
    categoryColor: "bg-amber-100 text-amber-800",
  },
  {
    id: 2,
    title: "قرآن تلاوت مقابلہ",
    date: "5 اپریل 2026",
    description:
      "تمام طلباء کے لیے کھلا، اعلیٰ قراء کے لیے انعامات۔ تجوید مہارت اور خوبصورت تلاوت کا پلیٹ فارم۔",
    category: "مقابلہ",
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "ماہ رمضان خصوصی درس سلسلہ",
    date: "20 مارچ 2026",
    description:
      "سینیئر علماء کا نمازِ عشاء کے بعد درس جو اسلامی روحانیت، فقہ اور سیرت النبی ﷺ کے اہم موضوعات کا احاطہ کرتا ہے۔",
    category: "درس",
    categoryColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: 4,
    title: "حدیث مطالعہ ورکشاپ",
    date: "15 اپریل 2026",
    description:
      "سینیئر طلباء اور فارغین کے لیے صحیح بخاری پر اعلیٰ ورکشاپ، شعبہ علوم الحدیث کی قیادت میں۔",
    category: "ورکشاپ",
    categoryColor: "bg-purple-100 text-purple-800",
  },
];

const pastEvents: EventItem[] = [
  {
    id: 1,
    title: "عید میلاد النبی ﷺ تقریب",
    date: "ستمبر 2025",
    description:
      "نعت، خطاب اور قراءت جو حضور نبی کریم ﷺ کی ولادت کا جشن مناتے ہیں۔ سینکڑوں شرکاء نے عقیدت اور خلوص کے ساتھ شرکت کی۔",
    category: "پروگرام",
    categoryColor: "bg-rose-100 text-rose-800",
  },
  {
    id: 2,
    title: "بین الاقوامی اسلامی کانفرنس",
    date: "نومبر 2025",
    description:
      "12 ممالک کے علماء نے عصری اسلامی تعلیم، فقہ اور عالمی مسلم معاملات پر تبادلہ خیال کیا۔",
    category: "کانفرنس",
    categoryColor: "bg-indigo-100 text-indigo-800",
  },
  {
    id: 3,
    title: "سالانہ کھیلوں کا دن",
    date: "جنوری 2026",
    description:
      "بین الشعبہ کرکٹ اور ایتھلیٹکس جو طلباء میں جسمانی صحت، کھیل کا جذبہ اور بھائی چارہ کو فروغ دیتے ہیں۔",
    category: "کھیل",
    categoryColor: "bg-teal-100 text-teal-800",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

function EventCard({
  event,
  ocid,
  lang,
}: {
  event: EventItem;
  ocid: string;
  lang: Lang;
}) {
  return (
    <motion.div
      variants={cardVariants}
      data-ocid={ocid}
      className="group relative bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Top accent bar using gold */}
      <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/70 to-transparent" />
      <div className="p-6">
        {/* Date badge */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            <CalendarDays className="h-3.5 w-3.5" />
            {event.date}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${event.categoryColor}`}
          >
            <Tag className="h-3 w-3" />
            {event.category}
          </span>
        </div>

        <h3 className="font-display font-bold text-green-dark text-lg mb-2 group-hover:text-primary transition-colors text-right">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 text-right">
          {event.description}
        </p>

        <Button
          variant="outline"
          size="sm"
          className="border-primary/40 text-primary hover:bg-primary hover:text-white transition-all duration-200 font-medium"
        >
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          {tr("viewDetails", lang)}
        </Button>
      </div>
    </motion.div>
  );
}

interface EventsSectionProps {
  lang: Lang;
}

export default function EventsSection({ lang }: EventsSectionProps) {
  return (
    <section
      id="events"
      data-ocid="events.section"
      className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="bg-gold/15 text-gold border-gold/30 mb-3 font-semibold tracking-wide uppercase text-xs">
            {tr("events", lang)}
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-green-dark mb-3">
            {tr("eventsTitle", lang)}
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-primary/10 p-1 rounded-xl">
              <TabsTrigger
                value="upcoming"
                data-ocid="events.upcoming_tab"
                className="px-6 py-2 rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
              >
                {tr("upcoming", lang)}
              </TabsTrigger>
              <TabsTrigger
                value="past"
                data-ocid="events.past_tab"
                className="px-6 py-2 rounded-lg font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
              >
                {tr("past", lang)}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {upcomingEvents.map((event, i) => (
                <EventCard
                  key={event.id}
                  event={event}
                  lang={lang}
                  ocid={`events.item.${i + 1}`}
                />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="past">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {pastEvents.map((event, i) => (
                <EventCard
                  key={event.id}
                  event={event}
                  lang={lang}
                  ocid={`events.item.${i + 1}`}
                />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
