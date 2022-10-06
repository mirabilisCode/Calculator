import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <LinkElement href="/">Standard</LinkElement>
        <LinkElement href="/bmi">BMI</LinkElement>
      </ul>
    </nav>
  );
};

const LinkElement: React.FC<LinkElementProps> = ({ href, children, ...props }): JSX.Element => {
  const pathName = window.location.pathname;

  return (
    <li className={pathName === href ? "active" : ""}>
      <a href={href} {...props}>
        {children}
      </a>
    </li>
  );
};

interface LinkElementProps {
  href: `/${string}`;
  children: any;
  [x: string]: any;
}

export default Nav;
