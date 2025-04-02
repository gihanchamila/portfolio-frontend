import React from 'react'
import ContactForm from '../utils/ContactForm'

const ContactSection = () => {
  return (
    <section className='pb-12'>
      <header className='pb-8'>
          <h2 className="text-4xl text-center font-bold font-primary">
              Let's connect and explore how we can work together.
          </h2>
      </header>
      <main className='lg:flex gap-5'>
        <div className='flex justify-center items-center w-1/2'>
        </div>
        <ContactForm />
      </main>
    </section>
    
  )
}

export default ContactSection