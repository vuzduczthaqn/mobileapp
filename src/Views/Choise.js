import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {backgroundChoise, logoFacebook} from '../constants/ImageApp';

export default function Choise() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Icon name="arrow-left" color="black" size={25}></Icon>
        </TouchableOpacity> */}
      </View>
      <View style={styles.titleContainer}>
        <ImageBackground
          source={require('../constants/ic_launcher_round.png')}
          style={styles.logo}
        />
        <Text style={styles.titleText}>Chào mừng đến với</Text>
        <Text style={styles.subTitleText}>Picky</Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Image
            source={require('../constants/facebook.png')}
            style={{height: 25, width: 25}}
          />
          <Text style={styles.loginButtonText}>Đăng nhập với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Image
            source={require('../constants/google.png')}
            style={{height: 25, width: 25}}
          />
          <Text style={styles.loginButtonText}>Đăng nhập với Google</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <View>
            <Text style={styles.orText}>Hoặc</Text>
          </View>
          <View style={styles.orLine} />
        </View>
        <TouchableOpacity
          style={styles.passwordLoginButton}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.loginButtonText}>Đăng nhập với Mật khẩu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Bạn chưa có tài khoản</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    flex: 5,
    marginLeft: 25,
    marginTop: 30,
    marginBottom: 20,
  },
  icon: {
    height: 30,
    width: 45,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
  },
  logo: {
    height: 150,
    width: 200,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
  },
  subTitleText: {
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 5,
  },
  loginButtonContainer: {
    flex: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
    marginHorizontal: 10,
  },
  orContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  orLine: {
    height: 1,
    flex: 1,
    backgroundColor: 'black',
    marginVertical: 30,
  },
  orText: {
    color: 'black',
    fontSize: 14,
  },
  passwordLoginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    borderRadius: 15,
    backgroundColor: '#81ccf7',
  },
  registerContainer: {
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  registerText: {
    color: 'black',
    fontSize: 14,
  },
  registerLink: {
    color: '#1fa5f2',
    fontSize: 16,
    marginHorizontal: 5,
  },
});
