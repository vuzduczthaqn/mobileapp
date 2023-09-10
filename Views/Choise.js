import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {backgroundChoise, logoFacebook} from '../Images/Image';
export default function Choise() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 5, marginLeft: 25, marginTop: 30, marginBottom: 20}}>
        <TouchableOpacity
          style={{height: 30, width: 45}}
          onPress={() => {
            navigation.navigate('Welcome');
          }}>
          <Icon name="arrow-left" color="black" size={25}></Icon>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <ImageBackground
          source={require('../Images/ic_launcher_round.png')}
          style={{height: 150, width: 200}}
        />
        <Text style={{color: 'black', fontSize: 20}}>Chào mừng đến với</Text>
        <Text
          style={{
            color: 'black',
            fontSize: 28,
            fontWeight: 700,
            marginTop: 5,
          }}>
          Picky
        </Text>
      </View>
      <View
        style={{
          flex: 40,
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 300,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          <Image
            source={require('../Images/facebook.png')}
            style={{
              height: 25,
              width: 25,
            }}
          />
          <Text style={{color: 'black', fontSize: 16, marginHorizontal: 10}}>
            Đăng nhập với Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 300,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          <Image
            source={require('../Images/google.png')}
            style={{
              height: 25,
              width: 25,
            }}
          />
          <Text style={{color: 'black', fontSize: 16, marginHorizontal: 10}}>
            Đăng nhập với Google
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
          }}>
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: 'black',
              marginVertical: 30,
            }}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 14}}>Hoặc</Text>
          </View>
          <View style={{height: 1, flex: 1, backgroundColor: 'black'}} />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 300,
            borderRadius: 15,
            backgroundColor: '#81ccf7',
          }}
          onPress={()=>{
            navigation.navigate('Login')
          }}>
          <Text style={{color: 'black', fontSize: 16, marginHorizontal: 10}}>
            Đăng nhập với Mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems:'flex-start'
        }}>
        <Text style={{color: 'black', fontSize: 14}}>Bạn chưa có tài khoản</Text>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("Register")
        }}>
          <Text style={{color: '#1fa5f2', fontSize: 16,marginHorizontal:5}}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
