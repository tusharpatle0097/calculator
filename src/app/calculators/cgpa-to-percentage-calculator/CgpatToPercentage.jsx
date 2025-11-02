"use client";

import Input from "@/app/ui/Input";
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

const CgpatToPercentage = () => {
  const [cgpa, setCgpa] = useState("");
  const [selectGrade, setSelectGrade] = useState("");
  const [error, setError] = useState("");
  const [emptyError, setEmptyError] = useState("");
  const [result, setResult] = useState("");
  const [showPanel, setShowPanel] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (
      newValue === "" ||
      (Number(newValue) >= 0 && Number(newValue) <= 10 && !isNaN(newValue))
    ) {
      setCgpa(newValue);
    }
  };

  const handleCal = () => {
    let CGPA = Number(cgpa);
    let Grade = Number(selectGrade);

    if (!CGPA || !Grade) {
      setEmptyError("Please enter valid values for all fields.");
      setTimeout(() => {
        setEmptyError("");
      }, 2000);
      return;
    }

    if (CGPA > Grade) {
      setError("Your CGPA is greater than grading scale");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (CGPA <= Grade) {
      if (Grade > 5.0) {
        let tenGrade = CGPA * Grade;
        setResult(tenGrade.toFixed(2));
      } else {
        let fourGrade = (CGPA / Grade) * 100;
        setResult(fourGrade.toFixed(2));
      }
    }

    if (result >= 0) {
      setShowPanel(true);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-base font-medium text-slate-800">
              Conversion Details
            </h2>
          </div>
          <div className="px-6 py-6">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  CGPA
                </label>
                <div className="relative">
                  <Input type="number" value={cgpa} onChange={handleChange} />
                </div>
              </div>

              <Select
                value={selectGrade}
                onValueChange={(value) => setSelectGrade(value)}
              >
                <SelectTrigger
                  className="w-[180px] rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  style={{ height: "48px" }}
                >
                  <SelectValue placeholder="Select grading scale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Grading Scale</SelectLabel>
                    <SelectItem value="4.0">4.0 Scale</SelectItem>
                    <SelectItem value="5.0">5.0 Scale</SelectItem>
                    <SelectItem value="10.0">10.0 Scale</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 flex items-center gap-5">
              <SubmitButton onClick={handleCal}>Convert</SubmitButton>
              <p className="text-red-700">{error}</p>
              <p className="text-red-700">{emptyError}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results always visible now, no state */}
      {showPanel && (
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-base font-medium text-slate-800">Result</h2>
            </div>

            <div className="px-6 py-6">
              <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-300">
                  Percentage
                </p>
                <p className="mt-1 text-2xl font-semibold">{result}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CgpatToPercentage;

// "use client";

// import Input from "@/app/ui/Input";
// import SubmitButton from "@/app/ui/SubmitButton";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";

// const Page = () => {
//   const [cgpa, setCgpa] = useState("");
//   const [selectGrade, setSelectGrade] = useState("");
//   const [error, setError] = useState("");
//   const [emptyError, setEmptyError] = useState("");
//   const [result, setResult] = useState("");
//   const [showPanel, setShowPanel] = useState(false);

//   const handleCal = () => {
//     let CGPA = Number(cgpa);
//     let Grade = Number(selectGrade);

//     if (!CGPA || !Grade) {
//       setEmptyError("Please enter valid values for all fields.");
//       setTimeout(() => {
//         setEmptyError("");
//       }, 2000);
//       return;
//     }

//     if (CGPA > Grade) {
//       setError("Your CGPA is greater than grading scale");
//       setTimeout(() => {
//         setError("");
//       }, 2000);
//       return;
//     }

//     if (CGPA <= Grade) {
//       if (Grade > 5.0) {
//         let tenGrade = CGPA * Grade;
//         setResult(tenGrade.toFixed(2));
//       } else {
//         let fourGrade = (CGPA / Grade) * 100;
//         setResult(fourGrade.toFixed(2));
//       }
//     }

//     if (result >= 0) {
//       setShowPanel(true);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
//       <div className="mx-auto w-full max-w-5xl">
//         {/* Header */}

//         <div className="mb-8">
//           <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
//             CGPA to Percentage Converter
//           </h1>
//           <p className="mt-2 text-sm text-slate-500">
//             Enter your CGPA and select the grading scale.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
//           <div className="lg:col-span-3">
//             <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
//               <div className="border-b border-slate-200 px-6 py-4">
//                 <h2 className="text-base font-medium text-slate-800">
//                   Conversion Details
//                 </h2>
//               </div>
//               <div className="px-6 py-6">
//                 <div className="space-y-5">
//                   <div>
//                     <label className="mb-2 block text-sm font-medium text-slate-700">
//                       CGPA
//                     </label>
//                     <div className="relative">
//                       <Input
//                         type="text"
//                         value={cgpa}
//                         onChange={(e) => setCgpa(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <Select
//                     value={selectGrade}
//                     onValueChange={(value) => setSelectGrade(value)}
//                   >
//                     <SelectTrigger
//                       className="w-[180px] rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
//                       style={{ height: "48px" }}
//                     >
//                       <SelectValue placeholder="Select grading scale" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>Grading Scale</SelectLabel>
//                         <SelectItem value="4.0">4.0 Scale</SelectItem>
//                         <SelectItem value="5.0">5.0 Scale</SelectItem>
//                         <SelectItem value="10.0">10.0 Scale</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="mt-6 flex items-center gap-5">
//                   <SubmitButton onClick={handleCal}>Convert</SubmitButton>
//                   <p className="text-red-700">{error}</p>
//                   <p className="text-red-700">{emptyError}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Results always visible now, no state */}
//           {showPanel && (
//             <div className="lg:col-span-2">
//               <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="border-b border-slate-200 px-6 py-4">
//                   <h2 className="text-base font-medium text-slate-800">
//                     Result
//                   </h2>
//                 </div>

//                 <div className="px-6 py-6">
//                   <div className="mb-5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm">
//                     <p className="text-xs uppercase tracking-wide text-slate-300">
//                       Percentage
//                     </p>
//                     <p className="mt-1 text-2xl font-semibold">{result}%</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-10 text-center text-xs text-slate-400">
//           © CGPA Converter
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
