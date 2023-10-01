import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Views/Home';
import Profile from '../Views/Profile';
import Message from '../Views/Message';
import Search from '../Views/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Alert, Dimensions} from 'react-native';
import NewPost from '../Views/NewPost';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

export default function () {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="search"
              size={25}
              color={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
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
            <FontAwesome5
              name="edit"
              size={26}
              color={focused ? 'black' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
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
