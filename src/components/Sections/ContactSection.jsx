import React from 'react'
import ContactForm from '../utils/ContactForm'

const ContactSection = () => {
  return (
    <section>
      <header className='pb-8'>
          <h2 className="text-4xl text-center font-bold font-primary">
              Let's connect and explore how we can work together.
          </h2>
      </header>
      <ContactForm />
    </section>
    
  )
}

export default ContactSection