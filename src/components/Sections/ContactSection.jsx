import React from 'react';
import ContactForm from '../utils/ContactForm';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';

const ContactDetailCard = React.memo(({ icon: Icon, text }) => {
  return (
    <div className="flex items-center gap-4 bg-sky-50 text-sky-700 p-4 rounded-lg w-full max-w-sm sm:my-5 lg:my-0">
      <a target='_blank' href={`mailto:algihanchamila@gmail.com`}><Icon className="text-primary font-primary" size={24} /></a>
      <span className="sm:text-lg xs:text-sm font-medium font-primary">{text}</span>
    </div>
  );
})

const ContactSection = () => {
  return (
    <section id="contact" className="pb-20">
      <header className="pb-8">
        <h2 className="text-4xl text-center font-bold font-primary">
          Let's connect and explore how we can work together.
        </h2>
      </header>
      <main className="lg:flex gap-5">
        <div className="lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-1/2 sm:w-full sm:text-lg xs:space-y-6 xs:mb-5 sm:mb-0">
          <p className="xs:text-center lg:text-left sm:text-xl xs:text-base xs:font-primary text-gray-800 dark:text-gray-50 max-w-sm font-bold">
            Feel free to reach out to me! Whether it's a 
            <span className="text-purple-500 dark:text-purple-300"> project collaboration</span>, a question, 
            or just a <span className="text-orange-500 dark:text-red-300">friendly hello</span>  
            <motion.span
              className="inline-block"
              whileHover={{
                rotate: [0, 10, -10, 10, -10, 0], // Smooth waving motion
                transition: { duration: 0.6, ease: "easeInOut" },
              }}
            >
              👋
            </motion.span>,  
            <span className="text-green-500 dark:text-green-300">I'm always happy to connect.</span> 
          </p>
          <ContactDetailCard icon={Mail} text={'algihanchamila@gmail.com'} />
        </div>
        <ContactForm />
      </main>
    </section>
  );
};

export default ContactSection;
