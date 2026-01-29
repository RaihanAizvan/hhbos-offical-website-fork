import { useLayoutEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { getHeroVideoSrc } from "@/lib/theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { IJob } from "@/types/careers";
import { JobCard } from "@/components/feature/JobCard";
import { GalleryImage } from "@/components/feature/GalleryImage";
import { WhyWorkWithUs } from "@/components/WhyWorkWithUs";
import { CareersCTA } from "@/components/CareersCTA";

gsap.registerPlugin(ScrollTrigger);

const jobs: IJob[] = [
  {
    title: "Full Stack Developer (MERN)",
    department: "IT / Engineering",
    location: "Remote / Kochi",
    type: "Full-time",
  },
  {
    title: "DevOps & Cloud Engineer",
    department: "IT Infrastructure",
    location: "Remote / Bangalore",
    type: "Full-time",
  },
  {
    title: "Back Office Operations Executive",
    department: "Back Office Operations",
    location: "Kochi, Kerala",
    type: "Full-time",
  },
  {
    title: "Accounts & Payroll Specialist",
    department: "Finance / Back Office",
    location: "Kochi, Kerala",
    type: "Full-time",
  },
  {
    title: "Data Entry & Process Associate",
    department: "Back Office Processing",
    location: "On-site / Kochi",
    type: "Full-time",
  },
  {
    title: "HR & Recruitment Coordinator",
    department: "Human Resources",
    location: "Remote / Kochi",
    type: "Full-time",
  },
];

const culturePillars = [
  {
    title: "Ownership",
    description: "Own outcomes end-to-end and move fast with clarity.",
  },
  {
    title: "Precision",
    description: "We value detail, compliance, and high-quality delivery.",
  },
  {
    title: "Growth",
    description: "Continuous learning, mentorship, and clear career paths.",
  },
  {
    title: "Teamwork",
    description: "Collaborate across teams with integrity and respect.",
  },
];

const careerHighlights = [
  { label: "Team Members", value: "200+" },
  { label: "Countries Served", value: "15+" },
  { label: "Avg. Tenure", value: "4.2 yrs" },
  { label: "Internal Promotions", value: "60%" },
];

const Careers = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const heroVideo = getHeroVideoSrc(resolvedTheme);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline();
      heroTl
        .from(".career-hero-label", { opacity: 0, y: 20, duration: 0.8 })
        .from(
          ".career-hero-title",
          { opacity: 0, y: 30, duration: 1, stagger: 0.2 },
          "-=0.4"
        )
        .from(
          ".career-hero-sub",
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.6"
        )
        .from(
          ".career-hero-btn",
          { scale: 0.9, opacity: 0, duration: 0.5 },
          "-=0.4"
        );

      gsap.from(".culture-card", {
        scrollTrigger: {
          trigger: ".culture-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".gallery-img").forEach((img) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
        });
      });

      gsap.utils.toArray<HTMLElement>(".benefit-item").forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".job-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`min-h-screen ${isLight ? "bg-background" : "bg-black"}`}>
      {/* Hero */}
      <section
        ref={heroRef}
        className={`relative min-h-[70svh] flex items-center justify-center overflow-hidden pt-20 ${
          isLight ? "bg-background" : "bg-black"
        }`}
      >
        <div className="absolute inset-0">
          <video
            key={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${
              isLight ? "opacity-35" : "opacity-30"
            }`}
          >
            <source src={heroVideo} type={isLight ? "video/mp4" : "video/webm"} />
          </video>
          <div className={`absolute inset-0 ${isLight ? "bg-white/35" : "bg-black/70"}`} />
          <div
            className={`absolute bottom-0 left-0 right-0 h-40 pointer-events-none ${
              isLight
                ? "bg-gradient-to-t from-white via-white/80 to-transparent"
                : "bg-gradient-to-t from-black via-black/70 to-transparent"
            }`}
          />
        </div>

        {!isLight && (
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,107,31,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,31,0.18) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        )}

        <div className="relative text-center max-w-5xl px-6">
          <div className="career-hero-label flex items-center justify-center gap-4 mb-6">
            <div className={`h-px w-16 ${isLight ? "bg-orange-400" : "bg-primary"}`} />
            <span
              className={`text-sm uppercase tracking-[0.3em] ${
                isLight ? "text-orange-500" : "text-primary"
              }`}
            >
              Careers at HH
            </span>
            <div className={`h-px w-16 ${isLight ? "bg-orange-400" : "bg-primary"}`} />
          </div>

          <h1
            className={`career-hero-title text-6xl md:text-8xl font-bold tracking-tight mb-8 ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Build a career in
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              back-office excellence
            </span>
          </h1>

          <p
            className={`career-hero-sub text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${
              isLight ? "text-slate-600" : "text-gray-400"
            }`}
          >
            Join a team that values precision, growth, and meaningful impact.
            We work with global clients to deliver world-class operations.
          </p>

          <div className="career-hero-btn flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className={`px-8 py-3 font-bold rounded-full transition-colors flex items-center gap-2 group ${
                isLight ? "bg-orange-500 text-white" : "bg-primary text-white"
              }`}
            >
              View Open Positions
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className={`px-8 py-3 border rounded-full transition-colors ${
                isLight
                  ? "border-slate-200 text-slate-700 hover:border-orange-300"
                  : "border-white/20 text-white hover:border-primary/60"
              }`}
            >
              Our Culture
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {careerHighlights.map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border px-5 py-4 ${
                  isLight
                    ? "border-slate-200 bg-white"
                    : "border-white/10 bg-black/50"
                }`}
              >
                <div className={`text-2xl font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
                  {item.value}
                </div>
                <div
                  className={`text-xs uppercase tracking-widest mt-1 ${
                    isLight ? "text-slate-500" : "text-white/60"
                  }`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Pillars */}
      <section className={`py-24 ${isLight ? "bg-slate-50" : "bg-zinc-950"}`}>
        <div className="container-custom px-6">
          <div className="text-center mb-14">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isLight ? "text-slate-900" : "text-white"}`}>
              Our Culture Pillars
            </h2>
            <p className={`${isLight ? "text-slate-600" : "text-white/60"} max-w-2xl mx-auto`}>
              The values that shape how we work and grow together.
            </p>
          </div>

          <div className="culture-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturePillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`culture-card rounded-2xl border p-6 transition-colors ${
                  isLight
                    ? "border-slate-200 bg-white hover:border-orange-200"
                    : "border-white/10 bg-black/50 hover:border-primary/50"
                }`}
              >
                <h3 className={`text-xl font-semibold mb-3 ${isLight ? "text-slate-900" : "text-white"}`}>
                  {pillar.title}
                </h3>
                <p className={`${isLight ? "text-slate-600" : "text-white/60"} text-sm leading-relaxed`}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at HH */}
      <section className={`py-24 ${isLight ? "bg-background" : "bg-black"}`}>
        <div className="container-custom px-6">
          <div className="mb-16">
            <h2 className={`text-4xl font-bold mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>
              Life at <span className="text-orange-500">HH</span> Back Office
            </h2>
            <p className={isLight ? "text-slate-600" : "text-gray-400"}>
              Where collaboration meets innovation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[620px]">
            <GalleryImage
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              span="col-span-2 row-span-2"
            />
            <GalleryImage src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" />
            <GalleryImage src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80" />
            <GalleryImage
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
              span="col-span-2"
            />
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <WhyWorkWithUs />

      {/* Open roles */}
      <section className={`py-28 max-w-6xl mx-auto px-6 ${isLight ? "text-slate-900" : "text-white"}`}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className={`text-4xl font-bold mb-4 ${isLight ? "text-slate-900" : "text-white"}`}>
              Open Roles
            </h2>
            <p className={isLight ? "text-slate-600" : "text-gray-400"}>
              Find your place in our global mission.
            </p>
          </div>
          <div className="flex gap-4">
            <span
              className={`px-4 py-2 rounded-full border text-sm ${
                isLight
                  ? "border-slate-200 bg-white text-slate-700"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              All Roles
            </span>
            <span
              className={`px-4 py-2 rounded-full border text-sm ${
                isLight
                  ? "border-slate-200 bg-white text-slate-400"
                  : "border-white/10 bg-white/5 text-gray-500"
              }`}
            >
              Engineering
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </section>

      <CareersCTA />
    </div>
  );
};

export default Careers;
