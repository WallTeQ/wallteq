/* eslint-disable react/no-unescaped-entities */
import { Flag, Users, Lightbulb, Stars } from "lucide-react";

export default function MissionVision() {
  const values = [
    {
      title: "Commitment",
      icon: Flag,
      description:
      "We are dedicated to understading our clients' unique challenges and working closely with then to achieve mutual success."
    },
    {
      title: "Innovation",
      icon: Lightbulb,
      description:
        "Embracing cutting-edge technologies and methodologies, we deliver innovative solutions that address the evolvingneeds of our clients and the market.",
    },
    {
      title: "Reputation",
      icon: Users,
      description:
      "We strive to maintain and enhance our reputation through consistent performance and transparent communication."
    },
    {
      title: "Excellence",
      icon: Stars,
      description:
      "We uphold the highest standars of quality and professinalism in every aspect of our services, ensuring exceptional outcomes for our clients."
    },
  ];

  return (
    <div className="container mx-auto px-2 py-16 bg-white justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-16 lg:gap-24 max-w-3xl mx-auto">
        {/* Mission Section */}
        <div className="mx-4 flex flex-col lg:flex-row gap-4">
          <h2 className="text-2xl text-start font-bold text-[#1a2e4c] lg:w-1/3">
            Our Mission
          </h2>
          <p className="text-[#647491] text-justify leading-relaxed lg:w-2/3 text-lg">
            To be the global leader in IT Services. Building on our
            technologies, competencies and customer interests, and creating
            value for our stakeholders and customers. We'll achieve this by
            focusing on the intersection of our client's emerging needs and the
            acceleration of business and technological change.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mx-4 flex flex-col lg:flex-row gap-4">
          <h2 className="text-2xl text-start font-bold text-[#1a2e4c] lg:w-1/3">
            Our Vision
          </h2>
          <div className="space-y-6 text-[#647491] text-justify leading-relaxed lg:w-2/3 text-lg">
            <p>
              We aspire to set the standard for excellence in technology
              consultation, implementation, and suppor, enablling our clients to
              achieve their goals with confidence and ease
            </p>
          </div>
        </div>
        <div className="mx-4 flex flex-col lg:flex-row gap-4">
          <h2 className="text-2xl text-start font-bold text-[#1a2e4c] lg:w-1/3">
            Our Values
          </h2>
          <div className="space-y-6 text-[#647491] text-justify leading-relaxed lg:w-2/3 text-lg">
            <p>
              Our values are the guiding principles upon which NanoSoft was
              founded and how we strive to conduct our business on a daily
              basis. Values establish our view of the world as we shape the
              future. They determine how we treat each other. Our values are to:
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-4xl mt-12 mx-auto border border-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-[#1a2e4c]/10">
                  <value.icon className="w-6 h-6 text-[#1a2e4c]" />
                </div>
                <div>
                  <h3 className="text-lg text-start font-semibold text-[#1a2e4c] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm  text-justify lg:text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

