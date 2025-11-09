"use client";

import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const Calculate = () => {
    let heightFeets = Number(heightFeet);
    let heightInchs = Number(heightInch);

    if (!heightFeets) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let ft = heightFeets * 30.48;
    let inc = heightInchs * 2.54;
    let cm = ft + inc;
    let m = cm / 100;

    let lowerHealthyLimit = (18.5 * Math.pow(m, 2)).toFixed(2);
    let upperHealthyLimit = (24.9 * Math.pow(m, 2)).toFixed(2);

    let res = {
      lowerHealthyLimit: lowerHealthyLimit,
      upperHealthyLimit: upperHealthyLimit,
    };
    setResult(res);
  };

  return (
    <div className="min-h-screen   py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Healthy Weight Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your height to find your recommended healthy weight range.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Your Height
                </h2>
              </div>

              <div className="px-6 py-6 space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Feet */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Height (Feet)
                    </label>
                    <Select onValueChange={setHeightFeet} value={heightFeet}>
                      <SelectTrigger
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        style={{ height: "3.2rem" }}
                      >
                        <SelectValue placeholder="Select Feet" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Feet</SelectLabel>
                          {[3, 4, 5, 6, 7].map((ft) => (
                            <SelectItem key={ft} value={String(ft)}>
                              {ft} ft
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Inches */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Height (Inches)
                    </label>
                    <Select onValueChange={setHeightInch} value={heightInch}>
                      <SelectTrigger
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        style={{ height: "3.2rem" }}
                      >
                        <SelectValue placeholder="Select Inches" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Inches</SelectLabel>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                            (inch) => (
                              <SelectItem key={inch} value={String(inch)}>
                                {inch} in
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-5">
                  <SubmitButton onClick={Calculate}>Calculate</SubmitButton>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 space-y-6 ${!result && "hidden"}`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Healthy Weight Result
                </h2>
              </div>

              <div className="px-6 py-6">
                <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-300">
                    Estimated Healthy Weight Range
                  </p>
                  <p className="mt-1 text-3xl font-semibold">
                    {result.lowerHealthyLimit} kg to {result.upperHealthyLimit}{" "}
                    kg
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    Your recommended weight range will appear here.
                  </p>
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
