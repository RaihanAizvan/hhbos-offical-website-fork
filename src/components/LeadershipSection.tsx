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
      name: "Muhammed Hashim",
      role: "Founder & CEO",
      image: founderImage,
      bio: "Visionary leader with 15+ years in outsourcing.",
      details: "Expert in strategic planning and business transformation. Led the company from startup to industry leader, managing 100+ team members and serving Fortune 500 clients.",
      experience: "15+ Years",
      projects: "250+ Projects",
      side: "left"
    },
    {
      name: "Sarah Williams",
      role: "VP Operations",
      image: rcmImage,
      bio: "Healthcare revenue cycle specialist.",
      details: "Led 50+ successful RCM implementations with 98% accuracy rate. Streamlined operations resulting in 40% efficiency improvement for healthcare providers.",
      experience: "12+ Years",
      projects: "180+ Clients",
      side: "right"
    },
    {
      name: "Dr. James Chen",
      role: "CTO",
      image: databaseImage,
      bio: "Database architect with Ph.D. in Computer Science.",
      details: "Pioneered scalable cloud infrastructure solutions. Architected systems handling 10M+ daily transactions with 99.99% uptime for enterprise clients.",
      experience: "18+ Years",
      projects: "500+ Databases",
      side: "left"
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      const cardHeight = 350; // Card height (reduced for horizontal cards)
      const cardSpacing = 100; // Space between cards
      const numberOfCards = leaders.length;
      
      // Total distance all cards occupy
      const totalCardsHeight = (cardHeight * numberOfCards) + (cardSpacing * (numberOfCards - 1));
      
      // Distance for cards to travel: first card starts at center
      const startY = window.innerHeight / 2; // Start first card at center of viewport
      // Unpin when last card reaches center (not when it exits top)
      const endY = -(totalCardsHeight - cardHeight) + (window.innerHeight / 2);
      const travelDistance = startY - endY; // Total distance cards move
      
      // Pin duration matches travel distance (unpin when last card hits center)
      const scrollDistance = travelDistance;
      
      // Pin the container when it reaches center
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "center center",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        markers: false, // Enable for debugging
      });

      // Animate cards scrolling up - synchronized with pin duration
      gsap.fromTo(
        cardsContainerRef.current,
        { 
          y: startY
        },
        {
          y: endY,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: `+=${scrollDistance}`, // Same as pin end
            scrub: 0.5, // Smooth scroll effect (0.5 second lag)
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [leaders.length]);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black flex items-center justify-center">
      {/* Fixed Background Heading - Stays centered */}
      <div
        ref={headingRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10"
      >
        <h2 className="text-[15vw] lg:text-[12vw] font-bold text-white/10 whitespace-nowrap">
          Our Leadership
        </h2>
      </div>

      {/* Cards Container - Scrolls up */}
      <div 
        ref={cardsContainerRef}
        className="absolute w-full z-20 px-4 lg:px-12"
      >
        <div className="relative w-full max-w-7xl mx-auto">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className={`mb-24 ${
                leader.side === "left" 
                  ? "ml-0 lg:ml-[5%]" 
                  : "ml-auto mr-0 lg:mr-[5%]"
              } w-full sm:w-[90%] lg:w-[700px] xl:w-[800px]`}
            >
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20 border border-white/5">
                {/* Horizontal Card Background */}
                <div className="relative h-[280px] sm:h-[320px] lg:h-[350px] bg-black flex">
                  {/* Left: Image Section */}
                  <div className="w-2/5 relative overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" />
                  </div>

                  {/* Right: Info Section */}
                  <div className="w-3/5 p-6 lg:p-8 flex flex-col justify-center relative z-10">
                    {/* Name and Role */}
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-primary text-lg font-medium mb-1">
                        {leader.role}
                      </p>
                      <p className="text-white/70 text-sm">
                        {leader.bio}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 mb-4">
                      <div>
                        <div className="text-primary text-xl font-bold">
                          {leader.experience}
                        </div>
                        <div className="text-white/60 text-xs uppercase tracking-wide">
                          Experience
                        </div>
                      </div>
                      <div>
                        <div className="text-primary text-xl font-bold">
                          {leader.projects}
                        </div>
                        <div className="text-white/60 text-xs uppercase tracking-wide">
                          Completed
                        </div>
                      </div>
                    </div>

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
                      <div className="flex gap-8">
                        <div className="text-center">
                          <div className="text-primary text-2xl font-bold">{leader.experience}</div>
                          <div className="text-white/60 text-xs uppercase">Experience</div>
                        </div>
                        <div className="text-center">
                          <div className="text-primary text-2xl font-bold">{leader.projects}</div>
                          <div className="text-white/60 text-xs uppercase">Completed</div>
                        </div>
                      </div>
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
