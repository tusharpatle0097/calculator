"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ClockFading, Slice } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AgeCalculatorPage() {
  const [isBirthOpen, setIsBirthOpen] = useState(false);
  const [isAsOfOpen, setIsAsOfOpen] = useState(false);

  const [birthDate, setBirthDate] = useState("");
  const [asOfDate, setAsOfDate] = useState(format(new Date(), "dd/MM/yyyy"));

  const [AgeDayState, setAgeDayState] = useState("");
  const [AgeMonthsState, setAgeMonthsState] = useState("");
  const [AgeYearState, setAgeYearState] = useState("");
  const [showError, setShowError] = useState(false);

  const [showResults, setShowResults] = useState(false);

  // const calculateAge = () => {
  // const birthDay = birthDate?.slice(0, 2);
  // const birthMonth = birthDate?.slice(3, 5);
  // const birthYear = birthDate?.slice(6, 10);

  // const asOfDay = asOfDate?.slice(0, 2);
  // const asOfMonth = asOfDate?.slice(3, 5);
  // const asOfYear = asOfDate?.slice(6, 10);

  // const AgeDay = asOfDay - birthDay;
  // const AgeMonths = asOfMonth - birthMonth;
  // const AgeYear = asOfYear - birthYear;

  // setAgeDayState(AgeDay < 0 ? 0 : AgeDay);
  // setAgeMonthsState(AgeMonths);
  // setAgeYearState(AgeYear);

  // if (birthDay.length > 0) {
  // setShowResults(true);
  // setShowError(false);
  // }

  // setTimeout(() => {
  // setShowError(false);
  // }, 2000);

  // if (birthDate.length <= 0) {
  // setShowError(true);
  // }
  // };

  const calculateAge = () => {
    if (!birthDate) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    const [birthDay, birthMonth, birthYear] = birthDate.split("/").map(Number);
    const [asOfDay, asOfMonth, asOfYear] = asOfDate.split("/").map(Number);

    let year = asOfYear - birthYear;
    let month = asOfMonth - birthMonth;
    let day = asOfDay - birthDay;

    // Borrow logic for days and months
    if (day < 0) {
      month -= 1;
      const prevMonthDays = new Date(asOfYear, asOfMonth - 1, 0).getDate();
      day += prevMonthDays;
    }

    if (month < 0) {
      year -= 1;
      month += 12;
    }

    setAgeYearState(year);
    setAgeMonthsState(month);
    setAgeDayState(day);

    setShowResults(true);
    setShowError(false);
  };

  return (
    <>
      <div className="min-h-screen   py-12 px-4">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Age Calculator
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your age details.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {/* Date of Birth */}
            <div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="birthDate" className="px-1">
                  Date of birth
                </Label>
                <Popover open={isBirthOpen} onOpenChange={setIsBirthOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="birthDate"
                      className="w-48 justify-between font-normal"
                    >
                      {birthDate
                        ? typeof birthDate === "string"
                          ? birthDate
                          : format(birthDate, "dd/MM/yyyy")
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={birthDate}
                      captionLayout="dropdown"
                      onSelect={(d) => {
                        const formattedDate = format(d, "dd/MM/yyyy");
                        setBirthDate(formattedDate);
                        setIsBirthOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Age As Of */}
            <div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="asOfDate" className="px-1">
                  Age as of
                </Label>
                <Popover open={isAsOfOpen} onOpenChange={setIsAsOfOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="asOfDate"
                      className="w-48 justify-between font-normal"
                    >
                      {asOfDate
                        ? typeof asOfDate === "string"
                          ? asOfDate
                          : format(asOfDate, "dd/MM/yyyy")
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={asOfDate}
                      captionLayout="dropdown"
                      onSelect={(d) => {
                        const formattedDate = format(d, "dd/MM/yyyy");
                        setAsOfDate(formattedDate);
                        setIsAsOfOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <button
            onClick={calculateAge}
            type="button"
            className="inline-flex mt-10 cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 active:scale-[0.98]"
          >
            Calculate EMI
          </button>

          {showError && (
            <p className="text-red-600">Please Select Date of Birth</p>
          )}

          {showResults && (
            <div className="mt-8">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 via-sky-50 to-emerald-50 opacity-60" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-slate-600">
                      Your Age
                    </h2>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-2.5 py-0.5 text-xs text-slate-600 backdrop-blur">
                      as of&nbsp;<span className="font-medium">{asOfDate}</span>
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-center">
                      <div className="text-4xl font-semibold tracking-tight text-slate-900">
                        {AgeYearState}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                        Years
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-center">
                      <div className="text-4xl font-semibold tracking-tight text-slate-900">
                        {AgeMonthsState}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                        Months
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-center">
                      <div className="text-4xl font-semibold tracking-tight text-slate-900">
                        {AgeDayState}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                        Days
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Date of birth:&nbsp;
                      <span className="font-medium text-slate-700">
                        {birthDate || "—"}
                      </span>
                    </span>
                    <span className="hidden sm:inline">
                      Calculated instantly • No data stored
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
