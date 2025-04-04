import React from 'react';
import { useRef, useEffect, useState } from 'react';
import ProjectCard from '../utils/Card';
import { useInView, motion, useScroll, useTransform } from "motion/react"
import { cubicBezier, circOut } from "motion"

const projects = [
  {
    projectName: "MERN Stack Blog Project",
    organization: "Meta",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    live : "https://github.com/gihanchamila/omni-frontend",
    github : "https://github.com/gihanchamila/omni-frontend"
  },
  {
    projectName: "React E-commerce App",
    organization: "Google",
    description: "An advanced e-commerce platform built with React and Firebase, featuring authentication and payment integration.",
    live : "https://github.com/gihanchamila/omni-frontend",
    github : "https://github.com/gihanchamila/omni-frontend"
  },
  {
    projectName: "AI Chatbot",
    organization: "OpenAI",
    description: "A chatbot leveraging OpenAI's GPT model to provide conversational responses and user-friendly interaction.",
    live : "https://github.com/gihanchamila/omni-frontend",
    github : "https://github.com/gihanchamila/omni-frontend"
  }
]


const FeaturedProjects = () => {
  const ref = useRef(null)

  return (
    <section id='projects' className="pb-20 sm:col-start-1 sm:col-end-5 sm-col-span-4 scroll-mt-14" ref={ref}>
      <header  className="pb-8">
        <h2 className="text-4xl font-bold font-primary">
          Featured <span className="text-sky-500 dark:text-sky-300">Projects</span>
        </h2>
      </header>
      <motion.div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;

