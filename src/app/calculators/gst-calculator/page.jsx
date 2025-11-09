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
  const [gstType, setGstType] = useState("");
  const [amount, setAmount] = useState(25000);
  const [taxSlab, setTaxSlab] = useState("");
  const [error, setError] = useState("");
  const [totalGst, setTotalGst] = useState("");
  const [postGst, setPostGst] = useState("");

  const calculate = () => {
    let PricipalAmount = Number(amount);
    let taxValue = Number(taxSlab);

    if (!gstType || !amount || !taxSlab) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (gstType === "excluding") {
      let GST = PricipalAmount * (taxValue / 100);
      let TotalAmount = PricipalAmount + GST;
      setPostGst(TotalAmount);
      let totalGst = TotalAmount - PricipalAmount;
      setTotalGst(totalGst);
    } else if (gstType === "including") {
      let BaseAmount = PricipalAmount / (1 + taxSlab / 100);
      let GSTAmount = amount - BaseAmount;
      setPostGst(GSTAmount);
      let totalGst = PricipalAmount - GSTAmount;
      setTotalGst(totalGst);
    }
  };

  return (
    <div className="min-h-screen   py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            GST Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter values to calculate GST.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Enter Details
                </h2>
              </div>

              <div className="px-6 py-6">
                <div className="space-y-5">
                  {/* GST Type */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      GST Type
                    </label>

                    <Select onValueChange={setGstType} value={gstType}>
                      <SelectTrigger
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        style={{ height: "3.2rem" }}
                      >
                        <SelectValue placeholder="Select GST Type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>GST Mode</SelectLabel>
                          <SelectItem value="including">
                            Including GST
                          </SelectItem>
                          <SelectItem value="excluding">
                            Excluding GST
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tax Slab */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Tax Slab (%)
                    </label>

                    <Select onValueChange={setTaxSlab} value={taxSlab}>
                      <SelectTrigger
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        style={{ height: "3.2rem" }}
                      >
                        <SelectValue placeholder="Select Tax Slab" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Rates</SelectLabel>
                          <SelectItem value="0.25">0.25%</SelectItem>
                          <SelectItem value="3">3%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="12">12%</SelectItem>
                          <SelectItem value="18">18%</SelectItem>
                          <SelectItem value="28">28%</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Amount
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 text-slate-400">
                        ₹
                      </span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        aria-label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div className="mt-3">
                      <Range
                        min={0}
                        max={1000000}
                        defaultValue={100000}
                        aria-label="Amount Range"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>1 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-6 flex items-center gap-5">
                  <SubmitButton type="button" onClick={calculate}>
                    Calculate
                  </SubmitButton>
                  <p className="text-red-600" aria-live="polite">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 ${!totalGst && "hidden"}`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Results
                </h2>
              </div>

              <div className="px-6 py-6">
                <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-300">
                    {postGst === "excluding"
                      ? "Post-GST Amount"
                      : "Pre-GST Amount"}
                  </p>
                  <p className="mt-1 text-2xl font-semibold">
                    ₹
                    {postGst.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between rounded-xl border border-slate-200 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Total GST Amount
                      </p>
                      <p className="text-xs text-slate-500">Total GST Amount</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      ₹{" "}
                      {totalGst.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Results */}
        </div>

      
      </div>
    </div>
  );
};

export default Page;
