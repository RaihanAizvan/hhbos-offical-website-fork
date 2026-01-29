import { API_ENDPOINT } from "@/constant/api-endpoint";
import FormModal from "./FormModal";
import { useState } from "react";
import { IJob } from "@/types/careers";
import { useTheme } from "next-themes";

export interface IJobCardProps {
  job: IJob;
}

export const JobCard = ({ job }: IJobCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <>
      <div
        className={`job-card group flex flex-col md:flex-row justify-between items-start md:items-center p-8 rounded-2xl border transition-colors ${
          isLight
            ? "border-slate-200 bg-white hover:border-orange-200"
            : "border-white/10 bg-white/5 hover:border-orange-500/50"
        }`}
      >
        <div>
          <div className="flex gap-3 mb-2">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-tighter">
              {job.department}
            </span>
            <span className={`text-xs ${isLight ? "text-slate-400" : "text-gray-600"}`}>•</span>
            <span className={`text-xs uppercase tracking-tighter ${isLight ? "text-slate-500" : "text-gray-500"}`}>
              {job.type}
            </span>
          </div>
          <h3 className={`text-2xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
            {job.title}
          </h3>
          <p className={`mt-1 ${isLight ? "text-slate-600" : "text-gray-500"}`}>
            {job.location}
          </p>
        </div>
        <button
          className={`mt-6 md:mt-0 px-6 py-3 rounded-full border transition-all ${
            isLight
              ? "border-slate-200 text-slate-700 hover:border-orange-300 hover:text-slate-900"
              : "border-white/20 text-white hover:bg-white hover:text-black"
          }`}
          onClick={() => setIsOpen(true)}
        >
          Apply Now
        </button>
      </div>
      {/* Job Application Form Modal */}
      {isOpen && (
        <FormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          endpoint={API_ENDPOINT}
          payload={job}
          type="JOB"
        />
      )}
    </>
  );
};
