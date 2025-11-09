"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [totalInvestment, setTotalInvestment] = useState("100000");
  const [interestRate, setInterestRate] = useState("6");
  const [yearInvest, setYearInvest] = useState("2");
  const [showResultPanel, setShowResultPanel] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");

  const handleFd = () => {
    const P = parseFloat(totalInvestment);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseInt(yearInvest, 10) * 12;

    if (P <= 0 || R <= 0 || N <= 0) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const maturity = P * ((Math.pow(1 + R, N) - 1) / R) * (1 + R);
    const totalPrincipal = P * N;
    const interest = maturity - totalPrincipal;

    let InvestedAmount = totalPrincipal.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
    let EstimatedReturns = interest.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
    let MaturityValue = maturity.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let resultShow = [
      {
        InvestedAmount: InvestedAmount,
        EstimatedReturns: EstimatedReturns,
        MaturityValue: MaturityValue,
      },
    ];

    setData(resultShow);

    if (maturity > 0) {
      setShowResultPanel(true);
    }
  };

  return (
    <div className="min-h-screen   py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Recurring Deposit Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">Enter your RD details.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  RD Details
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Total Investment
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>

                      <Input
                        type="number"
                        onChange={(e) => setTotalInvestment(e.target.value)}
                        value={totalInvestment}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={0}
                        max={1000000}
                        value={totalInvestment}
                        onChange={(e) => setTotalInvestment(e.target.value)}
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
                        onChange={(e) => setInterestRate(e.target.value)}
                        value={interestRate}
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
                        onChange={(e) => setInterestRate(e.target.value)}
                        value={interestRate}
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
                        onChange={(e) => setYearInvest(e.target.value)}
                        value={yearInvest}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={1}
                        max={30}
                        onChange={(e) => setYearInvest(e.target.value)}
                        value={yearInvest}
                      />

                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>1</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <SubmitButton onClick={handleFd}>Calculate FD</SubmitButton>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results always visible now, no state */}
          {showResultPanel && (
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <h2 className="text-base font-medium text-slate-800">
                    Results
                  </h2>
                </div>
                {data.map((items, index) => {
                  return (
                    <div key={index} className="px-6 py-6">
                      <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-300">
                          Estimated Returns
                        </p>
                        <p className="mt-1 text-2xl font-semibold">
                          ₹{items.EstimatedReturns}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-700">
                              Invested Amount
                            </p>
                            <p className="text-xs text-slate-500">
                              Invested Amount
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">
                            ₹{items.InvestedAmount}
                          </p>
                        </div>

                        <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-700">
                              Maturity Value
                            </p>
                            <p className="text-xs text-slate-500">
                              Total Invest + Interest
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">
                            ₹{items.MaturityValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      
      </div>
    </div>
  );
};

export default Page;
