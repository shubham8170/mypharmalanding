import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://curemitra.com"),
  title: "CureMitra | Next-Gen AI Pharmacy OS & Billing Software (MyPharma)",
  description: "CureMitra (MyPharma) is India's leading AI-powered pharmacy management app. Automate billing with clinical-grade OCR, sync GST filing with Cleartax/Mastersindia, print invoices via Bluetooth, and track patient deliveries with real-time GPS.",
  keywords: [
    "CureMitra",
    "MyPharma",
    "CureMitra Pharma",
    "MyPharma App",
    "Pharmacy management software",
    "Best pharmacy billing app India",
    "Clinical OCR scanner",
    "Prescription billing software",
    "GST invoice synchronization",
    "Distributor auto-ordering app",
    "Medicine stock manager",
    "HIPAA compliant clinic POS"
  ],
  authors: [{ name: "CureMitra Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }, { url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "CureMitra | Next-Gen AI Pharmacy OS & Billing Software",
    description: "Automate pharmacy billing with clinical-grade OCR, manage stocks with predictive AI, and sync GST.",
    url: "https://curemitra.com",
    siteName: "CureMitra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CureMitra | AI Pharmacy Billing & OS",
    description: "Automate pharmacy billing with OCR, manage stocks with AI, and sync GST.",
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CureMitra",
    "alternateName": "MyPharma",
    "operatingSystem": "Android, iOS, Windows, Web",
    "applicationCategory": "BusinessApplication, HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "512"
    },
    "author": {
      "@type": "Organization",
      "name": "CureMitra",
      "url": "https://curemitra.com",
      "logo": "https://curemitra.com/assets/logo.png",
      "sameAs": [
        "https://github.com/shubham8170/mypharmalanding"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "curemitrapharma@gmail.com",
        "contactType": "customer support"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
