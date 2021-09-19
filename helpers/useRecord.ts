import {
  DB_INSERT_PROPS,
  DB_DELETE_PROPS,
  DB_UPDATE_PROPS,
} from '../common/type';
import { useState } from 'react';
import Record from '../models/Record';
import {
  dbFetchRecord,
  dbInsertRecord,
  dbDeleteRecord,
  dbUpdateRecord,
} from '../helpers/db';
import { TotalHours, OverHours } from '../utils/utils';

export default function useRecord() {
  const [isLoading, setIsLoading] = useState(false);
  const [allRecords, setAllRecords] = useState<Record[] | null>();

  const loadRecordHandler = async (month: number) => {
    setIsLoading(true);
    const dbFetchResult = await dbFetchRecord({ month });
    setAllRecords(
      (dbFetchResult as any).rows._array.map((record) => {
        const date = new Date(record.date as number);
        const startBreakTime = new Date(record.startbreaktime as number);
        const endBreakTime = new Date(record.endbreaktime as number);
        const startWorkTime = new Date(record.startworktime as number);
        const endWorkTime = new Date(record.endworktime as number);
        const hasBreakTime = record.hasBreakTime === 0 ? false : true;
        const totalBreakHr = hasBreakTime
          ? TotalHours(startBreakTime, endBreakTime)
          : 0;
        const totalWorkHr =
          TotalHours(startWorkTime, endWorkTime) - totalBreakHr;
        const overWorkHr = OverHours(totalWorkHr);
        return new Record(
          (record.id as number).toString(),
          date,
          totalWorkHr,
          overWorkHr,
          startWorkTime,
          endWorkTime,
          hasBreakTime,
          startBreakTime,
          endBreakTime,
          record.imageUri
        );
      })
    );
    setIsLoading(false);
  };

  const addRecordHandler = async (data: DB_INSERT_PROPS) => {
    setIsLoading(true);
    try {
      await dbInsertRecord(data);
      alert('新增成功!');
    } catch {
      alert('新增失敗!');
    }
    setIsLoading(false);
  };

  const deleteRecordHandler = async (data: DB_DELETE_PROPS) => {
    setIsLoading(true);
    try {
      await dbDeleteRecord(data);
      alert('刪除成功!');
    } catch {
      alert('刪除失敗!');
    }
    setIsLoading(false);
  };

  const updateRecordHandler = async (data: DB_UPDATE_PROPS) => {
    setIsLoading(true);
    try {
      await dbUpdateRecord(data);
      alert('更新成功!');
    } catch {
      alert('更新失敗!');
    }
    setIsLoading(false);
  };

  return {
    allRecords,
    isLoading,
    loadRecordHandler,
    addRecordHandler,
    deleteRecordHandler,
    updateRecordHandler,
  };
}
