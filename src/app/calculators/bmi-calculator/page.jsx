"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const [error, setError] = useState("");

  const calculateBmi = () => {
    let F = Number(feet);
    let I = Number(inch);
    let W = Number(weight);

    if (F <= 0 || I <= 0 || W <= 0) {
      setError("Please enter valid values for all fields.");
      setShowPanel(false);
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let m = F * 0.3048 + I * 0.0254;
    let BMI = W / m ** 2;
    setResult(BMI.toFixed(2));

    if (BMI >= 0) {
      setShowPanel(true);
    }
  };

  return (
    <div className="min-h-screen   py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            BMI Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your weight & height to know your Body Mass Index.
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
                {/* Weight */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <Input
                      onChange={(e) => setWeight(e.target.value)}
                      value={weight}
                      type="number"
                      placeholder="enter your weight"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
                      kg
                    </span>
                  </div>
                  <div className="mt-3">
                    <Range
                      min={0}
                      max={200}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>20 kg</span>
                      <span>200 kg</span>
                    </div>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Height (m)
                  </label>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Select(Feet)
                    </label>
                    <select
                      onChange={(e) => setFeet(e.target.value)}
                      value={feet}
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    >
                      <option value="">Select an Feet</option>
                      {[3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}′
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Select (In)
                    </label>
                    <select
                      value={inch}
                      onChange={(e) => setInch(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    >
                      <option value="">Select an Inch</option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}″
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-5">
                  <SubmitButton onClick={calculateBmi}>
                    Calculate BMI
                  </SubmitButton>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Result + Ranges */}
          {showPanel && (
            <div className="lg:col-span-2 space-y-6">
              {/* Result */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <h2 className="text-base font-medium text-slate-800">
                    BMI Result
                  </h2>
                </div>
                <div className="px-6 py-6">
                  <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Your BMI
                    </p>
                    <p className="mt-1 text-3xl font-semibold">{result}</p>
                    <p className="mt-2 text-sm text-slate-200">
                      Calculate to see your status
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    BMI is a general indicator and may not apply to athletes,
                    pregnant women, and some body types.
                  </p>
                </div>
              </div>

              {/* BMI Range UI */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <h2 className="text-base font-medium text-slate-800">
                    BMI Range
                  </h2>
                </div>
                <div className="px-6 py-4 space-y-3">
                  <div
                    className={`flex items-center justify-between rounded-xl border ${
                      result <= 18.5
                        ? "animate-slate-blink"
                        : "border-slate-100 bg-slate-50"
                    }  px-4 py-3`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Below 18.5
                      </p>
                      <p className="text-xs text-slate-500">Underweight</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      Low
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-xl border ${
                      result >= 18.5 && result <= 24.9
                        ? "animate-green-blink"
                        : "border-green-100 bg-green-50"
                    }  px-4 py-3`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        18.5 – 24.9
                      </p>
                      <p className="text-xs text-slate-500">Normal weight</p>
                    </div>
                    <span className="text-xs font-semibold text-green-700">
                      Healthy
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-xl border ${
                      result >= 25.0 && result <= 29.9
                        ? "animate-amber-blink"
                        : "border-amber-100 bg-amber-50"
                    }  px-4 py-3`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        25.0 – 29.9
                      </p>
                      <p className="text-xs text-slate-500">Overweight</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-700">
                      High
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-xl border ${
                      result >= 30.0
                        ? "animate-rose-blink"
                        : "border-rose-100 bg-rose-50"
                    }  px-4 py-3`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        30.0 and above
                      </p>
                      <p className="text-xs text-slate-500">Obese</p>
                    </div>
                    <span className="text-xs font-semibold text-rose-700">
                      Very high
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
      
      </div>
    </div>
  );
};

export default Page;
