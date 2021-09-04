import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header as HeaderRNE, Icon } from 'react-native-elements';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const styles = StyleSheet.create({
  save: {
    color: 'white',
    fontSize: 18,
  },
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
});

const AddItem = () => {
  const navigator = useNavigation();

  const [date, setDate] = React.useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate as Date);
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
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: '新增工時', style: DefaultStyles.heading }}
      />
      <View>
        <Text>AddItem</Text>
        {/* <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={styles.dateTimePicker}
        /> */}
      </View>
    </>
  );
};

export default AddItem;
