import Reveal from './Reveal';

const Title = ({ text, className }) => {
  return (
    <Reveal>
      <h2 className={className || 'xs:text-3xl font-primary font-bold sm:text-4xl pb-8'}>{text}</h2>
    </Reveal>
  );
};

export default Title;
