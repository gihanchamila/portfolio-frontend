import React from 'react'
import ContactForm from '../utils/ContactForm'
import { Mail, Phone } from 'lucide-react'
import SectionLabel from '../utils/SectionLabel'
import { motion } from 'motion/react'

const ContactDetailCard = React.memo(({ icon: Icon, text }) => {
  return (
    <div className="xs:p-2 xs:mt-5 flex w-full max-w-sm items-center gap-5 rounded-lg bg-sky-50 text-sky-700 sm:my-5 sm:p-3 lg:my-0 lg:p-4">
      <a target="_blank" href={`mailto:algihanchamila@gmail.com`}>
        <Icon className="text-primary font-primary" size={24} />
      </a>
      <span className="xs:text-sm font-primary font-medium sm:text-lg">{text}</span>
    </div>
  )
})

const ContactSection = () => {
  return (
    <section id="contact" className="pb-20">
      <header className="pb-8">
        <motion.h2
          className="xs:xs:text-3xl font-primary text-center font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's connect and explore how we can work together.
        </motion.h2>
      </header>
      <motion.main
        className="lg:flex lg:items-center lg:justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        <motion.div
          className="xs:space-y-6 xs:mb-5 sm:text sm:mb-0 sm:text-lg"
          variants={{
            hidden: { opacity: 0, y: 30 }, // start 30px below
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }, // animate up to y=0
          }}
        >
          <p className="xs:text-center xs:text-base xs:font-primary max-w-sm font-bold text-gray-800 sm:text-xl lg:text-left dark:text-gray-50">
            Feel free to reach out to me! Whether it's a
            <span className="text-purple-500 dark:text-purple-300"> project collaboration</span>, a
            question, or just a{' '}
            <span className="text-orange-500 dark:text-red-300">friendly hello</span>
            <motion.span
              className="inline-block"
              whileHover={{
                rotate: [0, 10, -10, 10, -10, 0],
                transition: { duration: 0.6, ease: 'easeInOut' },
              }}
            >
              👋
            </motion.span>
            ,
            <span className="text-green-500 dark:text-green-300">I'm always happy to connect.</span>
          </p>
          <ContactDetailCard icon={Mail} text={'algihanchamila@gmail.com'} />
        </motion.div>
        <ContactForm />
      </motion.main>
    </section>
  )
}

export default ContactSection
