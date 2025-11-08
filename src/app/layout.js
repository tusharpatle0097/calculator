import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calculator Lab",
  description:
    "This website provides a complete collection of online calculators designed to make complex calculations simple and accurate. Whether you need to plan your finances, track your fitness, convert measurements, or solve academic calculations, we offer a wide range of tools including EMI Calculator, Age Calculator, FD & RD Calculator, PPF Calculator, SIP & Lumpsum Calculator, GST Calculator, BMR & BMI Calculator, Length Converter, CGPA to Percentage Converter and more. Built with Next.js for speed and smooth user experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
