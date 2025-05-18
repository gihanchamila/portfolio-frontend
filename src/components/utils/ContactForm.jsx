import React, {useState, useEffect, useRef} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { Asterisk } from "lucide-react";
import Popup from "./Popup";
import useDisableBackgroundScroll from "../../hooks/useDisableBackgroundScroll";
import axios from "../../axios/axios";
import debounce from "lodash.debounce";
import { useToast } from "../../context/ToastContext";


const ContactForm = () => {
    const inputRefs = useRef([]);
    const { toast } = useToast();
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);   
    const [lastCodeSentTime, setLastCodeSentTime] = useState(null);
    const [verificationCode, setVerificationCode] = useState(null);
    const [count, setCount] = useState(null)
    useDisableBackgroundScroll(isPopupOpen)

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

    const handleVerifyEmail = debounce(async (email) => {
      const now = new Date().getTime();
      const cooldownPeriod = 10 * 60 * 1000; // 10 minutes

      // Check from the client-side (or frontend trigger)
      if (lastCodeSentTime && now - lastCodeSentTime < cooldownPeriod) {
          const minutesLeft = Math.ceil((cooldownPeriod - (now - lastCodeSentTime)) / 60000);
          toast(`Please wait ${minutesLeft} minute(s) before requesting another code.`, "error", 3000);
          return;
      }
  
      try {
          const response = await axios.post("/user/send-verification-code", { email });
          const data = response.data;
          toast(data.message, "success", 3000, "top-right");
          setIsPopupOpen(true);
          setCount(10);
          setLastCodeSentTime(now); // Update the last code sent time
      } catch (error) {
          const response = error.response;
          const data = response?.data?.message || "An error occurred";
          toast(data);
          console.error(data);
      }
  }, 500)
    
    const handleVerifyCode = async(email, verificationCode) => {
      try{
        const response = await axios.post("/user/verify-user", {
          code: verificationCode,
          email
        });
        const data = response.data
        console.log(data)
        if(data.success == true){
          setIsEmailVerified(true);
          setIsPopupOpen(false);
        }
        toast(data.message, "success", 3000, "top-right")
      }catch(error){
        const response = error.response
        const data = response.data
        console.error(data.message)
        toast(data.message, "error", 3000, "top-right")
      }
    }
      
    const handleClosePopup = () => {
        setIsPopupOpen(false)
        setVerificationCode(null);
    }

    const handleInputChange = (e) => {
      const { value } = e.target;
      setVerificationCode(value)
    }

    const handleChangeEmail = () => {
      setIsEmailVerified(false);
      setVerificationCode(null);
      setLastCodeSentTime(null);
      setCount(null);
    };

  return (
    <>
      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={async(values, { resetForm }) => {
          try{
            const contactData = {
              name : values.fullName,
              email : values.email,
              message : values.message
            }

            const response = await axios.post("/connect/make-connection", contactData)
            const data = response.data;
            console.log(data)
            resetForm(); 
          }catch(error){
            const response = error.response
            const data = response.data.message
            console.error("Submission Error:", data);
          }
        }}
      >
        {({ isSubmitting, values }) => (
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
                placeholder="e.g., Jane Doe"
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
              <Field type="email" id="email" disabled={isEmailVerified} name="email" className="formInput " placeholder="e.g., jane.doe@example.com" />
              <ErrorMessage name="email" component="div" className="formError" />
              <div className="mt-2 absolute -top-2 right-0">
                {!isEmailVerified && values.email && (
                  <span
                    type="pop-up"
                    onClick={() => handleVerifyEmail(values.email)}
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
                placeholder="Tell me a bit about your project or how I can help…"
                rows="5"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="formError"
              />
            </div>

            <div className="flex justify-end">
              <Button variant={'primary'} type="submit" disabled={isSubmitting || !isEmailVerified}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>

            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
              <h2 className="cardTitle drop-shadow-none pb-5">Verify Your Email</h2>
              <p className="font-primary text-gray-800">A verification code has been sent to your email. Please enter the code below:</p>

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
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
