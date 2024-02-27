import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../customHooks/UseStore";
import styles from "./tablePage.module.css";
import TableComponent from "../TableComponent/TableComponent";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
const Tablepage = observer(() => {
  const store = useStores().TableStore;
  const currentPath = window.location.pathname.split("/").pop();
  useEffect(() => {
    if ((store.typeOfTable && store[store.typeOfTable]) || currentPath) {
      store.currentTableData = store[store.typeOfTable] || store[currentPath];
      store.currentTableDataCopy = store.currentTableData;
    }
  }, [store.typeOfTable, currentPath]);

  return (
    <div>
      <div className={styles.header}>
        <Button
          className={styles.backButton}
          style={{
            borderColor: "#f8f9fa",
            backgroundColor: "#f8f9fa",
            color: "black",
          }}
          component={Link}
          to="/"
          variant="outlined"
        >
          Back
        </Button>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={store?.currentTableData}
          sx={{ width: 300 }}
          value={store.searchTerm}
          onChange={store.handleSearch}
          getOptionLabel={(option) => store.getFirstStringValue(option)}
          renderInput={(params) => <TextField {...params} />}
          className={styles.search}
        />
      </div>
      <div>
      <TableComponent />
      </div>
    </div>
  );
});

export default Tablepage;
