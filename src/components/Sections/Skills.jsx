import React from 'react';
import ScrollVelocity from '../utils/ScrollVelocity';

const Skills = () => {
  return (
    <section className="relative xs:pb-15 xs:hidden lg:hidden lg:pb-20">
      <ScrollVelocity
        texts={['Crafting clean, scalable software — one deliberate line at a time.']}
        className="font-primary xs:mt-25 text-blue-500 sm:mt-0 lg:mt-20 dark:text-blue-300"
      />
    </section>
  );
};

export default Skills;
