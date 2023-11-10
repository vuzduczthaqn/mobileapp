import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {hoverGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/hoverGesture';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {url} from '../../url_request';
import {color, size} from '../../constants';
import {GlobalContext} from '../../context';

export default function ChangeAvatar() {
  const {user, setUser} = useContext(GlobalContext);
  const [avatar, setAvartar] = useState(user.urlAvata);
  const [accessButton, setAccessButton] = useState(false);
  const navigation = useNavigation();
  const openLib = () => {
    let option = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(option, Response => {
      if (!Response.didCancel) setAvartar(Response.assets[0].uri);
    });
  };

  const addAvatarInServer = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', user.userId);
      formData.append('url', url.url);
      formData.append('type', 'URLAVATAR');
      formData.append('image', {
        uri: avatar,
        name: avatar.split('/').pop(), // Tên tệp ảnh
        type: 'image/jpeg',
      }); // Loại tệp ảnh
      const respone = await axios.post(url.updateAvatar, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(respone.status===200){
        console.log(respone.data);
      }
    } catch (Error) {
      console.log(Error);
    }
    navigation.goBack();
  };
  useEffect(() => {
    openLib();
    if (avatar.content == 0) {
      // setAccessButton(false)
    } else {
      setAccessButton(true);
    }
  }, []);
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.containerHeader}>
            <TouchableOpacity
              style={styles.goBackButton}
              onPress={() => navigation.goBack()}>
              <Feather name="x" color="black" size={25}></Feather>
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                alignSelf: 'center',
                marginLeft: 100,
                fontWeight: '600',
              }}>
              Chọn ảnh
            </Text>
            <View style={{flex: 1}}></View>
            {avatar != user.urlAvata ? (
              <TouchableOpacity style={styles.buttonNoAccess}
              onPress={addAvatarInServer}>
                <Text
                  style={{fontSize: 20, color: '#0291f0', fontWeight: '500'}}>
                  Đăng
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonNoAccess}>
                <Text
                  style={{fontSize: 18, color: '#4c4c4d', fontWeight: '500'}}>
                  Đăng
                </Text>
              </View>
            )}
          </View>
          <View style={styles.containerImage}>
            <Image
              source={{uri: avatar}}
              style={{
                height: size.WIDTH_SCREEN,
                width: size.WIDTH_SCREEN,
                borderRadius: 500,
              }}></Image>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}
            onPress={openLib}>
            <MaterialIcons name="add-to-photos" size={30} color={'#b1b4b5'} />
            <Text style={{fontSize: 20, fontWeight: 700, color: '#b1b4b5'}}>
              Chọn ảnh từ thư viện
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  goBackButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#e8eaeb',
  },
  postNews: {
    backgroundColor: 'pink',
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  containerInfor: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  boxInput: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'black',
  },
  buttonNoAccess: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
    marginTop: 50,
    marginBottom: 25,
  },
});
