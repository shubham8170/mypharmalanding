import SupportClient from "./SupportClient";

export const metadata = {
  title: "CureMitra Support | 24/7 Diagnostics & Onboarding Help",
  description:
    "Get in touch with CureMitra (MyPharma) support. Resolve billing OCR anomalies, stock sync delays, POS integration issues, and get onboarding help for your pharmacy. Available 24/7 with expert diagnostics.",
  keywords: [
    "CureMitra Support",
    "MyPharma Customer Care",
    "Onboarding Pharmacy Training",
    "POS Integration Support",
    "Pharmacy OCR Troubleshooting",
    "Billing Software Help India",
    "Pharmacy Software Customer Support",
  ],
  openGraph: {
    title: "CureMitra Support | 24/7 Diagnostics & Onboarding Help",
    description:
      "Expert support for billing OCR, stock sync, POS integration, and pharmacy onboarding. Available 24/7.",
    url: "https://curemitra.com/customer-support",
    siteName: "CureMitra",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://curemitra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CureMitra Support – 24/7 Pharmacy Software Help",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CureMitra Support | 24/7 Diagnostics & Onboarding",
    description:
      "Expert support for billing OCR, stock sync, POS integration, and pharmacy onboarding.",
    images: ["https://curemitra.com/og-image.png"],
  },
  alternates: {
    canonical: "https://curemitra.com/customer-support",
  },
};

export default function CustomerSupportPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I connect CureMitra to my existing POS system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the integration wizard in settings and map your billing schema. Our interface supports standard formats and custom exports. CureMitra integrates with most existing pharmacy POS systems through our flexible API layer.",
        },
      },
      {
        "@type": "Question",
        name: "What browsers and devices are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CureMitra supports Chrome, Edge, Safari, and Firefox on modern desktop and mobile devices. We also provide native mobile app integrations for Android and iOS with full OCR scanning, GPS delivery tracking, and Bluetooth printing capabilities.",
        },
      },
      {
        "@type": "Question",
        name: "Can your team help with onboarding and training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our onboarding specialists provide implementation and workflow training, showing your team how to optimize scanning operations, set up inventory auto-ordering, configure GST filing, and use all CureMitra modules effectively.",
        },
      },
      {
        "@type": "Question",
        name: "How do I troubleshoot OCR billing errors in CureMitra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For OCR billing issues, check that prescription images are clear and well-lit. CureMitra's Google ML Kit engine requires minimum 300 DPI for optimal 99.9% accuracy. If issues persist, use the in-app diagnostic tool or contact our 24/7 support team via email at curemitrapharma@gmail.com.",
        },
      },
      {
        "@type": "Question",
        name: "How do I fix stock sync delays in CureMitra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stock sync typically completes in under 1 second. If you experience delays, verify your internet connection and ensure all branch locations are properly configured in the admin panel. For persistent issues, our support team can run real-time diagnostics on your sync pipeline.",
        },
      },
      {
        "@type": "Question",
        name: "Does CureMitra support multi-branch pharmacy operations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, CureMitra supports multi-branch pharmacy operations with real-time inventory sync across all locations. Branch managers can track stock levels, transfer inventory between locations, and generate consolidated GST reports across your entire pharmacy network.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <SupportClient />
    </>
  );
}
