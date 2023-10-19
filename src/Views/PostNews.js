import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {url} from '../url_request';
import { color } from '../constants';

export default function PostNews() {
  const [user, setUser] = useState({
    userId: '9',
    urtAvata: 'https://randomuser.me/api/portraits/women/76.jpg',
    userName: 'Vux Ducws Thangws',
  });

  const [post, setPost] = useState({
    content: '',
    fileImage: '',
  });
  const [accessButton, setAccessButton] = useState(false);
  const navigation = useNavigation();
  const openLib = () => {
    let option = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(option, Response => {
      setPost({...post, fileImage: Response.assets[0].uri});
    });
  };

  const addPostInServer = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', user.userId);
      formData.append('content', post.content);
      formData.append('url', url.url);
      formData.append('image', {
        uri: post.fileImage,
        name: post.fileImage.split('/').pop(), // Tên tệp ảnh
        type: 'image/jpeg', // Loại tệp ảnh
      });
      const respone = await axios.post(url.save_post, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (Error) {
      console.log(Error);
    }
    navigation.navigate('Home');
  };
  useEffect(()=>{
    if(post.content==0){
      // setAccessButton(false)
    }else{
      setAccessButton(true)
    }
  },[post.content])
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
              <Icon name="arrow-left" color="black" size={25}></Icon>
            </TouchableOpacity>
            <Text style={{color: 'black', fontSize: 18}}>Tạo bài viết</Text>
            <View style={{flex: 1}}></View>
            {accessButton == true ? (
              <TouchableOpacity
                style={styles.postNews}
                onPress={addPostInServer}>
                <Text style={{fontSize: 18, color: 'black'}}>Đăng</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonNoAccess}>
                <Text style={{fontSize: 18, color: '#4c4c4d'}}>Đăng</Text>
              </View>
            )}
          </View>

          <View
            style={{
              height: 1 / 2,
              width: '100%',
              backgroundColor: 'black',
            }}
          />
          <View style={styles.containerInfor}>
            <Image
              source={{
                uri: user.urtAvata,
              }}
              style={{height: 40, width: 40, borderRadius: 25}}
            />
            <View style={{flexDirection: 'column', marginLeft: 5}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 600}}>
                {user.userName}
              </Text>
            </View>
          </View>
          <View>
            <TextInput
              style={styles.boxInput}
              multiline={true}
              placeholder="Bạn đang nghĩ gì..."
              placeholderTextColor={'#a1a3a6'}
              onChangeText={text => {
                setPost({...post, content: text});
              }}
            />
            <View style={{marginLeft: '1%'}}>
              {post.fileImage.length > 0 && (
                <Image
                  source={{uri: post.fileImage}}
                  style={{
                    width: '99%',
                    height: Dimensions.get('window').width,
                  }}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}
            onPress={openLib}>
            <MaterialIcons name="add-to-photos" size={30} />
            <Text style={{fontSize: 20, fontWeight: 700}}>
              Thêm ảnh từ thư viện
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
    marginHorizontal: 10,
    marginVertical: 10,
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
  buttonNoAccess:{
    backgroundColor: color.color_background,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }
});
