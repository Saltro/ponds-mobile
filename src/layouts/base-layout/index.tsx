import Image from 'next/image';
import React, { useEffect, useReducer, useState } from 'react';
import { initState, editReducer, init } from './store/user';
import List from './components/List';
import Button from './components/Button';
import styles from './index.module.scss';

const formatTime = (data: string) => {
  return data.slice(0, 10);
};

const BaseLayout: React.FC = ({ children }) => {
  const [isSideBarShow, setIsSideBarShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userMsg, dispatch] = useReducer(editReducer, initState, init);

  const showSideBar = () => {
    setIsSideBarShow(true);
  };

  const hideSideBar = () => {
    setIsSideBarShow(false);
    setIsEdit(false);
  };

  const loginOut = () => {
    window.localStorage.removeItem('token');
    // TODO: 跳转到登录注册页面
  };

  const editUser = () => {
    if (!isEdit) setIsEdit(true);
    else {
      setIsEdit(false);
      console.log('修改信息', userMsg);
      // TODO 修改用户信息的网络请求
    }
  };

  useEffect(() => {
    // TODO
    console.log('获取用户信息');
    dispatch({
      type: 'init',
      value: {
        id: 111,
        username: '张三',
        nickname: '元前端 Fe',
        avatar: 'https://s3.bmp.ovh/imgs/2021/11/f4919f5e2b8f7494.jpg',
        mobile: '13333333333',
        register_date: formatTime('2021-11-14T00:00:00.000Z'),
      },
    });
  }, []);

  return (
    <>
      <div id={styles.sideBar}>
        <div className={isSideBarShow ? styles.show : ''}>
          <section id={styles.personalSection} className={styles.personalSection}>
            <List dispatch={dispatch} isEdit={isEdit} userMsg={userMsg} />
            <div className={styles.buttonWrapper}>
              <Button onClick={loginOut}>退出登录</Button>
              <Button onClick={editUser}>{isEdit ? '保存个人信息' : '修改个人信息'}</Button>
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
