import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Zocial from 'react-native-vector-icons/Zocial';
import {GlobalContext} from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageItem, url} from '../../url_request';
import {ImageApp, color} from '../../constants';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Setting from '../Setting';
import Message from '../MessageScreen/Message';
import axios from 'axios';
import PostItem from '../Post/HomePostItem';
const HEIGHT_SCREEN = Dimensions.get('window').height;
const WIDTH_SCREEN = Dimensions.get('window').width;
export default function Profile() {
  const navigation = useNavigation();
  const {user, setUser} = useContext(GlobalContext);
  const [focus, setFocus] = useState(true);
  const [startGetter, setStartGetter] = useState(0);
  const [userDetail, setUserDetail] = useState('');
  const [postData, setPostData] = useState([]);
  const mappingData = data => {
    return {
      userId: user.userId,
      fullName: data.fullName,
      urlAvata: data.urlAvata,
      amountFriend: data.amountFriend,
      amountPost: data.amountPost,
      describe: data.describe,
      email: data.email,
      userName: data.userName,
    };
  };

  const loadProfile = () => {
    const requestParam = {
      userId: user.userId,
    };
    try {
      axios.get(url.get_profile, {params: requestParam}).then(Response => {
        console.log(Response.data, 'profile');
        const dataFromDB = mappingData(Response.data);
        setUserDetail(dataFromDB);
      });
    } catch (error) {
      error;
    }
  };
  const mappingPostData = jsonData => {
    return {
      id: jsonData.idPost,
      name: jsonData.fullNameCreatePost,
      content: jsonData.content,
      imageProfile: jsonData.urlAvataCreatePost,
      imageContent: jsonData.urlImagePost,
      postLike: jsonData.postLike,
      timePost: jsonData.timePost,
      userIdCreatePost: jsonData.userIdCreatePost,
      amountComment: jsonData.amountComment,
      isLikePost: jsonData.isLikePost,
      isAmountLike: jsonData.amountLike,
    };
  };
  const loadPost = async () => {
    const requestParam = {
      userIdProfile: user.userId,
      startGetter: startGetter,
    };
    try {
      const Response = await axios.get(url.get_list_post_profile, {
        params: requestParam,
      });
      const newDataFromDB = Response.data.map(mappingPostData);
      console.log(newDataFromDB);
      setPostData(prev => [...prev, ...newDataFromDB]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadProfile();
    loadPost();
  }, []);

  const renderItem = ({item, index}) => {
    return <PostItem item={item} showContent={true} />;
  };
  return (
    <View style={{flex: 1, width: '100%', height: 500}}>
      <View>
        <FlatList
          ListHeaderComponent={header()}
          data={postData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
  function header() {
    return (
      <View style={styles.container}>
        <View style={{}}>
          <Image
            source={ImageApp.backgroundProfile}
            style={{height: HEIGHT_SCREEN * 0.25}}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 20,
            paddingTop: 25,
          }}>
          <View
            style={{
              marginLeft: 10,
              marginTop: 45,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 800,
                marginLeft: 5,
                marginBottom: 5,
              }}>
              {user.fullName}
            </Text>
            {user.describe && (
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  marginBottom: 5,
                  marginRight: 5,
                }}>
                {user.describe}
              </Text>
            )}

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.buttonMain}
                onPress={() => {
                  navigation.navigate('PostNews');
                }}>
                <MaterialCommunityIcons name="plus" size={20} color={'black'} />
                <Text style={[styles.textInfor, {fontSize: 14}]}>
                  Thêm bài viết
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChangeInforUser');
                }}
                style={[
                  styles.buttonMain,
                  {backgroundColor: color.color_background},
                ]}>
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  size={20}
                  color={'black'}
                  style={{marginRight: 3}}
                />
                <Text style={[styles.textInfor, {fontSize: 14}]}>
                  Chỉnh sửa thông tin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 5,
            width: '100%',
            backgroundColor: color.color_background,
          }}
        />

        <View
          style={{paddingBottom: 15, backgroundColor: 'white', paddingLeft: 5}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              fontSize: 18,
              marginTop: 15,
            }}>
            Thông tin
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <View
              style={{
                backgroundColor: color.white_backgroundEMail,
                height: 35,
                width: 35,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
              }}>
              <Zocial name="gmail" size={16} color={'black'}></Zocial>
            </View>
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                }}>
                {user.email}
              </Text>
              <Text style={{color: color.white_8, fontSize: 12}}>Email</Text>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              height: 10,
              width: '100%',
              backgroundColor: color.color_background,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              backgroundColor: 'white',
              paddingVertical: 10,
              marginBottom: 2,
            }}>
            <Text
              style={[
                styles.textInfor,
                {
                  fontSize: 18,
                },
              ]}>
              Bài viết
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.containerAvata}
          onPress={() => {
            navigation.navigate('ImageShowFull', {
              imageUrl: user.urlAvata,
            });
          }}>
          <Image source={{uri: user.urlAvata}} style={styles.avatar} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            // logout();
          }}>
          <MaterialCommunityIcons name="plus" size={30} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSetting}
          onPress={() => {
            navigation.navigate('SettingProfile');
          }}>
          <Ionicons name="settings-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: WIDTH_SCREEN * 0.55,
            top: Dimensions.get('screen').height * 0.25,
          }}>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.number}>{userDetail.amountPost}</Text>
            <Text style={styles.textInfor}>Bài viết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.number}>{userDetail.amountFriend}</Text>
            <Text style={styles.textInfor}>Bạn bè</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvata: {
    height: 122,
    width: 122,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: WIDTH_SCREEN * 0.05,
    top: HEIGHT_SCREEN * 0.25 - 61,
    borderWidth: 2,
    backgroundColor: 'black',
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  buttonAdd: {
    backgroundColor: '#02ddfa',
    borderRadius: 25,
    height: 30,
    width: 30,
    position: 'absolute',
    left: WIDTH_SCREEN * 0.3 - 6,
    top: Dimensions.get('screen').height * 0.25 + 4,
  },
  textInfor: {
    color: 'black',
    fontSize: 16,
  },
  number: {
    color: 'black',
    fontSize: 20,
  },
  buttonShowData: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 70,
  },
  buttonShowDataFocus: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 70,
    backgroundColor: color.color_text_logo_main,
  },
  buttonMain: {
    height: 35,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    width: WIDTH_SCREEN * 0.9,
    borderRadius: 7.5,
    marginBottom: 5,
    flexDirection: 'row',
    marginLeft: 5,
  },
  buttonSetting: {
    backgroundColor: '#bbbfbf',
    borderRadius: 25,
    height: 35,
    width: 35,
    position: 'absolute',
    right: WIDTH_SCREEN * 0.04,
    top: Dimensions.get('screen').height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
