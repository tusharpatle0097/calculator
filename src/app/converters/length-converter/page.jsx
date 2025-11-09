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

let AllLengths = [
  "meter",
  "kilometer",
  "centimeter",
  "millimeter",
  "micrometer",
  "nanometer",
  "mile",
  "yard",
  "foot",
  "inch",
  "nautical mile",
];

const Page = () => {
  const [selectSourceUnit, setSelectSourceUnit] = useState("");
  const [selectTargetUnit, setSelectTargetUnit] = useState("");
  const [selectSourceUnitValue, setSelectSourceUnitValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!selectSourceUnit || !selectTargetUnit || !selectSourceUnitValue) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (selectSourceUnit === selectTargetUnit) {
      setError("Source and target units cannot be the same.");
      setSelectTargetUnit("");
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    let SourceUnitValue = Number(selectSourceUnitValue);

    const toMeter = {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      micrometer: 1e-6,
      nanometer: 1e-9,
      mile: 1609,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254,
      "nautical mile": 1852,
    };

    const sourceFactor = toMeter[selectSourceUnit];
    const targetFactor = toMeter[selectTargetUnit];

    const valueInMeters = SourceUnitValue * sourceFactor;
    const result = valueInMeters / targetFactor;

    setConvertedValue(result);
    console.log(result, "convertedValue");
  };

  return (
    <div className="min-h-screen   py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Length Converter
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Convert between different length units instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Conversion Input
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Value
                    </label>
                    <Input
                      placeholder="Enter value to convert"
                      value={selectSourceUnitValue}
                      onChange={(e) => setSelectSourceUnitValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                      <div className="relative mt-3">
                        <Select
                          value={selectSourceUnit}
                          onValueChange={(value) => setSelectSourceUnit(value)}
                        >
                          <SelectTrigger
                            className=" w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                            style={{ height: "48px" }}
                          >
                            <SelectValue placeholder="Select source unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>From unit</SelectLabel>
                              {AllLengths.map((items) => {
                                return (
                                  <SelectItem key={items} value={items}>
                                    {items}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="relative mt-3">
                        <Select
                          value={selectTargetUnit}
                          onValueChange={(value) => setSelectTargetUnit(value)}
                        >
                          <SelectTrigger
                            className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                            style={{ height: "48px" }}
                          >
                            <SelectValue placeholder="Select target unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>To unit</SelectLabel>
                              {AllLengths.map((items) => {
                                return (
                                  <SelectItem key={items} value={items}>
                                    {items}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <div onClick={handleSubmit}>
                    <SubmitButton>Convert</SubmitButton>
                  </div>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Result section */}
          
          <div className={`lg:col-span-2 ${!convertedValue && "hidden"}`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Results
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-300">
                    Converted length
                  </p>
                  <p className="mt-1 text-2xl font-semibold">
                    {convertedValue}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    The result of your conversion will appear here.
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
