import React from 'react';

const GlobalSpinner: React.FC = () => {
  const Colorspinner = [
    { color: "primary" },
    { color: "secondary" },
    { color: "success" },
    { color: "danger" },
    { color: "warning" },
    { color: "info" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Colorspinner.map((obj, idx) => (
        <div key={idx} className={`spinner-border me-2 text-${obj.color}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ))}
    </div>
  );
};

export default GlobalSpinner;
