import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
export default function NewPost() {
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const deviceBack = devices.back;
  const deviceFront = devices.front;
  const navigation = useNavigation();
  const [cameraDeviceBack, setCameraDeviceBack] = useState(true);
  const [showCamera, setShowCamera] = useState(true);
  const [isImageCamera, setIsImageCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') await Linking.openSettings();
    }
    getPermission();
  }, []);

  const openLib = () => {
    let option = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(option, (Response) => {
      setImageSource(Response.assets[0].uri);
    });
  };

  const capturePhoto = async () => {
    if (cameraRef.current != null) {
      const photo = await cameraRef.current.takePhoto();
      setImageSource(photo.path);
      setShowCamera(false);
      setIsImageCamera(true);
    }
  };

  if (!deviceBack || !deviceFront) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <View style={styles.cameraContainer}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              device={cameraDeviceBack ? deviceBack : deviceFront}
              isActive={showCamera}
              photo={true}
            />
          </View>
          <View style={styles.emptySpace}></View>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => capturePhoto()}
          >
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" color="white" size={30}></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              setShowCamera(false);
              openLib();
              setIsImageCamera(false);
            }}
          >
            <Icon name="image" color="white" size={35}></Icon>
            <Text style={styles.uploadText}>Tải lên</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipCameraButton}
            onPress={() => {
              setCameraDeviceBack(!cameraDeviceBack);
            }}
          >
            <Icon name="camera-flip" color="white" size={35}></Icon>
            <Text style={styles.uploadText}>Tải lên</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <>
              {isImageCamera ? (
                <Image
                  style={styles.image}
                  source={{ uri: `file://${imageSource}` }}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={{ uri: imageSource }}
                  resizeMode="contain"
                />
              )}
              <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => {
                  setShowCamera(true);
                }}
              >
                <Icon name="arrow-left" color="white" size={30}></Icon>
              </TouchableOpacity>
            </>
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 60,
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  emptySpace: {
    flex: 20,
  },
  captureButton: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.8 + 10,
    left: Dimensions.get('screen').width * 0.5 - 35,
    backgroundColor: 'red',
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  goBackButton: {
    position: 'absolute',
    left: 25,
    top: 25,
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  uploadButton: {
    flex: 1,
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.8 + 15,
    left: Dimensions.get('screen').width * 0.25 - 35,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  flipCameraButton: {
    flex: 1,
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.8 + 15,
    right: Dimensions.get('screen').width * 0.25 - 35,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  uploadText: {
    color: 'white',
  },
  image: {
    height: Dimensions.get('screen').height - 100,
    width: Dimensions.get('screen').width,
  },
});
