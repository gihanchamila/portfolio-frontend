import React from 'react'
import { NavLink } from 'react-router-dom'
import GridContainer from './GridContainer'
import NavLinks from './NavLinks'
import Button from './utils/Button'
import ResumeDownload from './utils/ResumeDownload'
import { useAuth } from '../context/AuthContext'
import { LogOut } from 'lucide-react'

const DesktopMenu = ({navLinks}) => {
    const {admin, signOut} = useAuth()
  return (
        <GridContainer>
            <header className={`hidden sm:col-start-1 sm:col-end-4 lg:grid col-span-4 lg:col-start-2 lg:col-end-12 lg:col-span-10 mt-13 mb-12 py-5 rounded-lg`}>
                <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-5">
                    <NavLinks links={navLinks} />
                    <ResumeDownload />
                    {admin && (
                        <div className="hidden lg:flex lg:gap-5">
                            <span variant="primary" className='bg-on-surface rounded-full p-3' size="small" onClick={() => signOut()}><LogOut size={15}/></span>
                        </div>
                    )}
                </div>
            </header>
        </GridContainer>
  )
}

export default DesktopMenu