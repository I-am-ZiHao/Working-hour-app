import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MainCard from '../components/MainCard';
import { Header as HeaderRNE, Icon } from 'react-native-elements';
import { SelectorItemType } from '../common/type';
import Selector from '../components/Selector';

const styles = StyleSheet.create({
  dateTimePickerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginVertical: '5%',
  },
  dateTimePicker: {
    width: '70%',
    backgroundColor: 'transparent',
  },
  dateTimePickerTitle: {
    marginHorizontal: '6%',
    color: Colors.secondary,
  },
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
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
    height: '30%',
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
});

const Home = () => {
  const navigator = useNavigation();

  const TODAY = new Date();
  const [date, setDate] = React.useState(TODAY);
  const [selectedMonth, setSelectedMonth] = React.useState(TODAY.getMonth());
  const [openModal, setOpenModal] = React.useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate as Date);
  };

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
              <Icon type="material" name="add" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: '工時紀錄', style: DefaultStyles.heading }}
      />
      <View>
        <View style={styles.cardContainer}>
          <MainCard
            title={selectedMonth.toString() + '月工時'}
            mainContent={69}
            onPress={onModalOpen}
          />
          <MainCard title="已加班" mainContent={32} />
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
        {/* <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={styles.dateTimePicker}
        /> */}
        <Button
          title="Detail"
          onPress={() => {
            navigator.navigate('Detail');
          }}
        />
      </View>
    </>
  );
};

export default Home;
