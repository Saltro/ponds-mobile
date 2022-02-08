import { MouseEventHandler } from 'react';
import styles from '../index.module.scss';

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} id={styles.button} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
