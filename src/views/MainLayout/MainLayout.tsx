import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from './mainLayout.module.css'
import { observer } from "mobx-react-lite";
import {useStores} from '../../customHooks/UseStore'
const MainLayout = observer(() => {
  const store = useStores().TableStore
  return (
      <div>
        <div className={styles.buttonBlock}>
        <Link to="/products">
          <Button className={styles.button} variant="outlined" onClick={() => store.typeOfTable='products'}>Products</Button>
        </Link>
        <Link to="/pricePlans">
          <Button className={styles.button} variant="outlined" onClick={() => store.typeOfTable='pricePlans'}>Price Plans</Button>
        </Link>
        <Link to="/pages">
          <Button className={styles.button} variant="outlined" onClick={() => store.typeOfTable='pages'}>Pages</Button>
        </Link>
        </div>
      </div>
  );
});

export default MainLayout;
