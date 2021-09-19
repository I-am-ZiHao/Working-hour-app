import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import Record from '../models/Record';
import { getRecordDetailAsString } from '../utils/utils';

const styles = StyleSheet.create({
  root: {
    width: '90%',
    height: 50,
    borderColor: Colors.primary3,
    borderWidth: 2,
    alignSelf: 'center',
    marginVertical: '3%',
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerNotFinish: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.primary3,
  },
  text: {
    color: Colors.primary2,
  },
  textNotFinish: {
    color: 'white',
  },
});

export type SmallCardProps = {
  record: Record;
  notFinish?: boolean;
  onPress?: () => void;
};

const SmallCard = ({ record, notFinish, onPress }: SmallCardProps) => {
  const {
    date,
    year,
    month,
    day,
    startWorkHour,
    startWorkMinute,
    endWorkHour,
    endWorkMinute,
    ...rest
  } = getRecordDetailAsString(record);

  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <View style={notFinish ? styles.containerNotFinish : styles.container}>
        <Text
          style={
            notFinish
              ? { ...styles.textNotFinish, ...DefaultStyles.smallCardText }
              : { ...styles.text, ...DefaultStyles.smallCardText }
          }
        >
          {year + '/' + month + '/' + day}
        </Text>
        <Text
          style={
            notFinish
              ? { ...styles.textNotFinish, ...DefaultStyles.smallCardText }
              : { ...styles.text, ...DefaultStyles.smallCardText }
          }
        >
          {startWorkHour +
            ':' +
            startWorkMinute +
            ' ~ ' +
            endWorkHour +
            ':' +
            endWorkMinute}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SmallCard;
