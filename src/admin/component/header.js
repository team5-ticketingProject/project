import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css'
import GetShowCode from '../../api/GetShowCode';

const Header = () => {
  
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <h2 className={styles.logo}>
        <Link to="/" className={styles.nounderline}>LOGO</Link> {/*로고 누르면 메인화면으로 */}
        </h2>
        <GetShowCode />
        <nav className={styles.navigation}>
          <ul>
          <li ClassName={styles.list}>
            <Link to="/login" className={styles.nounderline}>Logout</Link> {/* "Logout"을 클릭하면 "/login"으로 이동 */}
          </li>
          <li ClassName={styles.list}>
            <Link to="/" className={styles.nounderline}>Home</Link> {/* "Home"을 클릭하면 메인페이지로 이동 */}
          </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header