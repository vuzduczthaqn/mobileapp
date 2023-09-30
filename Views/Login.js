import axios from 'axios';
import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {backgroundChoise, logoFacebook} from '../Images/Image';
import {urlLogin} from '../utils/ipConfig';
export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [Email, setEmail] = useState('');
  const url = 'http://192.168.160.148:8888/login';
  const checkLogin = async () => {
    try {
      const requestData = {
        email: Email,
        pass: password,
      };
      const response = await axios.post(url, requestData);
      const responseData = response.data;
      if (responseData != null && response.data.length != ''||true==true) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Email hoặc mật khật không đúng ');
        setEmail('');
        setPassword('');
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{flex: 5, marginLeft: 25, marginTop: 30, marginBottom: 20}}>
          <TouchableOpacity
            style={{height: 30, width: 45}}
            onPress={() => {
              navigation.navigate('Choise');
            }}>
            <Icon name="arrow-left" color="black" size={25}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{flex: 25}}></View>
        <View
          style={{
            flex: 20,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View style={styles.stlBoxInput}>
            <Icon name="gmail" size={20} color={'black'} />
            <TextInput
              style={styles.stlTextInput}
              placeholder="Email"
              placeholderTextColor={'#84c2f5'}
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>
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
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 125,
              left: Dimensions.get('window').width * 0.11,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: 500}}>
              Quên mật khẩu ?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 30,
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <TouchableOpacity style={styles.stlButtonLogin} onPress={navigation.navigate('BottomTab')}>
            <Text style={{color: 'black', fontSize: 16, marginHorizontal: 10}}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <View style={styles.boxLinkRegister}>
            <Text style={{color: 'black', fontSize: 14}}>
              Bạn chưa có tài khoản
            </Text>
            <TouchableOpacity onPress={checkLogin}>
              <Text
                style={{color: '#1fa5f2', fontSize: 16, marginHorizontal: 5}}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
});
