"use client";

import CgpatToPercentage from "./CgpatToPercentage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PercentageToCgpat from "./PercentageToCgpat";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
           High-Accuracy CGPA to Percentage and Percentage to CGPA Converter
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your CGPA and select the grading scale.
          </p>
        </div>

        <Tabs defaultValue="CgpatToPercentage">
          <TabsList style={{ height: "50px" }}>
            <TabsTrigger className="cursor-pointer" value="CgpatToPercentage">
              Cgpat To Percentage
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="PercentageToCgpat">
              Percentage To Cgpat
            </TabsTrigger>
          </TabsList>
          <TabsContent value="CgpatToPercentage">
            <CgpatToPercentage />
          </TabsContent>
          <TabsContent value="PercentageToCgpat">
            <PercentageToCgpat />
          </TabsContent>
        </Tabs>

        <div className="mt-10 text-center text-xs text-slate-400">
          © CGPA Converter
        </div>
      </div>
    </div>
  );
};

export default Page;
