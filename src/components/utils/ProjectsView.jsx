import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import ProjectForm from './ProjectForm';
import Button from './Button';
import Pagination from './Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '../Sections/Education';
import { useNavigate } from 'react-router-dom';

const ProjectsView = () => {
  const { admin, setAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    const token = localStorage.getItem("apiKey");
    if (storedAdmin && token) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, [setAdmin]);

  const fetchProjects = useCallback(async (page = 1) => {
    try {
      const response = await axios.get(`/project/get-projects?page=${page}`);
      const data = response.data;
      setProjects(data.data.projects);
      setTotalPage(data.data.pages);
      setPageCount(Array.from({ length: data.data.pages }, (_, i) => i + 1)); 
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast(data.message, 'error', 3000, 'bottom-right');
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects(currentPage);
  }, [fetchProjects, currentPage]);

  const handleUpdateProject = async (values, { setSubmitting, setFieldError }) => {
    let uploadedFileId = null;
    try {
      let fileId = values.file;

      if (values.file && values.file instanceof File) {
        const formData = new FormData();
        formData.append("image", values.file);

        const uploadRes = await axios.post("/file/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (uploadRes.data && uploadRes.data.data && uploadRes.data.data.id) {
          fileId = uploadRes.data.data.id;
          uploadedFileId = fileId;
        } else {
          setFieldError("file", "File upload failed");
          setSubmitting(false);
          return;
        }
      }
      const data = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        projectUrl: values.projectUrl,
        githubUrl: values.githubUrl,
        file: fileId,
      };

      const response = await axios.put(
        `/project/update-project/${editProject._id}`,
        data
      );

      toast(response.data.message, "success", 3000, "bottom-right");
      setShowForm(false);
      setEditProject(null);
      fetchProjects();
    } catch (error) {
      if (uploadedFileId) {
        try {
          await axios.delete(`/file/delete/${uploadedFileId}`);
        } catch (deleteError) {
          console.error("Rollback file delete failed", deleteError);
        }
      }
      const response = error.response;
      const data = response?.data;
      toast(data?.message || "Update failed", "error", 3000, "bottom-right");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto pb-20">
    <h1 className="text-2xl font-bold mb-6">{admin ? "Manage Projects" : "Projects"}</h1>
    <AnimatePresence mode="wait">
      <motion.ul
        key={currentPage}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
        className="divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-neutral-800 rounded-lg shadow"
      >
        {projects.length > 0 && projects.map((project) => (
          <li key={project._id} className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
            <span className="font-medium lg:text-lg xs:text:xs sm:text-sm">{project.title}</span>
            <div className="flex gap-2">
              {admin ? (
                <>
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
                </>
              ) : (
                <>
                <Label link={`/project/get-project/${project._id}`} >
                  More information
                </Label>
                <Label link={project.githubUrl}>
                  Github repo
                </Label>
                </>
              )}
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
              file: editProject.file || null, 
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