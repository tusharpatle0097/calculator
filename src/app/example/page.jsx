"use client";

import React, { useState, useEffect } from "react";

const page = () => {
  const [mounted, setMounted] = useState(false);
  const [InterestRate, setInterestRate] = useState("");
  const [principalLoanAmount, setPrincipalLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState();
  const [error, setError] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleCalculate = () => {
    setError("");

    if (
      principalLoanAmount.length <= 0 ||
      loanTenure.length <= 0 ||
      InterestRate.length <= 0
    ) {
      setError("Please Fill All Fields");
      return;
    }

    let r = InterestRate / (12 * 100);
    let n = loanTenure * 12;

    const factor = (1 + r) ** n;
    const E = (principalLoanAmount * r * factor) / (factor - 1);
    setEmi(E.toFixed(2));

    let TP = E * n;
    setTotalPayment(TP.toFixed(2));
    let TI = TP - principalLoanAmount;
    setTotalInterest(TI.toFixed(2));
  };

  const resetHandle = () => {
    setInterestRate("");
    setPrincipalLoanAmount("");
    setLoanTenure("");
    setEmi("");
    setTotalPayment("");
    setTotalInterest("");
  };
  return (
    <>
      <div>
        <div className="flex gap-2">
          <p>Loan Amount:</p>
          <input
            value={principalLoanAmount}
            onChange={(e) => setPrincipalLoanAmount(e.target.value)}
            type="number"
            className="border-2"
          />
        </div>

        <div className="flex gap-2 mt-3">
          <p>Tenure (Years):</p>
          <input
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            type="number"
            className="border-2"
          />
        </div>

        <div className="flex gap-2 mt-3">
          <p>Interest Rate (% P.A.):</p>
          <input
            value={InterestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            type="number"
            className="border-2"
          />
        </div>
        <p className="text-red-700">{error}</p>
        <div className="flex gap-2">
          <button
            onClick={handleCalculate}
            className="bg-green-400 text-white px-2 py-2 rounded-xs cursor-pointer"
          >
            Calculate
          </button>

          <button
            onClick={resetHandle}
            className="bg-red-400 text-white px-2 py-2 rounded-xs cursor-pointer"
          >
            Reset
          </button>
        </div>
        {emi !== "" && emi !== undefined && (
          <div>
            <div>EMI: {emi}</div>
            <div>Principal Amount: {principalLoanAmount}</div>
            <div>Total Payment: {totalPayment}</div>
            <div>Total Interest: {totalInterest}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
