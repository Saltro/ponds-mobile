import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Avatar from './components/Avatar';
import List from './components/List';
import Button from './components/Button';
import styles from './index.module.scss';

const formatTime = (data: string) => {
  return data.slice(0, 10);
};

const BaseLayout: React.FC = ({ children }) => {
  const [isSideBarShow, setIsSideBarShow] = useState(false);
  const [userMsg, setUserMsg] = useState<IUserInfo>({
    id: 0,
    username: '',
    nickname: '',
    avatar: '',
    mobile: '',
    register_date: '',
  });

  const showSideBar = () => {
    setIsSideBarShow(true);
  };

  const hideSideBar = () => {
    setIsSideBarShow(false);
  };

  const loginOut = () => {
    window.localStorage.removeItem('token');
    // TODO: 跳转到登录注册页面
  };

  useEffect(() => {
    // TODO
    console.log('获取用户信息');
    setUserMsg({
      id: 111,
      username: '张三',
      nickname: '元前端 Fe',
      avatar: 'https://s3.bmp.ovh/imgs/2021/11/f4919f5e2b8f7494.jpg',
      mobile: '13333333333',
      register_date: formatTime('2021-11-14T00:00:00.000Z'),
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
              <Button onClick={loginOut}>退出登录</Button>
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
