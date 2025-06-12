// D:\xintra_react_ts\src\components\header\components\LanguageDropdown.tsx
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import SpkDropdown from "../../../@spk-reusable-components/reusable-uielements/spk-dropdown";
import translateLight from "../../../assets/images/media/translate.svg";
import translateDark from "../../../assets/images/media/translate-dark.svg";
import usFlag from "../../../assets/images/flags/us_flag.jpg";
import spainFlag from "../../../assets/images/flags/spain_flag.jpg";

const LanguageDropdown: React.FC = () => {
  // Redux Store'dan dark/light kontrol
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";
  const iconSrc = isDark ? translateDark : translateLight;

  return (
    <SpkDropdown
      Customclass="header-element country-selector"
      autoClose="outside"
      toggleas="a"
      Navigate="#!"
      Customtoggleclass="header-link dropdown-toggle no-caret"
      Menuclass="main-header-dropdown dropdown-menu-end"
      Align="end"
      Toggletext={
        <img
          src={iconSrc}
          alt="Translate Icon"
          style={{ width: 14, height: 14 }}
        />
      }
    >
      <li>
        <Dropdown.Item className="d-flex align-items-center" href="#!">
          <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
            <img
              src={usFlag}
              alt="English"
              style={{ width: "100%", height: "auto" }}
            />
          </span>
          English
        </Dropdown.Item>
      </li>
      <li>
        <Dropdown.Item className="d-flex align-items-center" href="#!">
          <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
            <img
              src={spainFlag}
              alt="Spanish"
              style={{ width: "100%", height: "auto" }}
            />
          </span>
          Español
        </Dropdown.Item>
      </li>
      {/** ... diğer diller veya ek seçenekler */}
    </SpkDropdown>
  );
};

export default LanguageDropdown;
