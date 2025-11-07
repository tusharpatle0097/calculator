"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [InvestmentAmount, setInvestmentAmount] = useState(500000);
  const [MonthlyWithdrawalAmount, setMonthlyWithdrawalAmount] = useState(10000);
  const [ReturnRate, setReturnRate] = useState(12);
  const [TimePeriod, setTimePeriod] = useState(5);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const Calculate = () => {
    let P = Number(InvestmentAmount);
    let W = Number(MonthlyWithdrawalAmount);
    let RR = Number(ReturnRate);
    let RPP = RR / 100;
    let i = RPP / 12;
    let TP = Number(TimePeriod);
    let n = TP * 12;

    if (!P || !W || !i || !n || P <= 0) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let first = Math.pow(1 + i, n);
    let second = (first - 1) / i;

    let FV = P * first - W * (1 + i) * second;

    let FinalValue = FV.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let TI = P.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
    let TW = (W * n).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let result = {
      FinalValue: FinalValue,
      TotalWithdrawnAmount: TW,
      TotalInvestment: TI,
    };
    setResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            SWP Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">Enter your SWP details.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* LEFT PANEL */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  SWP Details
                </h2>
              </div>

              <div className="px-6 py-6 space-y-6">
                {/* Initial Investment */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Initial Investment Amount
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                      ₹
                    </span>
                    <Input
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      value={InvestmentAmount}
                      type="number"
                      placeholder="Enter initial investment amount"
                    />
                  </div>
                  <div className="mt-3">
                    <Range
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      value={InvestmentAmount}
                      min={0}
                      max={2000000}
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>0</span>
                      <span>20 Lakh</span>
                    </div>
                  </div>
                </div>

                {/* Monthly Withdrawal */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Monthly Withdrawal Amount
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                      ₹
                    </span>
                    <Input
                      onChange={(e) =>
                        setMonthlyWithdrawalAmount(e.target.value)
                      }
                      value={MonthlyWithdrawalAmount}
                      type="number"
                      placeholder="Enter monthly SWP amount"
                    />
                  </div>

                  <div className="mt-3">
                    <Range
                      onChange={(e) =>
                        setMonthlyWithdrawalAmount(e.target.value)
                      }
                      value={MonthlyWithdrawalAmount}
                      min={1000}
                      max={200000}
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>1,000</span>
                      <span>2 Lakh</span>
                    </div>
                  </div>
                </div>

                {/* Return Rate */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Expected Annual Return Rate (%)
                  </label>
                  <div className="relative">
                    <Input
                      onChange={(e) => setReturnRate(e.target.value)}
                      value={ReturnRate}
                      type="number"
                      placeholder="e.g. 8"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                      %
                    </span>
                  </div>
                  <div className="mt-3">
                    <Range
                      onChange={(e) => setReturnRate(e.target.value)}
                      value={ReturnRate}
                      min={1}
                      max={30}
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>1</span>
                      <span>30</span>
                    </div>
                  </div>
                </div>

                {/* Withdrawal Duration */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Withdrawal Duration (Years)
                  </label>
                  <Input
                    onChange={(e) => setTimePeriod(e.target.value)}
                    value={TimePeriod}
                    type="number"
                    placeholder="Enter duration in years"
                  />

                  <div className="mt-3">
                    <Range
                      min={1}
                      max={50}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      value={TimePeriod}
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>1</span>
                      <span>50</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-5 items-center">
                  <SubmitButton onClick={Calculate}>Calculate</SubmitButton>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 ${!result && "hidden"}`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  SWP Results
                </h2>
              </div>

              <div className="px-6 py-6 space-y-4">
                <div className="rounded-xl bg-slate-900 text-white px-5 py-4">
                  <p className="text-xs text-slate-300">Final Corpus Value</p>
                  <p className="mt-1 text-2xl font-semibold">
                    ₹ {result?.FinalValue}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 px-4 py-3 flex justify-between">
                  <p className="text-sm font-medium text-slate-700">
                    Total Withdrawn Amount
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    ₹ {result?.TotalWithdrawnAmount}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 px-4 py-3 flex justify-between">
                  <p className="text-sm font-medium text-slate-700">
                    Total Investment
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    ₹ {result?.TotalInvestment}
                  </p>
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
