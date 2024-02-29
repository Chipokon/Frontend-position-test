import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../customHooks/UseStore";
import styles from "./tablePage.module.css";
import TableComponent from "../TableComponent/TableComponent";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { EntityType, storeType } from "../../stores/types";
const Tablepage: FC = observer(() => {
  const store: storeType = useStores().TableStore;
  const currentPath = window.location.pathname.split("/").pop();
  useEffect(() => {
    if (
      (store.typeOfTable &&
        (store as Record<string, any>)[store.typeOfTable]) ||
      currentPath
    ) {
      store.currentTableData =
        (store as Record<string, any>)[store.typeOfTable] ||
        (store as Record<string, any>)[currentPath!];
      store.currentTableDataCopy = store.currentTableData;
    }
  }, [store.typeOfTable, currentPath]);

  return (
    <div>
      <div className={styles.header}>
        <Button
          className={styles.backButton}
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
          onChange={(event, value, reason) =>
            store.handleSearch(event, value, reason)
          }
          getOptionLabel={(option: EntityType) =>
            store.getFirstStringValue(option)
          }
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
