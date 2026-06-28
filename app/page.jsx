import HomeClient from "./HomeClient";

export const metadata = {
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
  ]
};

export default function HomePage() {
  return <HomeClient />;
}
