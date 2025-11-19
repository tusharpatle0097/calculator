"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import React, { useState } from "react";

const EmiCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [annualRate, setAnnualRate] = useState(6);
  const [tenureYears, setTenureYears] = useState(5);
  const [monthlyEmi, setMonthlyEmi] = useState("");
  const [totalInterestAmount, setTotalInterestAmount] = useState("");
  const [totalAmountPayable, setTotalAmountPayable] = useState("");
  const [visibleResults, setVisibleResults] = useState(false);
  const calculateEmi = () => {
    if (amount.length <= 0) {
      alert("Please Fill All The Fields");
      return;
    }

    let R = annualRate;
    let Y = tenureYears;
    let P = amount;

    let r = R / (12 * 100);
    let n = 12 * Y;

    let factor = (1 + r) ** n;
    let EMI = (P * r * factor) / (factor - 1);
    setMonthlyEmi(
      EMI.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })
    );

    let TP = EMI * n;
    let TI = TP - amount;
    setTotalInterestAmount(
      TI.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })
    );
    setTotalAmountPayable(
      TP.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })
    );

    if (totalAmountPayable.length >= 0) {
      setVisibleResults(true);
    }
  };

  return (
    <div className="min-h-screen   py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Home Loan EMI Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your loan details to estimate your monthly installment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Loan Details
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>

                      <Input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={0}
                        max={10000000}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>1 Cr</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Tenure (Years)
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        
                      </span>

                      <Input
                        value={tenureYears}
                        onChange={(e) => setTenureYears(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        value={tenureYears}
                        onChange={(e) => setTenureYears(e.target.value)}
                        min={1}
                        max={30}
                      />

                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>1</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Interest Rate (% P.A.)
                    </label>
                    <div className="relative">
                      <Input
                        value={annualRate}
                        onChange={(e) => setAnnualRate(e.target.value)}
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        %
                      </span>
                    </div>
                    <div className="mt-3">
                      <Range
                        value={annualRate}
                        onChange={(e) => setAnnualRate(e.target.value)}
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
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <SubmitButton onClick={calculateEmi}>
                    Calculate EMI
                  </SubmitButton>
                </div>
              </div>
            </div>
          </div>

          {visibleResults && (
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
                      Monthly Home Loan EMI
                    </p>
                    <p className="mt-1 text-2xl font-semibold">₹{monthlyEmi}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Principal Amount
                        </p>
                        <p className="text-xs text-slate-500">
                          Total principal borrowed
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹
                        {amount?.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>

                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Interest Amount
                        </p>
                        <p className="text-xs text-slate-500">
                          Total interest over tenure
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{totalInterestAmount}
                      </p>
                    </div>

                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Total Amount Payable
                        </p>
                        <p className="text-xs text-slate-500">
                          Principal + Interest
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{totalAmountPayable}
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

export default EmiCalculator;
