"use client";

import Input from "@/app/ui/Input";
import SubmitButton from "@/app/ui/SubmitButton";
import { useState } from "react";

const keypadValues = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "+",
];

const Page = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
    if (input === "Error" ) {
      setInput("");
    }
  };

  const handleCalculate = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const allClear = () => {
    setInput("");
  };

  const allSelect = () => {
    setInput((s) => s.slice(0, -1));
  };

  return (
    <div className="min-h-screen   py-10 px-3 text-[0.92rem]">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-[1.7rem] font-semibold tracking-tight text-slate-900">
            Calculator
          </h1>
          <p className="mt-1 text-[0.78rem] text-slate-500">
            A clean, minimal calculator interface for quick addition,
            subtraction, multiplication and division.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Left: Calculator panel */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-slate-800">
                    Basic operations
                  </h2>
                  <p className="mt-[2px] text-[0.7rem] text-slate-500">
                    Type numbers or use the keypad to build an expression.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-[2px] text-[0.65rem] font-medium uppercase tracking-wide text-slate-500">
                  + − × ÷
                </span>
              </div>

              <div className="px-5 py-5 space-y-4">
                {/* Expression input */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700">
                    Expression
                  </label>

                  <input
                   placeholder="E.g. 12 + 7 × 3"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700">
                    Keypad
                  </label>
                  <div className="mt-2 flex gap-2 text-[0.7rem] mb-2">
                    <button
                      onClick={allClear}
                      className="rounded-lg border border-slate-200 font-medium w-20 bg-slate-50 px-2.5 py-2.5 text-slate-600 hover:border-slate-300"
                    >
                      AC
                    </button>
                    <button
                      onClick={allSelect}
                      className="rounded-lg border border-slate-200 font-medium w-20 bg-slate-50 px-2.5 py-2.5 text-slate-600 hover:border-slate-300"
                    >
                      X
                    </button>
                    <span className="ml-auto inline-flex items-center rounded-full bg-slate-50 px-2.5 py-[2px] text-[0.65rem] text-slate-500">
                      Keyboard input supported
                    </span>
                  </div>
                  {/* ✅ Single array mapped */}
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    {keypadValues.map((val, i) => (
                      <button
                        onClick={() => handleClick(val)}
                        key={i}
                        className={`rounded-lg border border-slate-200 py-2.5 font-medium hover:border-slate-300 ${
                          ["÷", "×", "−", "+"].includes(val)
                            ? "bg-slate-100 font-semibold text-slate-900"
                            : "bg-slate-50 text-slate-800"
                        } ${val === "0" ? "col-span-2" : ""}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                  {/* Utility buttons */}
                </div>

                {/* Action */}
                <div className="mt-5 flex items-center gap-4">
                  <SubmitButton onClick={handleCalculate}>=</SubmitButton>
                  <p className="text-[0.7rem] text-slate-500">
                    Press{" "}
                    <span className="font-semibold text-slate-700">=</span> to
                    evaluate the current expression. (UI only)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info panel */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-xs font-semibold text-slate-800 mb-1.5">
                  How this calculator is structured
                </h3>
                <ul className="space-y-1 text-[0.7rem] text-slate-500">
                  <li>• Editable expression input.</li>
                  <li>• Read-only result field.</li>
                  <li>• Number keypad and operators.</li>
                  <li>• Utility buttons (AC / ⌫).</li>
                </ul>
              </div>

              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-3 text-[0.7rem] text-slate-500">
                <p className="font-medium text-slate-700 mb-1">
                  Implementation note
                </p>
                <p>
                  This version is scaled down ~8% for compactness. Add your
                  state logic and evaluation later when ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[0.65rem] text-slate-400">
          © Your Company · Calculator UI
        </div>
      </div>
    </div>
  );
};

export default Page;
