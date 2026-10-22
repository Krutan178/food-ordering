import styles from "../styles/Add.module.css";

const AddButton = ({ setClose, admin }) => {
  if (!admin) return null;
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Add New Item
    </div>
  );
};

export default AddButton;
