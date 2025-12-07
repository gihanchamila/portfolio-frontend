import React from 'react';
import ContactForm from '../utils/ContactForm';
import { Mail, Phone } from 'lucide-react';
import SectionLabel from '../utils/SectionLabel';
import Reveal from '../utils/Reveal';
import Title from '../utils/Title';

const ContactDetailCard = React.memo(({ icon: Icon, text }) => {
  return (
    <div className="xs:p-2 xs:mt-5 flex w-full max-w-sm items-center gap-5 rounded-lg bg-sky-50 text-sky-700 sm:my-5 sm:p-3 lg:my-0 lg:p-4">
      <a target="_blank" href={`mailto:algihanchamila@gmail.com`}>
        <Icon className="text-primary font-primary" size={24} />
      </a>
      <span className="xs:text-sm font-primary font-medium sm:text-lg">{text}</span>
    </div>
  );
});

const ContactSection = () => {
  return (
    <section id="contact" className="pb-12 lg:scroll-mt-26 xs:scroll-mt-42">
      <Title align={{ xs: 'center' }} text={`Open to Collaboration`} />
      <Reveal>
        <main className="lg:flex lg:items-center lg:justify-between">
          <div className="xs:space-y-6 xs:mb-5 sm:text sm:mb-0 sm:text-lg">
            <p className="xs:text-center xs:text-base xs:font-primary max-w-sm font-bold text-gray-800 sm:text-xl lg:text-left dark:text-gray-50">
              Feel free to reach out to me! Whether it's a
              <span className="text-purple-500 dark:text-purple-300"> project collaboration</span>,
              a question, or just a{' '}
              <span className="text-orange-500 dark:text-red-300">friendly hello</span>
              <span className="inline-block"> 👋 </span>,
              <span className="text-green-500 dark:text-green-300">
                I'm always happy to connect.
              </span>
            </p>

            <ContactDetailCard icon={Mail} text={'algihanchamila@gmail.com'} />
          </div>
          <ContactForm />
        </main>
      </Reveal>
    </section>
  );
};

export default ContactSection;
