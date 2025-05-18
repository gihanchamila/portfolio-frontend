import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../utils/Card';
import SectionLabel from '../utils/SectionLabel';
import { Sparkle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import axios from "../../axios/axios.js"

const FeaturedProjects =() => {
  const ref = useRef(null);
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [projectFiles, setProjectFiles] = useState({})

  // fetch project details
  const fetchProjects = useCallback(async () => {
    if (projects.length > 0) return;
    try {
      const response = await axios.get("/project/get-projects");
      const data = response.data.data.projects;
      setProjects(data);
      toast(`${response.data.message}`)
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast(`${data.message}`, "error");
    }
  }, [projects.length, toast]); 


  // Handling side effects
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);


const fetchProjectFileUrls = useCallback(async () => {
  try {
    const fileUrls = await Promise.all(
      projects.map(async (project) => {
        if (!project.file || !project.file.key) {
          return { id: project._id, fileUrl: null };
        }

        const response = await axios.get(`/file/signed-url?key=${project.file.key}`);
        return {
          id: project._id,
          fileUrl: response.data.data.url,
        };
      })
    );
    const fileUrlMap = fileUrls.reduce((acc, item) => {
      acc[item.id] = item.fileUrl;
      return acc;
    }, {});
    setProjectFiles(fileUrlMap);
    toast("Fetched signed file URLs successfully");
  } catch (error) {
    console.error("Error fetching signed URLs:", error);
    toast("Failed to fetch signed file URLs", "error");
  }
}, [projects, toast]);

useEffect(() => {
  if (projects.length > 0) {
    fetchProjectFileUrls();
  }
}, [projects, fetchProjectFileUrls]);

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
          Featured <span  className="text-sky-500 dark:text-sky-300">Projects</span>
        </motion.h2>
      </header>

      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
            <ProjectCard 
              key={project._id} 
              projectName={project.title}
              description={project.description}
              imageUrl={projectFiles[project._id]}
              github={project.githubUrl}
              live={project.projectUrl}
            />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
