import { useEffect, useState } from 'react';

export default function useHeaderScroll() {
  const SHRINK_POINT = 550;
  const EXPAND_POINT = 500;

  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (!isShrunk && y > SHRINK_POINT) {
        setIsShrunk(true);
      }

      if (isShrunk && y < EXPAND_POINT) {
        setIsShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isShrunk]);

  return isShrunk;
}
