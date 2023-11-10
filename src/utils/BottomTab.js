import React, {useContext, useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Comment, Home} from '../Views/HomeScreen';
import Profile from '../Views/Profile/Profile';
import Message from '../Views/MessageScreen/Message';
import Search from '../Views/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
  const {setShowCommentScreen, showCommentScreen} = useContext(GlobalContext);
  const {showPostSettting, setShowPostSettting} = useContext(GlobalContext);
  const {user, setUser} = useContext(GlobalContext);
  // const {serviceSocket,setServiceSocket} = useContext(GlobalContext);
  const {notificationScreenIsFocus,setNoificationScreenIsFocus} = useContext(GlobalContext);
  // const getSocket=()=>{
  //   const socketService=new WebSocketService(url.socket_send_like_post,user.userId);
  //   setServiceSocket(socketService);
  // }
  // useEffect(() => {
  //   getSocket();
  // }, []);
  useEffect(()=>{
    
  },[notificationScreenIsFocus]);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <Tab.Navigator
          initialRouteName="home"
          
          screenOptions={{
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
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <FontAwesome5
                  name="user-friends"
                  size={25}
                  color={focused ? 'blue' : 'black'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Message"
            component={Chats}
            options={{
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
          {/* <Tab.Screen
          name="Đăng bài"
          component={NewPost}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault(); // Prevent default behavior

              // Hide tab bar
              navigation.setOptions({
                tabBarVisible: false,
              });

              // Navigate to the "NewPost" screen
              navigation.navigate('NewPost');
            },
          })}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Icon
                name="bell"
                size={26}
                color={focused ? 'black' : 'black'}
              />
            ),
          }}
        /> */}
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
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
        {showPostSettting.isShow&&<PostChoise/>}
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
