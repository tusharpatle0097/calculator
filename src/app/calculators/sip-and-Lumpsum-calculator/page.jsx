"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sip from "./Sip";
import Lumpsum from "./Lumpsum";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            SIP and Lumpsum Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your SIP or Lumpsum details to calculate returns.
          </p>
        </div>

        <Tabs defaultValue="SIPCalculate">
          <TabsList style={{ height: "50px" }}>
            <TabsTrigger className="cursor-pointer" value="SIPCalculate">
              SIP Calculate
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="LumpsumCalculate">
              Lumpsum Calculate
            </TabsTrigger>
          </TabsList>
          <TabsContent value="SIPCalculate">
            <Sip />
          </TabsContent>
          <TabsContent value="LumpsumCalculate"><Lumpsum/></TabsContent>
        </Tabs>

        <div className="mt-10 text-center text-xs text-slate-400">
          © CGPA Converter
        </div>
      </div>
    </div>
  );
};

export default Page;
