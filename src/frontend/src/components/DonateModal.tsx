import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateCheckoutSession,
  useIsStripeConfigured,
} from "@/hooks/useQueries";
import { type Lang, tr } from "@/i18n";
import { AlertCircle, Globe, Heart, Loader2 } from "lucide-react";
import { useState } from "react";

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}

type Currency = "inr" | "usd" | "gbp" | "eur";

const CURRENCY_CONFIG: Record<
  Currency,
  { symbol: string; label: string; amounts: number[]; flag: string }
> = {
  inr: {
    symbol: "₹",
    label: "INR — ہندوستانی روپیہ",
    amounts: [500, 1000, 2500, 5000],
    flag: "🇮🇳",
  },
  usd: {
    symbol: "$",
    label: "USD — امریکی ڈالر",
    amounts: [10, 25, 50, 100],
    flag: "🇺🇸",
  },
  gbp: {
    symbol: "£",
    label: "GBP — برطانوی پاؤنڈ",
    amounts: [10, 25, 50, 100],
    flag: "🇬🇧",
  },
  eur: {
    symbol: "€",
    label: "EUR — یورو",
    amounts: [10, 25, 50, 100],
    flag: "🇪🇺",
  },
};

const PURPOSES = [
  "عمومی فنڈ",
  "طلباء کے وظائف",
  "لائبریری کی ترقی",
  "انفراسٹرکچر",
];

export default function DonateModal({ open, onClose, lang }: DonateModalProps) {
  const [currency, setCurrency] = useState<Currency>("inr");
  const [amount, setAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");

  const { data: stripeConfigured } = useIsStripeConfigured();
  const {
    mutate: createSession,
    isPending,
    isError,
  } = useCreateCheckoutSession();

  const currencyConfig = CURRENCY_CONFIG[currency];
  const finalAmount = amount ?? Number(customAmount);

  const handleCurrencyChange = (val: Currency) => {
    setCurrency(val);
    setAmount(CURRENCY_CONFIG[val].amounts[1]);
    setCustomAmount("");
  };

  const handleDonate = () => {
    if (!finalAmount || finalAmount <= 0) return;
    const amountInSmallestUnit = Math.round(finalAmount * 100);
    createSession(
      {
        items: [
          {
            productName: `عطیہ — ${purpose}`,
            currency,
            quantity: 1n,
            priceInCents: BigInt(amountInSmallestUnit),
            productDescription: `دارالعلوم اشرفیہ دیوبند کے لیے ${purpose} کا عطیہ`,
          },
        ],
        successUrl: `${window.location.href}?donation=success`,
        cancelUrl: `${window.location.href}?donation=cancel`,
      },
      {
        onSuccess: (url) => {
          if (url) window.location.href = url;
        },
      },
    );
  };

  // suppress unused variable warnings
  void donorName;
  void email;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-green-dark flex items-center gap-2">
            <Heart className="h-6 w-6 text-gold" />
            {tr("donateTitle", lang)}
          </DialogTitle>
        </DialogHeader>

        {!stripeConfigured ? (
          <div className="py-4 text-center space-y-4">
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-5">
              <p className="font-arabic text-green-dark text-lg mb-2">
                جزاكم الله خيراً
              </p>
              <p className="text-sm text-muted-foreground">
                عطیہ پورٹل جلد آ رہا ہے۔ بینک ٹرانسفر کی تفصیلات کے لیے ہم سے
                رابطہ کریں۔
              </p>
            </div>
            <div className="space-y-2 text-sm text-right">
              <p className="font-semibold text-foreground">بینک کی تفصیلات:</p>
              <p className="text-muted-foreground">
                اکاؤنٹ نام: دارالعلوم اشرفیہ دیوبند
              </p>
              <p className="text-muted-foreground">
                رابطہ: info@ashrafiadeoband.org
              </p>
              <p className="text-muted-foreground">واٹس ایپ: +91 98970 99692</p>
            </div>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            {/* Currency Selector */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-primary" />
                کرنسی منتخب کریں
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(CURRENCY_CONFIG) as Currency[]).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => handleCurrencyChange(c)}
                    className={`py-2 px-2 rounded-lg border text-xs font-semibold transition-all flex flex-col items-center gap-0.5 ${
                      currency === c
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span className="text-base">{CURRENCY_CONFIG[c].flag}</span>
                    <span className="uppercase">{c}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>عطیہ کی رقم ({currencyConfig.symbol})</Label>
              <div className="grid grid-cols-4 gap-2">
                {currencyConfig.amounts.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => {
                      setAmount(a);
                      setCustomAmount("");
                    }}
                    className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all ${
                      amount === a
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {currencyConfig.symbol}
                    {a.toLocaleString()}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                placeholder={`اپنی رقم درج کریں (${currencyConfig.symbol})`}
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount(null);
                }}
                className="mt-2"
              />
            </div>

            <div className="space-y-1.5">
              <Label>عطیہ کا مقصد</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PURPOSES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>آپ کا نام</Label>
                <Input
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="اختیاری"
                />
              </div>
              <div className="space-y-1.5">
                <Label>ای میل</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="اختیاری"
                />
              </div>
            </div>

            {isError && (
              <div
                data-ocid="donate.error_state"
                className="flex items-center gap-2 text-destructive text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>ادائیگی سیٹ اپ ناکام۔ دوبارہ کوشش کریں۔</span>
              </div>
            )}

            <Button
              data-ocid="donate.submit_button"
              className="w-full bg-gold text-accent-foreground hover:bg-gold/90 font-bold text-base"
              size="lg"
              disabled={isPending || !finalAmount || finalAmount <= 0}
              onClick={handleDonate}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  پروسیس ہو رہا ہے...
                </>
              ) : (
                `${tr("donateNow", lang)} — ${currencyConfig.symbol}${finalAmount?.toLocaleString() ?? ""}`
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Stripe کے ذریعے محفوظ ادائیگی۔ ملکی اور بین الاقوامی کارڈز قبول
              ہیں۔
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
