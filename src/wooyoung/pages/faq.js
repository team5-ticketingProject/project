import React, { useState } from 'react';
import styles from './faq.module.css'

const Faq = () => {
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'FAQ 1', answer: 'Answer 1' },
    { id: 2, question: 'FAQ 2', answer: 'Answer 2' },
  ]);
  const [newQuestion, setNewQuestion] = useState(''); // 새로운 질문 상태
  const [newAnswer, setNewAnswer] = useState(''); // 새로운 답변 상태
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateFaq = () => {
    if (newQuestion && newAnswer) {
      const newFaq = {
        id: faqs.length > 0 ? faqs[faqs.length - 1].id + 1 : 1,
        question: newQuestion,
        answer: newAnswer,
      };
      setFaqs([...faqs, newFaq]);
      setNewQuestion('');
      setNewAnswer('');
      setIsFormVisible(false);
    }
  };

  return (
    <div className={styles.faq}>
      <button className={styles.faqButton} 
              onClick={() => setIsFormVisible(!isFormVisible)}>
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
        <div key={faq.id} className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>{faq.question}</h3>
          <p className={styles.faqAnswer}>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Faq;
