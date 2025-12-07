import Reveal from './Reveal';
import clsx from 'clsx';

const Title = ({ text, align = { xs: 'left' }, className }) => {
  const responsiveAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const alignmentClasses = Object.entries(align).map(([breakpoint, value]) => {
    const base = responsiveAlign[value] || 'text-left';
    if (breakpoint === 'xs') return base;
    return `${breakpoint}:${base}`;
  });

  return (
    <Reveal>
      <h2
        className={clsx(
          'xs:text-3xl font-primary font-bold sm:text-4xl pb-8',
          alignmentClasses,
          className
        )}
      >
        {text}
      </h2>
    </Reveal>
  );
};

export default Title;
