import React, { useCallback, useEffect, useState } from 'react'
import Button from './Button'
import axios from '../../axios/axios'
import { useToast } from '../../context/ToastContext'
import Popup from '../utils/Popup'
import { Formik } from 'formik'
import * as Yup from "yup";

const ResumeDownload = () => {
    const { toast } = useToast();
    const [resume, setResume] = useState(null)
    const [showPopUp, setShowPopUp] = useState(false)

    const validationSchema = Yup.object({
        email : Yup.string()
          .required("Email is required")
          .email("Please enter a valid email address")
    })

    const handlePopUp = () => {
        setShowPopUp(!showPopUp)
    }


  return (
    <>
        <Button variant="primary" className="lg:mt-0 font-semibold" aria-label="View Resume" onClick={handlePopUp}>
            Resume
        </Button>

        {showPopUp && 
            <>
                <Popup isOpen={showPopUp} onClose={handlePopUp}>
                </Popup>
            </>
        }
    </>
    
  )
}

export default ResumeDownload