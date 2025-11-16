import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PlusCircle, Award, Mail, FileText, Edit2, Trash2 } from 'lucide-react'
import ProjectForm from './utils/ProjectForm'
import CertificateForm from './utils/CertificateForm'
import MessagesList from './utils/MessagesList'
import AdminPopUp from './utils/AdminPopUp'
import { motion } from 'framer-motion'
import axios from '../axios/axios'
import ResumeUploadForm from './utils/ResumeUploadForm'
import { useToast } from '../context/ToastContext'
import { DashboardCard } from './utils/DashboardCard'

const DashBoard = () => {
  const navigate = useNavigate()
  const { admin, setAdmin } = useAuth()
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [popup, setPopup] = useState(null)
  const [contacts, setContacts] = useState([])
  const [hovered, setHovered] = useState(null)

  const dashboardItems = [
    {
      key: 'project',
      icon: <PlusCircle size={36} />,
      title: 'Projects',
      description: 'Add new projects to showcase your work and skills.',
      actionLabel: 'Create',
      popupTitle: 'Add Project',
      secondaryActionLabel: 'View',
      onSecondaryClick: () => navigate('/admin/projects'),
      popupContent: (
        <ProjectForm
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true)

              // --- STEP 1: UPLOAD ALL FILES IN PARALLEL ---
              // This is the key to high performance. We upload the cover photo
              // and all additional images at the same time.

              const allFilesToUpload = []
              // Add the cover photo file first. It's guaranteed to exist by Yup validation.
              allFilesToUpload.push(values.file)

              // Add the additional image files, if any exist.
              if (values.images && values.images.length > 0) {
                allFilesToUpload.push(...values.images)
              }

              // Create an array of upload promises.
              const uploadPromises = allFilesToUpload.map((fileToUpload) => {
                const formData = new FormData()
                // IMPORTANT: The key 'file' must match what your backend Multer is expecting.
                // In your FileController, you use `req.file`, so this is likely correct.
                formData.append('image', fileToUpload)
                return axios.post('/file/upload', formData)
              })

              // Execute all upload promises at the same time.
              const uploadResponses = await Promise.all(uploadPromises)

              // Extract the file IDs from the responses.
              const allFileIds = uploadResponses.map((response) => response.data.data.id)

              // The first ID belongs to the cover photo because we added it first.
              const coverPhotoId = allFileIds[0]
              // The rest of the IDs belong to the additional images.
              const imageIds = allFileIds.slice(1)

              // --- STEP 2: CREATE THE PROJECT WITH ALL DATA ---
              // This payload now includes everything: techStack, cover photo ID, and image IDs.
              const projectPayload = {
                title: values.title,
                subtitle: values.subtitle,
                description: values.description,
                techStack: values.techStack, // Formik has already converted this to an array
                projectUrl: values.projectUrl || null,
                githubUrl: values.githubUrl,
                file: coverPhotoId, // The ID of the cover photo
                images: imageIds, // The array of IDs for the other images
              }

              const response = await axios.post('/project/create-project', projectPayload)

              toast(response.data.message || 'Project created successfully!', 'success')
              console.log('Project Added:', response.data)
              resetForm()
              setPopup(null)
            } catch (error) {
              console.error('Submission Error:', error?.response?.data || error.message)
              toast(error?.response?.data?.message || 'An error occurred.', 'error')
            } finally {
              setSubmitting(false)
            }
          }}
          onCancel={() => setPopup(null)}
        />
      ),
    },
    {
      key: 'certificate',
      icon: <Award size={36} />,
      title: 'Certificates',
      description: 'Add certificates and credentials to highlight your expertise.',
      actionLabel: 'Create',
      popupTitle: 'Add Certificate',
      secondaryActionLabel: 'View',
      onSecondaryClick: () => navigate('/admin/certificates'),
      popupContent: (
        <CertificateForm
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true)
              const formattedDate = values.issueDate

              const certificatePayload = {
                title: values.title,
                organization: values.organization,
                issueDate: formattedDate,
                credentialURL: values.credentialURL,
              }

              console.log('Submitting certificate:', certificatePayload)

              const response = await axios.post(
                '/certificate/create-certificate',
                certificatePayload,
              )
              console.log('Server response:', response.data)

              if (!response.data || response.data.status === false) {
                throw new Error(response.data?.message || 'Failed to create certificate')
              }

              toast(
                response.data.message || 'Certificate added successfully',
                'success',
                3000,
                'bottom-right',
              )
              resetForm()
              setPopup(null)
            } catch (error) {
              console.error('Certificate submission error:', error)
              toast(
                error.response?.data?.message || error.message || 'Failed to add certificate',
                'error',
                3000,
                'bottom-right',
              )
            } finally {
              setSubmitting(false)
            }
          }}
          onCancel={() => setPopup(null)}
        />
      ),
    },
    {
      key: 'resume',
      icon: <FileText size={36} />,
      title: 'Resume',
      description: 'Upload your latest resume in PDF format.',
      actionLabel: 'Upload Resume',
      popupTitle: 'Upload Resume',
      popupContent: (
        <ResumeUploadForm
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            try {
              const resumeRes = await axios.get('/resume/get-resumes')
              const resumes = resumeRes.data.data // This is the array of resumes

              if (resumes.length > 0) {
                // If there are resumes, delete the latest one (or all, as needed)
                const latestResume = resumes[resumes.length - 1]
                const deleteResume = await axios.delete(`/resume/delete/${latestResume.file}`)
                if (!deleteResume.data.status) {
                  throw new Error(deleteResume.data.message)
                }
              }

              // Now upload the new resume
              const filePayload = values.file
              const formData = new FormData()
              formData.append('resume', filePayload)

              const response = await axios.post('/resume/upload', formData)
              const data = response.data
              console.log('Resume Upload Response:', data)
              toast(data.message, 'success', 3000, 'bottom-right')
            } catch (error) {
              const message =
                error.response?.data?.message || error.message || 'Something went wrong'
              toast(message, 'false', 3000, 'bottom-right')
            }
            setSubmitting(false)
            resetForm()
            setPopup(null)
          }}
          onCancel={() => setPopup(null)}
        />
      ),
    },
    {
      key: 'messages',
      icon: <Mail size={36} />,
      title: 'Messages',
      description: 'View and respond to messages sent to you.',
      actionLabel: 'View Messages',
      popupTitle: 'Messages',
      popupContent: <MessagesList contacts={contacts} onClose={() => setPopup(null)} />,
    },
  ]

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get('/connect/get-connections')
      const data = response.data.data.contacts
      setContacts(data)
      toast(response.data.message, 'success', 3000, 'bottom-right')
    } catch (error) {
      const response = error.response
      const data = response.data
      toast(data.message, 'false', 3000, 'bottom-right')
    }
  }, [])

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin')
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin))
  }, [setAdmin])

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timerId)
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <>
      <div className="pb-10">
        <p className="text-4xl">
          Hello {admin?.firstName} {admin?.lastName}
        </p>
        <p>{currentTime.toLocaleString()}</p>
      </div>
      <motion.div layout className="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardItems.map((item) => {
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
          )
        })}
      </motion.div>
      {dashboardItems.map((item) => (
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
  )
}

export default DashBoard
