import React, { useCallback, useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import Button from './Button'
import axios from '../../axios/axios'
import { useToast } from '../../context/ToastContext'
import Popup from '../utils/Popup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Asterisk } from 'lucide-react'
import useDisableBackgroundScroll from '../../hooks/useDisableBackgroundScroll'

const ResumeDownload = () => {
  const { toast } = useToast()
  const [showPopUp, setShowPopUp] = useState(false)
  useDisableBackgroundScroll(showPopUp)

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Please enter a valid email address'),
  })

  const handlePopUp = () => {
    setShowPopUp(!showPopUp)
  }

  return (
    <>
      <Button
        variant="primary"
        className="font-semibold lg:mt-0"
        aria-label="View Resume"
        onClick={handlePopUp}
      >
        Resume
      </Button>

      {showPopUp && (
        <>
          <Popup isOpen={showPopUp} onClose={handlePopUp}>
            <h2 className="cardTitle pb-5 drop-shadow-none">
              Enter your email to receive the resume link
            </h2>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const email = DOMPurify.sanitize(values.email)
                  const response = await axios.post('/resume/request', { email })
                  const data = response.data
                  toast(data.message)
                  resetForm()
                  handlePopUp()
                } catch (error) {
                  const response = error.response
                  const data = response.data.message
                  toast(data)
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <label htmlFor="email" className="formLable">
                    Email <Asterisk className="inline-block align-super text-red-500" size={10} />
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="formInput"
                    placeholder="e.g., jane.doe@example.com"
                  />
                  <ErrorMessage name="email" component="div" className="formError" />
                  <div className="mt-4 flex justify-end">
                    <Button disabled={isSubmitting} type="submit">
                      {isSubmitting ? 'Sending...' : 'Send Resume'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Popup>
        </>
      )}
    </>
  )
}

export default ResumeDownload
