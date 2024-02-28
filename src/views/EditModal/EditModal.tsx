import { Button, Modal, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styles from "./editModal.module.css";

const EditModal = observer(({ selectedValue, onSave, onClose }) => {
  const [newValue, setNewValue] = useState(selectedValue);
  const handleInputChange = (event) => {
    setNewValue(event.target.value);
  };
  const handleSave = () => {
    onSave(newValue);
    setNewValue('')
  };
  return (
    <Modal
      open={selectedValue.length > 0}
      onClose={onClose}
      className={styles.modal}
    >
      <div className={styles.blockInside}>
        <TextField
          defaultValue={selectedValue}
          onChange={handleInputChange}
          className={styles.input}
        />
        <Button onClick={handleSave} className={styles.button}>
          Save
        </Button>
      </div>
    </Modal>
  );
});

export default EditModal;
