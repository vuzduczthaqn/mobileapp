import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import {AsyncStorageItem, url} from '../url_request';
import jwtDecode from 'jwt-decode';
import {GlobalContext} from '../context';
import WebSocketService from '../utils/WebSocketServive';
import {ImageApp} from '../constants';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {user, setUser} = useContext(GlobalContext);
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const getSocket = () => {
    const socketService = new WebSocketService(
      url.socket_send_like_post,
      user.userId,
    );
    setServiceSocket(socketService);
  };
  useEffect(() => {
    getSocket();
  }, []);
  const checkIfFirstTime = async () => {
    try {
      const hasOpenedBefore = await AsyncStorage.getItem('hasOpenedBefore');
      if (!hasOpenedBefore) {
        await AsyncStorage.setItem('hasOpenedBefore', 'true');
        navigation.replace('Welcome');
      } else {
        const isLogin = await AsyncStorage.getItem(AsyncStorageItem.jwtUser);
        if (isLogin == null) navigation.navigate('Choise');
        else {
          const userSave = await AsyncStorage.getItem(AsyncStorageItem.user);
          // const decode = jwtDecode(jwtToken);
          // console.log(jwtToken);
          // console.log(decode.sub);
          // console.log(decode.userName);
          // console.log(decode.urlAvata);
          console.log(userSave)
          setUser(JSON.parse(userSave));
          navigation.navigate('BottomTab');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkIfFirstTime();
    });

    const timer = setTimeout(() => {
      checkIfFirstTime();
    }, 3000);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={ImageApp.backgroundChoise}
        style={{height: 250, width: 250, margin: 20}}
      />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SplashScreen;
