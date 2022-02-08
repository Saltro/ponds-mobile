import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Avatar from './components/Avatar';
import List from './components/List';
import Button from './components/Button';
import styles from './index.module.scss';

interface userMsg {
  username: string;
  nickname: string;
  avatar: string;
  mobile: string;
}

const BaseLayout: React.FC = ({ children }) => {
  const [isSideBarShow, setIsSideBarShow] = useState(false);
  const [userMsg, setUserMsg] = useState<userMsg>({ username: '', nickname: '', avatar: '', mobile: '' });

  const showSideBar = () => {
    setIsSideBarShow(true);
  };

  const hideSideBar = () => {
    setIsSideBarShow(false);
  };

  useEffect(() => {
    // TODO
    console.log('获取用户信息');
    setUserMsg({
      username: '张三',
      nickname: '欧蕾哇 Lufei',
      avatar: 'https://s3.bmp.ovh/imgs/2021/11/f4919f5e2b8f7494.jpg',
      mobile: '13333333333',
    });
  }, []);

  return (
    <>
      <div id={styles.sideBar}>
        <div className={isSideBarShow ? styles.show : ''}>
          <section id={styles.personalSection} className={styles.personalSection}>
            <Avatar src={userMsg.avatar} />
            <p className={styles.name}>{userMsg.nickname}</p>
            <List userMsg={userMsg} />
            <div className={styles.buttonWrapper}>
              <Button>退出登录</Button>
            </div>
          </section>
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
