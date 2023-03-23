import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  Modal,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MainCard from '../components/MainCard';
import { Header as HeaderRNE, Icon } from 'react-native-elements';
import { SelectorItemType } from '../common/type';
import Selector from '../components/Selector';
import { WorkingHoursSummation } from '../utils/utils';
import SmallCard from '../components/SmallCard';
import useCommonStore from '../store/CommonStore';
import useRecord from '../helpers/useRecord';

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '5%',
    paddingHorizontal: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginHorizontal: '10%',
    height: '80%',
  },
  modalView: {
    width: '100%',
    height: '35%',
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
  selectorContainer: {
    width: '100%',
    height: '70%',
    marginBottom: '5%',
  },
  finishBtn: {
    marginTop: '5%',
  },
  listContainer: {
    marginTop: '5%',
  },
});

const Home = () => {
  const navigator = useNavigation<StackNavigationProp<any>>();

  const { allRecords, isLoading, loadRecordHandler } = useRecord();

  const selectedMonth = useCommonStore().selectMonth;
  const setSelectedMonth = useCommonStore().setSelectMonth;
  const setSelectedRecord = useCommonStore().setSelectRecord;

  const [openModal, setOpenModal] = React.useState(false);

  const [totalWorkingHours, setTotalWorkingHours] = React.useState<number>();
  const [totalOverHours, setTotalOverHours] = React.useState<number>();

  const createMonthItem = () => {
    let output: SelectorItemType[] = [];
    for (let i = 1; i <= 12; i++) {
      output.push({ label: i.toString() + '月', value: i });
    }
    return output;
  };

  const monthItems = createMonthItem();

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadRecordHandler(selectedMonth);
    }, [selectedMonth])
  );

  React.useEffect(() => {
    if (allRecords) {
      setTotalWorkingHours(WorkingHoursSummation(allRecords, 'work'));
      setTotalOverHours(WorkingHoursSummation(allRecords, 'over'));
    }
  }, [allRecords]);

  return (
    <>
      <HeaderRNE
        containerStyle={{
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: Colors.primary,
        }}
        rightComponent={
          <View style={DefaultStyles.headerRight}>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigator.navigate('AddItem');
              }}
            >
              <Icon type="material" name="add" color="white" size={30} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: '工時紀錄', style: DefaultStyles.heading }}
      />
      <SafeAreaView>
        <View style={styles.cardContainer}>
          <MainCard
            title={selectedMonth.toString() + '月工時'}
            mainContent={totalWorkingHours ?? 0}
            onPress={onModalOpen}
          />
          <MainCard title="已加班" mainContent={totalOverHours ?? 0} />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={openModal}
          onRequestClose={onModalClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.selectorContainer}>
                <Selector
                  items={monthItems}
                  selectedValue={selectedMonth}
                  setSelectedValue={setSelectedMonth}
                />
              </View>
              <View style={styles.finishBtn}>
                <Button title="完成" onPress={onModalClose} />
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView style={styles.listContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            allRecords
              ?.sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((record) => (
                <SmallCard
                  key={record.id}
                  record={record}
                  notFinish={record.totalWorkHours <= 0 ? true : false}
                  onPress={() => {
                    setSelectedRecord(record);
                    navigator.navigate('Detail');
                  }}
                />
              ))
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
