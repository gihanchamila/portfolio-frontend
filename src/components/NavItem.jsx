import { NavLink, useNavigate } from 'react-router-dom';

const NavItem = ({ link }) => {
  const navigate = useNavigate();
  const isHash = link.to.startsWith('#');

  const handleClick = e => {
    if (!isHash) return;

    e.preventDefault();
    document.querySelector(link.to)?.scrollIntoView({ behavior: 'smooth' });
  };

  return isHash ? (
    <a href={link.to} onClick={handleClick} className="navLink">
      {link.name}
    </a>
  ) : (
    <NavLink
      to={link.to}
      className={({ isActive }) => (isActive ? 'text-sky-500 dark:text-sky-300' : 'navLink')}
    >
      {link.name}
    </NavLink>
  );
};

export default NavItem;
