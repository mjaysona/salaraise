import { NextComponentType } from 'next';
import styles from './Header.module.scss';

const Header: NextComponentType = () => {
  return (
    <div className={styles.header}>
      <h1>salaraise</h1>
    </div>
  );
};

export default Header;