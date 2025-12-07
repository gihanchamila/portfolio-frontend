import NavItem from './NavItem';
import useScrollSpy from '../hooks/useScrollSpy';

const NavLinks = ({ links, onItemClick }) => {
  const sectionIds = links.filter(link => link.to.startsWith('#')).map(link => link.to);

  const activeHash = useScrollSpy(sectionIds, 150); // 150 px from top
  return (
    <div className="font-primary xs:text-base flex w-full flex-col gap-y-10 font-bold md:text-xl lg:flex-row lg:gap-5">
      {links.map(link => (
        <NavItem key={link.to} link={link} activeHash={activeHash} onClick={onItemClick} />
      ))}
    </div>
  );
};

export default NavLinks;
