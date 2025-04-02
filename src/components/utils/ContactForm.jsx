import React, {useState, useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { Asterisk } from "lucide-react";
import Popup from "./Popup";
import useDisableBackgroundScroll from "../../hooks/useDisableBackgroundScroll";

const ContactForm = () => {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false); 

    useDisableBackgroundScroll(isPopupOpen)

    const handleVerifyEmail = () => {
        // Simulate sending a verification code
        // You'd make an API call to send the verification code here.
        console.log('Verification code sent to email');
        setIsPopupOpen(true); // Open the popup when "Verify Email" is clicked
      };
    
    const handleVerifyCode = () => {
    if (verificationCode === '123456') {
        setIsEmailVerified(true);
        alert('Email Verified!');
        setIsPopupOpen(false);
    } else {
        alert('Invalid code. Please try again.');
    }
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false)
    }

    const validationSchema = Yup.object({
    fullName: Yup.string()
        .required("Full Name is required")
        .min(2, "Full Name must be at least 2 characters long"),
    email: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email address"),
    message: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters long"),
    });

  return (
    <React.Fragment>
      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm(); 
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="fullName" className="formLable">
                Full Name <Asterisk className="text-red-500 inline-block align-super" size={10} />
              </label>
              <Field
                type="text"
                id="fullName"
                name="fullName"
                className="formInput"
                placeholder="Your Full Name"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="formError"
              />
            </div>

            <div className="mb-4">
            <label htmlFor="email" className="formLable">
              Email <Asterisk className="text-red-500 inline-block align-super" size={10} />
            </label>
            <Field type="email" id="email" name="email" className="formInput" placeholder="Your Email" />
            <ErrorMessage name="email" component="div" className="formError" />
            <div className="mt-2">
              {!isEmailVerified && (
                <button type="button" onClick={handleVerifyEmail} className="text-blue-500">
                  Verify Email
                </button>
              )}
            </div>
          </div>

            <div className="mb-4">
              <label htmlFor="message" className="formLable">
                Message <Asterisk className="text-red-500 inline-block align-super" size={10} />
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                className="formInput"
                placeholder="Your Message"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="formError"
              />
            </div>

            <div className="flex flex-end">
              <Button variant={'primary'} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>

            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <h2 className="cardTitle pb-5">Verify Your Email</h2>
                <p className="font-primary">A verification code has been sent to your email. Please enter the code below:</p>
                <div className="flex justify-center space-x-4 py-10">
                {[...Array(6)].map((_, index) => (
                    <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={verificationCode[index] || ''}
                    onChange={(e) => {
                        const newCode = verificationCode.split('');
                        newCode[index] = e.target.value;
                        setVerificationCode(newCode.join(''));
                    }}
                    className="h-12 w-10 text-center border-2 border-gray-900 rounded-lg "
                    />
                ))}
                </div>
                <Button onClick={handleVerifyCode} variant={'primary'} className="mt-2">
                    Verify Code
                </Button>
          </Popup>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ContactForm;
