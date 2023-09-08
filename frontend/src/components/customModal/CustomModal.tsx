import styles from "./customModal.module.css";

interface CustomModalProps {
  onClose: () => void;
}

const CustomModal = ({ onClose }: CustomModalProps) => {
  return (
    <div className={styles["modal"]}>
      <div>
        <h2>Success, data sent</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomModal;
