import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

function Modal({ children, title, setOpenModal }) {
  const navigate = useNavigate();

  return ReactDOM.createPortal(
    <div className="Modal-container">
      <div className="Modal-container-body">
        <div className="Modal-header">
          <p>{title || "Modal Title"}</p>
          <span onClick={() => setOpenModal(false)}>X</span>
        </div>
        <div className="Modal-body">{children}</div>
        <div className="Modal-footer">
          <button
            className="Modal-button--ok"
            onClick={() => {
              setOpenModal(false);
              navigate("/");
            }}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export { Modal };
