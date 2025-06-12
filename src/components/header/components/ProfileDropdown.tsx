// src/components/header/components/ProfileDropdown.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import face15 from "../../../assets/images/faces/15.jpg";
import SpkDropdown from "../../../@spk-reusable-components/reusable-uielements/spk-dropdown";
import { auth } from "../../../authentication/firebaseapi";

const ProfileDropdown: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    auth.signOut();
    navigate(`${import.meta.env.BASE_URL}firebase/login`);
  };

  return (
    <SpkDropdown
      Customclass="header-element"
      toggleas="a"
      Navigate="#!"
      Customtoggleclass="header-link no-caret"
      Id="mainHeaderProfile"
      Imagetag
      Imageclass="d-flex align-items-center avatar avatar-sm"
      Imagesrc={face15}
      Menuclass="main-header-dropdown pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
      Menulabel="mainHeaderProfile"
    >
      <Dropdown.Item className="text-center border-bottom">
        <div>
          <span>Mr.Henry</span>
          <span className="d-block fs-12 text-muted">UI/UX Designer</span>
        </div>
      </Dropdown.Item>
      <li>
        <Link
          className="dropdown-item d-flex align-items-center"
          to={`${import.meta.env.BASE_URL}pages/profile`}
        >
          <i className="fe fe-user p-1 rounded-circle bg-primary-transparent me-2 fs-16"></i>
          Profil
        </Link>
      </li>

      <li>
        <Link
          className="dropdown-item d-flex align-items-center"
          to={`${import.meta.env.BASE_URL}pages/`}
        >
          <i className="bi bi-translate p-1 rounded-circle bg-primary-transparent me-2 fs-16"></i>
          Dil
        </Link>
      </li>
      <li>
        <Link
          className="dropdown-item d-flex align-items-center"
          to={`${import.meta.env.BASE_URL}pages/email/mail-settings`}
        >
          <i className="fe fe-settings p-1 rounded-circle bg-primary-transparent me-2 fs-16"></i>
          Ayarlar
        </Link>
      </li>
      <li>
        <Link
          className="dropdown-item d-flex align-items-center"
          to={`${import.meta.env.BASE_URL}pages/chat`}
        >
          <i className="fe fe-help-circle p-1 rounded-circle bg-primary-transparent me-2 fs-16"></i>
          Yardım
        </Link>
      </li>

      <li>
        <Link
          className="dropdown-item d-flex align-items-center"
          to={`${import.meta.env.BASE_URL}pages/email/mail-app`}
        >
          <i className="fe fe-mail p-1 rounded-circle bg-primary-transparent me-2 fs-16"></i>
          Mail
        </Link>
      </li>
      <li>
        <a
          className="dropdown-item d-flex align-items-center"
          href="#!"
          onClick={handleSignOut}
        >
          <i className="fe fe-lock p-1 rounded-circle bg-primary-transparent me-2 fs-16"></i>
          Çıkış
        </a>
      </li>
    </SpkDropdown>
  );
};

export default ProfileDropdown;
