import React, { useState } from "react";
import styles from "./DiscountAdjustment.module.css";
import axios from "axios";

const products = [
  {
    id: 1,
    image: "/img/bank1.PNG",
    description: "Hana",
  },
  {
    id: 2,
    image: "/img/bank2.PNG",
    description: "KB",
  },
  {
    id: 3,
    image: "/img/bank3.PNG",
    description: "Sinhan",
  },
];

const DiscountAdjustment = () => {
  const [discounts, setDiscounts] = useState({1:'0',2:'0',3:'0'});
  const [descriptions, setDescriptions] = useState(products.map((product) => product.description));
  const [isEditing, setIsEditing] = useState(Array(products.length).fill(false));

  const handleDescriptionChange = (productId, description) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[productId - 1] = description;
    setDescriptions(updatedDescriptions);
  };

  const handleDiscountChange = (productId, value) => {
    setDiscounts({ ...discounts, [productId]: value });
  };

  const handleSaveDescription = (productId) => {
    // 상태에 저장된 변경된 설명을 서버 또는 데이터베이스에 업데이트하는 로직 추가
    setIsEditing((prev) => prev.map((value, index) => (index === productId - 1 ? false : value)));
  };

  const DiscountSave = (id) => {
    // alert(products[id-1].description + discounts[id]);
    axios
    .post(`${process.env.REACT_APP_SERVER_URL}/changeDiscountRate`, {
      bank: products[id-1].description,
      rate: discounts[id]
    })
    .then((response) => {
      if(response.data === '1'){
        alert('변경 완료');
      }
      else{
        alert('변경 실패');
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productContainer}>
            <div className={styles.productInfo}>
              <img src={product.image} alt="Product" className={styles.productImage} />
              {isEditing[product.id - 1] ? (
                <textarea
                  value={descriptions[product.id - 1]}
                  onChange={(e) => handleDescriptionChange(product.id, e.target.value)}
                />
              ) : (
                <p className={styles.productDescription}>{descriptions[product.id - 1]}</p>
              )}
            </div>
            <div className={styles.discountDropdown}>
              <select
                value={discounts[product.id] || ""}
                onChange={(e) => handleDiscountChange(product.id, e.target.value)}
              >

                <option value="0">할인 없음</option>
                <option value="10">10% 할인</option>
                <option value="20">20% 할인</option>
                <option value="30">30% 할인</option>
              </select>
              
                <button
                  onClick={() => DiscountSave(product.id)}
                >
                  수정
                </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountAdjustment;
