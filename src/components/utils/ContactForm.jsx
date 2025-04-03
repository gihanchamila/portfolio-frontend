import React, {useState, useEffect, useRef} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { Asterisk } from "lucide-react";
import Popup from "./Popup";
import useDisableBackgroundScroll from "../../hooks/useDisableBackgroundScroll";


const ContactForm = () => {
    const inputRefs = useRef([]);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);   
    const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));

    useDisableBackgroundScroll(isPopupOpen)

    const handleVerifyEmail = () => {
        // Simulate sending a verification code
        // You'd make an API call to send the verification code here.
        console.log('Verification code sent to email');
        setIsPopupOpen(true); // Open the popup when "Verify Email" is clicked
      };
    
    const handleVerifyCode = () => {
      console.log(verificationCode)
    if (verificationCode.join("") === '123456') {
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

    const handleInputChange = (e, index) => {
      const value = e.target.value;
      if (!/^\d?$/.test(value)) return; 
    
      const newCode = [...verificationCode];
      newCode[index] = value;
      console.log=(newCode)
      const code = newCode.split("")
      setVerificationCode(code.join(''));
    
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };
    
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

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
    <>
      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm(); 
        }}
      >
        {({ isSubmitting }) => (
          <Form className="lg:w-1/2 sm:w-full">
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

            <div className="mb-4 relative">
              <label htmlFor="email" className="formLable">
                Email <Asterisk className="text-red-500 inline-block align-super" size={10} />
              </label>
              <Field type="email" id="email" name="email" className="formInput " placeholder="Your Email" />
              <ErrorMessage name="email" component="div" className="formError" />
              <div className="mt-2 absolute -top-2 right-0">
                {!isEmailVerified && (
                  <span type="pop-up"  onClick={handleVerifyEmail} className="text-sky-500 text-sm font-primary hover:underline cursor-pointer">
                    Verify Email
                  </span>
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
                rows="5"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="formError"
              />
            </div>

            <div className="flex justify-end">
              <Button variant={'primary'} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>

            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
              <h2 className="cardTitle pb-5">Verify Your Email</h2>
              <p className="font-primary text-gray-800">A verification code has been sent to your email. Please enter the code below:</p>

              <div className="flex justify-center w-full space-x-4 py-6">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="h-12 w-10 text-center border-2 border-gray-500 rounded-lg"
                  />
                ))}
              </div>

              <Button onClick={handleVerifyCode} variant="primary" className="mt-2">
                Verify Code
              </Button>
            </Popup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
