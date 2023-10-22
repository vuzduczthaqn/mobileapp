import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';

const forgotpass = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Email không hợp lệ hoặc chưa nhập!';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Dữ liệu hợp lệ, bạn có thể thực hiện đăng ký ở đây
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View
            style={{
              paddingTop: 30,
              marginTop: 90,
              backgroundColor: '#e6e6fa',
              width: 150,
              height: 150,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: 'white',
              overflow: 'hidden',
            }}>
            {/* <Image source={require('./image/man_facepalming_256px.png')}
                      style={{ flex:1,  width:undefined,height:undefined}} resizeMode="center">
                     </Image> */}
          </View>
          <Text
            style={{
              color: '#f5f5dc',
              marginLeft: 10,
              marginTop: 20,
              marginBottom: 8,
              fontSize: 28,
              fontWeight: '600',
            }}>
            Forgot Password?
          </Text>
          <Text style={{color: '#a9a9a9', fontSize: 16, marginBottom: 10}}>
            Enter the email address associated with your account.
          </Text>
          {/*  */}
          <View>
            <View>
              <Text
                style={{
                  color: '#f5f5dc',
                  fontSize: 18,
                  fontWeight: 500,
                  marginVertical: 15,
                }}>
                Email
              </Text>
              <View
                style={{
                  width: 350,
                  height: 48,
                  borderColor: '#f5f5dc',
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="Enter your Email"
                  placeholderTextColor="#f5f5dc"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={text =>
                    setFormData({...formData, email: text})
                  }></TextInput>
              </View>
              {errors.email && (
                <Text style={{color: 'red', marginTop: 7}}>{errors.email}</Text>
              )}
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#FFCB74',
                marginTop: 20,
                marginBottom: 4,
                borderRadius: 20,
                width: 350,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}
              onPress={validateForm}>
              <Text style={{color: '#010', fontWeight: 'bold', fontSize: 16}}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default forgotpass;
