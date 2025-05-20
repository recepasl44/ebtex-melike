// src/components/header/components/Logo.tsx
import React from "react";
import { Link } from "react-router-dom";

import open_logo from "../../../assets/images/brand-logos/open-logo.svg";
import close_logo from "../../../assets/images/brand-logos/close-logo.svg";

interface ILogoProps {
  baseUrl: string;
}

const Logo: React.FC<ILogoProps> = ({ baseUrl }) => (
  <div className="horizontal-logo">
    <Link to={`${baseUrl}dashboard/sales`} className="header-logo">
      <img src={open_logo} alt="logo" className="desktop-logo" />
      <img src={close_logo} alt="logo" className="toggle-dark" />
      <img src={open_logo} alt="logo" className="desktop-dark" />
      <img src={close_logo} alt="logo" className="toggle-logo" />
      <img src={close_logo} alt="logo" className="toggle-white" />
      <img src={open_logo} alt="logo" className="desktop-white" />
    </Link>
  </div>
);

export default Logo;
