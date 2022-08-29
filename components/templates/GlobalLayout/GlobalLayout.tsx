import { PropsWithChildren } from 'react';
import { NextPage } from 'next';
import Header from '../Header/Header';
import styles from './Global.module.scss';

type GlobalLayoutProps = PropsWithChildren<{}>;

const GlobalLayout: NextPage<{ children: GlobalLayoutProps }> = ({
  children,
}) => {
  return (
    <div className={styles.layout}>
      <Header />
      { children }
    </div>
  );
};

export default GlobalLayout;