// /* eslint-disable no-unused-vars */
// import React from "react";

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
import l12 from "../assets/images/l12.png";
import l13 from "../assets/images/l13.jpeg";

// function TrustedBy() {
  // const companies = [
  //   {
  //     name: "Save the childeren",
  //     logo: l1,
  //   },
  //   {
  //     name: "WHL",
  //     logo: l2,
  //   },
  //   {
  //     name: "Unicef",
  //     logo: l3,
  //   },
  //   {
  //     name: "Action Aid",
  //     logo: l5,
  //   },
  //   {
  //     name: "",
  //     logo: l4,
  //   },
  //   {
  //     name: "Ministry of Commerce",
  //     logo: l6,
  //   },
  //   {
  //     name: "Ghana Police Service",
  //     logo: l7,
  //   },
  //   {
  //     name: "Ghana Maritime Authority",
  //     logo: l8,
  //   },
  //   {
  //     name: "Liberia Avaition Authority",
  //     logo: l9,
  //   },
  //   {
  //     name: "backstreet",
  //     logo: l10,
  //   },
  //   {
  //     name: "debill services",
  //     logo: l11,
  //   },
  //   {
  //     name: "one point technology",
  //     logo: l12,
  //   },
  // ];

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, x: -100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//         >
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted By</h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             We&lsquo;re proud to have worked with these prestigious
//             organizations
//           </p>
//         </motion.div>

//         {/* Logos Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 items-center">
//           {companies.map((company, index) => (
//             <motion.div
//               key={company.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
//             >
//               <img
//                 src={company.logo}
//                 alt={`${company.name} logo`}
//                 className="h-12 w-auto object-contain filter  hover:grayscale-0 transition-all duration-300"
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TrustedBy;

import React from "react";
import { motion } from "framer-motion";

const TrustedBy = () => {
  // Using SVG logos as strings for demonstration
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Clientele
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Partnering with leading organizations to deliver exceptional results
          </p>
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
                  className="h-16 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
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
                  className="h-12 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
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
