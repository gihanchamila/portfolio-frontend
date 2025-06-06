import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import GridContainer from './GridContainer'
import { Menu, X } from 'lucide-react'
import { ProfileImage } from '../assets'
import NavLinks from './NavLinks'
import { motion } from 'motion/react'
import { AnimatePresence } from 'motion/react'
import ResumeDownload from './utils/ResumeDownload'

const MobileMenu = ({ navLinks }) => {
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = "visible"; 
        }
        return () => {
            document.body.style.overflow = "auto"; 
        };
    }, [isOpen]); 

    return (
        <GridContainer>
            <header className='lg:hidden sm:grid sm:col-start-1 sm:col-end-5 sm:col-span-4 mt-5 mb-16 dark:bg-surface'>
                <div className='flex items-center justify-between w-full'>
                    <img src={ProfileImage} alt="profile" className='rounded-full sm:h-10 sm:w-10 xs:h-8 xs:w-8 bg-black' role='image'/>
                    <motion.div transition={{ duration: 0.2 }}>
                        {!isOpen && (
                            <Menu onClick={toggleMenu} aria-label="Toggle menu" className="cursor-pointer" />
                        )}
                    </motion.div>
                </div>
                {isOpen && (
                    <div 
                        className="fixed inset-0 bg-black opacity-50 z-40" 
                        onClick={toggleMenu} 
                        aria-label="Backdrop"
                    />
                )}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }} 
                            exit={{ x: '100%', }}
                            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                            ref={ref}
                            className="fixed top-0 right-0 z-50 sm:w-[20rem] xs:w-1-2 h-screen dark:bg-surface bg-white rounded-l-2xl flex flex-col px-10 py-5 overflow-hidden"
                        >
                            <div className="absolute top-8 right-7">
                                <X onClick={toggleMenu} className="cursor-pointer" />
                            </div>
                            <div className='mt-20 xs:flex md:block xs:flex-col xs:space-y-6 xs:w-auto'>
                                <NavLinks links={navLinks} />
                                <div className='mt-5'> 
                                    <ResumeDownload />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence> 
            </header>
        </GridContainer>
    )
}

export default MobileMenu
