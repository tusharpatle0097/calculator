"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "../ui/Button";
import SearchInput from "../ui/SearchInput";
import { RAW_CALCS } from "../data/calculatorsData";

const Page = () => {
  const [selectCategory, setSelectCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const updateCal = [
    { category: "All" },
    ...Array.from(new Set(RAW_CALCS.map((i) => i.category))).map((c) => ({
      category: c,
    })),
  ];

  const selectCat =
    selectCategory === "All"
      ? RAW_CALCS
      : RAW_CALCS.filter((items) => items.category === selectCategory);

  const filteredItems = selectCat.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30 blur-3xl"
          aria-hidden="true"
        >
          <div className="h-64 w-64 rounded-full bg-blue-200 absolute -top-12 -left-6" />
          <div className="h-72 w-72 rounded-full bg-indigo-200 absolute -bottom-10 right-0" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-10">
          <div className="flex flex-col gap-6 items-start">
            {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm shadow ring-1 ring-slate-200">
              <span>🧮</span>{" "}
              <span className="font-medium">Calculator</span>
            </span> */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              All the calculators you need — in one place
            </h1>
            <p className="max-w-2xl text-slate-600">
              Browse by category, or search directly for the calculator you
              want.
            </p>

            <div className="w-full max-w-2xl">
              <label htmlFor="search" className="sr-only">
                Search calculators
              </label>
              <div className="relative">
                <SearchInput value={searchQuery} onChange={handleInputChange} />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {updateCal.map((items, index) => {
                return (
                  <div key={index}>
                    <Button
                      onClick={() => setSelectCategory(items.category)}
                      isSelected={selectCategory === items.category}
                    >
                      {items.category}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20">
        <section className="mt-12 space-y-10">
          {filteredItems.length === 0 ? (
            <div className="text-center text-slate-500">
              No calculators found. Try a different search.
            </div>
          ) : (
            Object.entries(groupedByCategory).map(([category, items]) => (
              <div key={category}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {category}
                  </h2>
                  <span className="text-sm text-slate-500">
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </span>
                </div>

                <ul className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <li key={item.link}>
                      <Link
                        href={item.link}
                        className="group h-25 block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-200">
                            <span className="text-lg">{item.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate font-medium text-slate-800 group-hover:text-blue-700">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
      </main>

     
    </div>
  );
};

export default Page;
