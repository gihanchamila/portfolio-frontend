import React, { useState, useEffect, useRef } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DOMPurify from 'dompurify';
import * as Yup from 'yup';
import Button from './Button';
import { Asterisk } from 'lucide-react';
import Popup from './Popup';
import useDisableBackgroundScroll from '../../hooks/useDisableBackgroundScroll';
import axios from '../../axios/axios';
import debounce from 'lodash.debounce';
import { useToast } from '../../context/ToastContext';
import { motion } from 'motion/react';
import { div } from 'motion/react-client';

const ContactForm = () => {
  const fullnameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const { toast } = useToast();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastCodeSentTime, setLastCodeSentTime] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const [count, setCount] = useState(null);
  useDisableBackgroundScroll(isPopupOpen);

  const childVariant = {
    hidden: { opacity: 0, y: 20, scale: 1 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const cardVariants = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 0.9 }
    }
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
      .required('Full Name is required')
      .min(2, 'Full Name must be at least 2 characters long'),
    email: Yup.string().required('Email is required').email('Please enter a valid email address'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters long')
  });

  const handleVerifyEmail = debounce(async (email, name) => {
    const now = new Date().getTime();
    const cooldownPeriod = 10 * 60 * 1000;

    if (lastCodeSentTime && now - lastCodeSentTime < cooldownPeriod) {
      const minutesLeft = Math.ceil((cooldownPeriod - (now - lastCodeSentTime)) / 60000);
      toast(`Please wait ${minutesLeft} minute(s) before requesting another code.`, 'error', 3000);
      return;
    }

    try {
      setIsPopupOpen(true);
      const response = await axios.post('/user/send-verification-code', { email, name });
      const data = response.data;
      toast(data.message, 'success', 3000, 'bottom-right');
      setCount(10);
    } catch (error) {
      const response = error.response;
      const data = response?.data?.message || 'An error occurred';
      toast(data, 'bottom-right');
    }
  }, 500);

  const handleVerifyCode = async (email, verificationCode) => {
    try {
      const response = await axios.post('/user/verify-user', {
        code: verificationCode,
        email
      });
      const data = response.data;
      if (data.success == true) {
        setIsEmailVerified(true);
        setIsPopupOpen(false);
      }
      toast(data.message, 'success', 3000, 'bottom-right');
    } catch (error) {
      const response = error.response;
      const data = response.data;
      console.error(data.message);
      toast(data.message, 'error', 3000, 'bottom-right');
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setVerificationCode(null);
  };

  const handleInputChange = e => {
    const { value } = e.target;
    setVerificationCode(value);
  };

  const handleChangeEmail = () => {
    setIsEmailVerified(false);
    setVerificationCode(null);
    setLastCodeSentTime(null);
    setCount(null);
  };

  const handleKeyDown = (e, value, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() !== '' && nextRef?.current) {
        nextRef.current.focus();
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{ fullName: '', email: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const contactData = {
              name: DOMPurify.sanitize(values.fullName),
              email: DOMPurify.sanitize(values.email),
              message: DOMPurify.sanitize(values.message)
            };
            const response = await axios.post('/connect/make-connection', contactData);
            const data = response.data;
            toast(data.message);
            resetForm();
          } catch (error) {
            const response = error.response;
            const data = response.data.message;
            toast(data);
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <motion.div
            className="sm:w-full lg:w-1/2"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Form>
              <motion.div
                className="mb-4"
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <label htmlFor="fullName" className="formLable">
                  Full Name <Asterisk className="inline-block align-super text-red-500" size={10} />
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="formInput"
                  placeholder="e.g., Jane Doe"
                  innerRef={fullnameRef}
                  onKeyDown={e => handleKeyDown(e, e.target.value, emailRef)}
                />
                <ErrorMessage name="fullName" component="div" className="formError" />
              </motion.div>

              <motion.div
                className="relative mb-4"
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <label htmlFor="email" className="formLable">
                  Email <Asterisk className="inline-block align-super text-red-500" size={10} />
                </label>
                <Field
                  type="email"
                  id="email"
                  disabled={isEmailVerified}
                  name="email"
                  className="formInput"
                  placeholder="e.g., jane.doe@example.com"
                  innerRef={emailRef}
                  onKeyDown={e => {
                    if (!isEmailVerified && values.email) {
                      handleVerifyEmail(values.email, values.fullName);
                    } else {
                      handleKeyDown(e, e.target.value, messageRef);
                    }
                  }}
                />
                <ErrorMessage name="email" component="div" className="formError" />
                <div className="absolute -top-2 right-0 mt-2">
                  {!isEmailVerified && values.email && (
                    <span
                      type="pop-up"
                      onClick={() => handleVerifyEmail(values.email, values.fullName)}
                      className="font-primary cursor-pointer text-sm text-sky-500 hover:underline"
                    >
                      Verify Email
                    </span>
                  )}
                  {isEmailVerified && (
                    <span
                      type="button"
                      onClick={count === 0 ? handleChangeEmail : null}
                      className={`font-primary cursor-pointer text-sm hover:underline ${
                        count > 0 ? 'cursor-not-allowed text-gray-400' : 'text-red-500'
                      }`}
                    >
                      {count > 0 ? `Wait ${count} minutes to Change Email` : 'Change Email'}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="mb-4"
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <label htmlFor="message" className="formLable">
                  Message <Asterisk className="inline-block align-super text-red-500" size={10} />
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
                <ErrorMessage name="message" component="div" className="formError" />
              </motion.div>

              <motion.div
                className="flex justify-end"
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <Button
                  variant={'primary'}
                  type="submit"
                  disabled={isSubmitting || !isEmailVerified}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </motion.div>

              <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <h2 className="cardTitle pb-5 drop-shadow-none">Verify Your Email</h2>
                <p className="font-primary text-gray-800 dark:text-white">
                  A verification code has been sent to your email. Please enter the code below:
                </p>

                <div className="flex w-full justify-center py-6">
                  <input
                    type="text"
                    maxLength="6"
                    value={verificationCode}
                    onChange={e => handleInputChange(e)}
                    className="rounded-lg border-2 border-gray-500 py-2 pl-4 text-left text-lg sm:w-full"
                    placeholder="Enter verification code"
                  />
                </div>

                <Button
                  onClick={() => handleVerifyCode(values.email, verificationCode)}
                  disabled={verificationCode?.length !== 6}
                  variant="primary"
                  className="mt-2"
                >
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
