import React, {useContext, useEffect, useState} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {url} from '../../url_request';
import {color} from '../../constants';
import {GlobalContext} from '../../context';
import {fi} from 'date-fns/locale';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function PostSetting() {
  const {user, setUser} = useContext(GlobalContext);
  const {postId}=useRoute().params;
  const [post, setPost] = useState({
    content:'',
    fileImage:''
  });
  const [accessButton, setAccessButton] = useState(false);
  const navigation = useNavigation();
  const mapping=data=>{
    return{
      content:data.content,
      fileImage:data.imageUrl,
    }
  }
  const getPost=async()=>{
    try {
      const response=await axios.get(url.get_post_setting,{params:{postId:postId}})
      if(response.status===200){
          const newData=mapping(response.data);
          setPost(newData);
          console.log(newData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const savePost=async()=>{
    const formData = new FormData();
      formData.append("postId",postId);
      formData.append("content",post.content);
      try {
        console.log(postId)
        const response=await axios.post(url.update_post,formData)
        if(response.status==200){
          navigation.goBack();
        }
      } catch (error) {
        
      }
  }
  useEffect(() => {
    if (post.content == 0) {
      // setAccessButton(false)
    } else {
      setAccessButton(true);
    }
  }, [post.content]);
  useEffect(()=>{
    getPost();
  },[])
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
              <Feather name="x" color="black" size={25}></Feather>
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                alignSelf: 'center',
                marginLeft:100,
                fontWeight:'600'
              }}>
              Chỉnh sửa bài viết
            </Text>
            <View style={{flex: 1}}></View>
            {accessButton == true ? (
              <TouchableOpacity
                style={styles.buttonNoAccess}
                onPress={savePost}
                >
                <Text style={{fontSize: 20, color: '#0291f0',fontWeight:'500'}}>Lưu</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonNoAccess}>
                <Text style={{fontSize: 18, color: '#4c4c4d',fontWeight:'500'}}>Lưu</Text>
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
                uri: user.urlAvata
              }}
              style={{height: 40, width: 40, borderRadius: 25}}
            />
            <View style={{flexDirection: 'column', marginLeft: 5}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 600}}>
                {user.fullName}
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
              value={post.content}
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor:"#e8eaeb"
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
  buttonNoAccess: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
