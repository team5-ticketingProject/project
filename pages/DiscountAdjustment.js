import React, { useState } from "react";
import styles from "./DiscountAdjustment.module.css";

const products = [
  {
    id: 1,
    image: "/images/product1.jpg",
    description: "상품 1 설명",
  },
  {
    id: 2,
    image: "/images/product2.jpg",
    description: "상품 2 설명",
  },
  {
    id: 3,
    image: "/images/product3.jpg",
    description: "상품 3 설명",
  },
];

const DiscountAdjustment = () => {
  const [discounts, setDiscounts] = useState({});
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
                <option value="">할인율</option>
                <option value="10">10% 할인</option>
                <option value="20">20% 할인</option>
                <option value="30">30% 할인</option>
              </select>
              {isEditing[product.id - 1] ? (
                <button onClick={() => handleSaveDescription(product.id)}>저장</button>
              ) : (
                <button
                  onClick={() =>
                    setIsEditing((prev) => prev.map((value, index) => (index === product.id - 1 ? true : value)))
                  }
                >
                  수정
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountAdjustment;
