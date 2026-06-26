import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Track-Kar - Never Miss a Price Drop",
  description:
    "Track product prices across e-commerce sites and get alerts on price drops with Track-Kar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Toaster richColors />
      </body>
    </html>
  );
}
