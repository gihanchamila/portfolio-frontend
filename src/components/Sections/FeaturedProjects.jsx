import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../utils/Card';
import SectionLabel from '../utils/SectionLabel';
import { Sparkle } from 'lucide-react';

const projects = [
  {
    projectName: "MERN Stack Blog Project",
    organization: "Meta",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    live: "https://github.com/gihanchamila/omni-frontend",
    github: "https://github.com/gihanchamila/omni-frontend"
  },
  {
    projectName: "React E-commerce App",
    organization: "Google",
    description: "An advanced e-commerce platform built with React and Firebase, featuring authentication and payment integration.",
    live: "https://github.com/gihanchamila/omni-frontend",
    github: "https://github.com/gihanchamila/omni-frontend"
  },
  {
    projectName: "AI Chatbot",
    organization: "OpenAI",
    description: "A chatbot leveraging OpenAI's GPT model to provide conversational responses and user-friendly interaction.",
    live: "https://github.com/gihanchamila/omni-frontend",
    github: "https://github.com/gihanchamila/omni-frontend"
  }
];

const FeaturedProjects = () => {
  const ref = useRef(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="pb-20 sm:col-start-1 sm:col-end-5 sm-col-span-4 scroll-mt-14"
    >
      <header className="pb-8">
        <SectionLabel icon={<Sparkle size={14} />} label="Highlight" />
        <motion.h2
          className="sm:text-4xl xs:text-3xl font-bold font-primary"
        >
          Featured <span className="text-sky-500 dark:text-sky-300">Projects</span>
        </motion.h2>
      </header>

      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
