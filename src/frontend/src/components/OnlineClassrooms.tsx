import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCourseLiveStatus, useGetCourses } from "@/hooks/useQueries";
import { type Lang, tr } from "@/i18n";
import { Calendar, Clock, Globe2, User, Video } from "lucide-react";
import { motion } from "motion/react";

interface OnlineClassroomsProps {
  lang: Lang;
  onEnrollClick?: () => void;
  onEnrollCourse?: (course: {
    id: bigint;
    title: string;
    instructor: string;
  }) => void;
  onJoinLive?: (course: {
    id: bigint;
    title: string;
    instructor: string;
  }) => void;
}

const fallbackCourses = [
  {
    id: 1n,
    title: "اسلامیات کا تعارف",
    instructor: "مولانا عبدالرحمٰن",
    description: "عقیدہ، فقہ کی بنیادیں اور سیرت النبی ﷺ کا جامع تعارف",
    language: "اردو",
    schedule: "پیر، بدھ، جمعہ — صبح 9:00",
    enrollmentOpen: true,
  },
  {
    id: 2n,
    title: "تجوید القرآن",
    instructor: "قاری حافظ عثمان",
    description:
      "صحیح تلفظ اور خوبصورت ادا کے ساتھ قرآن پاک کی تلاوت کے اصول سیکھیں",
    language: "اردو / عربی",
    schedule: "روزانہ — صبح 8:00 اور شام 6:00",
    enrollmentOpen: true,
  },
  {
    id: 3n,
    title: "علوم الحدیث کی بنیادیں",
    instructor: "مولانا طارق جمیل",
    description:
      "حدیث کی اصطلاحات، درجہ بندی اور احادیث نبوی کے بڑے مجموعوں کا مطالعہ",
    language: "اردو",
    schedule: "منگل، جمعرات، ہفتہ — صبح 11:00",
    enrollmentOpen: true,
  },
  {
    id: 4n,
    title: "عربی گرامر — صرف و نحو",
    instructor: "استاذ ابراہیم المدنی",
    description: "روایتی اسلامی نصاب کے مطابق کلاسیکل عربی صرف اور نحو",
    language: "عربی / اردو",
    schedule: "پیر، جمعرات — دوپہر 3:00",
    enrollmentOpen: true,
  },
];

const scheduleRows = [
  ["پیر", "اسلامیات", "—", "عربی گرامر", "تجوید"],
  ["منگل", "—", "علوم الحدیث", "—", "تجوید"],
  ["بدھ", "اسلامیات", "—", "—", "تجوید"],
  ["جمعرات", "—", "علوم الحدیث", "عربی گرامر", "تجوید"],
  ["جمعہ", "اسلامیات", "—", "—", "تجوید"],
  ["ہفتہ", "—", "علوم الحدیث", "—", "خصوصی نشست"],
];

const scheduleHeaders = [
  "دن",
  "صبح 9:00",
  "صبح 11:00",
  "دوپہر 3:00",
  "شام 6:00",
];

export default function OnlineClassrooms({
  lang,
  onEnrollClick,
  onEnrollCourse,
  onJoinLive,
}: OnlineClassroomsProps) {
  const { data: backendCourses } = useGetCourses();
  const { data: liveStatusData } = useGetCourseLiveStatus();
  const courses =
    backendCourses && backendCourses.length > 0
      ? backendCourses
      : fallbackCourses;

  const liveMap = new Map<string, boolean>(
    (liveStatusData ?? []).map(([id, status]) => [String(id), status]),
  );

  return (
    <section
      id="classrooms"
      className="py-20 lg:py-28 bg-white islamic-pattern"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-arabic text-gold text-lg mb-2">آنلائن تعلیم</p>
          <h2 className="section-heading font-display font-bold text-3xl md:text-4xl text-green-dark">
            {tr("classroomsTitle", lang)}
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            دنیا کے کسی بھی کونے سے ہمارے ورچوئل کلاس رومز میں شامل ہوں۔ مستند
            اسلامی علماء سے علم حاصل کریں۔
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {courses.slice(0, 4).map((course, i) => {
            const isLive = liveMap.get(String(course.id)) ?? false;
            return (
              <motion.div
                key={String(course.id)}
                data-ocid={`courses.item.${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full shadow-card hover:shadow-card-hover transition-all duration-300 border-border relative">
                  {isLive && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className="flex items-center gap-1.5 bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        لائیو
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge
                        className={
                          course.enrollmentOpen
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {course.enrollmentOpen ? "کھلا" : "بند"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Globe2 className="h-3 w-3 mr-1" />
                        {course.language}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm font-display font-bold text-green-dark leading-snug text-right">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed text-right">
                      {course.description}
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span>{course.schedule}</span>
                      </div>
                    </div>
                    {isLive ? (
                      <Button
                        size="sm"
                        data-ocid={`courses.join_live.${i + 1}`}
                        className="w-full bg-red-500 hover:bg-red-600 text-white text-xs gap-1.5 animate-pulse"
                        onClick={() => {
                          if (onJoinLive) {
                            onJoinLive({
                              id: course.id,
                              title: course.title,
                              instructor: course.instructor,
                            });
                          }
                        }}
                      >
                        <Video className="h-3.5 w-3.5" />
                        لائیو کلاس میں شامل ہوں
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                        disabled={!course.enrollmentOpen}
                        onClick={() => {
                          if (onEnrollCourse) {
                            onEnrollCourse({
                              id: course.id,
                              title: course.title,
                              instructor: course.instructor,
                            });
                          } else if (onEnrollClick) {
                            onEnrollClick();
                          }
                        }}
                      >
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        {tr("enrollNow", lang)}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Schedule Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 bg-green-dark rounded-2xl p-6 text-white islamic-pattern-dark"
        >
          <h3 className="font-display font-bold text-xl mb-5 text-center">
            <span className="text-gold">لائیوکلاس شیڈول</span> — ہفتہ وار ٹائم
            ٹیبل
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  {scheduleHeaders.map((h) => (
                    <th
                      key={h}
                      className="text-right py-2 px-3 text-gold font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {scheduleRows.map((row) => (
                  <tr
                    key={row[0]}
                    className="hover:bg-white/5 transition-colors"
                  >
                    {row.map((cell, j) => {
                      const cls =
                        j === 0
                          ? "font-medium text-gold"
                          : cell === "—"
                            ? "text-white/30"
                            : "text-white/80";
                      return (
                        <td
                          key={cell + String(j)}
                          className={`py-2.5 px-3 text-right ${cls}`}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
