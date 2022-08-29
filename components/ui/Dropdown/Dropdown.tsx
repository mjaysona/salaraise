import { NextComponentType } from 'next';
import styles from './Dropdown.module.scss';

const Input: NextComponentType = () => {
  return (
    <div className={styles['dropdown']}>
      <div className={styles['dropdown__selector']}>
        <strong>Calculate my expected raise</strong>
      </div>
    </div>
  );
};

export default Input;