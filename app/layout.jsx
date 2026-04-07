import "./globals.css";

export const metadata = {
  title: "MyPharma",
  description: "MyPharma landing page",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }, { url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
