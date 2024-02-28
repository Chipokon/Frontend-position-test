export type storeType = {
  typeOfTable: string;
  products: EntityType[];
  pages: EntityType[];
  pricePlans: EntityType[];

  currentTableData: EntityType[];
  currentTableDataCopy: EntityType[];
  searchTerm: Record<string, unknown>;
  selectedValue: string;
  handleSearch: (
    event: React.SyntheticEvent<Element, Event>,
    value: EntityType,
    reason: string
  ) => void;
  getFirstStringValue: (obj: EntityType) => void;
  setNewValueInTable: (index: number, key: string, newValue: string) => void;
  setSelectedValue: (value: string) => void;
};

export type EntityType = Record<string, any | unknown>;
