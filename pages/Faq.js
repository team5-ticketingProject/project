import React, { useState, useEffect } from 'react';
import styles from './Faq.module.css';
import axios from 'axios';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // 서버에서 FAQ 데이터 가져오기
    axios.get('http://localhost:5000/getFAQs')
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching FAQs:', error);
      });
  }, []); // 빈 배열을 전달하여 한 번만 실행

  const handleCreateFaq = () => {
    if (newQuestion && newAnswer) {
      const newFaq = {
        question: newQuestion,
        answer: newAnswer,
      };

      axios.post('/registerFAQ', newFaq)
      .then((response) => {
        // 서버에서 새 FAQ를 생성하고 응답을 받아서 faqs 상태를 업데이트합니다.
        setFaqs([...faqs, response.data]);
        setNewQuestion('');
        setNewAnswer('');
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error('Error creating FAQ:', error);
      });
  }
};

  const handleDeleteFaq = (id) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      // 서버에서 FAQ 삭제 요청을 보낼 수도 있습니다.
      // 아래는 클라이언트에서 삭제하는 예제 코드입니다.
      setFaqs(faqs.filter((faq) => faq.id !== id));
    }
  };

  return (
    <div className={styles.faq}>
      <button className={styles.faqButton} onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? '취소' : '새 FAQ 작성'}
      </button>

      {isFormVisible && (
        <div className={styles.faqForm}>
          <input
            type="text"
            placeholder="질문"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="답변"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button className={styles.saveButton} onClick={handleCreateFaq}>저장</button>
        </div>
      )}
      {faqs.map((faq) => (
        <div key={faq.ID} className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>{faq.question}</h3>
          <p className={styles.faqAnswer}>{faq.answer}</p>
          <button onClick={() => handleDeleteFaq(faq.ID)}>삭제</button>
        </div>
      ))}
    </div>
  );
};

export default Faq;

