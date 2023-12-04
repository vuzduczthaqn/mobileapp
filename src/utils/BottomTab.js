import React, {useContext, useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Comment, Home} from '../Views/HomeScreen';
import Profile from '../Views/Profile/Profile';
import Message from '../Views/MessageScreen/Message';
import Search from '../Views/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import notifee from '@notifee/react-native';
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import NewPost from '../Views/Post/NewPost';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Chats from '../Views/MessageScreen/Chats';
import Friend from '../Views/Friend/Friend';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GlobalContext} from '../context';
import {url} from '../url_request';
const Tab = createBottomTabNavigator();
import {Client, Stomp} from '@stomp/stompjs';
import WebSocketService from './WebSocketServive';
import PostChoise from '../Views/Post/PostChoise';
export default function () {
  const navigation = useNavigation();
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const {setShowCommentScreen, showCommentScreen} = useContext(GlobalContext);
  const {showPostSettting, setShowPostSettting} = useContext(GlobalContext);
  const {user, setUser} = useContext(GlobalContext);
  // const {serviceSocket,setServiceSocket} = useContext(GlobalContext);
  const {notificationScreenIsFocus, setNoificationScreenIsFocus} =
    useContext(GlobalContext);
  // const getSocket=()=>{
  //   const socketService=new WebSocketService(url.socket_send_like_post,user.userId);
  //   setServiceSocket(socketService);
  // }
  // useEffect(() => {
  //   getSocket();
  // }, []);
  const displayNotification=async(data)=>{
    await notifee.requestPermission()
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  
    // Display a notification
    await notifee.displayNotification({
      title: 'Bạn có thông báo mới',
      body: data,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  const notification =() => {
    try {
      serviceSocket.subscribeToComment(user,data=>{
      console.log("thong bao")
      displayNotification(data.contentMessage);
    });
    } catch (error) {
      console.log(error)
    }
    
  };
  useEffect(() => {
    notification();
  }, [notificationScreenIsFocus]);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <Tab.Navigator
          initialRouteName="home"
          tabBarLabel={false}
          screenOptions={{
            keyboardHidesTabBar: true,
            tabBarStyle: {
              height: Dimensions.get('window').height * 0.07,
            },
          }}>
          <Tab.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Icon
                  name="home"
                  size={25}
                  color={focused ? 'blue' : 'black'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Friend"
            component={Friend}
            options={{
              unmountOnBlur: true,
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <FontAwesome5
                  name="user-friends"
                  size={25}
                  color={focused ? 'blue' : 'black'}
                />
              ),
              // tabBarBadge: '1',
              // tabBarBadgeStyle: {
              //   fontSize:5,
              //   borderRadius: 20,
              //   backgroundColor: 'red',
              //   position: 'absolute',
              //   width:5,
              //   height:5,
              //   left: 7.5,
              // },
            }}
          />
          <Tab.Screen
            name="Đăng bài"
            component={NewPost}
            listeners={({navigation}) => ({
              tabPress: e => {
                e.preventDefault();
                navigation.setOptions({
                  tabBarVisible: false,
                });
                navigation.navigate('NewPost');
              },
            })}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Icon
                  name="add-box"
                  size={26}
                  color={focused ? 'black' : 'black'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Message"
            component={Chats}
            options={{
              unmountOnBlur: true,
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Icon
                  name="facebook-messenger"
                  size={25}
                  color={focused ? 'blue' : 'black'}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              unmountOnBlur: true,
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Icon
                  name="account-circle"
                  size={25}
                  color={focused ? 'blue' : 'black'}
                />
              ),
            }}
          />
        </Tab.Navigator>
        {showCommentScreen && <Comment />}
        {showPostSettting.isShow && <PostChoise />}
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
