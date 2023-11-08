import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import GetShowCode from '../../api/GetShowCode';


const Header = () => {
  const handleLogout = () => {
    // 로그아웃 로직을 구현합니다.
    // 세션 스토리지에서 사용자 정보를 삭제하는 등의 작업을 수행합니다.
    window.sessionStorage.setItem('id', ""); // 예시: 사용자 정보를 지움

    // 로그아웃 후 홈페이지로 이동합니다.
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <h2 className={styles.logo}>
          <Link to="/" className={styles.nounderline}>
            <img src="/img/logo.png" alt="로고" />
          </Link>
        </h2>
        <GetShowCode />
        <nav className={styles.navigation}>
          <ul>
            <li className={styles.list}>
              {window.sessionStorage.getItem('id') && (
                <Link to="/" onClick={handleLogout} className={styles.nounderline}>logout</Link>
              )}
            </li>
            <li className={styles.list}>
              <Link to="/" className={styles.nounderline}>home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

