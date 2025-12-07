import { NavLink, useLocation } from 'react-router-dom';

const NavItem = ({ link, activeHash, onClick }) => {
  const isHash = link.to.startsWith('#');
  const { hash } = useLocation();

  const handleClick = e => {
    if (isHash) {
      e.preventDefault();
      const element = document.querySelector(link.to);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', link.to);
      }
    }

    if (onClick) onClick();
  };

  const isActive = isHash ? activeHash === link.to : link.to === '/' && activeHash === '';

  return isHash ? (
    <a
      href={link.to}
      onClick={handleClick}
      className={isActive ? 'text-sky-500 dark:text-sky-300' : 'navLink'}
    >
      {link.name}
    </a>
  ) : (
    <NavLink
      to={link.to}
      onClick={onClick}
      className={({ isActive: routeActive }) =>
        routeActive && activeHash === '' ? 'text-sky-500 dark:text-sky-300' : 'navLink'
      }
    >
      {link.name}
    </NavLink>
  );
};

export default NavItem;
