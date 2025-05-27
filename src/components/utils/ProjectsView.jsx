import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import ProjectForm from './ProjectForm';
import Button from './Button';
import Pagination from './Pagination';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsView = () => {
  const { admin, setAdmin } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("apiKey");
    if (storedToken) {
      setAdmin(true);
    }
  }, [setAdmin]);

const fetchProjects = useCallback(async (page = 1) => {
  try {
    const response = await axios.get(`/project/get-projects?page=${page}`);
    const data = response.data;
    setProjects(data.data.projects);
    setTotalPage(data.data.pages); // <-- use 'pages' from API
    setPageCount(Array.from({ length: data.data.pages }, (_, i) => i + 1)); // <-- use 'pages'
  } catch (error) {
    const response = error.response;
    const data = response.data;
    toast(data.message, 'error', 3000, 'bottom-right');
  }
}, [toast]);

  useEffect(() => {
    fetchProjects(currentPage);
  }, [fetchProjects, currentPage]);

  const handleUpdateProject = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "file") {
          if (value) {
            formData.append("file", value);
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      const response = await axios.put(`/project/update-project/${editProject._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response)
      toast(response.data.message, 'success', 3000, 'bottom-right');
      setShowForm(false);
      setEditProject(null);
      fetchProjects();
    } catch (error) {
      const response = error.response;
      const data = response?.data;
      toast(data?.message || "Update failed", 'error', 3000, 'bottom-right');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto pb-20">
    <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>
    <AnimatePresence mode="wait">
      <motion.ul
        key={currentPage}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
        className="divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-neutral-800 rounded-lg shadow"
      >
        {projects.length === 0 && (
          <li className="py-6 text-center text-gray-500">No projects found</li>
        )}
        {projects.map((project) => (
          <li key={project._id} className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
            <span className="font-medium lg:text-lg xs:text:xs sm:text-sm">{project.title}</span>
            <div className="flex gap-2">
              <Button variant='primary'
                onClick={() => {
                  setEditProject(project);
                  setShowForm(true);
                }}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium shadow"
              >
                Update
              </Button>
              <Button variant='error'
                onClick={async () => {
                  try {
                    const response = await axios.delete(`/project/delete-project/${project._id}`);
                    const data = response.data;
                    fetchProjects();
                    toast(data.message, 'success', 3000, 'bottom-right');
                  } catch (error) {
                    const response = error.response;
                    const data = response.data;
                    toast(data.message, "error", 3000, 'bottom-right');
                  }
                }}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium shadow"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
    <Pagination
      currentPage={currentPage}
      totalPage={totalPage}
      pageCount={pageCount}
      onPageChange={setCurrentPage}
    />
    {showForm && editProject && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-neutral-900 rounded-lg p-8 w-full max-w-lg shadow-lg relative">
          <h2 className="text-xl font-bold mb-4">Update Project</h2>
          <ProjectForm
            onSubmit={handleUpdateProject}
            onCancel={() => {
              setShowForm(false);
              setEditProject(null);
            }}
            initialValues={{
              title: editProject.title || "",
              subtitle: editProject.subtitle || "",
              description: editProject.description || "",
              projectUrl: editProject.projectUrl || "",
              githubUrl: editProject.githubUrl || "",
              file: null, 
            }}
            isUpdate
          />
        </div>
      </div>
    )}
  </div>
  );
};

export default ProjectsView;