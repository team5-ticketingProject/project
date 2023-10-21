import React, { useState } from "react";
import styles from "./Notice.module.css";

const Notice = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: "첫 번째 공지", content: "이것은 첫 번째 공지입니다."},
    { id: 2, title: "두 번째 공지", content: "이것은 두 번째 공지입니다."},
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼 표시 여부 상태
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태

  const handleCreateClick = () => {
    setIsFormVisible(true);
  };

  const handleCancelClick = () => {
    setIsFormVisible(false);
  };

  const handleSaveClick = () => {
    const newNotice = {
      id: notices.length > 0 ? notices[0].id + 1 : 1,
      title: title,
      content: content
    };

    setNotices([newNotice, ...notices]);
    setIsFormVisible(false);
    setTitle("");
    setContent("");
  };

  const sortedNotices = notices.slice().sort((a, b) => b.id - a.id);

  return (
    <div className={styles.notice}>
      <button className={styles.createButton} onClick={handleCreateClick}>
        글 작성하기
      </button>

      {isFormVisible ? (
        <div className={styles.form}>
          <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: "400px" }}
          />
          <div className={styles.formButtons}>
            <button onClick={handleSaveClick}>등록</button>
            <button onClick={handleCancelClick}>취소</button>
          </div>
        </div>
      ) : (
        <table className={styles.noticeTable}>
          <thead>
            <tr>
              <th className={styles.noticeTitle}>제목</th>
              <th className={styles.noticeContent}>내용</th>
            </tr>
          </thead>
          <tbody>
            {sortedNotices.map((notice) => (
              <tr key={notice.id} className={styles.noticeItem}>
                <td>{notice.title}</td>
                <td>{notice.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notice;
