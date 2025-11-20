"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Page = () => {
  const [basicSalary, setBasicSalary] = useState(540000);
  const [dearnessAllowance, setDearnessAllowance] = useState(0);
  const [hraReceived, setHraReceived] = useState(100000);
  const [totalRentPaid, setTotalRentPaid] = useState(300000);
  const [isMetroCity, setIsMetroCity] = useState("yes");

  const [exemptedHRA, setExemptedHRA] = useState(0);
  const [taxableHRA, setTaxableHRA] = useState(0);
  const [error, setError] = useState("");
  const handleCalculate = () => {
    let BasicSalary = Number(basicSalary);
    let DearnessAllowance = Number(dearnessAllowance);
    let HRAReceived = Number(hraReceived);
    let TotalRentPaid = Number(totalRentPaid);

    if (!BasicSalary || !HRAReceived || !TotalRentPaid || !TotalRentPaid) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let salaryForCalc = BasicSalary + DearnessAllowance;

    // Formula values
    let actualHRAReceived = HRAReceived;
    let percentSalary = (isMetroCity === "yes" ? 0.5 : 0.4) * salaryForCalc;
    let rentMinus10Percent = TotalRentPaid - 0.1 * salaryForCalc;

    // Minimum of three for exemption
    let hraExemption = Math.min(
      actualHRAReceived,
      percentSalary,
      rentMinus10Percent
    );

    if (hraExemption < 0) hraExemption = 0; // Prevent negative exemption

    let hraTaxable = actualHRAReceived - hraExemption;

    setExemptedHRA(hraExemption);
    setTaxableHRA(hraTaxable);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            HRA Calculator (House Rent Allowance)
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Calculate your House Rent Allowance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left Form Section */}
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
                      Basic salary (p.a)
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>
                      <Input
                        value={basicSalary}
                        onChange={(e) => setBasicSalary(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Dearness allowance (p.a)
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>
                      <Input
                        value={dearnessAllowance}
                        onChange={(e) => setDearnessAllowance(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      HRA received (p.a)
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>
                      <Input
                        value={hraReceived}
                        onChange={(e) => setHraReceived(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Total rent paid (p.a)
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>
                      <Input
                        value={totalRentPaid}
                        onChange={(e) => setTotalRentPaid(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Are you working in a metro city?
                    </label>
                    <Select onValueChange={setIsMetroCity} value={isMetroCity}>
                      <SelectTrigger
                        className="w-[180px] rounded-2xl"
                        style={{ height: "3rem" }}
                      >
                        <SelectValue placeholder="Select a city type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>City Type</SelectLabel>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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

          {/* Result UI */}

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
                    Exempted HRA
                  </p>
                  <p className="mt-1 text-2xl font-semibold">
                    ₹ {exemptedHRA.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                    <p className="text-sm font-medium text-slate-700">
                      Taxable HRA
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      ₹ {taxableHRA.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
