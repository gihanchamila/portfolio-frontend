import React from 'react';
import { ItemsList } from './ItemList';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

const ProjectsView = () => {
  const { admin, setAdmin} = useAuth()
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  const storedToken = localStorage.getItem("apiKey");
  if (storedToken) {
    setAdmin(true);  // or decode token to verify role
  }
}, []);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('/project/get-projects');
      const projects = response.data.data.projects
      setProjects(projects);
    } catch (error) {
      const response = error.response
      const data = response.data
      toast(data.message, 'error', 3000, 'bottom-right');
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="container mx-auto pb-20">
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>
      <ItemsList
        items={projects}
        type="projects"
        onEdit={(project) => {
          console.log('Edit project:', project);
        }}
        onDelete={async (id) => {
          try {
            const response = await axios.delete(`/project/delete/${id}`);
            const data = response.data;
            fetchProjects();
            toast(data.message, 'success', 3000, 'bottom-right');
          } catch (error) {
            const response = error.response;
            const data = response.data
            toast(data.message, "false", 300, 'bottom-right')
          }
        }}
      />
    </div>
  );
};

export default ProjectsView;