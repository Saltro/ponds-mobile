import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

type Type = 'success' | 'error' | 'info' | 'warning';

interface Props {
  msg: string;
  type?: Type;
  duration?: number;
  top?: number;
}

// 单例标识变量
let _comp: any = null;

// icon map
const iconMap: any = {
  success: <CheckCircleOutlined />,
  info: <InfoCircleOutlined />,
  error: <CloseCircleOutlined />,
  warning: <ExclamationCircleOutlined />,
};

const Message: React.FC<Props> = (props) => {
  const { msg, type = 'success', duration = 3000, top = 18 } = props;
  const [isShow, setShow] = useState(true);
  const renderIcon = (type: string) => {
    return iconMap[type];
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(false);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [duration]);
  return (
    <div style={{ paddingTop: top + 'px' }}>
      {!!isShow && (
        <div className={styles.message}>
          <span className={`${styles.icon} ${styles['icon-' + type]}`}>{renderIcon(type)}</span>
          <span className={styles.content}>{msg}</span>
        </div>
      )}
    </div>
  );
};

const dispatch = (msg: string, type: Type) => {
  // 单例模式
  return (function () {
    if (!_comp) {
      _comp = <Message msg={msg} type={type} />;
      const container = document.createElement('div');
      container.classList.add(styles['message-container']);
      document.body.appendChild(container);
      ReactDOM.render(_comp, container);
    }
    return _comp;
  })();
};
const dispatchMethods = {
  success: (msg: string) => dispatch(msg, 'success'),
  error: (msg: string) => dispatch(msg, 'error'),
  warning: (msg: string) => dispatch(msg, 'warning'),
  info: (msg: string) => dispatch(msg, 'info'),
};
export default dispatchMethods;
