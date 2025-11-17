import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();
const STORAGE_KEY = 'app-theme';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const systemDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const activeTheme = savedTheme || (systemDark ? 'dark' : 'light');
    setTheme(activeTheme);
    document.documentElement.classList.toggle('dark', activeTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
