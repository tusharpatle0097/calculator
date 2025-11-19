import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calculator Lab - Online Financial, Health & Utility Calculators",
  description:
    "Calculator Lab offers 18+ free online calculators to simplify financial, health, academic, and daily life calculations. Calculate EMI, SIP, FD, RD, PPF, GST, SWP, Mutual Fund Returns, Gratuity, Simple Interest, Age, BMI, BMR, Healthy Weight, Fuel Cost, CGPA to Percentage, Length Conversion and more. Fast, accurate, and user-friendly calculators built with Next.js for a smooth experience.",
  keywords:
    "online calculators, financial calculators, EMI calculator, FD calculator, RD calculator, PPF calculator, SIP calculator, Lumpsum calculator, SWP calculator, mutual fund returns calculator, gratuity calculator, GST calculator, simple interest calculator, age calculator, BMI calculator, BMR calculator, healthy weight calculator, fuel cost calculator, CGPA to percentage converter, length converter, calculator tools India, free calculators online",
  authors: [{ name: "Tushar Patle" }],
  openGraph: {
    title: "Calculator Lab - Free Online Financial & Health Calculators",
    description:
      "Use 18+ free online calculators for finance, health, academics & daily utilities including EMI, FD, RD, PPF, SIP, GST, BMI, BMR, Age, CGPA & more.",
    url: "https://www.calculatorlab.in",
    siteName: "Calculator Lab",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
