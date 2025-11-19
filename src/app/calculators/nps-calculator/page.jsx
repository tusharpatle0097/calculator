"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [MonthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [ExpectedReturn, setExpectedReturn] = useState(9);
  const [Age, setAge] = useState(20);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    let P = Number(MonthlyInvestment);
    let R = Number(ExpectedReturn);
    let N = Number(Age);

    if (!P || !R || !N) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let r = R / 12 / 100;
    let n = (60 - N) * 12;

    let FV = (P * (Math.pow(1 + r, n) - 1)) / r;

    let maturityAmount = FV.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let TN = P * n;

    let TotalInvested = TN.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let IE = FV - TN;

    let interestErned = IE.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let minAnuityInvestment = (FV * 40).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let result = {
      totalInvested: TotalInvested,
      interestErned: interestErned,
      maturityAmount: maturityAmount,
      minAnuityInvestment: minAnuityInvestment,
    };

    setResult(result);
    console.log(result, "result");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            NPS Calculator (National Pension System)
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Plan your National Pension Scheme investment.
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
                  {/* Investment Per Month */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Investment Per Month
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>
                      <Input
                        value={MonthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                        type="number"
                      />
                    </div>

                    <div className="mt-3">
                      <Range
                        value={MonthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                        min={0}
                        max={100000}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>1 Lac</span>
                      </div>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Expected Return (%)
                    </label>
                    <div className="relative">
                      <Input
                        value={ExpectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        type="number"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        %
                      </span>
                    </div>

                    <div className="mt-3">
                      <Range
                        value={ExpectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        min={5}
                        max={20}
                        step={0.05}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>5%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>

                  {/* Your Age */}
                  <div className="flex justify-between items-center mb-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Your Age
                    </label>
                  </div>

                  <div>
                    <Input
                      value={Age}
                      onChange={(e) => setAge(e.target.value)}
                      type="number"
                    />

                    <div className="mt-3">
                      <Range
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                        min={18}
                        max={60}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>18</span>
                        <span>60</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <SubmitButton onClick={handleCalculate}>
                    Calculate
                  </SubmitButton>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>
          {result && (
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <h2 className="text-base font-medium text-slate-800">
                    Results
                  </h2>
                </div>

                <div className="px-6 py-6">
                  <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Total Interest Earned
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      ₹ {result?.interestErned}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Total Investment
                        </p>
                        <p className="text-xs text-slate-500">
                          Invested Amount
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹ {result?.totalInvested}
                      </p>
                    </div>

                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Manurity Amount
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹ {result?.maturityAmount}
                      </p>
                    </div>
                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Minimum Annuity Investment
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹ {result?.minAnuityInvestment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
