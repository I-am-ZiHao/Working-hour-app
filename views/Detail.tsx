import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Modal,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header as HeaderRNE, Icon } from 'react-native-elements';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavParamList } from '../navigators/RootNavigator';
import { getRecordDetailAsString, RoundNumber } from '../utils/utils';
import useCommonStore from '../store/CommonStore';
import { dbDeleteRecord } from '../helpers/db';

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
  headerRightText: {
    color: 'white',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginHorizontal: '10%',
    height: '60%',
  },
  modalView: {
    width: '80%',
    height: '20%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: '5%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  comfirmTextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '20%',
  },
  comfirmText: {},
  finishBtn: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

type DetailProps = NativeStackScreenProps<RootNavParamList, 'Detail'>;

const Detail = ({ route, navigation }: DetailProps) => {
  const navigator = useNavigation();

  const allRecords = useCommonStore().allRecords;
  const setAllRecords = useCommonStore().setAllRecords;

  const [openModal, setOpenModal] = React.useState(false);

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

  const startBreak = startBreakHour + ':' + startBreakMinute;
  const endBreak = endBreakHour + ':' + endBreakMinute;

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  const onDeleteHandler = async () => {
    navigator.goBack(); // 先回去，不然re-render會找不到record
    let mounted = true;
    await dbDeleteRecord(parseInt(record_id)).then(() => {
      if (mounted) {
        setAllRecords(allRecords.filter((record) => record.id !== record_id));
        setOpenModal(false);
      }
    });
    return () => (mounted = false);
  };

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
        rightComponent={
          <View style={DefaultStyles.headerRight}>
            <TouchableOpacity onPress={onModalOpen}>
              <Text style={styles.headerRightText}>Delete</Text>
            </TouchableOpacity>
          </View>
        }
        centerComponent={{
          text: year + '/' + month + '/' + day,
          style: DefaultStyles.heading,
        }}
      />
      <SafeAreaView style={styles.container}>
        {openModal && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={openModal}
            onRequestClose={onModalClose}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.comfirmTextContainer}>
                  <Text style={DefaultStyles.bodyText}>確定刪除？</Text>
                </View>
                <View style={styles.finishBtn}>
                  <Button title="確認" onPress={onDeleteHandler} />
                  <Button title="取消" onPress={onModalClose} />
                </View>
              </View>
            </View>
          </Modal>
        )}
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
        {startBreak !== endBreak && (
          <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
            午休時間{'     '}
            {startBreak + ' ~ ' + endBreak}
          </Text>
        )}
        <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
          總工時{'     '}
          {RoundNumber(record.totalWorkHours)}
          {'     '}小時
        </Text>
        <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
          加班{'     '}
          {RoundNumber(record.overWorkHours)}
          {'     '}小時
        </Text>
      </SafeAreaView>
    </>
  );
};

export default Detail;
