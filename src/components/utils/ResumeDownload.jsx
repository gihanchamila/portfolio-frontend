import React, { useCallback, useEffect, useState } from 'react'
import Button from './Button'
import axios from '../../axios/axios'
import { useToast } from '../../context/ToastContext'

const ResumeDownload = () => {
    const { toast } = useToast();
    const [resume, setResume] = useState(null)

    const fetchResume = useCallback(async () => {
        try {
            const response = await axios.get("/resume/get-resumes")
            const data = response.data;
            console.log(data)
            setResume(data.data.resume);
            toast(data.message, 'success', 3000, 'bottom-right');

        }catch(error){
            const response = error.response;
            const data = response.data
            toast(data.message, 'error', 3000, 'bottom-right');
        }
    }, []) 

    const handleDownload = async() => {
        try{
            const response = await axios.get("/resume/download/");
            const signedUrl = response?.data?.data?.url;

            if (!signedUrl) {
            console.error("Signed URL not found");
            return;
            }

            const link = document.createElement("a");
            link.href = signedUrl;
            link.setAttribute("download", "resume.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
        }catch (error) {
            console.error("Error downloading the resume:", error);
        }
    }

    useEffect(() => {
        fetchResume()
    }, [])

  return (
    <Button variant="primary" className="lg:mt-0 font-semibold" aria-label="View Resume" onClick={handleDownload}>
        Resume
    </Button>
  )
}

export default ResumeDownload