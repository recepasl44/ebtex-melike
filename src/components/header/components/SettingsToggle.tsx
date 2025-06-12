import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

// İki farklı tema için ikon importları
import settingsLight from "../../../assets/images/media/settings.svg";
import settingsDark from "../../../assets/images/media/settings-dark.svg";

const SettingsToggle: React.FC = () => {
  // Redux Store'dan dark/light bilgisi
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Tema durumuna göre ikon seçimi
  const iconSrc = isDark ? settingsDark : settingsLight;

  // Offcanvas'ı açan fonksiyon
  const toggleSettingsCanvas = () => {
    document.querySelector(".offcanvas-end")?.classList.toggle("show");
  };

  return (
    <li className="header-element">
      <Link
        to="#!"
        className="header-link switcher-icon"
        data-bs-toggle="offcanvas"
        data-bs-target="#switcher-canvas"
        onClick={toggleSettingsCanvas}
      >
        <img src={iconSrc} alt="Settings" style={{ width: 14, height: 14 }} />
      </Link>
    </li>
  );
};

export default SettingsToggle;
