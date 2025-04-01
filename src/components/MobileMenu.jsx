import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import GridContainer from './GridContainer'
import { Menu, X } from 'lucide-react'
import { ProjectImage } from '../assets'
import NavLinks from './NavLinks'
import { motion } from 'motion/react'
import { AnimatePresence } from 'motion/react'
import Button from './utils/Button'

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
            <header className='lg:hidden sm:grid sm:col-start-1 sm:col-end-5 sm:col-span-4 mt-5 mb-5'>
                <div className='flex items-center justify-between w-full'>
                    <img src={ProjectImage} alt="profile" className='rounded-full h-12 w-12 bg-black' role='image'/>
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
                            className="fixed top-0 right-0 z-50 w-[20rem] h-screen bg-white rounded-l-2xl flex flex-col px-5 py-5 overflow-hidden"
                        >
                            <div className="absolute top-8 right-7">
                                <X onClick={toggleMenu} className="cursor-pointer" />
                            </div>
                            <div className='mt-20'>
                                <NavLinks links={navLinks} />
                                <Button variant="primary" className="px-4 py-2 font-semibold w-[8rem] mt-10" aria-label="View Resume">
                                    <NavLink to="/resume">Resume</NavLink>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>  
            </header>
        </GridContainer>
    )
}

export default MobileMenu
