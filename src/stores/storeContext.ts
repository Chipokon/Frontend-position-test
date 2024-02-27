import React from "react";
import TableStore from "./TableStore";

export const storesContext = React.createContext({
  TableStore: new TableStore(),
})