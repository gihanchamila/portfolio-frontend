import React, { useState, useEffect, useCallback } from 'react';
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

const ContactForm = () => {
  const { toast } = useToast();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastCodeSentTime, setLastCodeSentTime] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [count, setCount] = useState(null);

  useDisableBackgroundScroll(isPopupOpen);

  useEffect(() => {
    if (!isEmailVerified || !count || count <= 0) return;

    const interval = setInterval(() => {
      setCount(prev => (prev > 0 ? prev - 1 : 0));
    }, 60000);

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

  const handleAxiosError = error => {
    const msg = error?.response?.data?.message || 'An error occurred';
    toast(msg, 'error', 3000, 'bottom-right');
  };

  const verifyEmail = useCallback(
    debounce(async (email, name) => {
      try {
        const now = Date.now();
        const cooldown = 5 * 60 * 1000;

        if (lastCodeSentTime && now - lastCodeSentTime < cooldown) {
          const minutesLeft = Math.ceil((cooldown - (now - lastCodeSentTime)) / 60000);
          toast(`Wait ${minutesLeft} minute(s) before requesting another code.`, 'error');
          return;
        }

        setIsPopupOpen(true);
        const res = await axios.post('/user/send-verification-code', { email, name });

        toast(res.data.message, 'success', 3000, 'bottom-right');
        setLastCodeSentTime(now);
        setCount(10);
      } catch (error) {
        handleAxiosError(error);
      }
    }, 500),
    [lastCodeSentTime]
  );

  const handleVerifyCode = async (email, code) => {
    try {
      const res = await axios.post('/user/verify-user', { code, email });
      toast(res.data.message, 'success', 3000, 'bottom-right');

      if (res.data.success === true) {
        setIsEmailVerified(true);
        setIsPopupOpen(false);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleEmailChange = (newEmail, verifiedEmail) => {
    if (verifiedEmail && newEmail !== verifiedEmail) {
      setIsEmailVerified(false);
      setVerificationCode('');
      setLastCodeSentTime(null);
      setCount(null);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setVerificationCode('');
  };

  return (
    <Formik
      initialValues={{ fullName: '', email: '', message: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setFieldValue }) => {
        try {
          const payload = {
            name: DOMPurify.sanitize(values.fullName),
            email: DOMPurify.sanitize(values.email),
            message: DOMPurify.sanitize(values.message)
          };

          console.log('Submitting payload:', payload);
          const res = await axios.post('/connect/make-connection', payload);
          console.log('Response received:', res.data);
          toast(res.data.message, 'success');
          setFieldValue('message', '');
          setCount(null);
        } catch (error) {
          console.error('Error during form submission:', error);
          handleAxiosError(error);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <div className="sm:w-full rounded-xl lg:w-1/2 lg:pt-5 xs:pt-0 border-none border-gray-200 dark:border-white/10">
          <h2 className="cardTitle pb-5">Fill in the form below to get in touch.</h2>
          <Form>
            <div className="mb-4">
              <label htmlFor="fullName" className="formLable">
                Full Name <Asterisk size={10} className="inline-block align-super text-red-500" />
              </label>
              <Field
                type="text"
                name="fullName"
                className="formInput"
                placeholder="e.g., Jane Doe"
              />
              <ErrorMessage name="fullName" component="div" className="formError" />
            </div>

            <div className="relative mb-4">
              <label htmlFor="email" className="formLable">
                Email <Asterisk size={10} className="inline-block align-super text-red-500" />
              </label>

              <Field
                type="email"
                name="email"
                disabled={isEmailVerified}
                className="formInput"
                placeholder="e.g., jane.doe@example.com"
                onChange={e => {
                  setFieldValue('email', e.target.value);
                  handleEmailChange(e.target.value, values.email);
                }}
              />

              <ErrorMessage name="email" component="div" className="formError" />
              {!isEmailVerified && values.email && (
                <p className="formError">You must verify your email before sending a message.</p>
              )}

              <div className="absolute -top-2 right-0 mt-2">
                {!isEmailVerified && values.email && (
                  <span
                    onClick={() => verifyEmail(values.email, values.fullName)}
                    className="font-primary cursor-pointer text-sm text-sky-500 hover:underline"
                  >
                    Verify Email
                  </span>
                )}

                {isEmailVerified && (
                  <span
                    onClick={() => {
                      setIsEmailVerified(false);
                      setCount(null);
                    }}
                    className="font-primary text-sm text-red-500 cursor-pointer hover:underline"
                  >
                    Change Email
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="formLable">
                Message <Asterisk size={10} className="inline-block align-super text-red-500" />
              </label>

              <Field
                as="textarea"
                name="message"
                rows="5"
                className="formInput caret-gray-200"
                placeholder="Tell me about your project…"
              />
              <ErrorMessage name="message" component="div" className="formError" />
            </div>

            <div className="flex justify-end">
              <Button variant="primary" type="submit" disabled={!isEmailVerified || isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>

            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
              <h2 className="cardTitle pb-5">Verify Your Email</h2>
              <p className="font-primary text-gray-800 dark:text-white">
                A verification code has been sent to your email. Please enter the code:
              </p>

              <div className="flex w-full justify-center py-6">
                <input
                  type="text"
                  maxLength="6"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  className="rounded-lg border-2 border-gray-500 py-2 pl-4 text-lg sm:w-full"
                  placeholder="Enter verification code"
                />
              </div>

              <Button
                onClick={() => handleVerifyCode(values.email, verificationCode)}
                disabled={verificationCode.length !== 6}
                variant="primary"
                className="mt-2"
              >
                Verify Code
              </Button>
            </Popup>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ContactForm;
