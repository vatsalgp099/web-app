import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";

const Modal = ({heading, children, onClose}) => {
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <p>{heading}</p>
          <button onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
