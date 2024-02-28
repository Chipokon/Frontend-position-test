import { Button, Modal, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import styles from "./editModal.module.css";


interface EditModalProps {
    selectedValue: string;
    onSave: (newValue: string) => void;
    onClose: () => void;
    active: boolean;
  }

const EditModal: FC<EditModalProps> = observer(({ selectedValue, onSave, onClose, active }) => {
  const [newValue, setNewValue] = useState(selectedValue);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };
  const handleSave = () => {
    onSave(newValue);
    setNewValue('')
  };
  return (
    <Modal
      open={active}
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
