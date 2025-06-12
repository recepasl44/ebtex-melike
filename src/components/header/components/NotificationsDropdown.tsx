// src/components/header/components/NotificationsDropdown.tsx
import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SpkDropdown from "../../../@spk-reusable-components/reusable-uielements/spk-dropdown";
import SpkBadge from "../../../@spk-reusable-components/reusable-uielements/spk-badge";
import { RootState } from "../../../store";

// Bildirim ikonu için iki farklı SVG
import bellLight from "../../../assets/images/media/bell.svg";
import bellDark from "../../../assets/images/media/bell-dark.svg";

interface Notification {
  id: number;
  heading: string;
  text: string;
  time: string;
}

const NotificationsDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      heading: "New Messages",
      text: "Jane Sam sent you a message.",
      time: "Now",
    },
    // İsterseniz ek bildirimler...
  ]);

  const [unreadCount, setUnreadCount] = useState(notifications.length);

  // Redux Store'dan dark/light bilgisi
  const localVariable = useSelector((state: RootState) => state.ui);
  // Dark moddaysak bellDark, yoksa bellLight kullan
  const iconSrc = localVariable.dataThemeMode === "dark" ? bellDark : bellLight;

  const handleRemoveNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((c) => c - 1);
  };

  return (
    <SpkDropdown
      Togglevariant=""
      Customclass="header-element country-selector"
      Customtoggleclass="header-link dropdown-toggle no-caret"
      Navigate="#!"
      Id="messageDropdown"
      Svg={false}
      Toggletext={
        <img
          src={iconSrc}
          alt="Notifications"
          style={{ width: 14, height: 14 }}
        />
      }
    >
      <div className="p-3 d-flex align-items-center justify-content-between">
        <p className="mb-0 fs-15 fw-medium">Notifications</p>
        <SpkBadge
          variant="secondary"
          Customclass="text-fixed-white"
          Id="notification-data"
        >
          {unreadCount} Unread
        </SpkBadge>
      </div>
      <div className="dropdown-divider"></div>
      <SimpleBar className="list-unstyled mb-0" id="header-notification-scroll">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <li className="dropdown-item" key={n.id}>
              <div className="d-flex align-items-center">
                <div className="pe-2 lh-1">
                  <span className="avatar avatar-md avatar-rounded bg-primary"></span>
                </div>
                <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="mb-0 fw-medium">
                      <Link to="#!">{n.heading}</Link>
                    </p>
                    <div className="text-muted fw-normal fs-12 header-notification-text text-truncate">
                      {n.text}
                    </div>
                    <div className="fw-normal fs-10 text-muted op-8">
                      {n.time}
                    </div>
                  </div>
                  <div>
                    <Link
                      to="#!"
                      className="min-w-fit-content dropdown-item-close1"
                      onClick={() => handleRemoveNotification(n.id)}
                    >
                      <i className="ri-close-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="p-5 empty-item1">
            <div className="text-center">
              <span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
                <i className="ri-notification-off-line fs-2"></i>
              </span>
              <h6 className="fw-medium mt-3">No New Notifications</h6>
            </div>
          </div>
        )}
      </SimpleBar>
      {notifications.length > 0 && (
        <div className="p-3 empty-header-item1 border-top">
          <div className="d-grid">
            <Link to="#!" className="btn btn-primary btn-wave">
              View All
            </Link>
          </div>
        </div>
      )}
    </SpkDropdown>
  );
};

export default NotificationsDropdown;
