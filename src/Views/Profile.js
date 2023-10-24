import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Dimensions,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalContext} from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageItem} from '../url_request';
import {ImageApp} from '../constants';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Setting from './Setting';
import Message from './MessageScreen/Message';
const HEIGHT_SCREEN = Dimensions.get('window').height;
const WIDTH_SCREEN = Dimensions.get('window').width;
const FirstRoute =Setting;

const SecondRoute = Message;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
export default function Profile() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
  const navigation = useNavigation();
  const {user, setUser} = useContext(GlobalContext);
  const [userDetail, setUserDetail] = useState({
    userId: '',
    userName: '',
    urlAvata: '',
    amountFriend: '',
    amountPost: '',
  });
  const loadProfile = async () => {
    try {
    } catch (error) {
      error;
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem(AsyncStorageItem.jwtUser);
    navigation.navigate('Welcome');
  };
  return (
    <View style={styles.container}>
      <ScrollView> 
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
            paddingTop: 65,
            // paddingTop: HEIGHT_SCREEN * 0.08,
            // justifyContent: 'center',
            // marginHorizontal: 5,
            // height: HEIGHT_SCREEN * 10,
            // alignItems: 'flex-start',
          }}>
          <View
            style={{
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 800,
                marginTop: 5,
                marginLeft: 5,
              }}>
              {user.userName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginVertical: 5,
                marginLeft: 5,
                color: 'black',
              }}>
              Thêm bài viết
            </Text>
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: 'pink',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                width: WIDTH_SCREEN * 0.95,
                borderRadius: 10,
              }}>
              <Text style={styles.textInfor}>Thêm bài viết</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: 'pink',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                width: WIDTH_SCREEN * 0.95,
                borderRadius: 10,
              }}>
              <Text style={styles.textInfor}>Chỉnh sửa trang cá nhân</Text>
            </TouchableOpacity>
            <View>
              <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
                // renderTabBar={renderTabBar}
              />
            </View>
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
          <MaterialCommunityIcons name="plus" size={30} />
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
            <Text style={styles.number}>10</Text>
            <Text style={styles.textInfor}>Bài viết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.number}>10</Text>
            <Text style={styles.textInfor}>Bạn bè</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
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
    fontSize: 14,
  },
  number: {
    color: 'black',
    fontSize: 20,
  },
});
