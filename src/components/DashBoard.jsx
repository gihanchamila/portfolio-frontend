import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PlusCircle, Award, Mail } from 'lucide-react'
import Button from './utils/Button'
import axios from '../axios/axios'


export const DashboardCard = ({ icon, title, description, onClick, actionLabel }) => (
  <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-between hover:shadow-lg transition-shadow min-h-auto">
    <div className="mb-4 text-sky-500 dark:text-sky-300">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{description}</p>
    {onClick && (
      <Button
        onClick={onClick}
        className="mt-auto px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors text-sm"
      >
        {actionLabel}
      </Button>
    )}
  </div>
);

const DashBoard = () => {
  const { admin, setAdmin } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, [setAdmin]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

   const handleAddProject = () => {
    
  };
  const handleAddCertificate = () => {
    
  };
  const handleCheckMessages = () => {
    
  };

  return (
    <>
      <div className='pb-20'>
        <p className='text-4xl'>Hello {admin?.firstName} {admin?.lastName}</p>
        <p>{currentTime.toLocaleString()}</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20'>
        <DashboardCard
          icon={<PlusCircle size={36} />}
          title="Add Projects"
          description="Create and manage your portfolio projects."
          onClick={handleAddProject}
          actionLabel="Add Project"
        />
        <DashboardCard
          icon={<Award size={36} />}
          title="Add Certificates"
          description="Upload and showcase your certificates."
          onClick={handleAddCertificate}
          actionLabel="Add Certificate"
        />
        <DashboardCard
          icon={<Mail size={36} />}
          title="Check Messages"
          description="View and respond to new messages."
          onClick={handleCheckMessages}
          actionLabel="View Messages"
        />
      </div>
    </>
    
    
  )
}

export default DashBoard