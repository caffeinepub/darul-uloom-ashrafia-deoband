import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactMessage } from "@/hooks/useQueries";
import { type Lang, tr } from "@/i18n";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface ContactSectionProps {
  lang: Lang;
}

const contactInfo = [
  {
    icon: MapPin,
    label: "پتہ",
    id: "address",
    value:
      "دارالعلوم اشرفیہ دیوبند، دیوبند، ضلع سہارنپور، اتر پردیش، ہندوستان — 247554",
    href: undefined as string | undefined,
  },
  {
    icon: Phone,
    label: "فون",
    id: "phone",
    value: "+91 1336-XXXXXX",
    href: "tel:+911336000000" as string | undefined,
  },
  {
    icon: MessageCircle,
    label: "واٹس ایپ",
    id: "whatsapp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210" as string | undefined,
  },
  {
    icon: Mail,
    label: "ای میل",
    id: "email",
    value: "info@ashrafiadeoband.org",
    href: "mailto:info@ashrafiadeoband.org" as string | undefined,
  },
];

export default function ContactSection({ lang }: ContactSectionProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { mutate, isPending, isSuccess, isError } = useSubmitContactMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-arabic text-gold text-lg mb-2">رابطہ</p>
          <h2 className="section-heading font-display font-bold text-3xl md:text-4xl text-green-dark">
            {tr("contactTitle", lang)}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <div
                  key={info.id}
                  className="bg-secondary/50 rounded-xl p-4 border border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {info.label}
                    </span>
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-foreground text-right">
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border border-border shadow-card bg-secondary/30 h-52 flex items-center justify-center relative">
              <div className="absolute inset-0 islamic-pattern opacity-50" />
              <div className="relative z-10 text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                <p className="font-display font-bold text-green-dark">
                  دیوبند، اتر پردیش
                </p>
                <p className="text-sm text-muted-foreground">
                  ضلع سہارنپور، ہندوستان — 247554
                </p>
                <a
                  href="https://maps.google.com/?q=Deoband+Saharanpur+Uttar+Pradesh+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-primary hover:underline font-medium"
                >
                  گوگل میپ میں کھولیں ←
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {isSuccess ? (
              <div
                data-ocid="contact.success_state"
                className="bg-secondary/30 rounded-2xl p-8 border border-border flex flex-col items-center justify-center text-center min-h-80"
              >
                <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                <h3 className="font-display font-bold text-xl text-green-dark mb-2">
                  پیغام بھیج دیا گیا!
                </h3>
                <p className="text-muted-foreground">
                  ہم 24-48 گھنٹوں میں جواب دیں گے۔ جزاکم اللہ خیراً۔
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="con-name">{tr("fullName", lang)}</Label>
                    <Input
                      id="con-name"
                      data-ocid="contact.input"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="آپ کا نام"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="con-phone">{tr("phone", lang)}</Label>
                    <Input
                      id="con-phone"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="con-email">{tr("email", lang)}</Label>
                  <Input
                    id="con-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="con-subject">موضوع</Label>
                  <Input
                    id="con-subject"
                    value={form.subject}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    placeholder="داخلے کے بارے میں استفسار..."
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="con-msg">{tr("message", lang)}</Label>
                  <Textarea
                    id="con-msg"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="آپ کا پیغام یہاں..."
                    rows={5}
                    required
                  />
                </div>
                {isError && (
                  <div
                    data-ocid="contact.error_state"
                    className="flex items-center gap-2 text-destructive text-sm"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>بھیجنے میں ناکامی۔ دوبارہ کوشش کریں۔</span>
                  </div>
                )}
                <Button
                  type="submit"
                  size="lg"
                  data-ocid="contact.submit_button"
                  className="w-full bg-green-dark text-white hover:bg-primary font-semibold"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      بھیجا جا رہا ہے...
                    </>
                  ) : (
                    tr("submit", lang)
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
