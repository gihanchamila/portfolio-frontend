import React, { useEffect } from 'react'
import Button from './Button'
import axios from '../../axios/axios'

const ResumeDownload = () => {

    const handleDownload = async() => {
        try{
            const response = await axios.get("/resume/download/67f1471c8909435a018521ce");
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

  return (
    <Button variant="primary" className="sm:mt-10 lg:mt-0 font-semibold" aria-label="View Resume" onClick={handleDownload}>
        Resume
    </Button>
  )
}

export default ResumeDownload