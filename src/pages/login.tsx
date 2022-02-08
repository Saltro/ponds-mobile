// import { Field, Form, FormStore } from '@/components/baseUI/Form';
import message from '@/components/baseUI/message/index';
import styles from '@/styles/Login.module.css';
import { useEffect } from 'react';

const Login: React.FC = () => {
  useEffect(() => {
    message.success('hello world!');
  }, []);
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
  const handleLogin = () => {
    console.log('登录提交');
  };
  return <div className={styles.container}>login</div>;
};

export default Login;
