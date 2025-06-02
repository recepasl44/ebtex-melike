import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fullscreenOpen from "../../../assets/images/media/fullscreen.svg";
import fullscreenClose from "../../../assets/images/media/fullscreen-close.svg";
import FullscreenDark from "../../../assets/images/media/fullscreen-dark.svg";
import FullscreenCloseDark from "../../../assets/images/media/fullscreen-close-dark.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const FullscreenToggle: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Tema ve tam ekran durumuna göre doğru ikonu belirleyen fonksiyon
  const getIconSrc = () => {
    if (isDark) {
      return isFullscreen ? FullscreenCloseDark : FullscreenDark;
    } else {
      return isFullscreen ? fullscreenClose : fullscreenOpen;
    }
  };

  const toggleFullscreen = () => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
    };
  }, []);

  return (
    <li className="header-element header-fullscreen">
      <Link to="#!" className="header-link" onClick={toggleFullscreen}>
        <img
          src={getIconSrc()}
          alt={isFullscreen ? "Çıkış Tam Ekran" : "Tam Ekran"}
          style={{ width: 14, height: 14 }}
        />
      </Link>
    </li>
  );
};

export default FullscreenToggle;
