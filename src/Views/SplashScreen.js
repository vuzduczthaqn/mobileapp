import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AsyncStorageItem} from '../url_request';
import jwtDecode from 'jwt-decode';
import {GlobalContext} from '../context';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {user, setUser} = useContext(GlobalContext);
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
          const jwtToken = await AsyncStorage.getItem(AsyncStorageItem.jwtUser);
          const decode = jwtDecode(jwtToken);
          console.log(jwtToken)
          console.log(decode.sub);
          console.log(decode.userName);
          console.log(decode.urlAvata)
          setUser({
            userId: decode.sub,
            userName: decode.userName,
            urlAvata: decode.urlAvata,
          });
          navigation.navigate('BottomTab');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      // Chuyển đến màn hình tiếp theo sau 3 giây
      checkIfFirstTime(); // Thay 'MainStack' bằng tên Stack bạn định dùng
    }, 3000); // 3000 mili giây = 3 giây
    return () => clearTimeout(timer); // Hủy timer nếu component bị unmount
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SplashScreen;
