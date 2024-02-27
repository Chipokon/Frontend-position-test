import { observer } from "mobx-react-lite";
import React from "react";
import {
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
const TableComponent = observer(() => {
  const store = useStores().TableStore;
  const getKeysNames = (obj) => {
    let keys = [];
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        keys = keys.concat(
          getKeysNames(obj[key]).filter((subKey) => subKey !== key)
        );
      } else {
        keys.push(key);
      }
    }
    return keys;
  };

  const renderTableCells = (item) => {
    return Object.values(item).map((value, index) => {
      if (typeof value === "object" && value !== null) {
        return Object.keys(value).map((key, index) => (
          <TableCell component="th" key={index}>
            {value[key]}
          </TableCell>
        ));
      } else if (typeof value === "boolean") {
        return (
          <TableCell component="th" key={index}>
            {value ? "Active" : "Not active"}
          </TableCell>
        );
      } else if (Date.parse(value)) {
        return (
          <TableCell key={index}>
            {moment(value).format("DD-MM-YYYY hh:mm")}
          </TableCell>
        );
      } else {
        return (
          <TableCell component="th" key={index}>
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
              <TableRow key={index}>{renderTableCells(item)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default TableComponent;
