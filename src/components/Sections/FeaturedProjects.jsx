import React, {useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView} from 'framer-motion';
import ProjectCard from '../utils/Card';
import SectionLabel from '../utils/SectionLabel';
import { Sparkle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import axios from "../../axios/axios.js"

const AnimatedCard = ({ project, imageUrl, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 50 + index * 25},
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      <ProjectCard
        projectName={project.title}
        description={project.description}
        imageUrl={imageUrl}
        github={project.githubUrl}
        live={project.projectUrl}
      />
    </motion.div>
  );
};

const FeaturedProjects =() => {
  const ref = useRef(null);
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [projectFiles, setProjectFiles] = useState({})
  const [totalCount, setTotalCount] = useState([null])

  // fetch project details
  const fetchProjects = useCallback(async () => {
    if (projects.length > 0) return;
    try {
      const response = await axios.get("/project/get-projects");
      const data = response.data.data.projects;
      const total= response.data.data.total;
      setTotalCount(total);
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
    fetchProjects()
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Featured <span className="text-sky-500 dark:text-sky-300">Projects</span>
      </motion.h2>
    </header>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <AnimatedCard
          key={project._id}
          project={project}
          imageUrl={projectFiles[project._id]}
          index={index}
        />
      ))}
    </div>

    {totalCount > 3 && (
      <div className="pt-6">
        Show more
      </div>
    )}
  </section>
);
};

export default FeaturedProjects;
