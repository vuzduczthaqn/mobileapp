import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function NewPost() {
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const navigation = useNavigation();

  const [cameraDevice, setCameraDevice] = useState();
  const [showCamera, setShowCamera] = useState(true);
  const [isImageCamera, setIsImageShowCamera] = useState(false);
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
    launchImageLibrary(option, Response => {
      setImageSource(Response.assets[0].uri);
    });
  };
  const capturePhoto = async () => {
    if (cameraRef.current != null) {
      const photo = await cameraRef.current.takePhoto();
      setImageSource(photo.path);
      setShowCamera(false);
      setIsImageShowCamera(true);
    }
  };
  if (device == null) {
    return <Text>Camera not avaible</Text>;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {showCamera ? (
        <>
          <View style={{flex: 1}}>
            <Camera
              ref={cameraRef}
              style={{flex: 1,height:500}}
              device={device}
              isActive={showCamera}
              photo={true}
            />
          </View>

          <View
            style={{
              flex: 1,
              position: 'absolute',
              top: Dimensions.get('screen').height * 0.8,
              left: Dimensions.get('screen').width * 0.5 - 25,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: 60,
                width: 60,
                borderRadius: 50,
              }}
              onPress={() => capturePhoto()}>
              <Text></Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              position: 'absolute',
              left: 25,
              top: 25,
              height: 50,
              width: 50,
              borderRadius: 50,
            }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
              }}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" color="white" size={30}></Icon>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              position: 'absolute',
              top: Dimensions.get('screen').height * 0.8 + 10,
              left: Dimensions.get('screen').width * 0.25 - 35,
              height: 50,
              width: 50,
              borderRadius: 50,
            }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
              }}
              onPress={() => {
                setShowCamera(false);
                openLib();
                setIsImageShowCamera(false);
              }}>
              <Icon name="image" color="white" size={35}></Icon>
              <Text style={{color: 'white'}}>Tải lên</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <>
              {isImageCamera == true ? (
                <Image
                  style={{
                    height: Dimensions.get('screen').height - 100,
                    width: Dimensions.get('screen').width,
                    transform:[{ rotate: '270deg' }],
                  }}
                  source={{uri: `file://'${imageSource}`}}
                  // resizeMode="contain"
                />
              ) : (
                <Image
                  style={{
                    height: Dimensions.get('screen').height - 100,
                    width: Dimensions.get('screen').width,
                    
                  }}
                  source={{uri: imageSource}}
                  resizeMode="contain"
                />
              )}
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  left: 25,
                  top: 25,
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                }}>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  onPress={() => {
                    setShowCamera(true);
                  }}>
                  <Icon name="arrow-left" color="white" size={30}></Icon>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </>
      )}
    </View>
  );
}
