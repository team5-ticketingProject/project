import React from "react";
import './Payment.css';
import CloseIcon from '@mui/icons-material/Close';

const PaymentModal = ({ content, onClose }) => {
  return (
    <div className="pay_modal">
      <div className="pay_modal_con">
        <div>     
          <button className="pay_modal_but" onClick={onClose}><CloseIcon/></button>
        </div>
        <div className="pay_modal_content">
          {content}
        </div>
      </div>
    </div>  
  );
};

export default PaymentModal;