import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { PlusCircle, Award, Mail, FileText } from 'lucide-react'
import Button from './utils/Button'
import AddProjectForm from './utils/AddProjectForm'
import AddCertificateForm from './utils/AddCertificateForm'
import MessagesList from './utils/MessagesList'
import AdminPopUp from './utils/AdminPopUp'
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion"

const DashboardCard = ({
  icon, title, description, onClick, actionLabel, className, animateProps
}) => (
  <motion.div
    layout
    whileTap={{ scale: 0.97 }}
    animate={animateProps}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={`bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-between hover:shadow-2xl transition-shadow min-h-[180px] cursor-pointer ${className}`}
    onClick={onClick}
  >
    <div className="mb-4 text-sky-500 dark:text-sky-300">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{description}</p>
    {actionLabel && (
      <Button
        className="mt-auto px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors text-sm"
      >
        {actionLabel}
      </Button>
    )}
  </motion.div>
);

const ResumeUploadForm = ({ onSubmit, onCancel }) => (
  <Formik
    initialValues={{ file: null }}
    validationSchema={Yup.object({
      file: Yup.mixed()
        .required("Resume is required")
        .test(
          "fileFormat",
          "Only PDF files are allowed",
          value => value && value.type === "application/pdf"
        ),
    })}
    onSubmit={onSubmit}
  >
    {({ setFieldValue, isSubmitting }) => (
      <Form className="space-y-4">
        <div>
          <label className="formLable">Resume (PDF)</label>
          <input
            name="file"
            type="file"
            accept="application/pdf"
            className="formInput"
            onChange={e => setFieldValue("file", e.currentTarget.files[0])}
          />
          <ErrorMessage name="file" component="div" className="formError" />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload"}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

const DashBoard = () => {
  const { admin, setAdmin } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [popup, setPopup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, [setAdmin]);

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (popup === "messages") {
      setMessages([
        { id: 1, subject: "Welcome!", body: "Hello admin!", date: "2024-05-23" },
        { id: 2, subject: "New Project", body: "A new project was added.", date: "2024-05-22" }
      ]);
    }
  }, [popup]);

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
            setSubmitting(false);
            resetForm();
            setPopup(null);
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
            setSubmitting(false);
            resetForm();
            setPopup(null);
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
        <MessagesList messages={messages} onClose={() => setPopup(null)} />
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