import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../Views/HomeScreen';
import Profile from '../Views/Profile';
import Message from '../Views/MessageScreen/Message';
import Search from '../Views/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Alert, Dimensions, Keyboard, KeyboardAvoidingView} from 'react-native';
import NewPost from '../Views/NewPost';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Chats from '../Views/MessageScreen/Chats';
import Friend from '../Views/Friend';
const Tab = createBottomTabNavigator();

export default function () {
  const navigation = useNavigation();
  return (
      <Tab.Navigator
        initialRouteName="Search"
        backBehavior="history"
        screenOptions={{
          tabBarStyle: {height: Dimensions.get('window').height * 0.07},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Icon name="home" size={25} color={focused ? 'blue' : 'black'} />
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
  );
}
