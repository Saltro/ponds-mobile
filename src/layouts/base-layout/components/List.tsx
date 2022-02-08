import { Fragment } from 'react';
import { UserOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface ListProps {
  userMsg: Record<string, any>;
}

interface ItemProps {
  icon: React.ReactNode;
}

const iconMap = new Map([
  ['username', <UserOutlined className={styles.icon} key={1} />],
  ['mobile', <PhoneOutlined rotate={90} className={styles.icon} key={2} />],
  ['register_date', <ClockCircleOutlined className={styles.icon} key={3} />],
]);

const Item: React.FC<ItemProps> = ({ children, icon }) => {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.userDtl}>{children}</div>
    </div>
  );
};

const List: React.FC<ListProps> = ({ userMsg }) => {
  const msgList = Object.keys(userMsg)
    .map((msg, i) => {
      if (!iconMap.get(msg)) return null;
      return { icon: <Fragment key={i}> {iconMap.get(msg)}</Fragment>, detail: userMsg[msg] };
    })
    .filter((n) => n);

  return (
    <div id={styles.list} className={styles.list}>
      {msgList.map((msg, i) => {
        return (
          <Item icon={msg?.icon} key={i}>
            {msg?.detail}
          </Item>
        );
      })}
    </div>
  );
};

export default List;
