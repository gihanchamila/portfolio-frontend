import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Card from './utils/Card'
import axios from '../axios/axios'

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

  return (
    <>
      <div>
        <p className='text-4xl'>Hello {admin?.firstName} {admin?.lastName}</p>
        <p>{currentTime.toLocaleString()}</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </>
    
    
  )
}

export default DashBoard