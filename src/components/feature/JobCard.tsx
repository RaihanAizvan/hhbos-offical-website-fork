import { API_ENDPOINT } from "@/constant/api-endpoint";
import FormModal from "./FormModal";
import { useState } from "react";
import { IJob } from "@/types/careers";

export interface IJobCardProps {
  job: IJob;
}

export const JobCard = ({ job }: IJobCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="job-card group flex flex-col md:flex-row justify-between items-start md:items-center p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-orange-500/50 transition-colors">
        <div>
          <div className="flex gap-3 mb-2">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-tighter">
              {job.department}
            </span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-500 uppercase tracking-tighter">
              {job.type}
            </span>
          </div>
          <h3 className="text-2xl font-bold">
            {job.title}
          </h3>
          <p className="text-gray-500 mt-1">{job.location}</p>
        </div>
        <button
          className="mt-6 md:mt-0 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
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
