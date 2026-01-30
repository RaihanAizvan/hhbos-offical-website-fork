
import { useTheme } from "next-themes";

export const CareersCTA: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <section
      className={`cta-wrapper py-20 px-6 border-t ${
        isLight ? "bg-background border-slate-200" : "bg-black border-zinc-900"
      }`}
    >
      <div
        className={`cta-content max-w-5xl mx-auto text-center border p-12 md:p-20 rounded-[3rem] ${
          isLight
            ? "bg-white border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
            : "bg-zinc-900/50 border-zinc-800"
        }`}
      >
        <h2
          className={`text-3xl md:text-5xl font-bold ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          Don’t see a role that fits?
        </h2>
        <p
          className={`text-lg md:text-xl mb-10 leading-relaxed ${
            isLight ? "text-slate-600" : "text-zinc-400"
          }`}
        >
          We’re always looking for exceptional talent. Send your resume to{" "}
          <br className="hidden md:block" />
          <a
            href="mailto:hr@hhbos.com"
            className="text-orange-500 font-bold hover:underline decoration-2 underline-offset-8"
          >
            hr@hhbos.com
          </a>
        </p>
        <a
          href="mailto:hr@hhbos.com"
          className={`inline-block font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
            isLight ? "bg-orange-500 text-white" : "bg-white text-black"
          }`}
        >
          Send Resume
        </a>
      </div>
    </section>
  );
};
