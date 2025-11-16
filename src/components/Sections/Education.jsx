import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    className="relative mx-0 mb-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-neutral-200 bg-transparent p-6 transition-colors duration-300 dark:border-neutral-800"
    tabIndex={0}
    aria-label={`Education at ${edu.institute}`}
  >
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
      <h3 className="text-lg font-bold sm:text-xl">{edu.institute}</h3>
      <span className="text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
        {edu.year}
      </span>
    </div>

    <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
      {edu.degree && <span className="text-sm font-semibold">{edu.degree}</span>}
      <span className="text-xs text-neutral-400 dark:text-neutral-500">{edu.location}</span>
    </div>

    <div className="flex items-center gap-2">{edu.grade && <Label>{edu.grade}</Label>}</div>

    {edu.highlights && (
      <ul className="mt-2 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
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
      className="relative scroll-mt-16 bg-transparent pb-12 text-left transition-colors duration-300"
      id="education"
      aria-label="Education Section"
    >
      <div className="mx-auto mb-12 max-w-3xl lg:mx-0 lg:mb-16 lg:max-w-5xl">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Education</h2>
      </div>

      <div className="relative flex flex-col items-start">
        <div
          className="absolute z-0 hidden sm:top-5 sm:block"
          style={{
            height: '100%',
            width: '2px',
            borderRadius: '1px',
            left: '8px',
            background: 'linear-gradient(to bottom, var(--color-primary), transparent 90%)'
          }}
        />

        <div className="gap-auto flex w-full flex-col lg:pl-12">
          {educationData.map((edu, idx) => (
            <EducationCard edu={edu} key={idx} />
          ))}
        </div>

        <div className="hidden flex-shrink-0 lg:block"></div>
      </div>
    </section>
  );
};

export default Education;
