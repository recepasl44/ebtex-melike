import { Fragment } from "react";
import { connect } from "react-redux";
import { ThemeChanger } from "../common/ui/redux/action";

import Logo from "./components/Logo";
import SidebarToggle from "./components/SidebarToggle";
import ThemeToggle from "./components/ThemeToggle";
import FullscreenToggle from "./components/FullscreenToggle";
import SearchBar from "./components/SearchBar";
import NotificationsDropdown from "./components/NotificationsDropdown";
import ProfileDropdown from "./components/ProfileDropdown";
import searchButton from "../../assets/images/media/search.svg";
import searchButtonDark from "../../assets/images/media/search-dark.svg";

import { Modal, Form } from "react-bootstrap";
import SpkButton from "../../@spk-reusable-components/reusable-uielements/spk-button";
import React from "react";
import SettingsToggle from "./components/SettingsToggle";
import SeasonBranchSelector from "./components/SeasonBranchSelector";

const Header = ({ local_varaiable, ThemeChanger }: any) => {
  const [showModal, setShowModal] = React.useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Tema bilgisini alma
  const isDarkMode = local_varaiable?.ui?.dataThemeMode === "dark";
  // Tema durumuna göre arama ikonu seçimi
  const currentSearchIcon = isDarkMode ? searchButtonDark : searchButton;

  return (
    <Fragment>
      <header className="app-header sticky" id="header">
        <div className="main-header-container container-fluid">
          {/* Header Left */}
          <div className="header-content-left">
            {/* Logo */}
            <div className="header-element">
              <Logo baseUrl={import.meta.env.BASE_URL} />
            </div>
            {/* Sidebar Toggle */}
            <SidebarToggle
              local_varaiable={local_varaiable}
              ThemeChanger={ThemeChanger}
            />
            {/* Desktop Search */}
            <SearchBar />
          </div>

          {/* Header Right */}
          <ul className="header-content-right">
            {/* Mobilde arama butonu */}
            <li className="header-element d-md-none d-block">
              <a
                href="#!"
                onClick={handleShow}
                className="header-link d-flex align-items-center justify-content-center"
                style={{
                  padding: 0, // remove default padding
                  margin: 0, // remove default margin
                  marginRight: 4, // add margin to the right
                }}
              >
                <img
                  src={currentSearchIcon}
                  alt="Search"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </li>

            {/* Sezon ve Şube Seçimi - Birleştirildi */}
            <SeasonBranchSelector />

            {/* Tema (dark/light) */}
            <ThemeToggle />

            {/* Sepet */}

            {/* Bildirimler */}
            <NotificationsDropdown />

            {/* Fullscreen Toggle */}
            <FullscreenToggle />

            {/* Kullanıcı/Profil */}
            <ProfileDropdown />

            {/* Switcher Icon (Tema vb. ayarlar) */}
            <SettingsToggle />
          </ul>
        </div>
      </header>

      {/* Responsive Search Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        className="fade"
        id="header-responsive-search"
        tabIndex={-1}
        aria-labelledby="header-responsive-search"
      >
        <Modal.Body>
          <div className="input-group">
            <Form.Control
              type="text"
              className="border-end-0"
              placeholder="Search Anything ..."
              aria-label="Search Anything ..."
              aria-describedby="button-addon2"
            />
            <SpkButton
              Buttonvariant="primary"
              Buttontype="button"
              Id="button-addon2"
            >
              <i className="bi bi-search"></i>
            </SpkButton>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Header);
