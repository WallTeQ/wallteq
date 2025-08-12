import React from "react";
import {
  ArrowRight,
  Package,
  Award,
  Clock,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img3.jpg";
import { Link } from "react-router-dom";
import CountUp from 'react-countup'
import CompanyPurpose from "../components/CompanyPromise";
export default function WhyUs() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full mt-12 h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={img1}
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex flex-col items-center text-center max-w-3xl">
            {/* Eyebrow text */}
            <span className="text-white font-semibold text-lg mb-4">
              Why Choose Us
            </span>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              We specialize in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                empowering
              </span>{" "}
              businesses and societies
            </h1>

            {/* Subheading */}
            <p className="text-gray-300 text-xl mb-8">
              Through innovative technology solutions and services, we help
              organizations thrive in the digital age.
            </p>

            {/* CTA Button */}
            <Link
              to="/contact-us"
              className="flex-1 group relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a2e4c] to-blue-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-lg font-semibold overflow-hidden whitespace-nowrap"
              //   className="group inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:translate-x-1"
            >
              Try it yourself
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-3 gap-8 w-full">
              <div>
                <div className="text-3xl font-bold text-white">
                  <CountUp end={100} duration={3} suffix="+" />
                </div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  <CountUp end={95} duration={3} suffix="%" />
                </div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  <CountUp end={10} duration={3} />
                </div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why WallTeq Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <img src={img2} alt="Team of professionals" className="" />
              {/* <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-red-500/10 rounded-full -z-10" /> */}
              {/* <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full -z-10" /> */}
            </div>

            {/* Right side - Content */}
            <div>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-navy-900 mb-6">
                  Why WallTeq IT Services?
                </h2>
                <p className="text-gray-600 mb-8 text-justify text-start">
                  WallTeq has the expertise and resources required to design,
                  develop and manage the highly available and highly secure
                  technology platform that you need, giving you the time and
                  confidence to focus on running your business.
                </p>
                <p className="text-gray-600 mb-4 text-justify text-start">
                  Here are 5 reasons why you should choose us to build your
                  infrastructure, support your people and systems, as well as
                  advise you on projects that will reduce your risk, enhance
                  your productivity and give you a real competitive edge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            Comprehensive Solution
            <div className="bg-white p-6   transition-shadow text-start">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="whitespace-nowrap text-lg font-semibold text-gray-900 mb-4">
                Comprehensive Solution
              </h3>
              <p className="text-gray-600 text-justify lg:text-sm">
                From consultancy to implementation we provide end-to-end
                solutions that meet diverse needs of our clients
              </p>
            </div>

            Exceptional Service
            <div className="bg-white p-6 transition-shadow text-start">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="whitespace-nowrap text-lg font-semibold text-gray-900 mb-4">
                Exceptional Service
              </h3>
              <p className="text-gray-600 text-justify lg:text-sm">
                Our team of experts is dedicatedto delivering exceptional
                service and support.
              </p>
            </div>

            Timely Delivery
            <div className="bg-white p-6  transition-shadow text-start">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg whitespace-nowrap font-semibold text-gray-900 mb-4">
                Timely Delivery
              </h3>
              <p className="text-gray-600 text-justify lg:text-sm">
                With our streamlined processes and efficient project management,
                we provide timely delivery of projects.
              </p>
            </div>

            Innovation Driven
            <div className="bg-white p-6  transition-shadow text-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="whitespace-nowrap text-lg font-semibold text-gray-900 mb-4">
                Innovation Driven
              </h3>
              <p className="text-justify text-gray-600 lg:text-sm">
                We stay at the forefront of technology, implementing
                cutting-edge solutions that give our clients a competitive
                advantage.
              </p>
            </div>

            Long Term Approach
            <div className="bg-white p-6  transition-shadow text-start">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="whitespace-nowrap text-lg font-semibold text-gray-900 mb-4">
                Long Term Approach
              </h3>
              <p className="text-gray-600 text-justify lg:text-sm">
                We are committed to building long-term partnership with our
                clients.
              </p>
            </div>
          </div> */}
          <CompanyPurpose />
        </div>
      </section>
    </>
  );
}
