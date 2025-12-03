import NavItem from './NavItem';

const NavLinks = ({ links }) => {
  return (
    <div className="font-primary xs:text-base flex w-full flex-col gap-y-10 font-bold md:text-xl lg:flex-row lg:gap-5">
      {links.map(link => (
        <NavItem key={link.to} link={link} />
      ))}
    </div>
  );
};

export default NavLinks;
