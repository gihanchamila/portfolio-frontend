import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const educationData = [
  {
    institute: "Sri Lanka Institute of Information Technology ",
    year: "2025 - 2029",
    grade: "Pending",
    degree: "B.Sc.(Hons) in Information Technology",
    location: "Matara Center, Sri Lanka",
  },
  {
    institute: "Esoft Metro Campus",
    year: "2023 - 2024",
    grade: "Distinction",
    degree: "Diploma in Information Technology",
    location: "Matara Center, Sri Lanka",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 80 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 0.9 },
  },
};

const EducationCard = ({ edu, index }) => (
  <motion.div
    className={`
      relative border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 mb-8 max-w-2xl w-full
      transition-colors duration-300
      flex flex-col gap-3
      mx-0
      bg-transparent
      
    `}
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.5 }}
    variants={cardVariants}
    tabIndex={0}
    aria-label={`Education at ${edu.institute}`}
  >
    <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2">
      <h3
        className="text-lg sm:text-xl font-bold"
      >
        {edu.institute}
      </h3>
      <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {edu.year}
      </span>
    </div>
    <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2">
      <span
        className="text-sm font-semibold"
      >
        {edu.degree}
      </span>
      <span className="text-xs text-neutral-400 dark:text-neutral-500">
        {edu.location}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span
        className="inline-block px-2 py-1 rounded text-xs font-semibold"
        style={{
          background: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
          color: "var(--color-primary)",
        }}
      >
        {edu.grade}
      </span>
    </div>
    {edu.highlights && (
      <ul className="mt-2 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
        {edu.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    )}
    
  </motion.div>
);

const Education = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className={`
        relative
        transition-colors duration-300
        bg-transparent
        text-left
        scroll-mt-14
      `}
      id="education"
      aria-label="Education Section"
    >
      <div className="max-w-3xl lg:max-w-5xl mx-auto mb-12 lg:mb-16 lg:mx-0">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>
      </div>
      <div className="relative flex flex-col items-start">

        {/* Timeline vertical line */}
        <motion.div
          style={{
            height: timelineHeight,
            width: "2px",
            borderRadius: "1px",
            left: "8px",
            background: "linear-gradient(to bottom, var(--color-primary), transparent 90%)",
          }}
          className="hidden sm:block absolute sm:top-5 z-0"
        />
        <div className="flex flex-col gap-12 w-full lg:pl-12">
          {educationData.map((edu, idx) => (
            <EducationCard edu={edu} key={idx} index={idx} />
          ))}
        </div>
         <div className="hidden lg:block flex-shrink-0">
        </div>
      </div>
    </section>
  );
};

export default Education;