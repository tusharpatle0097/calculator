"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState(10000);
  const [interestRate, setInterestRate] = useState(7.1);
  const [timePeriod, setTimePeriod] = useState(15);
  const [maturityValue, setMaturityValue] = useState("");
  const [investedAmount, setInvestedAmount] = useState("");
  const [totalInterestEarned, setTotalInterestEarned] = useState("");
  const [error, setError] = useState("");
  const [errorYear, setErrorYear] = useState("");
  const [showPanel, setShowPanel] = useState(false);

  const handleCalculation = () => {
    let P = Number(yearlyInvestment);
    let r = Number(interestRate / 100);
    let n = Number(timePeriod);

    if (P === 0 || !interestRate || !timePeriod) {
      setError("Please enter valid values for all fields.");
      setShowPanel(false);
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    } else {
      setShowPanel(true);
    }

    if (timePeriod < 15) {
      setErrorYear(
        " The investment time period must be more than 15 years for PPF."
      );
      setShowPanel(false);
      setTimeout(() => {
        setErrorYear("");
      }, 2000);
      return;
    }

    let TotalInvestedAmount = Number(n) * Number(P);
    let TotalInvestedAmountFixComma = TotalInvestedAmount.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 0,
      }
    );

    let g = (1 + r) ** n;
    let MaturityValue = P * ((g - 1) / r) * (1 + r);
    let fixComma = MaturityValue.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let TotalMaturityValue = fixComma;
    let TotalInterestEarned = (
      MaturityValue - TotalInvestedAmount
    ).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    setMaturityValue(TotalMaturityValue);
    setInvestedAmount(TotalInvestedAmountFixComma);
    setTotalInterestEarned(TotalInterestEarned);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            PPF Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">Enter your PPF details.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  PPF Details
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Yearly Investment
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>

                      <Input
                        type="number"
                        placeholder="Enter your annual contribution"
                        onChange={(e) => setYearlyInvestment(e.target.value)}
                        value={yearlyInvestment}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={0}
                        max={150000}
                        onChange={(e) => setYearlyInvestment(e.target.value)}
                        value={yearlyInvestment}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>1.5 Lakh</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Time Period (Years)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter the investment duration (in years)"
                        onChange={(e) => setTimePeriod(e.target.value)}
                        value={timePeriod}
                      />
                    </div>
                    <div className="mt-3">
                      <Range
                        min={15}
                        max={25}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        value={timePeriod}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>15</span>
                        <span>25</span>
                      </div>
                    </div>
                    <p className="text-red-700 text-xs">{errorYear}</p>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Interest Rate (% P.A.)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter the annual interest rate"
                        onChange={(e) => setInterestRate(e.target.value)}
                        value={interestRate}
                        disabled={true}
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        %
                      </span>
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

          {/* Results Section */}

          {showPanel && (
            <div className="lg:col-span-2">
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
                        Estimated Maturity Value
                      </p>
                      <p className="text-xs text-white">
                        (Total Invest + Interest)
                      </p>
                    </div>
                    <p className="mt-1 text-2xl font-semibold">
                      ₹{maturityValue}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Invested Amount
                        </p>
                        <p className="text-xs text-slate-500">
                          Total Yearly Investment
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{investedAmount}
                      </p>
                    </div>

                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Total Interest Earned
                        </p>
                        <p className="text-xs text-slate-500">
                          Total Interest from Investment
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{totalInterestEarned}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-center text-xs text-slate-400">
          © Your Company
        </div>
      </div>
    </div>
  );
};

export default Page;
