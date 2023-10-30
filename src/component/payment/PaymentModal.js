import React from "react";
import './Payment.css';
import Button from '@mui/material/Button';

const Modal = ({ content, onClose }) => {
  return (
      <div className="modal-reserve">
        <div className="modal-content">{content}</div>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
  );
};

export default Modal;