import React, { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { PlusCircle, Award, Mail, FileText, Edit2, Trash2 } from 'lucide-react'
import Button from './utils/Button'
import AddProjectForm from './utils/AddProjectForm'
import AddCertificateForm from './utils/AddCertificateForm'
import MessagesList from './utils/MessagesList'
import AdminPopUp from './utils/AdminPopUp'
import { motion } from "framer-motion"
import axios from '../axios/axios'
import ResumeUploadForm from './utils/ResumeUploadForm'
import { useToast } from "../context/ToastContext";
import { DashboardCard } from './utils/DashboardCard'

const ItemsList = ({ items, onEdit, onDelete, type }) => {
  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      {items.length === 0 ? (
        <p className="text-center text-gray-500">No {type} found</p>
      ) : (
        items.map((item) => (
          <div 
            key={item._id} 
            className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {type === 'projects' ? item.subtitle : item.organization}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onEdit(item)}
                  className="p-2 text-blue-500 hover:text-blue-600"
                >
                  <Edit2 size={18} />
                </Button>
                <Button
                  onClick={() => onDelete(item._id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const DashBoard = () => {
  const { admin, setAdmin } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [popup, setPopup] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [hovered, setHovered] = useState(null);


  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('/project/get-projects');
      setProjects(response.data.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast(error.response?.data?.message || 'Failed to fetch projects', 'error', 3000, 'bottom-right');
    }
  }, []);

  const fetchCertificates = useCallback(async () => {
    try {
      const response = await axios.get('/certificate/get-certificates');
      setCertificates(response.data.data.certificates);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast(error.response?.data?.message || 'Failed to fetch certificates', 'error', 3000, 'bottom-right');
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchCertificates();
  }, [fetchProjects, fetchCertificates]);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, [setAdmin]);

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get("/connect/get-connections");
      const data = response.data.data.contacts;
      console.log("Fetched Messages:", data);
      setContacts(data);
      toast(response.data.message, "success", 3000, "bottom-right");
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast(data.message, "false", 3000, "bottom-right");
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const dashboardItems = [
    {
      key: "project",
      icon: <PlusCircle size={36} />,
      title: "Projects",
      description: "Add new projects to showcase your work and skills.",
      actionLabel: "Create",
      popupTitle: "Add Project",
      secondaryActionLabel: "View",
      onSecondaryClick: () => setPopup('viewProjects'),
      popupContent: (
        <AddProjectForm
          onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
              let fileId = null;

              if (values.file) {
                const formData = new FormData();
                formData.append('image', values.file);
                const fileResponse = await axios.post("/file/upload", formData);
                fileId = fileResponse.data.data.id;
                toast(fileResponse.message, "success", 3000, "bottom-right");
              }

              const projectPayload = {
                title: values.title,
                subtitle: values.subtitle,
                description: values.description,
                projectUrl: values.projectUrl,
                githubUrl: values.githubUrl,
                file: fileId
              };

              const response = await axios.post("/project/create-project", projectPayload);
              const data = response.data;
              toast(data.message, "success", 3000, "bottom-right");
              console.log("Project Added:", response.data);
              resetForm();
              setPopup(null);
            } catch (error) {
              console.error("Submission Error:", error?.response?.data || error.message);
            } finally {
              setSubmitting(false);
            }
          }}
          onCancel={() => setPopup(null)}
        />
      ),
    },
    {
      key: "certificate",
      icon: <Award size={36} />,
      title: "Certificates",
      description: "Add certificates and credentials to highlight your expertise.",
      actionLabel: "Create",
      popupTitle: "Add Certificate",
      secondaryActionLabel: "View",
      onSecondaryClick: () => setPopup('viewCertificates'),
      popupContent: (
        <AddCertificateForm
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);
              const formattedDate = values.issueDate;

              const certificatePayload = {
                title: values.title,
                organization: values.organization,
                issueDate: formattedDate,
                credentialURL: values.credentialURL,
              };

              console.log('Submitting certificate:', certificatePayload); // Debug log

              const response = await axios.post("/certificate/create-certificate", certificatePayload);
              console.log('Server response:', response.data); // Debug log
              
              // Check if we have a response and it's successful
              if (!response.data || response.data.status === false) {
                throw new Error(response.data?.message || 'Failed to create certificate');
              }

              toast(response.data.message || 'Certificate added successfully', "success", 3000, "bottom-right");
              resetForm();
              setPopup(null);

            } catch (error) {
              console.error("Certificate submission error:", error);
              toast(
                error.response?.data?.message || error.message || "Failed to add certificate", 
                "error", 
                3000, 
                "bottom-right"
              );
            } finally {
              setSubmitting(false);
            }
          }}
          onCancel={() => setPopup(null)}
        />
      ),
    },
    {
      key: "resume",
      icon: <FileText size={36} />,
      title: "Resume",
      description: "Upload your latest resume in PDF format.",
      actionLabel: "Upload Resume",
      popupTitle: "Upload Resume",
      popupContent: (
        <ResumeUploadForm
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            const filePayload = {
              file: values.file,
            }

            try {
              const currentResume = await axios.get("/resume/get-resumes");
              const resume = currentResume.data.data.file;

              if (resume) {
                const deleteResume = await axios.delete(`/resume/delete/${resume}`);
                if (!deleteResume.data.status) {
                  throw new Error(deleteResume.data.message);
                }
              }

              const filePayload = values.file;

              const formData = new FormData();
              formData.append("resume", filePayload);

              const response = await axios.post("/resume/upload", formData);
              const data = response.data;
              console.log("Resume Upload Response:", data);
              toast(data.message, "success", 3000, "bottom-right");

            } catch (error) {
              const message = error.response?.data?.message || error.message || "Something went wrong";
              toast(message, "false", 3000, "bottom-right");
            }
            setSubmitting(false);
            resetForm();
            setPopup(null);
          }}
          onCancel={() => setPopup(null)}
        />
      ),
    },
    {
      key: "messages",
      icon: <Mail size={36} />,
      title: "Messages",
      description: "View and respond to messages sent to you.",
      actionLabel: "View Messages",
      popupTitle: "Messages",
      popupContent: (
        <MessagesList contacts={contacts} onClose={() => setPopup(null)} />
      ),
    },
  ];

  return (
    <>
      <div className='pb-10'>
        <p className='text-4xl'>Hello {admin?.firstName} {admin?.lastName}</p>
        <p>{currentTime.toLocaleString()}</p>
      </div>
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20"
      >
        {dashboardItems.map(item => {
          return (
            <DashboardCard
              key={item.key}
              icon={item.icon}
              title={item.title}
              description={item.description}
              onClick={() => setPopup(item.key)}
              actionLabel={item.actionLabel}
              secondaryActionLabel={item.secondaryActionLabel}
              onSecondaryClick={item.onSecondaryClick}
              className=""
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </motion.div>
      {dashboardItems.map(item => (
        <AdminPopUp
          key={item.key}
          open={popup === item.key}
          onClose={() => setPopup(null)}
          title={item.popupTitle}
          secondaryActionLabel={item.secondaryActionLabel}
        >
          {item.popupContent}
        </AdminPopUp>
      ))}
      <AdminPopUp
        open={popup === 'viewProjects'}
        onClose={() => setPopup(null)}
        title="Manage Projects"
      >
        <ItemsList
          items={projects}
          type="projects"
          onEdit={(project) => {
            // Handle edit
            console.log('Edit project:', project);
          }}
          onDelete={async (id) => {
            try {
              await axios.delete(`/project/delete/${id}`);
              fetchProjects();
              toast('Project deleted successfully', 'success', 3000, 'bottom-right');
            } catch (error) {
              toast(error.response?.data?.message || 'Failed to delete project', 'error', 3000, 'bottom-right');
            }
          }}
        />
      </AdminPopUp>
      <AdminPopUp
        open={popup === 'viewCertificates'}
        onClose={() => setPopup(null)}
        title="Manage Certificates"
      >
        <ItemsList
          items={certificates}
          type="certificates"
          onEdit={(certificate) => {
            console.log('Edit certificate:', certificate);
          }}
          onDelete={async (id) => {
            try {
              await axios.delete(`/certificate/delete/${id}`);
              fetchCertificates();
              toast('Certificate deleted successfully', 'success', 3000, 'bottom-right');
            } catch (error) {
              toast(error.response?.data?.message || 'Failed to delete certificate', 'error', 3000, 'bottom-right');
            }
          }}
        />
      </AdminPopUp>
    </>
  );
};

export default DashBoard;