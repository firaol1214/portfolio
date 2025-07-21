"use client";

import Image from "next/image";
import Link from "next/link";
// Corrected paths for static assets from the public directory
import HomeImg from "/assets/Home1.png";
import PortfolioImg from "/assets/portfol2.png"; // Assuming portfol2.png is the correct image for Personal Portfolio
import DerartuImg from "/assets/derartu1.png";
import GameImg from "/assets/game.jpg";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitMessage(
        "Thank you for your message! I'll get back to you soon."
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const services = [
    {
      title: "Web Design",
      description: "Beautiful, responsive websites tailored to your brand",
      icon: "🖥️",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "UI/UX Design",
      description: "Intuitive user interfaces with exceptional experiences",
      icon: "🎨",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Online Game Development",
      description: "Interactive browser-based games and applications",
      icon: "🎮",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform mobile applications for iOS and Android",
      icon: "📱",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const projects = [
    {
      title: "Personal Portfolio",
      desc: "Modern responsive website with React hooks",
      tags: ["React", "Tailwind"],
      image: PortfolioImg,
    },
    {
      title: "Derartu Hotel Website",
      desc: "Modern responsive website with React hooks",
      tags: ["React", "Tailwind"],
      image: DerartuImg,
    },
    {
      title: "Online Game",
      desc: "Interactive browser game with Canvas API",
      tags: ["JavaScript", "HTML5"],
      image: GameImg,
    },
  ];
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 font-sans overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Header - Changed background to bright gradient */}
        <header className="w-full fixed top-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-4 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
                Fira web.
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {["home", "about", "services", "contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      onMouseEnter={() => setIsHoveringLink(true)}
                      onMouseLeave={() => setIsHoveringLink(false)}
                      className={`${
                        activeSection === item
                          ? "text-white font-bold"
                          : "text-white/90"
                      } hover:text-green-300 transition-colors duration-300 text-lg font-medium relative group`}
                      aria-label={`Go to ${item} section`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                      <span
                        className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full ${
                          activeSection === item ? "w-full" : ""
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-white/80 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-16 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 z-40 md:hidden shadow-md"
            >
              <ul className="flex flex-col space-y-4 p-6">
                {["home", "about", "services", "contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className={`${
                        activeSection === item
                          ? "text-green-300 font-bold"
                          : "text-white/90"
                      } hover:text-green-300 transition-colors duration-300 text-lg font-medium w-full text-left py-2`}
                      aria-label={`Go to ${item} section`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12"
          aria-labelledby="home-heading"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="mb-12 flex justify-center"
            >
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-500/30 hover:border-blue-400 transition-all duration-500 shadow-lg shadow-blue-500/20 group">
                <Image
                  src={HomeImg}
                  alt="Firaol Mengistu"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white font-medium">That's me!</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 mb-6"
              id="home-heading"
            >
              Hi! I'm Firaol Mengistu
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              <span className="inline-block animate-bounce mr-2">👨‍💻</span>
              Web Developer & UI/UX Designer
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <button
                onClick={() => scrollToSection("contact")}
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                aria-label="Contact me"
              >
                Contact Me
              </button>
              <button
                onClick={() => scrollToSection("services")}
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
                className="px-8 py-3 border border-blue-400 text-blue-400 rounded-full font-medium hover:bg-blue-400/10 transition-all duration-300"
                aria-label="View my services"
              >
                My Services
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
          aria-labelledby="about-heading"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              id="about-heading"
            >
              About Me
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-500 shadow-lg backdrop-blur-sm">
                <p className="text-gray-300 leading-relaxed text-lg">
                  I'm a passionate developer with{" "}
                  <span className="text-blue-400 font-medium">1+ years</span> of
                  experience building Front-end web applications. I specialize
                  in creating responsive, user-friendly interfaces with{" "}
                  <span className="text-cyan-400">React</span> and{" "}
                  <span className="text-sky-400">Next.js</span>.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg mt-4">
                  Throughout my career, I have had the privilege of
                  collaborating with prestigious organizations, contributing to
                  their success and growth.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Education",
                    content: "Computer Science Degree",
                    icon: "🎓",
                  },
                  {
                    title: "Experience",
                    content: "1+ Years in Web Development",
                    icon: "💼",
                  },
                  {
                    title: "Projects",
                    content: "5+ Completed Projects",
                    icon: "🚀",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    custom={index + 1}
                    className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="text-xl font-medium text-blue-400">
                          {item.title}
                        </h3>
                        <p className="text-gray-300">{item.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
          aria-labelledby="services-heading"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-6xl mx-auto w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              id="services-heading"
            >
              My Services
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className={`bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-8 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-500 hover:border-transparent group overflow-hidden relative`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-6" aria-labelledby="skills-heading">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              id="skills-heading"
            >
              My Toolkit
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
            >
              {[
                { name: "HTML", level: 90 },
                { name: "CSS", level: 85 },
                { name: "JavaScript", level: 80 },
                { name: "React", level: 75 },
                { name: "Next.js", level: 70 },
                { name: "Tailwind CSS", level: 85 },
                { name: "Git", level: 70 },
                { name: "TypeScript", level: 65 },
                { name: "Node.js", level: 60 },
                { name: "Figma", level: 75 },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-4 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 flex flex-col items-center"
                >
                  <span className="font-medium text-gray-100">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-6" aria-labelledby="projects-heading">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              id="projects-heading"
            >
              My Latest Work
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-2xl border border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  <div className="h-48 bg-gray-700 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent z-10" />
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* THIS IS THE FIX: Re-inserting the Image component */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-gray-700/50 rounded-full text-xs border border-gray-600 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
          aria-labelledby="contact-heading"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-4xl mx-auto w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              id="contact-heading"
            >
              Get In Touch
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Contact Info */}
              <div className="space-y-8">
                <motion.div
                  custom={0}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-6 text-blue-400">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <a
                      href="mailto:firaolmengistu796@gmail.com"
                      className="flex items-center gap-4 group"
                      onMouseEnter={() => setIsHoveringLink(true)}
                      onMouseLeave={() => setIsHoveringLink(false)}
                      aria-label="Send email to firaolmengistu796@gmail.com"
                    >
                      <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-500 transition-all duration-300 shadow-sm flex-shrink-0">
                        ✉️
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-gray-100 group-hover:text-blue-400 transition-colors">
                          firaolmengistu796@gmail.com
                        </p>
                      </div>
                    </a>

                    <a
                      href="https://github.com/firaol1214"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                      onMouseEnter={() => setIsHoveringLink(true)}
                      onMouseLeave={() => setIsHoveringLink(false)}
                      aria-label="Visit GitHub profile"
                    >
                      <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-500 transition-all duration-300 shadow-sm flex-shrink-0">
                        💻
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">GitHub</p>
                        <p className="text-100 group-hover:text-blue-400 transition-colors">
                          github.com/firaol1214
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-700 rounded-lg shadow-sm flex-shrink-0">
                        📍
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-gray-100">Bale Robe, Bole</p>
                      </div>
                    </div>

                    <a
                      href="tel:+251957034895"
                      className="flex items-center gap-4 group"
                      onMouseEnter={() => setIsHoveringLink(true)}
                      onMouseLeave={() => setIsHoveringLink(false)}
                      aria-label="Call +251957034895"
                    >
                      <div className="p-3 bg-gray-700 rounded-lg shadow-sm flex-shrink-0 group-hover:bg-blue-500 transition-all duration-300">
                        📞
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>{" "}
                        <p className="text-gray-100 group-hover:text-blue-400 transition-colors">
                          +251957034895
                        </p>
                      </div>
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-6 text-blue-400">
                    Availability
                  </h3>
                  <p className="text-gray-300 mb-4">
                    I'm currently available for freelance work. If you have a
                    project that needs creative expertise, feel free to reach
                    out.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-gray-300">Available for work</span>
                  </div>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div
                custom={2}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-8 rounded-2xl border border-gray-700 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-6 text-blue-400">
                  Send Me a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Firaol Mengistu"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Fira@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Hello Firaol, I'd like to talk about..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setIsHoveringLink(true)}
                    onMouseLeave={() => setIsHoveringLink(false)}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30"
                    aria-label="Submit contact form"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  {submitMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-sm mt-4 text-center ${
                        submitMessage.includes("Thank you")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {submitMessage}
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
                Fira web.
              </span>
            </div>
            <div className="flex justify-center space-x-6 mb-6"></div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Firaol Mengistu. All rights reserved.
            </p>
          </motion.div>
        </footer>
      </div>
    </main>
  );
}
