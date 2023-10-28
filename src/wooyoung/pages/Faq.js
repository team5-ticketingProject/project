import React, { useState, useEffect } from 'react';
import styles from './Faq.module.css';
import axios from 'axios';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/getFAQs')
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching FAQs:', error);
      });
  }, []);

  const handleCreateFaq = () => {
    if (newQuestion && newAnswer) {
      const newFaq = {
        question: newQuestion,
        answer: newAnswer,
      };

      axios
        .post('http://localhost:5000/registerFAQ', newFaq)
        .then((response) => {
          // 새 FAQ 생성
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
      // FAQ 삭제 요청
      axios
        .delete(`http://localhost:5000/deleteFAQ/${id}`)
        .then((response) => {
          setFaqs(faqs.filter((faq) => faq.ID !== id));
        })
        .catch((error) => {
          console.error('Error deleting FAQ:', error);
        });
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
          <button className={styles.saveButton} onClick={handleCreateFaq}>
            저장
          </button>
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