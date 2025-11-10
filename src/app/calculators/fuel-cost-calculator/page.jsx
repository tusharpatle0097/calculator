"use client";

import Input from "@/app/ui/Input";
import Range from "@/app/ui/Range";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const Page = () => {
  const [distance, setDistance] = useState(320);
  const [mileage, setMileage] = useState(11);
  const [fuelPrice, setFuelPrice] = useState(106);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleCalculate = () => {
    let D = Number(distance);
    let M = Number(mileage);
    let P = Number(fuelPrice);

    if (!D || !M || !P) {
      setError("Please enter valid values for all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    let FuelRequired = (D / M).toFixed(2);
    let TotalCost = (FuelRequired * P).toFixed(2);

    let result = { FuelRequired: FuelRequired, TotalCost: TotalCost };
    setData(result);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Fuel Cost Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your travel and fuel details below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* LEFT */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">
                  Fuel Details
                </h2>
              </div>

              <div className="px-6 py-6 space-y-6">
                {/* Distance */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Distance (km)
                  </label>
                  <Input
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    type="number"
                    placeholder="e.g. 320"
                  />

                  <div className="mt-3">
                    <Range
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      min={0}
                      max={10000}
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>0</span>
                      <span>1000 km</span>
                    </div>
                  </div>
                </div>

                {/* Mileage */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Vehicle Mileage (km per litre)
                  </label>
                  <Input
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    type="number"
                    placeholder="e.g. 18"
                  />

                  <div className="mt-3">
                    <Range
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      min={1}
                      max={50}
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>1</span>
                      <span>50</span>
                    </div>
                  </div>
                </div>

                {/* Fuel Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Fuel Price (₹ per litre)
                  </label>
                  <Input
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    type="number"
                    placeholder="e.g. 106"
                  />

                  <div className="mt-3">
                    <Range
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(e.target.value)}
                      min={50}
                      max={300}
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>50</span>
                      <span>300</span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="mt-6 flex gap-5 items-center">
                  <SubmitButton onClick={handleCalculate}>
                    Calculate
                  </SubmitButton>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Placeholder */}

          <div className={`lg:col-span-2 ${!data && 'hidden'}`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-base font-medium text-slate-800">Result</h2>
              </div>

              <div className="px-6 py-6 space-y-4">
                <div className="rounded-xl bg-slate-900 text-white px-5 py-4">
                  <p className="text-xs text-slate-300">Total Fuel Cost</p>
                  <p className="mt-1 text-2xl font-semibold">
                    ₹ {data?.TotalCost}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 px-4 py-3 flex justify-between">
                  <p className="text-sm font-medium text-slate-700">
                    Fuel Required (Litres)
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {data?.FuelRequired} Litres
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
