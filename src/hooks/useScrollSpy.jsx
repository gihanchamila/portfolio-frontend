import { useEffect, useState } from 'react';

export default function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let current = '';

      ids.forEach(id => {
        const section = document.querySelector(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();

        // When the section top reaches offset, mark it active
        if (rect.top <= offset && rect.bottom >= offset) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return active;
}
