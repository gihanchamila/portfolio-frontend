import React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Asterisk } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { motion } from 'motion/react'
import { useAuth } from '../../context/AuthContext'
import axios from '../../axios/axios'
import * as Yup from 'yup'
import Button from './Button'
import { p } from 'motion/react-client'

const LoginForm = () => {

    const {toast} = useToast()
    const { signIn } = useAuth() 

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

    const validationSchema = Yup.object({
        email : Yup.string()
            .required("Email is required")
            .email("Please enter a valid email address"),
        password : Yup.string()
            .required("Password is required")
            .min(6)
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    })


  return (
    <div className='lg:bg-on-background lg:py-12 lg:px-10 rounded-2xl mb-4 lg:w-1/3 xs:w-full xs:p-4'>
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                const { email, password } = values;
                const result = await signIn(email, password);
                if (result?.success === true) {
                    toast(`${result.message}`)
                    } else {
                    toast(`${result.message}`);
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
            <>
                <p className='lg:text-4xl xs:text-xl lg:text-left font-semibold font-primary mb-4'>Admin login</p>
                <Form>
                    <motion.div className="mb-4" variants={childVariant}>
                        <label htmlFor="email" className="formLable">Email <Asterisk className="text-red-500 inline-block align-super" size={10} /></label>
                        <Field 
                            type="email" 
                            name="email"
                            className="formInput" 
                        />
                        <ErrorMessage 
                            name="email" 
                            component="div" 
                            className="formError"
                        />
                    </motion.div>
                    <motion.div className="mb-4" variants={childVariant}>
                        <label htmlFor="password" className="formLable">Password <Asterisk className="text-red-500 inline-block align-super" size={10} /></label>
                        <Field 
                            type="password" 
                            name="password"
                            className="formInput" 
                        />
                        <ErrorMessage 
                            name="password" 
                            component="div"
                            className="formError"
                        />
                    </motion.div>
                    <Button type="submit" variant={'primary'} disabled={isSubmitting} className='mt-6'>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>
            </> 
            )}
        </Formik>
    </div>
  )
}

export default LoginForm