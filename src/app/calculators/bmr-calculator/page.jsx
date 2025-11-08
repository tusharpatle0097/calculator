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
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    let heightFeets = Number(heightFeet);
    let heightInchs = Number(heightInch);
    let ages = Number(age);
    let weights = Number(weight);

    if (!heightFeets || !heightInchs || !ages || !weights) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let ft = heightFeets * 30.48;
    let inc = heightInchs * 2.54;
    let cm = ft + inc;

    if (gender == "male") {
      let BMR = 10 * weights + 6.25 * cm - 5 * ages + 5;
      setResult(BMR);
    } else if (gender == "female") {
      let BMR = 10 * weights + 6.25 * cm - 5 * ages - 161;
      setResult(BMR);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            BMR Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your gender, weight, height & age to know your Basal Metabolic
            Rate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Your Details
                </h2>
              </div>

              <div className="px-6 py-6 space-y-5">
                {/* Age */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Age (Years)
                  </label>
                  <Input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    placeholder="enter your age"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="enter your weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
                      kg
                    </span>
                  </div>

                  <div className="mt-3">
                    <Range min={20} max={200} value={weight}
                      onChange={(e) => setWeight(e.target.value)}/>
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>20 kg</span>
                      <span>200 kg</span>
                    </div>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Select Gender
                  </label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm"
                      style={{ height: "3.2rem" }}
                    >
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Height */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Feet */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Height (Feet)
                    </label>
                    <Select onValueChange={setHeightFeet} value={heightFeet}>
                      <SelectTrigger
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm"
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
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm"
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

                {/* Button */}
                <div className="pt-2 flex gap-2 items-center">
                  <SubmitButton onClick={calculate}>Calculate BMR</SubmitButton>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className={`lg:col-span-2 space-y-6 ${!result && "hidden"}`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  BMR Result
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-300">
                    Your BMR
                  </p>
                  <p className="mt-1 text-3xl font-semibold">
                    {result} Calories/day
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    Calculate to see your energy expenditure at rest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-slate-400">
          © Your Company
        </div>
      </div>
    </div>
  );
};

export default Page;
