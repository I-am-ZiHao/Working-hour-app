import create from 'zustand';
import Record from '../models/Record';

type State = {
  allRecords: Record[];
  setAllRecords: (allRecords: Record[]) => void;
};

const useCommonStore = create<State>((set) => ({
  allRecords: [],
  setAllRecords: (records) => set({ allRecords: records }),
}));

export default useCommonStore;
