import React from "react";
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from "./Home";
import Message from "./Message";
import Profile from "./Profile";
const Drawer=createDrawerNavigator();
export default function Search(){
    return (
        <Drawer.Navigator initialRouteName="Feed" >
          <Drawer.Screen
            name="Feed"
            component={Home}
            options={{headerShown:false}}
          />
          <Drawer.Screen
            name="Notifications"
            component={Message}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
          />
        </Drawer.Navigator>
      );
}