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
export default function Login() {
  const {showLoginScreens, setShowLoginScreens} = useContext(GlobalContext);
  const [keyboardIsShow, setKeyboardIsShow] = useState(false);
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [email, setEmail] = useState('');
  const [acessEmail, setAcessEmail] = useState(true);
  const [acessPass, setAcessPass] = useState(true);
  const url = 'http://192.168.160.148:8888/login';
  const acessLogin = () => {
    if (acessEmail && acessPass) return true;
  };
  const checkLogin = async () => {
    try {
      const requestData = {
        email: email,
        pass: password,
      };
      const response = await axios.get(url, requestData);
      const responseData = response.data;
      if (responseData != null && responseData.length !== 0) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Email hoặc mật khẩu không đúng');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (email.length > 0) {validateEmail()};
    if (password.length > 0) validatePass();
  }, [email]);
  const validateEmail = () => {
    if (email.length < 3) {
      setAcessEmail(false);
    } else {
      setAcessEmail(true);
    }
  };
  const validatePass = () => {
    if (password.length <= 3) {
      setAcessPass(false);
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
              <Icon name="gmail" size={20} color={'black'} />
              <TextInput
                style={styles.stlTextInput}
                placeholder="Email"
                placeholderTextColor={'#84c2f5'}
                onChangeText={text => {
                  setEmail(text);
                  validateEmail();
                }}
              />
            </View>
            {acessEmail == false && (
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
                <Icon name="lock" size={20} color={'black'} />
                <TextInput
                  style={styles.stlTextInput}
                  placeholder="Mật khẩu"
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
                validateEmail();
                validatePass();
                if (acessLogin == true) {
                  checkLogin;
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
                <TouchableOpacity onPress={{}}>
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
