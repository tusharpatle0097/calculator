"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { Button } from "@/components/ui/button";

let BottomArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Page = () => {
  const [timeUnit, setTimeUnit] = useState("Year");
  const [totalInvestment, setTotalInvestment] = useState("100000");
  const [interestRate, setInterestRate] = useState("6");
  const [yearInvest, setYearInvest] = useState("2");
  const [monthInvest, setMonthInvest] = useState("6");
  const [interestCompounded, setInterestCompounded] = useState("Quarterly");
  const [showResultPanel, setShowResultPanel] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  const handleFd = () => {
    const P = Number(totalInvestment);
    const r = Number(interestRate) / 100;
    const t = Number(yearInvest);
    const tm = Number(monthInvest / 12);

    let interestCompoundedResult =
      interestCompounded === "Monthly"
        ? 12
        : interestCompounded === "Quarterly"
        ? 4
        : interestCompounded === "Half Yearly"
        ? 2
        : interestCompounded === "Yearly"
        ? 1
        : "Error";

    let n = interestCompoundedResult;
    if (timeUnit === "Month") {
      let A = P * (1 + r / n) ** (n * tm);
      let res = A - P;
      let result = Math.floor(res);

      let maturityValueRes = Number(result) + Number(P);

      let TotalInvestment = P.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      });
      let TotalInterst = result.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      });
      let MaturityValue = maturityValueRes.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      });

      let dataResult = {
        TotalInvestment: TotalInvestment,
        TotalInterst: TotalInterst,
        MaturityValue: MaturityValue,
      };

      setData(dataResult);

      if (result > 0) {
        setShowResultPanel(true);
      } else {
        setError(true);
      }
    } else {
      let A = P * (1 + r / n) ** (n * t);
      let res = A - P;
      let result = Math.floor(res);
      let maturityValueRes = Number(result) + Number(P);
      let TotalInvestment = P.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      });
      let TotalInterst = result.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      });
      let MaturityValue = maturityValueRes.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      });

      let dataResult = {
        TotalInvestment: TotalInvestment,
        TotalInterst: TotalInterst,
        MaturityValue: MaturityValue,
      };

      setData(dataResult);

      if (result > 0) {
        setShowResultPanel(true);
      } else {
        setError(true);
      }
    }

    setTimeout(() => {
      setError("");
    }, 2000);
  };

  return (
    <div className="min-h-screen   py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Fixed Deposit Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">Enter your FD details.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  FD Details
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
                      Time Period {timeUnit === "Year" ? "(Years)" : "(Month)"}
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{timeUnit}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => setTimeUnit("Year")}>
                            Year
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setTimeUnit("Month")}
                          >
                            Month
                          </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSub></DropdownMenuSub>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {timeUnit === "Year" ? (
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
                  ) : (
                    <div>
                      <div className="relative">
                        <Input
                          type="number"
                          onChange={(e) => setMonthInvest(e.target.value)}
                          value={monthInvest}
                        />
                      </div>
                      <div className="mt-3">
                        <Range
                          min={1}
                          max={60}
                          onChange={(e) => setMonthInvest(e.target.value)}
                          value={monthInvest}
                        />

                        <div className="mt-1 flex justify-between text-xs text-slate-400">
                          <span>1</span>
                          <span>60</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <div className="flex items-center gap-1">
                          <span>{interestCompounded}</span>
                          <span className="relative top-0.5">
                            {BottomArrow}
                          </span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => setInterestCompounded("Monthly")}
                        >
                          Monthly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setInterestCompounded("Quarterly")}
                        >
                          Quarterly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setInterestCompounded("Half Yearly")}
                        >
                          Half Yearly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setInterestCompounded("Yearly")}
                        >
                          Yearly
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSub></DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* this is year */}

                  {/* this is Month */}
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <SubmitButton onClick={handleFd}>Calculate FD</SubmitButton>
                  {error && (
                    <p className="text-red-700">
                      Please enter valid values for all fields.
                    </p>
                  )}
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

                <div className="px-6 py-6">
                  <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Total Interst
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      ₹{data?.TotalInterst}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Total Investment
                        </p>
                        <p className="text-xs text-slate-500">Maturity Value</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{data?.TotalInvestment}
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
                        ₹{data?.MaturityValue}
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
