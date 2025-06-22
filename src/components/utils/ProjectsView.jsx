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

  const handleUpdateProject = async (values, { setSubmitting }) => {
    let newlyUploadedIds = [];
    try {
        setSubmitting(true);

        const filesToUpload = [];
        // Check if the main 'file' is a new upload
        if (values.file instanceof File) {
            // CORRECTED: Changed type to 'file' for consistency
            filesToUpload.push({ type: 'file', file: values.file });
        }
        // Check which of the additional 'images' are new uploads
        if (values.images && values.images.length > 0) {
            values.images.forEach(img => {
                if (img instanceof File) {
                    filesToUpload.push({ type: 'image', file: img });
                }
            });
        }
        
        // CORRECTED: Renamed 'newCoverPhotoId' to 'newFileId'
        let newFileId = values.file; // Default to existing ID string
        const finalImageIds = values.images || [];

        if (filesToUpload.length > 0) {
            const uploadPromises = filesToUpload.map(item => {
                const formData = new FormData();
                formData.append('image', item.file);
                return axios.post('/file/upload', formData);
            });

            const uploadResponses = await Promise.all(uploadPromises);
            newlyUploadedIds = uploadResponses.map(res => res.data.data.id);
            
            filesToUpload.forEach((item, index) => {
                const newId = newlyUploadedIds[index];
                // CORRECTED: Check for 'file' type and assign to 'newFileId'
                if (item.type === 'file') {
                    newFileId = newId;
                } else {
                    const originalFileIndex = values.images.findIndex(img => img === item.file);
                    finalImageIds[originalFileIndex] = newId;
                }
            });
        }

        const projectPayload = {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
            projectUrl: values.projectUrl,
            githubUrl: values.githubUrl,
            techStack: values.techStack,
            // CORRECTED: Use 'newFileId' for the 'file' field
            file: newFileId,
            images: finalImageIds,
        };

        const response = await axios.put(`/project/update-project/${editProject._id}`, projectPayload);
        
        toast(response.data.message, "success");
        setShowForm(false);
        setEditProject(null);
        fetchProjects(currentPage);

    } catch (error) {
        if (newlyUploadedIds.length > 0) {
            // This rollback logic is still valid
            console.error("Project update failed. Rolling back uploaded files...");
            // Make sure you have the 'delete-by-id/:id' endpoint from the previous step
            const deletePromises = newlyUploadedIds.map(id => axios.delete(`/file/delete-by-id/${id}`));
            await Promise.all(deletePromises);
            toast("Update failed. Uploaded files were rolled back.", "error");
        } else {
            toast(error?.response?.data?.message || "Update failed", "error");
        }
        console.error("Update Error:", error?.response?.data || error);
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
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
    <div className="bg-white dark:bg-neutral-900 rounded-lg p-8 w-full max-w-5xl shadow-lg relative my-10 max-h-[90vh] overflow-y-auto">
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
          techStack: editProject.techStack ? editProject.techStack.join(", ") : "",
          file: editProject.file,
          images: editProject.images || [],
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