import React, { useEffect } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import BaseLayout from './BaseLayout'
import Header from './Header'
import Footer from './Footer'

const PrivateLayout = () => {
  const { admin } = useAuth()
  const location = useLocation()
  const token = localStorage.getItem('apiKey')

  if (location.pathname === '/admin') {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )
  }

  if (!token || !admin) {
    return <Navigate to="/admin" state={{ from: location }} replace />
  }

  return (
    <>
      <BaseLayout />
    </>
  )
}

export default PrivateLayout
