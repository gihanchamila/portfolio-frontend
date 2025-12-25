import React from 'react';
import ContactForm from '../utils/ContactForm';
import { Mail, Phone } from 'lucide-react';
import Reveal from '../utils/Reveal';
import Title from '../utils/Title';
import { motion } from 'framer-motion';

const ContactDetailCard = React.memo(({ icon: Icon, label, text, href, delay = 0 }) => {
  return (
    <motion.a
      href={href}
      target={href?.startsWith('mailto:') ? '_blank' : undefined}
      rel={href?.startsWith('mailto:') ? 'noreferrer' : undefined}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className="group flex w-full max-w-sm items-center gap-4 rounded-xl border border-gray-200 p-3 text-sky-700 backdrop-blur-sm hover:border-sky-500 hover:dark:border-white/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-white/10 dark:bg-white/5 dark:text-sky-200"
      aria-label={label}
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/80 dark:bg-white/10">
        <Icon className="text-sky-600 dark:text-sky-200" size={22} />
      </span>

      <span className="flex flex-col">
        <span className="xs:text-sm xs:font-semibold font-primary block text-gray-700 sm:text-sm lg:text-base dark:text-gray-50">
          {label}
        </span>
        <span className="xs:text-sm xs:font-normal font-primary  block text-gray-700 sm:text-sm lg:text-base dark:text-gray-50">
          {text}
        </span>
      </span>
    </motion.a>
  );
});

const ContactSection = () => {
  const email = 'algihanchamila@gmail.com';
  const phone = '0766232157';

  return (
    <section id="contact" className="scrollMargin pb-12">
      <Title align={{ xs: 'center' }} text="Open to Collaboration" />

      <Reveal>
        <main className="lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="xs:mb-6 xs:space-y-5 xs:pb-8 sm:mb-0 sm:text-lg lg:pb-0">
            <p className="xs:text-center max-w-sm text-base font-bold text-gray-800 sm:text-xl lg:text-left dark:text-gray-50">
              Feel free to reach out to me! Whether it's a
              <span className="text-purple-500 dark:text-purple-300"> project collaboration</span>,
              a question, or just a{' '}
              <span className="text-orange-500 dark:text-red-300">friendly hello</span>
              <span className="inline-block"> 👋 </span>,
              <span className="text-green-500 dark:text-green-300">
                {" I'm always happy to connect."}
              </span>
            </p>

            <address className="not-italic">
              <div className="mx-auto flex max-w-sm flex-col gap-3 lg:mx-0">
                <ContactDetailCard
                  icon={Phone}
                  label="Phone"
                  text={phone}
                  href={`tel:${phone}`}
                  delay={0.05}
                />
                <ContactDetailCard
                  icon={Mail}
                  label="Email"
                  text={email}
                  href={`mailto:${email}`}
                  delay={0.12}
                />
              </div>
            </address>
          </div>

          <ContactForm />
        </main>
      </Reveal>
    </section>
  );
};

export default ContactSection;
