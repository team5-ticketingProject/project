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
    axios.get('http://localhost:5000/getNotices')
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/deleteNotice/${id}`)
        .then((response) => {
          setDeleteItemId(id);
        })
        .catch((error) => {
          console.error("Error deleting notice:", error);
        });
    }
  };

  const handleCreateClick = () => {
    setEditing({ id: "add" }); // 사용자 정의 ID 'add'를 지정해 새로운 글을 구분
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    if (deleteItemId !== null) {
      setNotices(notices.filter((notice) => notice.notification_ID !== deleteItemId));
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
    if (editing) {
      const updatedNotice = {
        notification_ID: editing.id,
        title, 
        content, 
      };
  
      if (editing.id === "add") {
        // 새로운 글을 DB에 추가하는 요청
        axios
          .post("http://localhost:5000/addNotice", updatedNotice)
          .then((response) => {
            axios.get('http://localhost:5000/getNotices')
              .then((response) => {
                setNotices(response.data);
                setTitle("");
                setContent("");
                setEditing(false);
              })
              .catch((error) => {
                console.error('Error fetching notices:', error);
              });
          })
          .catch((error) => {
            console.error("Error creating notice:", error);
          });
      } else {
        // 이미 존재하는 글을 수정하는 요청
        axios
          .post("http://localhost:5000/updateNotice", updatedNotice)
          .then((response) => {
            axios.get('http://localhost:5000/getNotices')
              .then((response) => {
                setNotices(response.data);
                setTitle("");
                setContent("");
                setEditing(false);
              })
              .catch((error) => {
                console.error('Error fetching notices:', error);
              });
          })
          .catch((error) => {
            console.error("Error updating notice:", error);
          });
      }
    }
  };
  
  
  const handleEditClick = (notice) => {
    setEditing({
      id: notice.notification_ID,
      title: notice.title,
      content: notice.content,
    });
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
