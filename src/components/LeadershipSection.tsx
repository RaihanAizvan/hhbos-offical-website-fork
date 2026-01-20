import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import founderImage from "@/assets/team-founder.jpg";
import rcmImage from "@/assets/team-rcm.jpg";
import databaseImage from "@/assets/team-database.jpg";

const leaders = [
  {
    name: "Leadership Team",
    role: "Operations & Delivery",
    image: founderImage,
    bio: "Experienced professionals guiding service delivery across RCM, Finance & Accounts, and Database Administration.",
    details:
      "Hands-on expertise in process management, compliance, and client success ensuring reliable outcomes.",
  },
  {
    name: "RCM Leadership",
    role: "Revenue Cycle Management",
    image: rcmImage,
    bio: "Focused on accuracy, follow-ups, and clean claim workflows.",
    details:
      "Overseeing eligibility, coding support, denial management, and AR optimization.",
  },
  {
    name: "Technology Leadership",
    role: "Database Administration",
    image: databaseImage,
    bio: "Secure, scalable, and well-governed data environments.",
    details:
      "Database setup, monitoring, tuning, backup, recovery, and access control.",
  },
];

gsap.registerPlugin(ScrollTrigger);

const LeadershipSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        cardsRef.current!.querySelectorAll(".leader-card")
      );

      if (!cards.length) return;

      // Base stacking offsets for already-revealed cards.
      const stackOffset = 10; // px

      // Initial state: first card visible, others start below (enter from bottom).
      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 60,
          zIndex: i === 0 ? 10 : 10 - i,
          pointerEvents: i === 0 ? "auto" : "none",
          willChange: "transform, opacity",
        });
      });

      const setActive = (active: number) => {
        cards.forEach((c, i) => {
          c.style.pointerEvents = i === active ? "auto" : "none";
          // Keep newest card on top.
          c.style.zIndex = String(100 + i);
        });
      };
      setActive(0);

      // Pinned scroll timeline: each step brings in the next card and
      // pushes previous cards slightly back (stacked) without scaling.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 520}`,
          scrub: 0.6,
          pin: true,
          snap:
            cards.length > 1
              ? {
                  snapTo: 1 / (cards.length - 1),
                  duration: { min: 0.15, max: 0.35 },
                  delay: 0.02,
                  ease: "power2.out",
                }
              : false,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              cards.length - 1,
              Math.max(0, Math.round(self.progress * (cards.length - 1)))
            );
            setActive(idx);
          },
        },
      });

      // Each card gets time to "sit" before the next arrives.
      const hold = 0.65;
      const transition = 0.85;

      for (let i = 1; i < cards.length; i++) {
        const prev = cards[i - 1];
        const next = cards[i];
        const t = i;

        // Hold state.
        tl.to({}, { duration: hold }, t - hold);

        // Push all previously revealed cards slightly back in the stack.
        tl.to(
          cards.slice(0, i),
          {
            y: `-=${stackOffset}`,
            duration: transition,
            ease: "power3.out",
          },
          t
        );

        // Bring in the next card from the bottom.
        tl.fromTo(
          next,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: transition,
            ease: "power3.out",
          },
          t
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-black overflow-hidden">
      {/* Background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h2 className="text-[15vw] font-bold text-white/10 whitespace-nowrap">
          Our Leadership
        </h2>
      </div>

      {/* Cards are stacked in a single centered position; timeline controls entry */}
      <div ref={cardsRef} className="absolute inset-0 z-10 flex items-center justify-center px-4 lg:px-12">
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="leader-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[92%] lg:w-[760px] xl:w-[900px] h-[300px] sm:h-[340px] lg:h-[380px]"
            >
              <div className="group relative h-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
                <div className="flex h-full">
                  {/* Image */}
                  <div className="w-2/5 relative overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/60 to-black" />
                  </div>

                  {/* Content */}
                  <div className="w-3/5 p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-semibold text-white mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {leader.role}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {leader.bio}
                    </p>
                    <div className="mt-4 h-1 w-16 bg-primary" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8">
                  <p className="text-white/80 text-sm max-w-xl">
                    {leader.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
