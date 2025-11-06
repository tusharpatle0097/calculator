"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [monthlySalary, setMonthlySalary] = useState(60000);
  const [yearsService, setYearsService] = useState(20);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const handleCalculation = () => {
    if (monthlySalary <= 0 || yearsService <= 0) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const salary = monthlySalary.toString();
    const service = yearsService.toString();

    const result = (salary * service * 15) / 26;
    const resultFix = result.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
    console.log(resultFix);
    setResult(resultFix);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Gratuity Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your Gratuity details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Gratuity Details
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Monthly salary (Basic + DA)
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>

                      <Input
                        type="number"
                        placeholder="Enter monthly salary"
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={0}
                        max={1000000}
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(e.target.value)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>1cr</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Years of service
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter years of service"
                        value={yearsService}
                        onChange={(e) => setYearsService(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={15}
                        max={50}
                        value={yearsService}
                        onChange={(e) => setYearsService(e.target.value)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>15</span>
                        <span>25</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <SubmitButton onClick={handleCalculation}>
                    Calculate
                  </SubmitButton>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 ${!result && "hidden"}`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Results
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                  <div className="flex gap-2">
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Total Gratuity Payable
                    </p>
                  </div>
                  <p className="mt-1 text-2xl font-semibold">₹{result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-slate-400">
          © Your Company
        </div>
      </div>
    </div>
  );
};

export default Page;
