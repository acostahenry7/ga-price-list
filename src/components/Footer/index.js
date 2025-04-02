import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        position: "fixed",
        bottom: 0,
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#eeeeee",
        padding: "20px 0",
      }}
    >
      <p className="m-0" style={{ color: "rgba(0,0,0,0.7)" }}>
        <b>GRUPO AVANT</b>
      </p>
      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.4)" }}>
        Developed by TI Development Team
      </span>
    </footer>
  );
}
