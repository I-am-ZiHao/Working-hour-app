import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeBtnContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginVertical: '15%',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
  closeBtn: {
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
  shutterBtnContainer: {
    position: 'absolute',
    bottom: '5%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  sutter: {
    width: 65,
    height: 65,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});

type CameraViewProps = {
  onTakePicture: (imgPath: string) => Promise<void>;
  onCloseCamera: () => void;
};

const CameraView = ({ onTakePicture, onCloseCamera }: CameraViewProps) => {
  let camera: Camera | null;

  const [type, setType] = React.useState(CameraType.back);

  const photeTakenHandler = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    onTakePicture(photo.uri);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(r) => {
          camera = r;
        }}
        type={type}
      >
        <View style={styles.closeBtnContainer}>
          <TouchableOpacity style={styles.closeBtn} onPress={onCloseCamera}>
            <Icon type="material" name="close" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <Icon type="material" name="flip-camera-ios" color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.shutterBtnContainer}>
          <TouchableOpacity style={styles.sutter} onPress={photeTakenHandler} />
        </View>
      </Camera>
    </View>
  );
};

export default CameraView;
