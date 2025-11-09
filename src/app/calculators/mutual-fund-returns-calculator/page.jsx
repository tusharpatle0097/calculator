"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [returnRate, setReturnRate] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);

  const handleSip = () => {
    const P = Number(monthlyInvestment);
    const r = Number(returnRate) / 100;
    const n = Number(investmentPeriod);

    if (!P || !r || !n) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    const PV = P * Math.pow(1 + r, n);

    let InvestedAmount = P.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let TotalValue = PV.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let EstReturn = (PV - P).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    const ArrayResult = [
      {
        EstReturn: EstReturn,
        InvestedAmount: InvestedAmount,
        TotalValue: TotalValue,
      },
    ];
    console.log(ArrayResult);
    setResult(ArrayResult);
  };

  return (
    <div className="min-h-screen   py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Mutual Fund Returns Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter Mutual Fund Returns details to calculate returns.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Mutual Fund Returns details
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Monthly Investment
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>

                      <Input
                        type="number"
                        placeholder="Enter monthly investment"
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                        value={monthlyInvestment}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={0}
                        max={1000000}
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>1 Cr</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Expected Return Rate (% P.A.)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter expected return rate"
                        onChange={(e) => setReturnRate(e.target.value)}
                        value={returnRate}
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
                        onChange={(e) => setReturnRate(e.target.value)}
                        value={returnRate}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>5%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Investment Period (Years)
                    </label>
                  </div>

                  <div>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter investment period"
                        onChange={(e) => setInvestmentPeriod(e.target.value)}
                        value={investmentPeriod}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={1}
                        max={30}
                        onChange={(e) => setInvestmentPeriod(e.target.value)}
                        value={investmentPeriod}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>1</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <SubmitButton onClick={handleSip}>Calculate</SubmitButton>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>

          {result.map((item, index) => {
            return (
              <div className="lg:col-span-2" key={index}>
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="text-base font-medium text-slate-800">
                      Results
                    </h2>
                  </div>
                  <div className="px-6 py-6">
                    <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-300">
                        Estimated Returns
                      </p>
                      <p className="mt-1 text-2xl font-semibold">
                        ₹{item.EstReturn}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Invested Amount
                          </p>
                          <p className="text-xs text-slate-500">
                            Total invested over the period
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          ₹{item.InvestedAmount}
                        </p>
                      </div>

                      <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Total Value
                          </p>
                          <p className="text-xs text-slate-500">
                            Total Invested + Interest
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          ₹{item.TotalValue}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-xs text-slate-400">
          © CGPA Converter
        </div>
      </div>
    </div>
  );
};

export default Page;
