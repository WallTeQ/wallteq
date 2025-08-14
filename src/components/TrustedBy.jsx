
import l1 from "../assets/images/l1.png";
import l2 from "../assets/images/l2.png";
import l3 from "../assets/images/l3.png";
import l4 from "../assets/images/l4.png";
import l5 from "../assets/images/l5.png";
import l6 from "../assets/images/l6.png";
import l7 from "../assets/images/l7.png";
import l8 from "../assets/images/l8.png";
import l9 from "../assets/images/l9.png";
import l10 from "../assets/images/l10.png";
import l11 from "../assets/images/l11.png";
import l13 from "../assets/images/l13.jpeg";
import { motion } from "framer-motion";

const TrustedBy = () => {

    const companies = [
      {
        name: "Save the childeren",
        logo: l1,
      },
      {
        name: "WHL",
        logo: l2,
      },
      {
        name: "Unicef",
        logo: l3,
      },
      {
        name: "Action Aid",
        logo: l5,
      },
      {
        name: "",
        logo: l4,
      },
      {
        name: "Ministry of Commerce",
        logo: l6,
      },
      {
        name: "Ghana Police Service",
        logo: l7,
      },
      {
        name: "Ghana Maritime Authority",
        logo: l8,
      },
      {
        name: "Liberia Avaition Authority",
        logo: l9,
      },
      {
        name: "backstreet",
        logo: l10,
      },
      {
        name: "debill services",
        logo: l11,
      },
      
      {
        name: "Liberia water and sewer",
        logo: l13
      }
    ];


  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Trusted by Leading Businesses and Organizations
          </h2>
        
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative flex overflow-x-hidden">
          {/* First set of logos */}
          <div className="flex animate-scroll-left">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center justify-center min-w-[200px] px-8"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex animate-scroll-left">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-duplicate-${index}`}
                className="flex items-center justify-center min-w-[200px] px-8"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
