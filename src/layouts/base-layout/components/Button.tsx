import styles from '../index.module.scss';

const Button: React.FC = ({ children }) => {
  return (
    <button id={styles.button} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
