import { makeAutoObservable } from "mobx";
import { pages, pricePlans, products } from "./mockData";
import { EntityType, storeType } from "./types";

class TableStore implements storeType {
  typeOfTable: string = "";

  products: EntityType[] = products;
  pages: EntityType[] = pages;
  pricePlans: EntityType[] = pricePlans;

  currentTableData: EntityType[] = [];
  currentTableDataCopy: EntityType[] = [];
  searchTerm: Record<string, unknown> = {};
  selectedValue: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  handleSearch: (
    event: React.SyntheticEvent<Element, Event>,
    value: EntityType,
    reason: string
  ) => void = (event, value, reason) => {
    this.searchTerm = value;
    this.currentTableData = this.currentTableData.filter((item) => {
      for (const key in item) {
        if (
          this.searchTerm &&
          this.searchTerm[key] !== undefined &&
          typeof this.searchTerm[key] === "string" &&
          typeof item[key] === "string" &&
          item[key]
            .toLowerCase()
            .includes((this.searchTerm[key] as string).toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
    if (reason === "clear") {
      this.currentTableData = this.currentTableDataCopy;
    }
  };

  getFirstStringValue = (obj: EntityType) => {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        return obj[key];
      }
    }
    return "";
  };

  setNewValueInTable = (index: number, key: string, newValue: string) => {
    if (index >= 0 && index < this.currentTableData.length) {
      this.currentTableData[index][key] = newValue;
    }
  };

  setSelectedValue = (value: string) => {
    this.selectedValue = value;
  };
}

export default TableStore;
