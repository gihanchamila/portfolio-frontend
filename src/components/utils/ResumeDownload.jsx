import React, { useCallback, useEffect, useState } from 'react'
import Button from './Button'
import axios from '../../axios/axios'
import { useToast } from '../../context/ToastContext'
import Popup from '../utils/Popup'
import { Formik, Field, Form, ErrorMessage  } from 'formik'
import * as Yup from "yup";
import { Asterisk } from 'lucide-react'
import useDisableBackgroundScroll from '../../hooks/useDisableBackgroundScroll'

const ResumeDownload = () => {
    const { toast } = useToast();
    const [resume, setResume] = useState(null)
    const [showPopUp, setShowPopUp] = useState(false)
    useDisableBackgroundScroll(showPopUp)

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
                    <h2 className="cardTitle drop-shadow-none pb-5">Enter Your Email to Receive the Resume Link</h2>
                    <Formik 
                        initialValues={{email : ""}}
                        validationSchema={validationSchema}
                        onSubmit={async(values, {resetForm}) => {
                            try{
                                const email = values.email;
                                const response = await axios.post("/resume/request", {email})
                                const data = response.data;
                                toast(data.message)
                                resetForm();
                                handlePopUp()
                            }catch(error){
                                const response = error.response
                                const data = response.data.message
                                toast(data)
                            }
                        }}
                    >   
                        {({isSubmitting}) => (
                        <Form>
                            <label htmlFor="email" className="formLable">
                            Email <Asterisk className="text-red-500 inline-block align-super" size={10} />
                            </label>
                            <Field type="email" id="email"  name="email" className="formInput " placeholder="e.g., jane.doe@example.com" />
                            <ErrorMessage name="email" component="div" className="formError" />
                            <div className="flex justify-end mt-4">
                                <Button disabled={isSubmitting} type="submit">
                                     {isSubmitting ? "Sending..." : "Send Resume"}
                                </Button>
                            </div>
                        </Form>
                        )}
                    </Formik>
                </Popup>
            </>
        }
    </>
    
  )
}

export default ResumeDownload