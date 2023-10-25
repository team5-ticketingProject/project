import React, { useState, useEffect } from "react";
import styles from "./Notice.module.css";
import axios from "axios";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteItemId, setDeleteItemId] = useState(null);

   useEffect(() => {
    // 서버의 엔드포인트로 공지사항 데이터 요청
    axios.get('http://localhost:5000/getNotices')
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  const handleCreateClick = () => {
    setEditing("add");
    setTitle("");
    setContent("");
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      setDeleteItemId(id);
    }
  };

  useEffect(() => {
    if (deleteItemId !== null) {
      setNotices(notices.filter((notice) => notice.id !== deleteItemId));
      setEditing(false);
      setDeleteItemId(null);
    }
  }, [deleteItemId, notices]);

  const handleCancelClick = () => {
    if (editing) {
      setEditing(false);
    }
  };

  const handleSaveClick = () => {
    if (editing === "add") {
      const newNotice = {
        id: Math.max(...notices.map((notice) => notice.id), 0) + 1,
        title,
        content,
      };
      setNotices([newNotice, ...notices]);
    } else if (editing) {
      const updatedNotices = notices.map((notice) =>
        notice.id === editing.id ? { ...notice, title, content } : notice
      );
      setNotices(updatedNotices);
    }

    setEditing(false);
    setTitle("");
    setContent("");
  };

  const handleEditClick = (notice) => {
    setEditing(notice);
    setTitle(notice.title);
    setContent(notice.content);
  };

  return (
    <div className={styles.notice}>
      <button className={styles.createButton} onClick={handleCreateClick}>
        글 작성하기
      </button>

      {editing ? (
        <div className={styles.form}>
          <input
            className="style-input"
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: "400px" }}
          />
          <div className={styles.formButtons}>
            <button onClick={handleSaveClick}>저장</button>
            <button onClick={handleCancelClick}>취소</button>
          </div>
        </div>
      ) : (
        <table className={styles.noticeTable}>
          <thead>
            <tr>
              <th className={styles.noticeTitle}>제목</th>
              <th className={styles.noticeContent}>내용</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.notification_ID} className={styles.noticeItem}>
                <td>{notice.title}</td>
                <td>{notice.content}</td>
                <td>
                  <button onClick={() => handleEditClick(notice)}>수정</button>
                  <button onClick={() => handleDeleteClick(notice.notification_ID)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notice;