import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import founderImage from "@/assets/team-founder.jpg";
import rcmImage from "@/assets/team-rcm.jpg";
import databaseImage from "@/assets/team-database.jpg";

gsap.registerPlugin(ScrollTrigger);

const LeadershipSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const leaders = [
    {
      name: "Leadership Team",
      role: "Operations & Delivery",
      image: founderImage,
      bio: "Experienced professionals guiding service delivery across RCM, Finance & Accounts, and Database Administration.",
      details: 
        "Our leadership team brings hands-on expertise in process management, compliance, and client successensuring reliable outcomes and consistent communication.",
      side: "left",
    },
    {
      name: "RCM Leadership",
      role: "Revenue Cycle Management",
      image: rcmImage,
      bio: "Focused on accuracy, timely follow-ups, and clean claim workflows.",
      details:
        "We oversee end-to-end RCM operations from eligibility checks and coding support to denial management and AR reporting to help optimize billing performance.",
      side: "right",
    },
    {
      name: "Technology Leadership",
      role: "Database Administration",
      image: databaseImage,
      bio: "Ensuring secure, scalable, and well-governed data environments.",
      details:
        "We manage database setup, monitoring, performance tuning, backup & recovery, migrations, and access controls with an emphasis on continuity and security.",
      side: "left",
    },
  ];

  useEffect(() => {
    if (!containerRef.current || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        cardsContainerRef.current!.querySelectorAll(".leader-card")
      );

      if (!cards.length) return;

      // Stack all cards in the same place; control visibility via opacity/scale.
      gsap.set(cards, {
        opacity: 0,
        filter: "blur(10px)",
        transformOrigin: "50% 50%",
        willChange: "filter, opacity",
      });
      gsap.set(cards[0], { opacity: 1, filter: "blur(0px)" });

      // Helper to ensure only the active card is interactive and on top.
      const setActiveCard = (activeIndex: number) => {
        cards.forEach((card, idx) => {
          card.style.pointerEvents = idx === activeIndex ? "auto" : "none";
          // Keep active card above others even when others have opacity:0.
          card.style.zIndex = idx === activeIndex ? "2" : "1";
        });
      };

      // Timeline scrubbed by scroll; section stays pinned the whole time.
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 900}`,
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: false,
          onUpdate: (self) => {
            const idx = Math.min(
              cards.length - 1,
              Math.max(0, Math.round(self.progress * (cards.length - 1)))
            );
            setActiveCard(idx);
          },
        },
      });

      // Crossfade between cards (no physical movement).
      // Each card gets a short hold, then transitions to the next.
      const step = 1; // timeline units per card
      const hold = 0.8;
      const fade = 0.6;
      const blurIn = "blur(0px)";
      const blurOut = "blur(10px)";

      for (let i = 1; i < cards.length; i++) {
        const prev = cards[i - 1];
        const next = cards[i];
        const t = i * step;

        // hold prev
        tl.to(prev, { duration: hold }, t - hold);

        tl.to(
          prev,
          {
            opacity: 0,
            filter: blurOut,
            duration: fade,
            ease: "power3.out",
          },
          t
        ).fromTo(
          next,
          { opacity: 0, filter: blurOut },
          {
            opacity: 1,
            filter: blurIn,
            duration: fade,
            ease: "power3.out",
          },
          t
        );
      }

      // Ensure the first card is interactive initially.
      setActiveCard(0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [leaders.length]);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden no-scrollbar">
      {/* Fixed Background Heading - Stays centered */}
      <div
        ref={headingRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 overflow-x-hidden"
      >
        <h2 className="text-[15vw] lg:text-[12vw] font-bold text-white/10 whitespace-nowrap">
          Our Leadership
        </h2>
      </div>

      {/* Cards Container - Pinned section; cards are stacked and crossfaded */}
      <div
        ref={cardsContainerRef}
        className="absolute inset-0 w-full z-20 px-4 lg:px-12 flex items-center justify-center"
      >
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="leader-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[92%] lg:w-[760px] xl:w-[900px]"
            >
              <div className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.65)] hover:border-white/20 hover:shadow-[0_28px_90px_rgba(0,0,0,0.75)]">
                {/* Horizontal Card Background */}
                <div className="relative h-[300px] sm:h-[340px] lg:h-[380px] bg-black flex">
                  {/* Left: Image Section */}
                  <div className="w-2/5 relative overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/60 to-black" />
                    <div className="absolute inset-0 ring-1 ring-white/10" />
                  </div>

                  {/* Right: Info Section */}
                  <div className="w-3/5 p-7 lg:p-10 flex flex-col justify-center relative z-10">
                    {/* Name and Role */}
                    <div className="mb-4">
                      <h3 className="text-3xl lg:text-4xl font-semibold text-white mb-2 tracking-tight">
                        {leader.name}
                      </h3>
                      <p className="text-primary text-base lg:text-lg font-medium mb-1">
                        {leader.role}
                      </p>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>

                    {/* Accent */}
                    <div className="h-1 w-16 bg-primary mb-4" />

                    {/* Orange accent line */}
                    <div className="h-1 w-16 bg-primary" />
                  </div>

                  {/* Hover Overlay - Full Details */}
                  <div className="absolute inset-0 bg-black/95 p-6 lg:p-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-6 mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {leader.name}
                          </h3>
                          <p className="text-primary text-lg font-medium">
                            {leader.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed mb-4">
                        {leader.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipSection;
