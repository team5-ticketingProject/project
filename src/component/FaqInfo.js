import React, { useState, useEffect } from "react";

function FaqInfo(props) {
  const [selectedFaq, setSelectedFaq] = useState(null);

  useEffect(() => {
    if (props.selectedFaq) {
      setSelectedFaq(props.selectedFaq);
    }
    
  }, [props.selectedFaq]);

  const goBacktoFaq = () => {
   
    props.openModal("Faq", null);
    setSelectedFaq(null);
   
  };

  return (
    <div className="FAQ">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h1
          style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {selectedFaq ? selectedFaq.question : "No FAQ selected"}
        </h1>
      </div>
      <div className="text-container">
        <h4
          style={{
            overflowWrap: "break-word",
            padding: "60px",
            margin: "auto",
            fontSize: "20px",
          }}
        >
          {selectedFaq ? selectedFaq.answer : "No FAQ selected"}
        </h4>
      </div>
      <button onClick={goBacktoFaq}>목록으로</button>
    </div>
  );
}

export default FaqInfo;
