import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';

import AnimatedButton from './AnimatedButton';
import ImageCarousel from './ImageCarousel';

const Project = () => {
  const { id: projectID } = useParams();
  const { toast } = useToast();

  const [project, setProject] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback images in case fetched images fail or don't exist
  const dummyImages = [
    "https://picsum.photos/seed/projectA/1280/720",
    "https://picsum.photos/seed/projectB/1280/720",
    "https://picsum.photos/seed/projectC/1280/720",
  ];

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectID) return;

      setIsLoading(true);
      try {
        const response = await axios.get(`/project/get-project/${projectID}`);
        const projectData = response.data.data;
        console.log(projectData)
        setProject(projectData);

        if (projectData.images && projectData.images.length > 0) {
          try {
            const urls = await Promise.all(
              projectData.images.map(async (image) => {
                if (!image.key) return null;
                const res = await axios.get(`/file/signed-url?key=${image.key}`);
                return res.data.data.url;
              })
            );
            setImageUrls(urls.filter(Boolean));
          } catch (err) {
            console.error("Error fetching image URLs", err);
            toast("Failed to load project images", "error");
          }
      }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch project details.";
        toast(errorMessage, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [projectID, toast]);


  // Render a message if the project could not be loaded
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Project Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          We couldn't find the project you're looking for.
        </p>
        <Link to="/projects">
          <AnimatedButton className="mt-6">Back to Projects</AnimatedButton>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full lg:pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="grid md:grid-cols-5 gap-8 lg:gap-16">
        <motion.div 
          className="md:col-span-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ImageCarousel images={imageUrls.length > 0 ? imageUrls : dummyImages} />
        </motion.div>
        <div className="md:col-span-2 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {project.title || 'Untitled Project'}
          </h1>
          <h3 className='dark:text-sky-300 text-sky-600 text-xl my-2 font-semibold'>{project.subtitle}</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {project.description || 'No description provided.'}
          </p>
          
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-auto pt-8 flex flex-wrap gap-4">
            {project.projectUrl && (
               <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                 <AnimatedButton>View Live Site</AnimatedButton>
               </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <AnimatedButton variant="secondary">View Source</AnimatedButton>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;