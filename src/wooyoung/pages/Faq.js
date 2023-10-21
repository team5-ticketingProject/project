import React, { useState } from 'react';
import styles from './Faq.module.css'

const Faq = () => {
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'FAQ 1', answer: 'Answer 1' },
    { id: 2, question: 'FAQ 2', answer: 'Answer 2' },
  ]);
  const [newQuestion, setNewQuestion] = useState(''); 
  const [newAnswer, setNewAnswer] = useState('');
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

  const handleDeleteFaq = (id) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      // 삭제 동작을 수행
      setFaqs(faqs.filter((faq) => faq.id !== id));
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
      <button onClick={() => handleDeleteFaq(faq.id)}>삭제</button>
       </div>
))}
    </div>
  );
};

export default Faq;
