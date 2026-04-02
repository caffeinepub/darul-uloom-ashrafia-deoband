import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919897099692"
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label="واٹس ایپ پر چیٹ کریں"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#20c55e] transition-colors whatsapp-pulse"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </a>
  );
}
