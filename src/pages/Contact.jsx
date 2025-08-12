/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from "react";
// import emailjs from '@emailjs/browser';
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  Send,
  Building,
  Users,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, message: "" });
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);
  
  useEffect(() => {
    // Load EmailJS from CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      window.emailjs.init("ja8SafUm70LyC92pT");
      setEmailjsLoaded(true);
    };
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailjsLoaded) {
      setStatus({ success: false, message: "Email service is still loading. Please try again in a moment." });
      return;
    }
    
    setLoading(true);
    
    // Use window.emailjs instead of imported emailjs
    window.emailjs.sendForm(
      'service_f0jpa0h',
      'template_w93n6bl',
      form.current,
      'ja8SafUm70LyC92pT'
    )
    .then((result) => {
      setStatus({ success: true, message: "Message sent successfully! We'll get back to you soon." });
      form.current.reset();
    }, (error) => {
      setStatus({ success: false, message: "Failed to send message. Please try again." });
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  };
  
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Get in touch via email",
      action: "info@company.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon-Fri from 8am to 5pm",
      action: "+1 (555) 000-0000",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      description: "We're available",
      action: "24/7 Support Available",
    },
  ];
  

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your business with cutting-edge IT solutions?
            Let's start a conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Cards */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <motion.div
              whileHover={{
                scale: 1.5,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
              className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6"
            >
              <MapPin className="w-6 h-6 text-blue-500" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
            <div className="space-y-6 ">
              <div>
                <p className="text-gray-400 mb-3">Liberia Office:</p>
                <p className="text-blue-400">
                  Cheeseman Avenue, Liberia 10
                  <br />
                  Airfield Sinkor Monrovia 1000,
                  <br />
                  Liberia
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <motion.div
              whileHover={{
                scale: 1.5,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
              className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6"
            >
              <Clock className="w-6 h-6 text-blue-500" />
            </motion.div>
            <h3 className="text-xl font-semibold  mb-2">Working Hours</h3>
            <p className="text-gray-400 mb-3">we are available</p>
            <p className="text-blue-400 font-medium">24/7 support available</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <motion.div
              whileHover={{
                scale: 1.5,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
              className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6"
            >
              <Mail className="w-6 h-6 text-blue-500" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 mb-3">Email:</p>
                <div className="space-y-1">
                  <a
                    href="mailto:wallteqinc@gmail.com"
                    className="text-blue-400 hover:text-blue-700 block"
                  >
                    wallteqinc@gmail.com
                  </a>
                  <a
                    href="mailto:wallteq@wallteqonline.com"
                    className="text-blue-400 hover:text-blue-700 block"
                  >
                    wallteq@wallteqonline.com
                  </a>
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-3">Phone:</p>
                <div className="space-y-1">
                  <a
                    href="tel:+231555964462"
                    className="text-blue-400 hover:text-blue-700 block"
                  >
                    +231 555 964 462 (Liberia)
                  </a>
                  <a
                    href="tel:+231772771472"
                    className="text-blue-400 hover:text-blue-700 block"
                  >
                    +231 772 771 472 (Liberia)
                  </a>
                  <a
                    href="tel:+17634062591"
                    className="text-blue-400 hover:text-blue-700 block"
                  >
                    +17 634 062 591 (USA)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Form Side */}
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Send us a message
              </h3>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company Ltd."
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>

                {status.message && (
                  <div className={`p-3 rounded-lg ${status.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {status.message}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#1a2e4c] to-blue-800 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <Send className="w-5 h-5" />}
                </motion.button>
              </form>
            </div>

            {/* Map/Image Side */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e4c] to-blue-800 opacity-90"></div>
              <div className="relative h-full p-8 lg:p-12 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-8">Why Choose Us?</h3>
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4"
                  >
                    <Building className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">
                        Enterprise Solutions
                      </h4>
                      <p className="text-white/80">
                        Tailored IT solutions for businesses of all sizes
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4"
                  >
                    <Users className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Expert Team</h4>
                      <p className="text-white/80">
                        Dedicated professionals with years of experience
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4"
                  >
                    <DollarSign className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">
                        Competitive Pricing
                      </h4>
                      <p className="text-white/80">
                        Cost-effective solutions without compromising quality
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
