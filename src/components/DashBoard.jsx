import React, { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { PlusCircle, Award, Mail, FileText } from 'lucide-react'
import Button from './utils/Button'
import AddProjectForm from './utils/AddProjectForm'
import AddCertificateForm from './utils/AddCertificateForm'
import MessagesList from './utils/MessagesList'
import AdminPopUp from './utils/AdminPopUp'
import { motion } from "framer-motion"
import axios from '../axios/axios'
import ResumeUploadForm from './utils/ResumeUploadForm'
import { useToast } from "../context/ToastContext";

const DashboardCard = ({
  icon, title, description, onClick, actionLabel, className, animateProps
}) => (
  <motion.div
    layout
    whileTap={{ scale: 0.97 }}
    animate={animateProps}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={`bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-between hover:shadow-2xl transition-shadow min-h-[180px] cursor-pointer ${className}`}
    
  >
    <div className="mb-4 text-sky-500 dark:text-sky-300 xs:text-sm lg:text-base">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-center mb-4 xs:text-sm lg:text-base">{description}</p>
    {actionLabel && (
      <Button onClick={onClick}
        className="mt-auto px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors text-sm"
      >
        {actionLabel}
      </Button>
    )}
  </motion.div>
);

const DashBoard = () => {
  const { admin, setAdmin } = useAuth();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [popup, setPopup] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [hovered, setHovered] = useState(null);

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
      actionLabel: "Add Project",
      popupTitle: "Add Project",
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
      actionLabel: "Add Certificate",
      popupTitle: "Add Certificate",
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
        >
          {item.popupContent}
        </AdminPopUp>
      ))}
    </>
  );
};

export default DashBoard;