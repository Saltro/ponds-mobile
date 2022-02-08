import Image from 'next/image';
import styles from '../index.module.scss';

interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div id={styles.avatar} className={styles.avatar}>
      <Image layout="fill" src={src || 'https://s3.bmp.ovh/imgs/2021/11/f4919f5e2b8f7494.jpg'} alt="头像" />
    </div>
  );
};

export default Avatar;
