import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useStores } from "../../customHooks/UseStore";
import styles from "./tableComponent.module.css";
import moment from "moment";
import EditModal from "../EditModal/EditModal";
import { EntityType } from "../../stores/types";

const TableComponent: FC = observer(() => {
  const store = useStores().TableStore;
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [selectedKey, setSelectedKey] = useState("");
  const [active, setAtctive] = useState(false)
  const handleCellClick = (value: string, index: number, key: string) => {
    setSelectedRowIndex(index);
    setSelectedKey(key);
    store.setSelectedValue(value);
    setAtctive(true)
  };

  const handleEditModalClose = () => {
    setAtctive(false)
    setSelectedRowIndex(null);
    setSelectedKey("");
    store.setSelectedValue("");
  };

  const handleSaveValue = (newValue: string) => {
    if (selectedRowIndex !== null && selectedKey) {
      store.setNewValueInTable(selectedRowIndex, selectedKey, newValue);
    }
    handleEditModalClose();
  };

  const getKeysNames = (obj: Record<string, unknown>): string[] => {
    let keys: string[] = [];
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        keys = keys.concat(
          getKeysNames(obj[key] as Record<string, unknown>).filter(
            (subKey) => subKey !== key
          )
        );
      } else {
        keys.push(key);
      }
    }
    return keys;
  };

  const renderTableCells = (item: EntityType, index: number) => {
    return Object.entries(item).map(([key, value], idx) => {
      if (typeof value === "object" && value !== null) {
        return Object.keys(value).map((k, idx) => (
          <TableCell component="th" key={idx}>
            {value[k]}
          </TableCell>
        ));
      } else if (typeof value === "boolean") {
        return (
          <TableCell component="th" key={idx}>
            {value ? "Active" : "Not active"}
          </TableCell>
        );
      } else if (Date.parse(value)) {
        return (
          <TableCell component="th" key={idx}>
            {moment(value).format("DD-MM-YYYY hh:mm")}
          </TableCell>
        );
      } else if (typeof value === "string") {
        return (
          <TableCell key={idx}>
            <Button onClick={() => handleCellClick(value, index, key)}>
              {value}
            </Button>
          </TableCell>
        );
      } else {
        return (
          <TableCell component="th" key={idx}>
            {value}
          </TableCell>
        );
      }
    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {store.currentTableData.length > 0 &&
                getKeysNames(store.currentTableData[0]).map((key) => (
                  <TableCell className={styles.headCells} key={key}>
                    {key[0].toUpperCase() + key.slice(1)}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {store.currentTableData.map((item, index) => (
              <TableRow key={index}>{renderTableCells(item, index)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditModal
        selectedValue={store.selectedValue}
        onSave={handleSaveValue}
        onClose={handleEditModalClose}
        active={active}
      />
    </div>
  );
});

export default TableComponent;
