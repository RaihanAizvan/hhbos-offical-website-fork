import ScrollStack, { ScrollStackItem } from "./ScrollStack";
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

const LeadershipSection = () => {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h2 className="text-[15vw] font-bold text-white/10 whitespace-nowrap">
          Our Leadership
        </h2>
      </div>

      <ScrollStack className="relative z-10">
        {leaders.map((leader, index) => (
          <ScrollStackItem
            key={index}
            itemClassName="mx-auto my-0 w-full sm:w-[92%] lg:w-[760px] xl:w-[900px] h-[300px] sm:h-[340px] lg:h-[380px] p-0"
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
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default LeadershipSection;
