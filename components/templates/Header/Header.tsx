import { NextComponentType } from 'next';
import styles from './Header.module.scss';

const Header: NextComponentType = () => {
  return (
    <div className={styles.header}>
      This is a sample header.
    </div>
  );
};

export default Header;