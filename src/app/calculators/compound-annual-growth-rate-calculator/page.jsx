"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [InitialInvestment, setInitialInvestment] = useState(300);
  const [Duration, setDuration] = useState(5);
  const [FinalValue, setFinalValue] = useState(1000);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    let PV = Number(InitialInvestment);
    let FV = Number(FinalValue);
    let n = Number(Duration);

    if (!PV || !FV || !n) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let cagr = Math.pow(FV / PV, 1 / n) - 1;
    let CAGR = (cagr * 100).toFixed(3);

    let results = {
      CAGR: CAGR,
      PV: PV.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      }),
    };

    setResult(results);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            CAGR Calculator (Compound Annual Growth Rate)
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Calculate your investment annual return rate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left Section */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Enter Details
                </h2>
              </div>

              <div className="px-6 py-6">
                <div className="space-y-5">
                  {/* Initial Investment */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Initial Investment
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
                        ₹
                      </span>
                      <Input
                        value={InitialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        type="number"
                      />
                    </div>

                    <div className="mt-3">
                      <Range
                        value={InitialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        min={0}
                        max={10000000}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>1 Cr</span>
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Duration of Investment (Years)
                    </label>
                    <Input
                      value={Duration}
                      onChange={(e) => setDuration(e.target.value)}
                      type="number"
                    />

                    <div className="mt-3">
                      <Range
                        value={Duration}
                        onChange={(e) => setDuration(e.target.value)}
                        min={1}
                        max={50}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>1</span>
                        <span>50</span>
                      </div>
                    </div>
                  </div>

                  {/* Final Value */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Final Value
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
                        ₹
                      </span>
                      <Input
                        value={FinalValue}
                        onChange={(e) => setFinalValue(e.target.value)}
                        type="number"
                      />
                    </div>

                    <div className="mt-3">
                      <Range
                        value={FinalValue}
                        onChange={(e) => setFinalValue(e.target.value)}
                        min={0}
                        max={20000000}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>2 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <SubmitButton onClick={handleSubmit}>Calculate</SubmitButton>
                  <p className="text-red-700">{error}</p>
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
                      CAGR Result
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      {result?.CAGR} %
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <p className="text-sm font-medium text-slate-700">
                        invested across {Duration} years
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹ {result?.PV}
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
