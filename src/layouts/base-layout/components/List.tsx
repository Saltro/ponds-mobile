import { Fragment, useState } from 'react';
import { UserOutlined, PhoneOutlined, ClockCircleOutlined, IdcardOutlined } from '@ant-design/icons';
import Avatar from '../components/Avatar';
import { Action } from '../store/user';
import styles from '../index.module.scss';

interface ListProps {
  isEdit: boolean;
  userMsg: IUserInfo;
  dispatch: React.Dispatch<Action>;
}

interface ItemProps {
  icon: React.ReactNode;
}

function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}

function findType(key: any) {
  switch (key) {
    case 'username':
      return 'username';
    case 'mobile':
      return 'mobile';
    default:
      return 'username';
  }
}

const iconMap = new Map([
  ['id', <IdcardOutlined className={styles.icon} key={1} />],
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

const List: React.FC<ListProps> = ({ dispatch, isEdit, userMsg }) => {
  const msgList = Object.keys(userMsg)
    .map((msg) => {
      if (isValidKey(msg, userMsg) && iconMap.get(msg)) {
        return { icon: <Fragment key={msg}> {iconMap.get(msg)}</Fragment>, detail: userMsg[msg], key: msg };
      }
      return null;
    })
    .filter((n) => n);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.currentTarget.files;
    const reader = new FileReader();
    if (imgFile) reader.readAsDataURL(imgFile[0]);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target) dispatch({ type: 'avatar', value: event.target.result as string });
    };
    // reader.onload = (event: ProgressEvent<FileReader>) => {
    //   setFieldValue('avatar', event.target.result as string);
    //   setFieldValue('avatarFile', imgFile);
    // };
  };

  return (
    <>
      {isEdit ? (
        <>
          <Avatar src={userMsg.avatar} />
          <input accept=".png, .jpg, .jpeg" onChange={handleAvatar} className={styles.avatarEdit} type="file" />
          <input
            onChange={(e) => dispatch({ type: 'nickname', value: e.target.value })}
            className={styles.nicknameEdit}
            placeholder={userMsg.nickname}
            value={userMsg.nickname}
          />
        </>
      ) : (
        <>
          <Avatar src={userMsg.avatar} />
          <p className={styles.nickname}>{userMsg.nickname}</p>
        </>
      )}
      <div id={styles.list} className={styles.list}>
        {msgList.map((msg, i) => {
          return (
            <Item icon={msg?.icon} key={i}>
              {isEdit && msg?.key !== 'id' && msg?.key !== 'register_date' ? (
                <input
                  onChange={(e) => dispatch({ type: findType(msg?.key), value: e.target.value })}
                  className={styles.edit}
                  placeholder={msg?.detail}
                />
              ) : (
                msg?.detail
              )}
            </Item>
          );
        })}
      </div>
    </>
  );
};

export default List;
