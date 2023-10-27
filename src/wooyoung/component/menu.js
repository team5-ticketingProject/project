import styles from './menu.module.css';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <div className={styles.blacknav}>
        <Link to="/admin/member" className={styles.item}>회원 관리</Link>
        <Link to="/admin/notice" className={styles.item}>공지 사항</Link>
        <Link to="/admin/Faq" className={styles.item}>FAQ</Link>
        <Link to="/admin/discount" className={styles.item}>할인율 조정</Link>
      </div>
    </div>
  );
};

export default Menu;
