import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Header as HeaderRNE,
  Icon,
  CheckBox,
  Overlay,
} from 'react-native-elements';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  FirstDateIsOverSecondDate,
  OverHours,
  TotalHours,
} from '../utils/utils';
import useCommonStore from '../store/CommonStore';
import Record from '../models/Record';
import CameraView from '../components/Camera';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import useRecord from '../helpers/useRecord';
import { getRecordDetailAsString } from '../utils/utils';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
  headerRightText: {
    color: 'white',
    fontSize: 18,
  },
  root: {
    width: '100%',
    // height: '100%',
    alignItems: 'center',
    marginTop: '5%',
    paddingBottom: 48,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  label: {
    width: '30%',
    marginLeft: '7%',
  },
  datePicker: {
    width: '70%',
    backgroundColor: 'transparent',
    fontSize: 22,
  },
  timePicker: {
    width: '25%',
    backgroundColor: 'transparent',
    fontSize: 22,
    marginRight: '2%',
  },
  text: { marginRight: '3%' },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: '5%',
  },
  btnContainer: {
    width: '60%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: '10%',
  },
  cameraBtn: {
    width: 60,
    backgroundColor: Colors.primary2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  deleteBtn: {
    backgroundColor: '#ff9999',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
    borderRadius: 30,
  },
  warning: {
    color: 'red',
    marginLeft: '5%',
  },
  imagePreview: {
    width: '90%',
    height: 400,
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '70%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  confirmDelete: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: '5%',
  },
  btnGroup: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
});

export const ModifyItem = React.memo(() => {
  const navigator = useNavigation<StackNavigationProp<any>>();

  const { updateRecordHandler, deleteRecordHandler } = useRecord();

  const selectedRecord = useCommonStore().selectRecord as Record;
  const setSelectedRecord = useCommonStore().setSelectRecord;

  const [startWorkTime, setStartWorkTime] = React.useState(
    selectedRecord.startWorkTime
  );
  const [endWorkTime, setEndWorkTime] = React.useState(
    selectedRecord.endWorkTime
  );
  const [hasBreakTime, setHasBreakTime] = React.useState(
    selectedRecord.hasBreakTime
  );
  const [startBreakTime, setStartBreakTime] = React.useState(
    hasBreakTime ? selectedRecord.startBreakTime : new Date()
  );
  const [endBreakTime, setEndBreakTime] = React.useState(
    hasBreakTime ? selectedRecord.endBreakTime : new Date()
  );

  const [warning, setWarning] = React.useState<string>();
  const [openCamera, setOpenCamera] = React.useState(false);
  const [takenPhoto, setTakenPhoto] = React.useState<MediaLibrary.Asset>();
  const [openModal, setOpenModal] = React.useState(false);

  const onStartWorkTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    setStartWorkTime(currentDate as Date);
  };

  const onEndWorkTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    setEndWorkTime(currentDate as Date);
  };

  const onStartBreakTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    setStartBreakTime(currentDate as Date);
  };

  const onEndBreakTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    setEndBreakTime(currentDate as Date);
  };

  const toggleOverlay = () => {
    setOpenModal((prev) => !prev);
  };

  const verifyPermissions = async () => {
    const { status: status_camera } = await Camera.requestPermissionsAsync();
    const { status: status_mediaLibrary } =
      await MediaLibrary.requestPermissionsAsync();
    if (status_camera !== 'granted' || status_mediaLibrary !== 'granted') {
      Alert.alert('Permission Required', 'Grand permission to use this app.', [
        { text: 'Okay' },
      ]);
      return false;
    }
    return true;
  };

  const openCameraHandler = async () => {
    const granted = await verifyPermissions();
    if (!granted) return;
    setOpenCamera(true);
  };

  const closeCameraHandler = () => {
    setOpenCamera(false);
  };

  const onTakePicture = async (imgPath: string) => {
    const newAsset = await MediaLibrary.createAssetAsync(imgPath);
    setTakenPhoto(newAsset);
    closeCameraHandler();
  };

  const onSaveHandler = async () => {
    if (FirstDateIsOverSecondDate(startWorkTime, endWorkTime)) {
      setWarning('工作時間輸入有誤');
      return;
    }
    if (
      hasBreakTime &&
      FirstDateIsOverSecondDate(startBreakTime, endBreakTime)
    ) {
      setWarning('休息時間輸入有誤');
      return;
    }
    const totalBreakHr = hasBreakTime
      ? TotalHours(startBreakTime, endBreakTime)
      : 0;
    const totalWorkHr = TotalHours(startWorkTime, endWorkTime) - totalBreakHr;
    const overWorkHr = OverHours(totalWorkHr);

    await updateRecordHandler({
      id: selectedRecord.id,
      startWorkTime,
      endWorkTime,
      hasBreakTime,
      startBreakTime,
      endBreakTime,
      imageUri: takenPhoto?.uri ?? selectedRecord.imageUri,
    });

    setSelectedRecord({
      id: selectedRecord.id,
      date: selectedRecord.date,
      totalWorkHours: totalWorkHr,
      overWorkHours: overWorkHr,
      startWorkTime,
      endWorkTime,
      hasBreakTime,
      startBreakTime,
      endBreakTime,
      imageUri: takenPhoto?.uri ?? selectedRecord.imageUri,
    });

    setWarning(undefined);
    navigator.goBack();
  };

  const deleteHandler = async () => {
    navigator.navigate('Home');
    let mounted = true;

    await deleteRecordHandler({ id: selectedRecord.id }).then(() => {
      if (mounted) {
        setSelectedRecord(null);
        setOpenModal(false);
      }
    });

    return () => (mounted = false);
  };

  const { year, month, day } = getRecordDetailAsString(selectedRecord);

  return (
    <>
      {openCamera ? (
        <CameraView
          onTakePicture={onTakePicture}
          onCloseCamera={closeCameraHandler}
        />
      ) : (
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
                <TouchableOpacity onPress={onSaveHandler}>
                  <Text style={styles.headerRightText}>儲存</Text>
                </TouchableOpacity>
              </View>
            }
            centerComponent={{
              text: year + '/' + month + '/' + day,
              style: DefaultStyles.heading,
            }}
          />
          {
            <Overlay
              isVisible={openModal}
              onBackdropPress={toggleOverlay}
              overlayStyle={styles.overlay}
            >
              <Text style={styles.confirmDelete}>確認刪除？</Text>
              <View style={styles.btnGroup}>
                <Button title="確認" onPress={deleteHandler} />
                <Button
                  title="取消"
                  onPress={() => {
                    setOpenModal(false);
                  }}
                />
              </View>
            </Overlay>
          }
          <ScrollView contentContainerStyle={styles.root}>
            {warning && (
              <View style={styles.container}>
                <Text style={styles.warning}>* {warning}</Text>
              </View>
            )}
            <View style={styles.container}>
              <Text style={{ ...styles.label, ...DefaultStyles.bodyText }}>
                工作時間
              </Text>
              <DateTimePicker
                testID="timePicker"
                value={startWorkTime}
                mode="time"
                display="default"
                onChange={onStartWorkTimeChange}
                style={styles.timePicker}
              />
              <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
                -
              </Text>
              <DateTimePicker
                testID="timePicker"
                value={endWorkTime}
                mode="time"
                display="default"
                onChange={onEndWorkTimeChange}
                style={styles.timePicker}
              />
            </View>
            <View style={styles.container}>
              <CheckBox
                title="難得有午休"
                checked={hasBreakTime}
                onPress={() => {
                  setHasBreakTime((prev) => !prev);
                }}
                containerStyle={styles.checkBox}
                textStyle={{ ...DefaultStyles.bodyText }}
              />
            </View>
            {hasBreakTime && (
              <View style={styles.container}>
                <Text style={{ ...styles.label, ...DefaultStyles.bodyText }}>
                  午休時間
                </Text>
                <DateTimePicker
                  testID="timePicker"
                  value={startBreakTime}
                  mode="time"
                  display="default"
                  onChange={onStartBreakTimeChange}
                  style={styles.timePicker}
                />
                <Text style={{ ...styles.text, ...DefaultStyles.bodyText }}>
                  -
                </Text>
                <DateTimePicker
                  testID="timePicker"
                  value={endBreakTime}
                  mode="time"
                  display="default"
                  onChange={onEndBreakTimeChange}
                  style={styles.timePicker}
                />
              </View>
            )}
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cameraBtn}
                onPress={openCameraHandler}
              >
                <Icon type="material" name="add-a-photo" color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={toggleOverlay}
              >
                <Icon type="material" name="delete" color="black" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.imagePreview}>
              {!takenPhoto ? (
                selectedRecord.imageUri === '' ? (
                  <Text style={DefaultStyles.bodyText}>未拍攝任何照片</Text>
                ) : (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    defaultSource={require('../assets/image-not-found.png')}
                    source={{ uri: selectedRecord.imageUri }}
                  />
                )
              ) : (
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  defaultSource={require('../assets/image-not-found.png')}
                  source={{ uri: takenPhoto.uri }}
                />
              )}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
});
