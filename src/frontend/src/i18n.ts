export type Lang = "en" | "ur" | "ar" | "hi";

export const LANGUAGES = [
  { code: "en" as Lang, label: "English", dir: "ltr" },
  { code: "ur" as Lang, label: "اردو", dir: "rtl" },
  { code: "ar" as Lang, label: "العربية", dir: "rtl" },
  { code: "hi" as Lang, label: "हिन्दी", dir: "ltr" },
];

export const t: Record<string, Record<Lang, string>> = {
  siteTitle: {
    en: "Darul Uloom Ashrafia Deoband",
    ur: "دارالعلوم اشرفیہ دیوبند",
    ar: "دار العلوم الأشرفية ديوبند",
    hi: "दारुल उलूम अशरफिया देवबंद",
  },
  tagline: {
    en: "A Center of Islamic Excellence Since 1947",
    ur: "1947 سے مرکز اسلامی تعلیم",
    ar: "مركز التميز الإسلامي منذ عام 1947",
    hi: "1947 से इस्लामी उत्कृष्टता का केंद्र",
  },
  home: { en: "Home", ur: "ہوم", ar: "الرئيسية", hi: "होम" },
  about: {
    en: "About Us",
    ur: "ہمارے بارے میں",
    ar: "من نحن",
    hi: "हमारे बारे में",
  },
  departments: {
    en: "Our Departments",
    ur: "ہمارے شعبے",
    ar: "أقسامنا",
    hi: "हमारे विभाग",
  },
  classrooms: {
    en: "Online Classrooms",
    ur: "آنلائن کلاسز",
    ar: "الفصول الإلكترونية",
    hi: "ऑनलाइन कक्षाएं",
  },
  events: { en: "Events", ur: "تقریبات", ar: "الفعاليات", hi: "कार्यक्रम" },
  eventsTitle: {
    en: "Events & Programs",
    ur: "تقریبات و پروگرام",
    ar: "الفعاليات والبرامج",
    hi: "कार्यक्रम और प्रोग्राम",
  },
  upcoming: { en: "Upcoming", ur: "آنے والے", ar: "القادمة", hi: "आगामी" },
  past: {
    en: "Past Events",
    ur: "گزشتہ تقریبات",
    ar: "الفعاليات السابقة",
    hi: "पिछले कार्यक्रम",
  },
  contact: {
    en: "Contact Us",
    ur: "ہم سے رابطہ",
    ar: "اتصل بنا",
    hi: "संपर्क करें",
  },
  admission: { en: "Admission", ur: "داخلہ", ar: "القبول", hi: "प्रवेश" },
  donate: { en: "Donate", ur: "عطیہ دیں", ar: "تبرع", hi: "दान करें" },
  applyNow: {
    en: "Apply Now",
    ur: "ابھی درخواست دیں",
    ar: "قدم الآن",
    hi: "अभी आवेदन करें",
  },
  learnMore: {
    en: "Learn More",
    ur: "مزید جانیں",
    ar: "اعرف أكثر",
    hi: "और जानें",
  },
  aboutTitle: {
    en: "Our Legacy & Mission",
    ur: "ہماری وراثت اور مشن",
    ar: "تراثنا ورسالتنا",
    hi: "हमारी विरासत और मिशन",
  },
  departmentsTitle: {
    en: "Academic Departments",
    ur: "تعلیمی شعبہ جات",
    ar: "الأقسام الأكاديمية",
    hi: "अकादमिक विभाग",
  },
  classroomsTitle: {
    en: "Online Classrooms",
    ur: "آنلائن کلاسز",
    ar: "الفصول الإلكترونية",
    hi: "ऑनलाइन कक्षाएं",
  },
  admissionTitle: {
    en: "Apply for Admission",
    ur: "داخلہ کے لیے درخواست",
    ar: "التقدم للقبول",
    hi: "प्रवेश के लिए आवेदन",
  },
  contactTitle: {
    en: "Get in Touch",
    ur: "ہم سے رابطہ کریں",
    ar: "تواصل معنا",
    hi: "संपर्क में रहें",
  },
  donateTitle: {
    en: "Support Our Mission",
    ur: "ہمارے مشن کی مدد کریں",
    ar: "ادعم رسالتنا",
    hi: "हमारे मिशन का समर्थन करें",
  },
  enrollNow: {
    en: "Enroll Now",
    ur: "ابھی داخلہ لیں",
    ar: "سجل الآن",
    hi: "अभी नामांकन करें",
  },
  submit: { en: "Submit", ur: "جمع کریں", ar: "إرسال", hi: "जमा करें" },
  fullName: {
    en: "Full Name",
    ur: "پورا نام",
    ar: "الاسم الكامل",
    hi: "पूरा नाम",
  },
  email: {
    en: "Email Address",
    ur: "ای میل",
    ar: "البريد الإلكتروني",
    hi: "ईमेल पता",
  },
  phone: {
    en: "Phone Number",
    ur: "فون نمبر",
    ar: "رقم الهاتف",
    hi: "फोन नंबर",
  },
  message: { en: "Message", ur: "پیغام", ar: "الرسالة", hi: "संदेश" },
  selectCourse: {
    en: "Select Course",
    ur: "کورس منتخب کریں",
    ar: "اختر الكورس",
    hi: "कोर्स चुनें",
  },
  selectLanguage: { en: "Language", ur: "زبان", ar: "اللغة", hi: "भाषा" },
  donateNow: {
    en: "Donate Now",
    ur: "ابھی عطیہ دیں",
    ar: "تبرع الآن",
    hi: "अभी दान करें",
  },
  viewDetails: {
    en: "View Details",
    ur: "تفصیلات دیکھیں",
    ar: "عرض التفاصيل",
    hi: "विवरण देखें",
  },
  followUs: {
    en: "Follow Us",
    ur: "ہمیں فالو کریں",
    ar: "تابعنا",
    hi: "हमें फॉलो करें",
  },
};

export function tr(key: string, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.en ?? key;
}
