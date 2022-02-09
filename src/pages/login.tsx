import { Field, Form, FormStore } from '@/components/baseUI/Form';
import message from '@/components/baseUI/message/index';
import Request from '@/request';
import styles from '@/styles/Login.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const { login } = Request;
const Login: React.FC = () => {
  const router = useRouter();
  const defaultVals = {
    username: '',
    password: '',
  };
  // const rules = {
  //   username: (val: string) => {
  //     return val.length >= 5;
  //   },
  //   password: (val: string) => {
  //     return val.length >= 5;
  //   },
  // };
  const loginFormRef = useRef(new FormStore(defaultVals, {}));
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = loginFormRef.current.get();
    const res = await login(username, password);

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
      <div className={styles['login-wrapper']}>
        <div className={styles['header']}>Login</div>
        <Form store={loginFormRef.current} onSubmit={handleLogin} className={styles['form-wrapper']}>
          <Field name="username">
            <input type="text" name="username" placeholder="username" className={styles['input-item']} />
          </Field>
          <Field name="password">
            <input type="password" name="password" placeholder="password" className={styles['input-item']} />
          </Field>
          <button className={styles.btn}>Login</button>
        </Form>
        <div className={styles.msg}>
          <span>Don&apos;t have account? </span>
          <Link href="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
