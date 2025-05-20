import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";

interface SidebarToggleProps {
  local_varaiable: any;
  ThemeChanger: (updatedTheme: any) => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({
  local_varaiable,
  ThemeChanger,
}) => {
  const theme = useSelector((state: RootState) => state.ui);

  console.log("theme", theme);
  useEffect(() => {
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    } else {
      ThemeChanger({
        ...theme,
        toggled: local_varaiable.toggled ?? "",
      });
    }
  }, []); // Boş array -> sadece ilk renderda

  // 3) toggleSidebar event handler’ınız
  const toggleSidebar = () => {
    const sidemenuType = theme.dataNavLayout;
    const width = window.innerWidth;

    if (width >= 992) {
      if (sidemenuType === "vertical") {
        const verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;

        switch (verticalStyle) {
          case "closed":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            ThemeChanger({
              ...theme,
              toggled:
                theme.toggled === "close-menu-close" ? "" : "close-menu-close",
            });
            break;
          case "overlay":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            ThemeChanger({
              ...theme,
              toggled:
                theme.toggled === "icon-overlay-close"
                  ? ""
                  : "icon-overlay-close",
              iconOverlay: "",
            });
            break;
          case "icontext":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            ThemeChanger({
              ...theme,
              toggled:
                theme.toggled === "icon-text-close" ? "" : "icon-text-close",
            });
            break;
          case "doublemenu":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            } else {
              const sidemenu = document.querySelector(
                ".side-menu__item.active"
              );
              if (sidemenu) {
                ThemeChanger({ ...theme, toggled: "double-menu-open" });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    "double-menu-active"
                  );
                } else {
                  ThemeChanger({ ...theme, toggled: "double-menu-close" });
                }
              }
            }
            break;
          case "detached":
            ThemeChanger({
              ...theme,
              toggled:
                theme.toggled === "detached-close" ? "" : "detached-close",
              iconOverlay: "",
            });
            break;
          default:
            ThemeChanger({ ...theme, toggled: "" });
        }

        // navStyle switch
        switch (navStyle) {
          case "menu-click":
            ThemeChanger({
              ...theme,
              toggled:
                theme.toggled === "menu-click-closed"
                  ? ""
                  : "menu-click-closed",
            });
            break;
          case "menu-hover":
            ThemeChanger({
              ...theme,
              toggled:
                theme.toggled === "menu-hover-closed"
                  ? ""
                  : "menu-hover-closed",
            });
            break;
          case "icon-click":
            ThemeChanger({
              ...theme,
              toggled:
                theme.toggled === "icon-click-closed"
                  ? ""
                  : "icon-click-closed",
            });
            break;
          case "icon-hover":
            ThemeChanger({
              ...theme,
              toggled:
                theme.toggled === "icon-hover-closed"
                  ? ""
                  : "icon-hover-closed",
            });
            break;
        }
      }
    } else {
      // mobil
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, toggled: "open" });
        setTimeout(() => {
          // Tekrar store.getState() yapmak yerine,
          //  en başta aldığınız theme'i veya
          //  final local UI state'i “fresh” almamız lazımdı.
          //  Basit olsun diye yine theme kullanıyoruz
          if (theme.toggled === "open") {
            const overlay = document.querySelector("#responsive-overlay");
            overlay?.classList.add("active");
            overlay?.addEventListener("click", () => {
              overlay.classList.remove("active");
              if (window.innerWidth <= 992) {
                ThemeChanger({ ...theme, toggled: "close" });
              } else {
                ThemeChanger({
                  ...theme,
                  toggled: local_varaiable.toggled ?? "",
                });
              }
            });
          }
          window.addEventListener("resize", () => {
            if (window.innerWidth >= 992) {
              document
                .querySelector("#responsive-overlay")
                ?.classList.remove("active");
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, toggled: "close" });
      }
    }
  };

  return (
    <div className="header-element mx-lg-0 mx-2">
      <Link
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
        to="#!"
      >
        <span></span>
      </Link>
    </div>
  );
};

export default SidebarToggle;
