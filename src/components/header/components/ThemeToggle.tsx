// src/components/header/components/ThemeToggle.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeChanger } from "../../common/ui/redux/action";
import store from "../../../store"; // UYARI: Bazı projelerde circular dependency olabilir
import { AppDispatch } from "../../../store";

import dark from "../../../assets/images/media/dark-light-mode-dark.svg";
import darkLight from "../../../assets/images/media/darkmode.svg";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Eski koddaki "toggledark" mantığını localStorage odaklı hale getirelim
  const toggledark = () => {
    // 1) Mevcut tema "dark" mı?
    const isDark = localStorage.getItem("xintradarktheme") === "dark";
    // "dataNavLayout" da localStorage'da olabilir:
    const dataNavLayout = localStorage.getItem("dataNavLayout") || "vertical";

    // 2) İlk dispatch → dataThemeMode, dataHeaderStyles, dataMenuStyles güncelle
    dispatch(
      ThemeChanger({
        // "dark" moddaysak "light"a geçelim, değilsek "dark"a
        dataThemeMode: isDark ? "light" : "dark",
        dataHeaderStyles: isDark ? "light" : "dark",
        dataNavLayout: dataNavLayout,
        dataMenuStyles:
          dataNavLayout === "horizontal" ? (isDark ? "light" : "dark") : "dark",
      })
    );

    // 3) Store'dan anlık güncellenmiş UI state'ini al
    const theme = store.getState().ui;

    // 4) Eğer dark mod değilsek, bodyBg ve benzeri alanları sıfırla + localStorage
    if (theme.dataThemeMode !== "dark") {
      dispatch(
        ThemeChanger({
          ...theme,
          bodyBg: "",
          lightRgb: "",
          bodyBg2: "",
          inputBorder: "",
          formControlBg: "",
          gray: "",
        })
      );
      localStorage.setItem("xintralighttheme", "light");
      localStorage.removeItem("xintradarktheme");
      localStorage.removeItem("xintraMenu");
      localStorage.removeItem("xintraHeader");
    } else {
      // 5) Dark moda geçtik → localStorage'ı güncelle
      localStorage.setItem("xintradarktheme", "dark");
      localStorage.removeItem("xintralighttheme");
      localStorage.removeItem("xintraMenu");
      localStorage.removeItem("xintraHeader");
    }
  };

  // Arayüzde, "şu an dark mı?" bilgisini localStorage'dan okuyarak ikon seçelim
  const isDark = localStorage.getItem("xintradarktheme") === "dark";

  return (
    <li className="header-element header-theme-mode">
      <Link to="#!" className="header-link layout-setting" onClick={toggledark}>
        {isDark ? (
          <img src={dark} alt="Light Icon" />
        ) : (
          <img src={darkLight} alt="Dark Icon" />
        )}
      </Link>
    </li>
  );
};

export default ThemeToggle;
