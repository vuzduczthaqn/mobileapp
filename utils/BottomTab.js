import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Views/Home';
import Profile from '../Views/Profile';
import Message from '../Views/Message';
import Search from '../Views/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();
export default function () {
  const ScreenTab = [
    {
      name: 'Home',
      component: Home,
      icon: 'home',
      iconType:'Material',
      colorIsForcus: '',
      colorNormar: 'black',
      size: 25,
    },

    {
      name: 'Search',
      component: Search,
      icon: 'search',
      iconType:'FontAwesome5',
      colorIsForcus: '',
      colorNormar: 'black',
      size:25,
    },
    {
      name: 'Message',
      component: Message,
      iconType:'Material',
      icon: 'facebook-messenger',
      colorIsForcus: '',
      colorNormar: 'black',
      size:25,
    },
    {
      name: 'Profile',
      component: Profile,
      icon: 'account-circle',
      iconType:'Material',
      colorIsForcus: '',
      colorNormar: 'black',
      size: 25,
    },
  ];
  return (
    <Tab.Navigator initialRouteName="Home" backBehavior="history" screenOptions={{
      tabBarStyle:{height:Dimensions.get("window").height*0.07}
    }}>
      {
        ScreenTab.map((item,index)=>{
            return (
                <Tab.Screen key={index} name={item.name} component={item.component}
                 options={{
                  headerShown:false,
                    tabBarIcon:({focused})=>(
                        item.iconType=="Material"
                        ?<Icon name={item.icon} size={25} color={'black'} />
                        :<FontAwesome5 name={item.icon} size={item.size} color={'black'}/>
                    )
                 }}
                />
            )
        })
      }
    </Tab.Navigator>
  );
}
