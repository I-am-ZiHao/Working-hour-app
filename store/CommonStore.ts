import create from 'zustand';
import Record from '../models/Record';

type State = {
  allRecords: Record[];
  setAllRecords: (allRecords: Record[]) => void;
  selectMonth: number;
  setSelectMonth: (selectMonth: number) => void;
};

const TODAY = new Date();

const useCommonStore = create<State>((set) => ({
  allRecords: [],
  setAllRecords: (records) => set({ allRecords: records }),
  selectMonth: TODAY.getMonth() + 1,
  setSelectMonth: (month) => set({ selectMonth: month }),
}));

export default useCommonStore;
