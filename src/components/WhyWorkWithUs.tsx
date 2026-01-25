import { useLayoutEffect, useRef } from "react";

const benefits = [
  "Continuous learning & training",
  "Exposure to international clients",
  "Hybrid / Remote flexibility",
  "Structured work process",
  "Growth from operations to tech roles",
  "Friendly team culture",
];

export const WhyWorkWithUs: React.FC = () => {
  return (
    <section className="bg-black text-white py-24 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          Why Work With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="benefit-item flex items-center space-x-4 p-4 border-b border-zinc-800 pb-6"
            >
              <span className="h-2 w-2 rounded-full bg-orange-500 flex-shrink-0 shadow-[0_0_10px_rgba(249,115,22,1)]" />
              <p className="text-lg md:text-xl font-medium text-zinc-200">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
