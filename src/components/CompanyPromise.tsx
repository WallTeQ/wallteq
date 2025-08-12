import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Target,
  Clock,
  Users,
  Brain,
  Rocket,
  LineChart,
  GraduationCap,
  Network,
  Expand,
} from "lucide-react";

const CompanyPurpose = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const promises = [
    {
      title: "Comprehensive Solutions",
      description:
        "From consultancy to implementation and support, we promise to provide end-to-end solutions that meet the diverse needs of our clients.",
      icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Exceptional Service",
      description:
        "Our team of experts is dedicated to delivering exceptional service and support, going above and beyond to exceed client expectations.",
      icon: <Target className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Innovation-driven Approach",
      description:
        "We promise to continuously innovate and stay at the forefront of technological advancements, ensuring that our clients benefit from the latest solutions.",
      icon: <Brain className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Timely Delivery",
      description:
        "With our streamlined processes and efficient project management, we promise timely delivery of projects, minimizing downtime and maximizing productivity for our clients.",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Long-Term Partnerships",
      description:
        "We are committed to building long-term partnerships with our clients, offering ongoing support and guidance to help them navigate the complexities of technology",
      icon: <Users className="w-6 h-6 text-blue-500" />,
    },
  ];

  const strategies = [
    {
      title: "Customer-Centric Approach",
      description:
        "Our strategy revolves around understanding the unique needs and objectives of each client and tailoring our solutions accordingly.",
      icon: <Target className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Continuous Innovation",
      description:
        "We prioritize investment in research and development to drive innovation and stay ahead of market trends, enabling us to deliver cutting-edge solutions.",
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Talent Development",
      description:
        "We invest in the continuous development of our team, providing them with training and resources to enhance their skills and expertise.",
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Strategic Partnerships",
      description:
        "Collaborating with industry-leading partners allows us to access specialized expertise and resources, enhancing the value we deliver to our clients.",
      icon: <Network className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Scalable Solutions",
      description:
        "Our strategy includes designing scalable solutions that can adapt to the evolving needs and growth trajectories of our clients, ensuring long-term relevance and value.",
      icon: <Expand className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <section className="py-12 md:py-18">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Promises Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Promises
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promises.map((promise, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{promise.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {promise.title}
                    </h3>
                    <p className="text-gray-600">{promise.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategy Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Strategy
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{strategy.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {strategy.title}
                    </h3>
                    <p className="text-gray-600">{strategy.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyPurpose;