import React, {useState, useEffect, useRef} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import DOMPurify from "dompurify";
import * as Yup from "yup";
import Button from "./Button";
import { Asterisk } from "lucide-react";
import Popup from "./Popup";
import useDisableBackgroundScroll from "../../hooks/useDisableBackgroundScroll";
import axios from "../../axios/axios";
import debounce from "lodash.debounce";
import { useToast } from "../../context/ToastContext";
import { motion } from "motion/react";
import { div } from "motion/react-client";

const ContactForm = () => {
    const fullnameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const { toast } = useToast();
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);   
    const [lastCodeSentTime, setLastCodeSentTime] = useState(null);
    const [verificationCode, setVerificationCode] = useState(null);
    const [count, setCount] = useState(null)
    useDisableBackgroundScroll(isPopupOpen)

    const containerVariant = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2
        }
      }
    };

    const childVariant = {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    useEffect(() => {
      let interval;
      if (isEmailVerified && count > 0) {
        interval = setInterval(() => {
          setCount(prev => prev - 1);
        }, 60000);
      }
    
      return () => clearInterval(interval);
    }, [isEmailVerified, count]);

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

    const handleVerifyEmail = debounce(async (email, name) => {
      const now = new Date().getTime();
      const cooldownPeriod = 10 * 60 * 1000;

      if (lastCodeSentTime && now - lastCodeSentTime < cooldownPeriod) {
          const minutesLeft = Math.ceil((cooldownPeriod - (now - lastCodeSentTime)) / 60000);
          toast(`Please wait ${minutesLeft} minute(s) before requesting another code.`, "error", 3000);
          return;
      }
  
      try {
          setIsPopupOpen(true);
          const response = await axios.post("/user/send-verification-code", { email, name });
          const data = response.data;
          toast(data.message, "success", 3000, "bottom-right");
          setCount(10);
      } catch (error) {
          const response = error.response;
          const data = response?.data?.message || "An error occurred";
          toast(data, "bottom-right");
      }
    }, 500);
    
    const handleVerifyCode = async(email, verificationCode) => {
      try{
        const response = await axios.post("/user/verify-user", {
          code: verificationCode,
          email
        });
        const data = response.data
        if(data.success == true){
          setIsEmailVerified(true);
          setIsPopupOpen(false);
        }
        toast(data.message, "success", 3000, "bottom-right")
      }catch(error){
        const response = error.response
        const data = response.data
        console.error(data.message)
        toast(data.message, "error", 3000, "bottom-right")
      }
    };
      
    const handleClosePopup = () => {
        setIsPopupOpen(false)
        setVerificationCode(null);
    };

    const handleInputChange = (e) => {
      const { value } = e.target;
      setVerificationCode(value)
    };

    const handleChangeEmail = () => {
      setIsEmailVerified(false);
      setVerificationCode(null);
      setLastCodeSentTime(null);
      setCount(null);
    };

    const handleKeyDown = (e, value, nextRef) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (value.trim() !== "" && nextRef?.current) {
          nextRef.current.focus();
        }
      }
    };

  return (
    <>
      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={async(values, { resetForm }) => {
          try{
            const contactData = {
              name : DOMPurify.sanitize(values.fullName),
              email : DOMPurify.sanitize(values.email),
              message : DOMPurify.sanitize(values.message)
            }
            const response = await axios.post("/connect/make-connection", contactData)
            const data = response.data;
            toast(data.message)
            resetForm();
            
          }catch(error){
            const response = error.response
            const data = response.data.message
            toast(data)
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <motion.div
            className="lg:w-1/2 sm:w-full "
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Form>
              <motion.div className="mb-4" variants={childVariant}>
                <label htmlFor="fullName" className="formLable">
                  Full Name <Asterisk className="text-red-500 inline-block align-super" size={10} />
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="formInput"
                  placeholder="e.g., Jane Doe"
                  innerRef={fullnameRef}
                  onKeyDown={(e) =>
                    handleKeyDown(e, e.target.value, emailRef)
                  }
                  
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="formError"
                />
              </motion.div>

              <motion.div className="mb-4 relative" variants={childVariant}>
                <label htmlFor="email" className="formLable">
                  Email <Asterisk className="text-red-500 inline-block align-super" size={10} />
                </label>
                <Field 
                  type="email" 
                  id="email" 
                  disabled={isEmailVerified} 
                  name="email" 
                  className="formInput " 
                  placeholder="e.g., jane.doe@example.com"
                  innerRef={emailRef}
                  onKeyDown={(e) =>
                    handleKeyDown(e, e.target.value, messageRef)
                  }
                />
                <ErrorMessage name="email" component="div" className="formError" />
                <div className="mt-2 absolute -top-2 right-0">
                  {!isEmailVerified && values.email && (
                    <span
                      type="pop-up"
                      onClick={() => handleVerifyEmail(values.email, values.fullName)}
                      className="text-sky-500 text-sm font-primary hover:underline cursor-pointer"
                    >
                      Verify Email
                    </span>
                  )}
                  {isEmailVerified && (
                    <span
                      type="button"
                      onClick={count === 0 ? handleChangeEmail : null} 
                      className={`text-sm font-primary hover:underline cursor-pointer ${
                        count > 0 ? "text-gray-400 cursor-not-allowed" : "text-red-500"
                      }`}
                    >
                      {count > 0 ? `Wait ${count} minutes to Change Email` : "Change Email"}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div className="mb-4" variants={childVariant}>
                <label htmlFor="message" className="formLable">
                  Message <Asterisk className="text-red-500 inline-block align-super" size={10} />
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className="formInput"
                  placeholder="Tell me a bit about your project or how I can help…"
                  rows="5"
                  innerRef={messageRef}
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="formError"
                />
              </motion.div>

              <motion.div className="flex justify-end" variants={childVariant}>
                <Button variant={'primary'} type="submit" disabled={isSubmitting || !isEmailVerified}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </motion.div>

              <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <h2 className="cardTitle drop-shadow-none pb-5">Verify Your Email</h2>
                <p className="font-primary text-gray-800 dark:text-white">A verification code has been sent to your email. Please enter the code below:</p>

                <div className="flex justify-center w-full py-6">
                  <input
                    type="text"
                    maxLength="6"
                    value={verificationCode}
                    onChange={(e) => handleInputChange(e)}
                    className=" sm:w-full border-2 border-gray-500 rounded-lg py-2 text-lg text-left pl-4"
                    placeholder="Enter verification code"
                  />
                </div>

                <Button onClick={() => handleVerifyCode(values.email, verificationCode)} disabled={verificationCode?.length !== 6} variant="primary" className="mt-2">
                  Verify Code
                </Button>
              </Popup>
            </Form>
          </motion.div>  
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
