import * as SQLite from 'expo-sqlite';
import { DB_INSERT_PROPS } from '../common/type';

const db = SQLite.openDatabase('work.db');

export const dbInit = () => {
  const promise = new Promise((resolve, reject) => {
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'DROP TABLE work;',
    //     [],
    //     (_, result) => {
    //       resolve(result);
    //     },
    //     (_, err) => {
    //       console.log('failed in drop');
    //       reject(err);
    //       return false;
    //     }
    //   );
    // });
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS work (id INTEGER PRIMARY KEY NOT NULL, month INTEGER NOT NULL, date INTEGER NOT NULL, startworktime INTEGER NOT NULL, endworktime INTEGER NOT NULL, startbreaktime INTEGER NOT NULL, endbreaktime INTEGER NOT NULL, imageUri TEXT NOT NULL);',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log('failed in create');
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

// need to check if same date exist
export const dbInsertRecord = ({
  month,
  date,
  startWorkTime,
  endWorkTime,
  startBreakTime,
  endBreakTime,
  imageUri,
}: DB_INSERT_PROPS) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO work (month, date, startworktime, endworktime, startbreaktime, endbreaktime, imageUri) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [
          month,
          date,
          startWorkTime,
          endWorkTime,
          startBreakTime,
          endBreakTime,
          imageUri,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log('fail in insert');
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const dbFetchRecord = (month: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM work WHERE month = ?',
        [month],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log('fail in fetch');
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};
