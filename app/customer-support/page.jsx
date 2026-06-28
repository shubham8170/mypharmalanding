import SupportClient from "./SupportClient";

export const metadata = {
  title: "CureMitra Support | 24/7 Diagnostics & Onboarding Help (MyPharma)",
  description: "Get in touch with CureMitra (MyPharma) support. Resolve billing OCR anomalies, stock sync delays, and check doctor chamber schedule features.",
  keywords: [
    "CureMitra Support",
    "MyPharma Customer Care",
    "Onboarding Pharmacy Training",
    "POS Integration Support"
  ]
};

export default function CustomerSupportPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I connect CureMitra to my existing POS system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the integration wizard in settings and map your billing schema. Our interface supports standard formats and custom exports."
        }
      },
      {
        "@type": "Question",
        "name": "What browsers and devices are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Current Chrome, Edge, Safari, and Firefox on modern desktop and mobile devices. We also provide native mobile app integrations."
        }
      },
      {
        "@type": "Question",
        "name": "Can your team help with onboarding and training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, onboarding specialists provide implementation and workflow training, showing your team how to optimize scanning operations."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SupportClient />
    </>
  );
}
