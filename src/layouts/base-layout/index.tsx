import Image from 'next/image';
import React, { useState } from 'react';
import styles from './index.module.scss';

const BaseLayout: React.FC = ({ children }) => {
  const [isSideBarShow, setIsSideBarShow] = useState(false);

  const showSideBar = () => {
    setIsSideBarShow(true);
  };

  const hideSideBar = () => {
    setIsSideBarShow(false);
  };

  return (
    <>
      <div id={styles.sideBar}>
        <div className={isSideBarShow ? styles.show : ''}>
          <div className={styles.close}>
            <Image src="/close.svg" onClick={hideSideBar} width={40} height={40} alt="关闭" />
          </div>
        </div>
      </div>
      <div id={styles.container} className={isSideBarShow ? styles.hide : ''}>
        <div id={styles.topBar}>
          <Image src="/list.svg" onClick={showSideBar} width={30} height={30} alt="列表" />
        </div>
        <div id={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default BaseLayout;
