import { Field, Form, FormStore } from '@/components/baseUI/Form';
import message from '@/components/baseUI/message/index';
import Request from '@/request';
import styles from '@/styles/register.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const { register } = Request;
const Register: React.FC = () => {
  const router = useRouter();
  const defaults = {
    phone: '',
    username: '',
    nickname: '',
    password: '',
    smsCode: '1234',
  };
  const registerFormRef = useRef<FormStore>(new FormStore(defaults));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, nickname, phone, smsCode } = registerFormRef.current.get();

    const res = await register(username, password, nickname, phone, smsCode);
    if (res.data && res.data.code === 200) {
      const { access_token, refresh_token } = res.data.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      message.success('注册成功，正在为您跳转！');
      router.push('/');
    } else {
      message.error(res.data.message + '请稍后重试');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles['login-wrapper']}>
        <div className={styles['header']}>Sign Up</div>
        {/* <div className={styles['form-wrapper']}>
          <input type="text" name="username" placeholder="username" className={styles['input-item']} />
          <input type="password" name="password" placeholder="password" className={styles['input-item']} />
          <button className={styles.btn}>Login</button>
        </div> */}
        <Form store={registerFormRef.current} onSubmit={handleRegister} className={styles['form-wrapper']}>
          <Field name="username">
            <input type="text" name="username" placeholder="username" className={styles['input-item']} />
          </Field>
          <Field name="nickname">
            <input type="text" name="nickname" placeholder="nickname" className={styles['input-item']} />
          </Field>
          <Field name="phone">
            <input type="text" name="phone" placeholder="phone" className={styles['input-item']} />
          </Field>
          <Field name="password">
            <input type="password" name="password" placeholder="password" className={styles['input-item']} />
          </Field>
          <button className={styles.btn}>Register</button>
        </Form>
        <div className={styles.msg}>
          <span>have account? </span>
          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
