import { create } from 'zustand';
import Record from '../models/Record';

type State = {
  // allRecords: Record[];
  // setAllRecords: (allRecords: Record[]) => void;
  selectMonth: number;
  setSelectMonth: (selectMonth: number) => void;
  selectRecord: Record | null;
  setSelectRecord: (selectRecord: Record | null) => void;
};

const TODAY = new Date();

const useCommonStore = create<State>((set) => ({
  // allRecords: [],
  // setAllRecords: (records) => set({ allRecords: records }),
  selectMonth: TODAY.getMonth() + 1,
  setSelectMonth: (month) => set({ selectMonth: month }),
  selectRecord: null,
  setSelectRecord: (record) => set({ selectRecord: record }),
}));

export default useCommonStore;
