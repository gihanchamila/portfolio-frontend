import Reveal from './Reveal';
import clsx from 'clsx';

const Title = ({ text, align = 'left', className }) => {
  return (
    <Reveal>
      <h2
        className={clsx(
          'xs:text-3xl font-primary font-bold sm:text-4xl pb-8',
          {
            'text-left': align === 'left',
            'text-center': align === 'center',
            'text-right': align === 'right'
          },
          className
        )}
      >
        {text}
      </h2>
    </Reveal>
  );
};

export default Title;
