"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Lumpsum = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [returnRate, setReturnRate] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);

  const handleSip = () => {
    const P = Number(monthlyInvestment);
    const inTf = Number(returnRate);
    const r = inTf;
    const n = Number(investmentPeriod);

    if (!P || !inTf || !r || !n) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    const PV = P * (1 + r / 100) ** n;
    const TotalValue = PV.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    const ER = (PV - P).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    const pFix = P.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    const ArrayResult = [
      {
        InestedAmount: pFix,
        TotalValue: TotalValue,
        ER: ER,
      },
    ];
    setResult(ArrayResult);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-base font-medium text-slate-800">
                SIP Details
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
                <SubmitButton onClick={handleSip}>Calculate SIP</SubmitButton>
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
                      Total Value
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      ₹{item.TotalValue}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Est. Return
                        </p>
                        <p className="text-xs text-slate-500">Return</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{item.ER}
                      </p>
                    </div>

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
                        ₹{item.InestedAmount}
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
        © Your Company
      </div>
    </div>
  );
};

export default Lumpsum;
