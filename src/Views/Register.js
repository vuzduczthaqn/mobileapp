import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import encryptPassword from '../utils/encrpytPassword';
import axios from 'axios';
import { url } from '../url_request';
export default function Register() {
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  //    Validate
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    }

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Email không hợp lệ !';
    }
    //
    if (!formData.fullname){
      newErrors.number = 'Tên không được để trống!';
    }

    if (formData.password.length < 4) {
      newErrors.password = 'Mật khẩu phải có ít nhất 4 ký tự';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      register()
    }
  };
const register=async()=>{
  const form = new FormData()
  form.append("userName",formData.username)
  form.append("email",formData.email)
  form.append("password",encryptPassword(formData.password))
  form.append("fullname",formData.fullname)
  console.log(formData)
  const respone=await axios.post(url.register_account,form);
  if(respone.status===200)
  navigation.navigate("Login");
  else{
    navigation.navigate("Register")
  }
}
  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <ScrollView>
        <View style={{marginBottom: 15}}>
          <Text
            style={{
              color: '#fff8dc',
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 7,
              fontSize: 25,
              fontWeight: '500',
            }}>
            Create Account
          </Text>
          <Text
            style={{
              color: '#dcdcdc',
              fontSize: 15,
              marginLeft: 8,
              marginBottom: 10,
            }}>
            {' '}
            Connect with your friend today!
          </Text>
          <View
            style={{paddingTop: 15, width: 113, height: 113, marginLeft: 139}}>
            {/* <Image source={require('./image/key_480px.png')} style={{ flex:1,width:undefined, height:undefined}} resizeMode="center"></Image> */}
          </View>
        </View>

        {/* Username */}
        <View style={{marginBottom: 3, marginLeft: 11}}>
          <Text
            style={{
              color: '#fff8dc',
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>
            Username
          </Text>
          <View
            style={{
              width: '95%',
              height: 48,
              borderColor: '#f5f5dc',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 32,
            }}>
            <TextInput
              color="#fff"
              placeholder="Enter your Username"
              placeholderTextColor="#F6F6F6"
              value={formData.username}
              onChangeText={text => setFormData({...formData, username: text})}
              style={{width: '100%'}}
            />
          </View>
          {errors.username && (
            <Text style={{color: 'red', marginTop: 2}}>{errors.username}</Text>
          )}
        </View>
        {/* Email */}
        <View style={{marginBottom: 3, marginLeft: 11}}>
          <Text
            style={{
              color: '#fff8dc',
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>
            Email
          </Text>
          <View
            style={{
              color: '#fff',
              width: '95%',
              height: 48,
              borderColor: '#f5f5dc',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 32,
            }}>
            <TextInput
              color="#fff"
              placeholder="Enter your Email"
              placeholderTextColor="#f6f6f6"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
              style={{width: '100%'}}
            />
          </View>
          {errors.email && (
            <Text style={{color: 'red', marginTop: 2}}>{errors.email}</Text>
          )}
        </View>
        {/* Number */}
        <View style={{marginBottom: 3, marginLeft: 11}}>
          <Text
            style={{
              color: '#fff8dc',
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>
            Mobile number
          </Text>
          <View
            style={{
              width: '95%',
              height: 48,
              borderColor: '#f5f5dc',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 32,
            }}>
            {/* <TextInput
              color="#fff"
              placeholder="+84"
              placeholderTextColor="#f5f5dc"
              keyboardType="numeric"
              style={{
                width: '12%',
                borderRightWidth: 1,
                borderRightColor: '#f5f5dc',
                height: '100%',
              }}
            /> */}
            <TextInput
              color="#fff"
              placeholder="Enter your full name"
              placeholderTextColor="#f6f6f6"
              value={formData.fullname}
              onChangeText={text => setFormData({...formData, fullname: text})}
              style={{width: '80%'}}
            />
          </View>
          {errors.fullname && (
            <Text style={{color: 'red', marginTop: 2}}>{errors.fullname}</Text>
          )}
        </View>
        {/* Password */}
        <View style={{marginBottom: 15, marginLeft: 11}}>
          <Text
            style={{
              color: '#fff8dc',
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>
            Passsword
          </Text>
          <View
            style={{
              width: '95%',
              height: 48,
              borderColor: '#f5f5dc',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 32,
            }}>
            <TextInput
              color="#fff"
              placeholder="Enter your Password"
              placeholderTextColor="#f6f6f6"
              secureTextEntry={isPasswordShown}
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
              style={{width: '100%'}}
            />
            {/* hien an password */}
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{position: 'absolute', right: 12}}>
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color="#f5f5dc" />
              ) : (
                <Ionicons name="eye" size={24} color="#f5f5dc" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={{color: 'red', marginTop: 2}}>{errors.password}</Text>
          )}
        </View>
        {/*  */}
        <TouchableOpacity
          style={{
            backgroundColor: '#FFCB74',
            marginTop: 4,
            marginBottom: 3,
            borderRadius: 10,
            width: 310,
            marginLeft: 37,
            height: 35,
          }}
          onPress={validateForm}>
          <Text
            style={{
              color: '#2F2F2F',
              fontWeight: 'bold',
              marginTop: 5.5,
              fontSize: 16,
              textAlign: 'center',
            }}>
            SIGN UP
          </Text>
        </TouchableOpacity>
        {/*  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 4,
          }}>
          <Text
            style={{
              marginTop: 15,
              color: '#dcdcdc',
              fontSize: 16,
              textAlign: 'center',
            }}>
            Already have an account?
          </Text>
        </View>
        {/*  */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            marginTop: 10,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#CCCCCC',
              marginHorizontal: 10,
            }}
          />
          <Text style={{fontSize: 14, color: '#f5f5dc'}}>Or Sign up with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#CCCCCC',
              marginHorizontal: 10,
            }}
          />
        </View>
        {/*  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 40,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 55,
              width: 150,
              borderWidth: 1,
              borderColor: '#f5f5dc',
              marginRight: 4,
              marginLeft: 5,
              borderRadius: 10,
            }}>
            <Image
               source={require('../constants/facebook.png')}
              style={{height: 36, width: 36, marginRight: 8}}
              resizeMode="contain"
            />
            <Text style={{color: '#f5f5dc'}}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 55,
              width: 150,
              borderWidth: 1,
              borderColor: '#f5f5dc',
              marginRight: 4,
              marginLeft: 5,
              borderRadius: 10,
            }}>
            <Image
               source={require('../constants/google.png')}
              style={{height: 36, width: 36, marginRight: 8}}
              resizeMode="contain"
            />
            <Text style={{color: '#f5f5dc'}}>Google</Text>
          </TouchableOpacity>
        </View>
        {/*  */}
      </ScrollView>
    </SafeAreaView>
  );
}
