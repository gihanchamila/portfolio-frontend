import React, { useCallback, useEffect, useRef, useState } from 'react';
import ProjectCard from '../utils/Card';
import SectionLabel from '../utils/SectionLabel';
import { Sparkle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import axios from '../../axios/axios.js';
import { useNavigate } from 'react-router-dom';
import Reveal from '../utils/Reveal';
import Title from '../utils/Title.jsx';

const FeaturedProjects = () => {
  const ref = useRef(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectFiles, setProjectFiles] = useState({});
  const [totalCount, setTotalCount] = useState(null);

  const LS_KEY = 'featured_projects';
  const LS_FILES_KEY = 'featured_project_files';

  useEffect(() => {
    const cachedProjects = localStorage.getItem(LS_KEY);
    const cachedFiles = localStorage.getItem(LS_FILES_KEY);

    if (cachedProjects) {
      setProjects(JSON.parse(cachedProjects));
    }
    if (cachedFiles) {
      setProjectFiles(JSON.parse(cachedFiles));
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    const cachedProjects = localStorage.getItem(LS_KEY);
    if (cachedProjects) return;

    try {
      const res = await axios.get('/project/get-projects?size=3');
      const data = res.data.data.projects;
      const total = res.data.data.total;

      setProjects(data);
      setTotalCount(total);

      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch (error) {
      toast(error.response?.data?.message || 'Something went wrong', 'error');
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const fetchProjectFileUrls = useCallback(async () => {
    const cachedFiles = localStorage.getItem(LS_FILES_KEY);
    if (cachedFiles) return;

    try {
      const fileUrls = await Promise.all(
        projects.map(async project => {
          if (!project.file?.key) return { id: project._id, fileUrl: null };

          const res = await axios.get(`/file/signed-url?key=${project.file.key}`);
          return { id: project._id, fileUrl: res.data.data.url };
        })
      );

      const fileMap = fileUrls.reduce((acc, item) => {
        acc[item.id] = item.fileUrl;
        return acc;
      }, {});

      setProjectFiles(fileMap);
      localStorage.setItem(LS_FILES_KEY, JSON.stringify(fileMap));
    } catch (err) {
      console.error('Signed URL error:', err);
      toast('Failed to load signed URLs', 'error');
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
      className="sm-col-span-4 pb-20 sm:col-start-1 sm:col-end-5 scrollMargin"
    >
      <header>
        <SectionLabel icon={<Sparkle size={14} />} label="Highlight" />
        <Title text={`Featured Project`} />
      </header>

      <div className="xs:gap-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {projects.map((project, index) => (
          <Reveal delay={index * 0.2} key={project._id}>
            <ProjectCard
              projectName={project.title}
              description={project.description}
              github={project.githubUrl}
              live={project.projectUrl}
              imageUrl={projectFiles[project._id]}
              projectId={project._id}
              index={index}
            />
          </Reveal>
        ))}

        {totalCount > 3 && (
          <span className="cursor-pointer" onClick={() => navigate('projects')}>
            Show more
          </span>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
