import PricingClient from "./PricingClient";

export const metadata = {
  title: "Pricing | CureMitra — AI Pharmacy Billing & Inventory",
  description:
    "CureMitra pricing plans for pharmacies and clinics. Start free — upgrade when you need AI inventory, multi-branch management, or priority support. No credit card required.",
  keywords: [
    "CureMitra pricing",
    "pharmacy software price India",
    "AI billing software plans",
    "pharmacy management free trial",
    "MyPharma pricing",
  ],
  openGraph: {
    title: "Pricing | CureMitra — AI Pharmacy Billing & Inventory",
    description:
      "Simple, transparent pricing for pharmacies and clinics. Start free, scale as you grow. No lock-in contracts.",
    url: "https://curemitra.com/pricing",
    siteName: "CureMitra",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://curemitra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CureMitra Pricing – AI Pharmacy Management Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | CureMitra — AI Pharmacy Billing & Inventory",
    description:
      "Simple, transparent pricing for pharmacies and clinics. Start free, scale as you grow.",
    images: ["https://curemitra.com/og-image.png"],
  },
  alternates: {
    canonical: "https://curemitra.com/pricing",
  },
};

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CureMitra Pricing",
    url: "https://curemitra.com/pricing",
    description:
      "Pricing plans for CureMitra pharmacy management software. Starter, Professional, and Enterprise tiers available.",
    publisher: {
      "@type": "Organization",
      name: "CureMitra",
      url: "https://curemitra.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <PricingClient />
    </>
  );
}
