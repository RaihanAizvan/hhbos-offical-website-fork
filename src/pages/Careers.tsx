import { useLayoutEffect, useRef } from "react";
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

const Careers = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animations
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-label", { opacity: 0, y: 20, duration: 0.8 })
        .from(
          ".hero-title",
          { opacity: 0, y: 30, duration: 1, stagger: 0.2 },
          "-=0.4",
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-btn", { scale: 0.9, opacity: 0, duration: 0.5 }, "-=0.4");

      // 2. Value Card Stagger
      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: ".value-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
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
          duration: 1.5,
          ease: "power4.inOut",
        });
      });

      // WhyWorkWithUs
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

      // Career CTA
      gsap.from(".cta-content", {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "cta-wrapper",
          start: "top 85%",
        },
      });

      // 4. Job Cards Alternating Slide
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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60svh] flex items-center justify-center overflow-hidden bg-black pt-20"
      >
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/video/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
          {/* Bottom fade gradient mask */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        </div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,107,31,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,31,0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative text-center max-w-4xl">
          <div className="about-hero-text flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-primary" />
            <span className="text-primary text-sm uppercase tracking-[0.3em]">
              Join Our Team
            </span>
            <div className="h-px w-16 bg-primary" />
          </div>
          <h1 className="hero-title text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Build Your Career <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-white bg-clip-text text-transparent">
              With Excellence
            </span>
          </h1>
          <p className="hero-sub text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We are looking for visionary thinkers and disciplined executors to
            redefine the global back-office landscape.
          </p>
          <div className="hero-btn">
            <button className="px-8 py-2 bg-white text-black font-bold rounded-full transition-colors flex items-center gap-2 mx-auto group">
              View Open Positions{" "}
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
      {/* 3. LIFE AT COMPANY GALLERY */}
      <section className="py-20">
        <div className="max-w-7xl px-6 mb-16">
          <h2 className="text-4xl font-bold mb-2">
            Life at
            <span className="font-bold text-orange-500"> HH </span>
            Back Office Service
          </h2>
          <p className="text-gray-400">Where collaboration meets innovation.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 h-[600px]">
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
      </section>

      {/* Why work with us */}
      <WhyWorkWithUs />

      {/* 4. OPEN POSITIONS */}
      <section className="py-32 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-4">Open Roles</h2>
            <p className="text-gray-400">
              Find your place in our global mission.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm">
              All Roles
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-500">
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

      {/* Career CTA  */}
      <CareersCTA />
    </div>
  );
};

export default Careers;
