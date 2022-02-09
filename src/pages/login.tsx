// import { Field, Form, FormStore } from '@/components/baseUI/Form';
import message from '@/components/baseUI/message/index';
import Request from '@/request';
// import { Icon } from '@/components/pageHeader/Header';
import styles from '@/styles/Login.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const { login } = Request;
const Login: React.FC = () => {
  // const headerIcon: Icon = {
  //   pos: 'left',
  //   content: LeftOutlined,
  // };
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  // const defaultVals = {
  //   username: '',
  //   password: '',
  // };
  // const rules = {
  //   username: (val: string) => {
  //     return val.length >= 5;
  //   },
  //   password: (val: string) => {
  //     return val.length >= 5;
  //   },
  // };
  // const loginFormRef = useRef(new FormStore(defaultVals, {}));
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };
  const handleLogin = async () => {
    const res = await login(username, pwd);

    if (res.data && res.data.code === 200) {
      const { access_token, refresh_token } = res.data.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      message.success('登录成功');
      router.push('/');
    } else {
      message.error(res.data.message);
    }
  };
  return (
    <div className={styles.container}>
      {/* <Header title="账号登录" icon={headerIcon} /> */}
      <div className={styles['login-wrapper']}>
        <div className={styles['header']}>Login</div>
        <div className={styles['form-wrapper']}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            placeholder="username"
            className={styles['input-item']}
          />
          <input
            type="password"
            name="password"
            value={pwd}
            onChange={handlePwd}
            placeholder="password"
            className={styles['input-item']}
          />
          <button onClick={handleLogin} className={styles.btn}>
            Login
          </button>
        </div>
        <div className={styles.msg}>
          <span>Don&apos;t have account? </span>
          <Link href="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
