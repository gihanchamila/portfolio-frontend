import React, {useCallback, useEffect, useRef, useState } from 'react';
import ProjectCard from '../utils/Card';
import SectionLabel from '../utils/SectionLabel';
import { Sparkle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import axios from "../../axios/axios.js"
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const FeaturedProjects =() => {
  const ref = useRef(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectFiles, setProjectFiles] = useState({})
  const [totalCount, setTotalCount] = useState(null)
  const [hasFetched, setHasFetched] = useState(false);

  const fetchProjects = useCallback(async () => {
  if (hasFetched) return;
  try {
    const response = await axios.get("/project/get-projects?size=3");
    const data = response.data.data.projects;
    const total = response.data.data.total;
    setTotalCount(total);
    setProjects(data);
    setHasFetched(true);
    toast(`${response.data.message}`);
  } catch (error) {
    const data = error.response?.data || {};
    toast(data.message || "Something went wrong", "error");
  }
}, [hasFetched, toast]); 

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
      )
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
        Featured <span className="">Projects</span>
      </motion.h2>
    </header>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xs:gap-6 ">
      {projects.map((project, index) => (
          <ProjectCard
              key={project._id}
              projectName={project.title}
              description={project.description}
              github={project.githubUrl}
              live={project.projectUrl}
              imageUrl={projectFiles[project._id]}
              projectId={project._id}
              index={index}
          />
      ))}
      {totalCount > 3 && <span className='cursor-pointer' onClick={() => navigate("projects")}>Show more</span>}
    </div>

    
  </section>
);
};

export default FeaturedProjects;
