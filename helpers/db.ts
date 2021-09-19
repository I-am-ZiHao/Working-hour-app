import * as SQLite from 'expo-sqlite';
import {
  DB_FETCH_PROPS,
  DB_INSERT_PROPS,
  DB_UPDATE_PROPS,
  DB_DELETE_PROPS,
} from '../common/type';

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
        'CREATE TABLE IF NOT EXISTS work (id INTEGER PRIMARY KEY NOT NULL, month INTEGER NOT NULL, date INTEGER NOT NULL, startworktime INTEGER NOT NULL, endworktime INTEGER NOT NULL, hasBreakTime INTEGER NOT NULL, startbreaktime INTEGER, endbreaktime INTEGER, imageUri TEXT NOT NULL);',
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

export const dbInsertRecord = ({
  month,
  date,
  startWorkTime,
  endWorkTime,
  hasBreakTime,
  startBreakTime,
  endBreakTime,
  imageUri,
}: DB_INSERT_PROPS) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO work (month, date, startworktime, endworktime, hasbreaktime, startbreaktime, endbreaktime, imageUri) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [
          month,
          date.getTime(),
          startWorkTime.getTime(),
          endWorkTime.getTime(),
          hasBreakTime ? 1 : 0,
          startBreakTime.getTime(),
          endBreakTime.getTime(),
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

export const dbDeleteRecord = ({ id }: DB_DELETE_PROPS) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM work WHERE id = ?',
        [parseInt(id)],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log('fail in delete');
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const dbFetchRecord = ({ month }: DB_FETCH_PROPS) => {
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

export const dbUpdateRecord = ({
  id,
  startWorkTime,
  endWorkTime,
  hasBreakTime,
  startBreakTime,
  endBreakTime,
  imageUri,
}: DB_UPDATE_PROPS) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE work SET startworktime = ?, endworktime = ?, hasbreaktime = ?, startbreaktime = ?, endbreaktime = ?, imageUri = ? WHERE id = ?',
        [
          startWorkTime.getTime(),
          endWorkTime.getTime(),
          hasBreakTime ? 1 : 0,
          startBreakTime.getTime(),
          endBreakTime.getTime(),
          imageUri,
          id,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log('fail in update');
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};
