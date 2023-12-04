import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, Button } from 'react-native';
import { launchImageLibrary ,launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import notifee from '@notifee/react-native';
export default function NewPost() {
const displayNotification=async()=>{
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}
    // const [selectedImage, setSelectedImage] = useState(null);

    // const openImagePicker = () => {
    //   const options = {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     maxHeight: 2000,
    //     maxWidth: 2000,
    //   };
  
    //   launchImageLibrary(options, (response) => {
    //     if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //     } else if (response.error) {
    //       console.log('Image picker error: ', response.error);
    //     } else {
    //       let imageUri = response.uri || response.assets?.[0]?.uri;
    //       setSelectedImage(imageUri);
    //     }
    //   });
    // };
    
    // handleCameraLaunch = () => {
    //   const options = {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     maxHeight: 2000,
    //     maxWidth: 2000,
    //   };
    
    //   launchCamera(options, response => {
    //     console.log('Response = ', response);
    //     if (response.didCancel) {
    //       console.log('User cancelled camera');
    //     } else if (response.error) {
    //       console.log('Camera Error: ', response.error);
    //     } else {
    //       // Process the captured image
    //       let imageUri = response.uri || response.assets?.[0]?.uri;
    //       setSelectedImage(imageUri);
    //       console.log(imageUri);
    //     }
    //   });
    // }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
       {/* {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{ marginTop: 20,marginBottom: 50 }}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View> */}
    <View>
      <Button title="Display Notification" onPress={() => {displayNotification()}} />
    </View>
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
