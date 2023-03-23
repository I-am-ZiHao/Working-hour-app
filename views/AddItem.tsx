import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header as HeaderRNE, Icon, CheckBox } from 'react-native-elements';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FirstDateIsOverSecondDate } from '../utils/utils';
import useCommonStore from '../store/CommonStore';
import CameraView from '../components/Camera';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import useRecord from '../helpers/useRecord';
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
    // width: '70%',
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
  cameraBtnContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
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
});

const AddItem = () => {
  const navigator = useNavigation<StackNavigationProp<any>>();

  const selectedMonth = useCommonStore().selectMonth;

  const { addRecordHandler } = useRecord();

  const TODAY = new Date();
  const [date, setDate] = React.useState(
    new Date(TODAY.getFullYear(), selectedMonth - 1, TODAY.getDate())
  );
  const [startWorkTime, setStartWorkTime] = React.useState(TODAY);
  const [endWorkTime, setEndWorkTime] = React.useState(TODAY);
  const [startBreakTime, setStartBreakTime] = React.useState(TODAY);
  const [endBreakTime, setEndBreakTime] = React.useState(TODAY);
  const [hasBreakTime, setHasBreakTime] = React.useState(false);
  const [warning, setWarning] = React.useState<string>();
  const [openCamera, setOpenCamera] = React.useState(false);
  const [takenPhoto, setTakenPhoto] = React.useState<MediaLibrary.Asset>();

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate as Date);
  };

  const onStartWorkTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setStartWorkTime(currentDate as Date);
  };

  const onEndWorkTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setEndWorkTime(currentDate as Date);
  };

  const onStartBreakTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setStartBreakTime(currentDate as Date);
  };

  const onEndBreakTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setEndBreakTime(currentDate as Date);
  };

  const verifyPermissions = async () => {
    const { status: status_camera } =
      await Camera.requestCameraPermissionsAsync();
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

    await addRecordHandler({
      month: date.getMonth() + 1,
      date,
      startWorkTime,
      endWorkTime,
      hasBreakTime,
      startBreakTime,
      endBreakTime,
      imageUri: takenPhoto?.uri ?? '',
    });

    setWarning(undefined);
    navigator.goBack();
  };

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
            centerComponent={{ text: '新增工時', style: DefaultStyles.heading }}
          />
          <ScrollView contentContainerStyle={styles.root}>
            {warning && (
              <View style={styles.container}>
                <Text style={styles.warning}>* {warning}</Text>
              </View>
            )}
            <View style={styles.container}>
              <Text style={{ ...styles.label, ...DefaultStyles.bodyText }}>
                選擇日期
              </Text>
              <DateTimePicker
                testID="datePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
                style={styles.datePicker}
              />
            </View>
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
            <View style={styles.cameraBtnContainer}>
              <TouchableOpacity
                style={styles.cameraBtn}
                onPress={openCameraHandler}
              >
                <Icon type="material" name="add-a-photo" color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.imagePreview}>
              {!takenPhoto ? (
                <Text style={DefaultStyles.bodyText}>尚未拍攝任何照片</Text>
              ) : (
                <Image
                  defaultSource={require('../assets/image-not-found.png')}
                  resizeMode="cover"
                  style={styles.image}
                  source={{ uri: takenPhoto.uri }}
                />
              )}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default AddItem;
