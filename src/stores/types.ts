export type storeType = {
  typeOfTable: string;
  products: EntityType[];
  pages: EntityType[];
  pricePlans: EntityType[];

  currentTableData: EntityType[];
  currentTableDataCopy: EntityType[];
  searchTerm: EntityType;
  selectedValue: string;
  handleSearch: (
    event: React.SyntheticEvent<Element, Event>,
    value: EntityType | null,
    reason: string
  ) => void;
  getFirstStringValue: (obj: EntityType) => string;
  setNewValueInTable: (index: number, key: string, newValue: string) => void;
  setSelectedValue: (value: string) => void;
};

export type EntityType = Record<string, any>;
