import styles from './ButtonComponent.module.css';

const ButtonComponent = ({ onClick }) => {
  return (
    <button type="button" className={styles.createButton} onClick={onClick}>
      Create New
    </button>
  );
};

export default ButtonComponent;
