"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [PrincipalAmount, setPrincipalAmount] = useState(100000);
  const [InterestRate, setInterestRate] = useState(6);
  const [TimePeriod, setTimePeriod] = useState(5);
  const [result, setResult] = useState();
  const [error, setError] = useState("");

  const Calculate = () => {
    const P = Number(PrincipalAmount);
    const R = Number(InterestRate);
    const T = Number(TimePeriod);

    if (!P || !R || !T) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const result = (P * R * T) / 100;
    const Total = result + P;

    const totalInterest = result.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
    const totalAmount = Total.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
    const principalAmount = P.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    const resArray = {
      totalInterest: totalInterest,
      totalAmount: totalAmount,
      principalAmount: principalAmount,
    };

    setResult(resArray);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Simple Interest Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter Interest Calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Enter Details
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Principal Amount
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>

                      <Input
                        value={PrincipalAmount}
                        onChange={(e) => setPrincipalAmount(e.target.value)}
                        type="number"
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={0}
                        max={1000000}
                        value={PrincipalAmount}
                        onChange={(e) => setPrincipalAmount(e.target.value)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>1 Cr</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Interest Rate (% P.A.)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={InterestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        %
                      </span>
                    </div>
                    <div className="mt-3">
                      <Range
                        min={5}
                        max={20}
                        step={0.05}
                        value={InterestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />

                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>5%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Time Period (Years)
                    </label>
                  </div>

                  <div>
                    <div className="relative">
                      <Input
                        type="number"
                        value={TimePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={1}
                        max={30}
                        value={TimePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                      />

                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>1</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <SubmitButton onClick={Calculate}>Calculate</SubmitButton>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 ${!result && "hidden" }`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Results
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-300">
                    Total Interest
                  </p>
                  <p className="mt-1 text-2xl font-semibold">
                    ₹ {result?.totalInterest}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Principal Amount
                      </p>
                      <p className="text-xs text-slate-500">Principal Amount</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      ₹ {result?.principalAmount}
                    </p>
                  </div>

                  <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Total Amount
                      </p>
                      <p className="text-xs text-slate-500">
                        Principal Amount + Interest
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      ₹ {result?.totalAmount}
                    </p>
                  </div>
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
