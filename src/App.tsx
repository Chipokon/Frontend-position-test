import { observer } from "mobx-react-lite";
import MainLayout from "./views/MainLayout/MainLayout.tsx";
import Tablepage from "./views/TablePage/TablePage.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/system";
const App = observer(() => {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/products" element={<Tablepage />} />
          <Route path="/pricePlans" element={<Tablepage />} />
          <Route path="/pages" element={<Tablepage />} />
        </Routes>
      </Router>
    </StyledEngineProvider>
  );
});

export default App;
