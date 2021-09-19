export type SelectorItemType = {
  label: string;
  value: number;
};

export type DB_FETCH_PROPS = {
  month: number;
};

export type DB_INSERT_PROPS = {
  month: number;
  date: Date;
  startWorkTime: Date;
  endWorkTime: Date;
  hasBreakTime: boolean;
  startBreakTime: Date;
  endBreakTime: Date;
  imageUri: string;
};

export type DB_DELETE_PROPS = {
  id: string;
};

export type DB_UPDATE_PROPS = {
  id: string;
  startWorkTime: Date;
  endWorkTime: Date;
  hasBreakTime: boolean;
  startBreakTime: Date;
  endBreakTime: Date;
  imageUri: string;
};
