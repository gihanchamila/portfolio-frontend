import React from 'react';
import { useNavigate } from 'react-router-dom';
import Reveal from '../utils/Reveal';
import { motion } from 'framer-motion';
import Title from '../utils/Title';
import { educationImage } from '../../assets';

const educationData = [
  {
    institute: 'Sri Lanka Institute of Information Technology ',
    year: '2025 - 2029',
    grade: 'Pending',
    degree: 'B.Sc.(Hons) in Information Technology',
    location: 'Matara Center, Sri Lanka'
  },
  {
    institute: 'Esoft Metro Campus',
    year: '2023 - 2024',
    grade: 'Distinction',
    degree: 'Diploma in Information Technology',
    location: 'Matara Center, Sri Lanka'
  },
  {
    institute: 'Mahinda Rajapaksa college',
    year: '2018 - 2020',
    degree: 'Physical Stream',
    location: 'Matara, Sri Lanka'
  }
];

export const Label = ({ children, link }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!link) return;
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };

  return (
    <span
      className="inline-block cursor-pointer rounded px-2 py-1 text-xs font-semibold"
      style={{
        background: 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
        color: 'var(--color-primary)'
      }}
      onClick={handleClick}
    >
      {children}
    </span>
  );
};

const EducationCard = ({ edu }) => (
  <div
    className="relative mx-0 mb-8 flex w-full max-w-154 flex-col gap-3 rounded-xl border border-gray-200 bg-transparent p-6 transition-colors duration-300 dark:border-white/10 hover:border-sky-500"
    tabIndex={0}
    aria-label={`Education at ${edu.institute}`}
  >
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold sm:text-xl max-w-sm">{edu.institute}</h3>

        {edu.location && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{edu.location}</span>
        )}
      </div>
      {edu.year && (
        <span className="text-xs sm:text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400 mt-1 sm:mt-0">
          {edu.year}
        </span>
      )}
    </div>

    {edu.degree && (
      <div className="mt-1">
        <span className="text-sm font-semibold">{edu.degree}</span>
      </div>
    )}

    {edu.grade && (
      <div className="flex items-center gap-2 mt-1">
        <Label>{edu.grade}</Label>
      </div>
    )}

    {edu.highlights && (
      <ul className="mt-3 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
        {edu.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    )}
  </div>
);

const Education = () => {
  const ref = React.useRef(null);

  return (
    <section
      ref={ref}
      className="relative  bg-transparent pb-12 text-left transition-colors duration-300 scrollMargin"
      id="education"
      aria-label="Education Section"
    >
      <Title text="Education" />

      <div className="relative flex flex-col lg:flex-row lg:items-stretch gap-0 lg:gap-12 w-full">
        <div className="flex flex-col flex-1 w-full h-full last:mb-0">
          {educationData.map((edu, idx) => (
            <Reveal delay={idx * 0.1} key={idx}>
              <EducationCard edu={edu} />
            </Reveal>
          ))}
        </div>

        <div className="hidden lg:flex flex-1 h-full justify-end items-stretch">
          <img
            src={educationImage}
            fetchPriority="high"
            loading="lazy"
            role="img"
            alt="Education Illustration"
            className="rounded-2xl w-full square-aspect object-fill"
          />
        </div>
      </div>
    </section>
  );
};

export default Education;
