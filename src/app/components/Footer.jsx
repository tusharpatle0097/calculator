import Link from "next/link";

export default function Footer() {
  return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="border-t mt-6 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CalculatorLab. All Rights Reserved.
        </div>
      </div>
  );
}
