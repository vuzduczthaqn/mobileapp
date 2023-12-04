import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageApp} from '../constants';
import {urlLogin} from '../utils/ipConfig';
import {GlobalContext} from '../context';
import jwtDecode from 'jwt-decode';
import {AsyncStorageItem, url} from '../url_request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import encryptPassword from '../utils/encrpytPassword';
export default function Login() {
  const [keyboardIsShow, setKeyboardIsShow] = useState(false);
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [userName, setUserName] = useState('');
  const [acessUserName, setAcessUserName] = useState(true);
  const [acessPass, setAcessPass] = useState(true);
  const {user, setUser} = useContext(GlobalContext);
  const acessLogin = () => {
    if (acessUserName && acessPass) return true;
    else return false;
  };
  const checkLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('passWord', encryptPassword(password));

      const response = await axios.post(url.login, formData);
      if (response.status === 200) {
        if (response.data.status === true) {
          try {
            await AsyncStorage.setItem(
              AsyncStorageItem.jwtUser,
              response.data.jwtToken,
            );
          } catch (error) {
            console.log(error);
          }
          const jwtToken = await AsyncStorage.getItem(AsyncStorageItem.jwtUser);
          const decode = jwtDecode(jwtToken);
          console.log(decode, 'data jwt');
          const newData = data => {
            return {
              userId: decode.sub,
              userName: decode.userName,
              urlAvata: decode.urlAvata,
              fullName: decode.fullName,
              describe: decode.describe,
              email: decode.email,
            };
          };
          setUser(newData(decode));
          await AsyncStorage.setItem(
            AsyncStorageItem.user,
            JSON.stringify(newData(decode)),
          );
          navigation.navigate('BottomTab');
        } else {
          Alert.alert('UserName hoặc mật khẩu không đúng');
          setUserName('');
          setPassword('');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userName.length > 0) {
      validateUserName();
    }
    if (password.length > 0) validatePass();
  }, [userName, password]);
  const validateUserName = () => {
    if (userName.length < 3) {
      setAcessUserName(false);
    } else {
      setAcessUserName(true);
    }
  };
  const validatePass = () => {
    if (password.length <= 3) {
      setAcessPass(false);
    } else {
      setAcessPass(true);
    }
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsShow(false);
      },
    );

    return () => {
      // Clean up the listeners when the component unmounts
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}>
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View style={{marginLeft: 25, marginTop: 30}}>
            <TouchableOpacity
              style={{height: 30, width: 45}}
              onPress={() => {
                navigation.navigate('Choise');
              }}>
              <Icon name="arrow-left" color="black" size={25}></Icon>
            </TouchableOpacity>
          </View>
          <View
            style={
              keyboardIsShow == false
                ? styles.imageLogoConatiner
                : {
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                    width: '100%',
                  }
            }>
            <Image
              source={ImageApp.backgroundChoise}
              style={
                keyboardIsShow == false
                  ? styles.imageLogo
                  : {
                      height: 100,
                      width: 100,
                    }
              }
            />
          </View>
          {/* Nhập dữ liệu */}
          <View
            style={
              keyboardIsShow == false
                ? {
                    flex: 20,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }
                : {
                    alignItems: 'center',
                    position: 'absolute',
                    left: Dimensions.get('window').width * 0.1,
                    top: Dimensions.get('window').width * 0.45,
                  }
            }>
            {/* Ô nhập gmail */}
            <View style={styles.stlBoxInput}>
              <Icon name="account-circle-outline" size={25} color={'black'} />
              <TextInput
                style={styles.stlTextInput}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Tên đăng nhập "
                placeholderTextColor={'#84c2f5'}
                onChangeText={text => {
                  setUserName(text);
                  validateUserName();
                }}
              />
            </View>
            {acessUserName == false && (
              <View
                style={
                  keyboardIsShow == false
                    ? {
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: '80%',
                      }
                    : {
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: '100%',
                      }
                }>
                <Text style={{color: 'red', fontSize: 12}}>
                  (*) Độ dài phải lớn hơn 3 ký tự
                </Text>
              </View>
            )}
            {/* Ô nhập mật khẩu */}
            <View>
              <View style={styles.stlBoxInput}>
                <Icon name="lock-outline" size={25} color={'black'} />
                <TextInput
                  style={styles.stlTextInput}
                  placeholder="Mật khẩu"
                  autoCapitalize="none"
                  placeholderTextColor={'#84c2f5'}
                  secureTextEntry={showPass}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                />
                {/* Xem mật khẩu */}
                <TouchableOpacity
                  onPress={() => {
                    setShowPass(!showPass);
                  }}
                  style={{position: 'absolute', right: 0}}>
                  <Icon
                    name={showPass ? 'eye' : 'eye-off'}
                    color="black"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              {acessPass == false && (
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '80%',
                  }}>
                  <Text style={{color: 'red', fontSize: 12}}>
                    (*) Không được để trống{' '}
                  </Text>
                </View>
              )}
              <TouchableOpacity style={{marginVertical: 6}}>
                <Text style={{color: 'black', fontSize: 14, fontWeight: 500}}>
                  Quên mật khẩu ?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Button đăng nhập */}
          <View
            style={
              keyboardIsShow == false
                ? {
                    position: 'absolute',
                    left: Dimensions.get('window').width * 0.075,
                    top: Dimensions.get('window').height * 0.7,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }
                : {
                    alignItems: 'center',
                    position: 'absolute',
                    left: Dimensions.get('window').width * 0.075,
                    top: Dimensions.get('window').width * 0.93,
                  }
            }>
            <TouchableOpacity
              style={styles.stlButtonLogin}
              onPress={() => {
                validateUserName();
                validatePass();
                if (acessLogin() == true) {
                  checkLogin();
                }
              }}>
              <Text
                style={{color: 'black', fontSize: 16, marginHorizontal: 10}}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
            {keyboardIsShow == false && (
              <View style={styles.boxLinkRegister}>
                <Text style={{color: 'black', fontSize: 14}}>
                  Bạn chưa có tài khoản
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Register');
                  }}>
                  <Text
                    style={{
                      color: '#1fa5f2',
                      fontSize: 16,
                      marginHorizontal: 5,
                    }}>
                    Đăng ký
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  stlTextInput: {
    height: 40,
    width: Dimensions.get('window').width * 0.7,
    color: 'black',
    fontSize: 16,
    paddingLeft: 0,
    padding: 0,
    marginHorizontal: 5,
  },
  stlBoxInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
  stlButtonLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    borderRadius: 15,
    backgroundColor: '#81ccf7',
  },
  boxLinkRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 30,
    paddingBottom: 60,
  },
  imageLogo: {
    height: 200,
    width: 200,
  },
  imageLogoConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
