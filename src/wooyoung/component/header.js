import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'
import styles from './header.module.css'

const Header = () => {
  
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <h2 className={styles.logo}>
        <Link to="/member" className={styles.nounderline}>LOGO</Link> {/*로고 누르면 회원관리로 */}
        </h2>


        <nav className={styles.navigation}>
          <ul>
          <li>
            <Link to="/login" className={styles.nounderline}>Logout</Link> {/* "Logout"을 클릭하면 "/login"으로 이동 */}
          </li>
          <li>
            <Link to="/" className={styles.nounderline}><FaHome size={24}/></Link> {/* "Home"을 클릭하면 메인페이지로 이동 */}
          </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header