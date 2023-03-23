import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Header as HeaderRNE, Icon } from 'react-native-elements';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import { getRecordDetailAsString, RoundNumber } from '../utils/utils';
import useCommonStore from '../store/CommonStore';
import Record from '../models/Record';

const styles = StyleSheet.create({
  headerRightText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    width: '100%',
    marginTop: '5%',
    height: '100%',
  },
  listContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: '10%',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    width: '30%',
    marginRight: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contentTextContainer: {
    // width: '15%',
    marginRight: 16,
    flexDirection: 'row',
  },
  text: {
    marginBottom: '2%',
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
    height: '25%',
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
  finishBtn: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imgPreviewContainer: {
    height: '60%',
    width: '90%',
    marginVertical: '5%',
    borderColor: '#ccc',
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: { width: '100%', height: '100%' },
});

const Detail = () => {
  const navigator = useNavigation<StackNavigationProp<any>>();

  const selectedRecord = useCommonStore().selectRecord as Record;

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
  } = getRecordDetailAsString(selectedRecord);

  const startBreak = startBreakHour + ':' + startBreakMinute;
  const endBreak = endBreakHour + ':' + endBreakMinute;

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
            <TouchableOpacity
              onPress={() => {
                navigator.navigate('ModifyItem');
              }}
            >
              <Text style={styles.headerRightText}>修改</Text>
            </TouchableOpacity>
          </View>
        }
        centerComponent={{
          text: year + '/' + month + '/' + day,
          style: DefaultStyles.heading,
        }}
      />
      <SafeAreaView style={styles.container}>
        {selectedRecord && (
          <>
            <View style={styles.listContainer}>
              <View style={styles.rowContainer}>
                <View style={styles.labelContainer}>
                  <Text style={DefaultStyles.bodyText}>工作時間</Text>
                </View>
                <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
                  {startWorkHour +
                    ':' +
                    startWorkMinute +
                    ' ~ ' +
                    endWorkHour +
                    ':' +
                    endWorkMinute}
                </Text>
              </View>
              {selectedRecord.hasBreakTime && (
                <View style={styles.rowContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={DefaultStyles.bodyText}>午休時間</Text>
                  </View>
                  <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
                    {startBreak + ' ~ ' + endBreak}
                  </Text>
                </View>
              )}
              <View style={styles.rowContainer}>
                <View style={styles.labelContainer}>
                  <Text style={DefaultStyles.bodyText}>總工時</Text>
                </View>
                <View style={styles.contentTextContainer}>
                  <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
                    {RoundNumber(selectedRecord.totalWorkHours)}
                  </Text>
                </View>
                <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
                  小時
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.labelContainer}>
                  <Text style={DefaultStyles.bodyText}>加班</Text>
                </View>
                <View style={styles.contentTextContainer}>
                  <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
                    {RoundNumber(selectedRecord.overWorkHours)}
                  </Text>
                </View>
                <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
                  小時
                </Text>
              </View>
            </View>
            <View style={styles.imgPreviewContainer}>
              {selectedRecord.imageUri === '' ? (
                <Text style={DefaultStyles.bodyText}>未拍攝照片</Text>
              ) : (
                <Image
                  style={styles.img}
                  defaultSource={require('../assets/image-not-found.png')}
                  resizeMode="cover"
                  source={{ uri: selectedRecord.imageUri }}
                />
              )}
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default Detail;
