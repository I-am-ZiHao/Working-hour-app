import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header as HeaderRNE, Icon } from 'react-native-elements';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavParamList } from '../navigators/RootNavigator';
import { getRecordDetailAsString } from '../utils/utils';
import useCommonStore from '../store/CommonStore';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginTop: '10%',
  },
  text: {
    marginBottom: '5%',
    alignSelf: 'center',
  },
});

type DetailProps = NativeStackScreenProps<RootNavParamList, 'Detail'>;

const Detail = ({ route, navigation }: DetailProps) => {
  const navigator = useNavigation();

  const allRecords = useCommonStore().allRecords;

  const { record_id } = route.params;
  const record = allRecords.filter((d) => d.id === record_id)[0];

  const {
    date,
    year,
    month,
    day,
    startWorkHour,
    startWorkMinute,
    endWorkHour,
    endWorkMinute,
    startBreakHour,
    startBreakMinute,
    endBreakHour,
    endBreakMinute,
  } = getRecordDetailAsString(record);

  return (
    <>
      <HeaderRNE
        containerStyle={{
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: Colors.primary,
        }}
        leftComponent={
          <View style={DefaultStyles.headerLeft}>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigator.goBack();
              }}
            >
              <Icon type="material" name="arrow-back-ios" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{
          text: year + '/' + month + '/' + day,
          style: DefaultStyles.heading,
        }}
      />
      <SafeAreaView style={styles.container}>
        <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
          工作時間{'     '}
          {startWorkHour +
            ':' +
            startWorkMinute +
            ' ~ ' +
            endWorkHour +
            ':' +
            endWorkMinute}
        </Text>
        <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
          午休時間{'     '}
          {startBreakHour +
            ':' +
            startBreakMinute +
            ' ~ ' +
            endBreakHour +
            ':' +
            endBreakMinute}
        </Text>
        <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
          總工時{'     '}
          {record.totalWorkHours}
          {'     '}小時
        </Text>
        <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
          加班{'     '}
          {record.overWorkHours}
          {'     '}小時
        </Text>
      </SafeAreaView>
    </>
  );
};

export default Detail;
