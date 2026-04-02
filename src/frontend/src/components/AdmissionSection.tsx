import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitApplication } from "@/hooks/useQueries";
import { type Lang, tr } from "@/i18n";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface AdmissionSectionProps {
  lang: Lang;
}

const courses = [
  "حفظ القرآن",
  "درس نظامی (عالم کورس)",
  "تفسیر القرآن",
  "علوم الحدیث",
  "فقہ و افتاء",
  "عربی زبان و ادب",
  "اردو ادب",
  "کمپیوٹر اور جدید علوم",
];

const requirements = [
  "حفظ کے لیے عمر 7-18 سال؛ عالم کورس کے لیے 14 سال یا اس سے زیادہ",
  "عربی یا اردو میں بنیادی پڑھنے کی صلاحیت",
  "پچھلی تعلیمی سرٹیفکیٹس",
  "والدین/سرپرست کی رضامندی کا خط",
  "طبی صحت کا سرٹیفکیٹ",
  "دو پاسپورٹ سائز تصاویر",
  "تعلیمی کمیٹی کے ساتھ انٹرویو",
];

const importantDates = [
  { event: "داخلہ فارم شروع", date: "یکم محرم" },
  { event: "داخلہ فارم کی آخری تاریخ", date: "15 شعبان" },
  { event: "داخلہ انٹرویو", date: "یکم رمضان" },
  { event: "نتائج کا اعلان", date: "20 رمضان" },
  { event: "سیشن کا آغاز", date: "یکم شوال" },
];

export default function AdmissionSection({ lang }: AdmissionSectionProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    course: "",
    message: "",
  });
  const { mutate, isPending, isSuccess, isError } = useSubmitApplication();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      course: form.course,
      message: form.message,
    });
  };

  return (
    <section id="admission" className="py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-arabic text-gold text-lg mb-2">داخلہ</p>
          <h2 className="section-heading font-display font-bold text-3xl md:text-4xl text-green-dark">
            {tr("admissionTitle", lang)}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="bg-green-dark rounded-2xl p-8 text-white islamic-pattern-dark">
              <h3 className="font-display font-bold text-xl text-gold mb-5 text-right">
                داخلہ کے تقاضے
              </h3>
              <ul className="space-y-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/85 text-sm text-right">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 shadow-card">
              <h3 className="font-display font-bold text-green-dark mb-4 text-right">
                اہم تاریخیں
              </h3>
              <div className="space-y-3">
                {importantDates.map((item) => (
                  <div
                    key={item.event}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm font-semibold text-green-dark">
                      {item.date}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {isSuccess ? (
              <div
                data-ocid="admission.success_state"
                className="bg-white rounded-2xl p-8 shadow-card border border-border flex flex-col items-center justify-center text-center min-h-80"
              >
                <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                <h3 className="font-display font-bold text-xl text-green-dark mb-2">
                  درخواست جمع ہو گئی!
                </h3>
                <p className="text-muted-foreground">
                  درخواست دینے کا شکریہ۔ ہم 3-5 کاروباری دنوں میں آپ سے رابطہ
                  کریں گے۔
                </p>
                <p className="font-arabic text-primary mt-4">جزاكم الله خيراً</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-card border border-border space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="adm-name">{tr("fullName", lang)}</Label>
                    <Input
                      id="adm-name"
                      data-ocid="admission.input"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="محمد علی"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="adm-phone">{tr("phone", lang)}</Label>
                    <Input
                      id="adm-phone"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="adm-email">{tr("email", lang)}</Label>
                  <Input
                    id="adm-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{tr("selectCourse", lang)}</Label>
                  <Select
                    value={form.course}
                    onValueChange={(v) => setForm((p) => ({ ...p, course: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={tr("selectCourse", lang)} />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="adm-msg">{tr("message", lang)}</Label>
                  <Textarea
                    id="adm-msg"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="اپنے بارے میں بتائیں اور یہاں تعلیم حاصل کرنے کی وجہ بیان کریں..."
                    rows={4}
                  />
                </div>
                {isError && (
                  <div
                    data-ocid="admission.error_state"
                    className="flex items-center gap-2 text-destructive text-sm"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>جمع کرنے میں ناکامی۔ دوبارہ کوشش کریں۔</span>
                  </div>
                )}
                <Button
                  type="submit"
                  size="lg"
                  data-ocid="admission.submit_button"
                  className="w-full bg-green-dark text-white hover:bg-primary font-semibold"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      جمع ہو رہا ہے...
                    </>
                  ) : (
                    tr("applyNow", lang)
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
