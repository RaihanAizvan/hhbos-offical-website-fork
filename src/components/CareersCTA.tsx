
export const CareersCTA: React.FC = () => {
  return (
    <section className="cta-wrapper bg-black py-20 px-6 border-t border-zinc-900">
      <div className="cta-content max-w-5xl mx-auto text-center bg-zinc-900/50 border border-zinc-800 p-12 md:p-20 rounded-[3rem]">
        <h2 className="text-3xl md:text-5xl font-bold text-white ">
          Don’t see a role that fits?
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
          We’re always looking for exceptional talent. Send your resume to{" "}
          <br className="hidden md:block" />
          <a
            href="mailto:hr@company.com"
            className="text-orange-500 font-bold hover:underline decoration-2 underline-offset-8"
          >
            hr@company.com
          </a>
        </p>
        <a
          href="mailto:hr@company.com"
          className="inline-block bg-white text-black font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Send Resume
        </a>
      </div>
    </section>
  );
};
