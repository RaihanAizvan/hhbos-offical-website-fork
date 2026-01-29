import { useTheme } from "next-themes";

const benefits = [
  "Continuous learning & training",
  "Exposure to international clients",
  "Hybrid / Remote flexibility",
  "Structured work process",
  "Growth from operations to tech roles",
  "Friendly team culture",
];

export const WhyWorkWithUs: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <section
      className={`py-24 px-6 border-t ${
        isLight ? "bg-background text-slate-900 border-slate-200" : "bg-black text-white border-zinc-900"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-5xl font-bold mb-16 text-center ${isLight ? "text-slate-900" : "text-white"}`}>
          Why Work With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`benefit-item flex items-center space-x-4 p-4 border-b pb-6 ${
                isLight ? "border-slate-200" : "border-zinc-800"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full flex-shrink-0 ${
                  isLight
                    ? "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.5)]"
                    : "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]"
                }`}
              />
              <p className={`text-lg md:text-xl font-medium ${isLight ? "text-slate-600" : "text-zinc-200"}`}>
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
