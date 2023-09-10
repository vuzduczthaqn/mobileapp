import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Message from './Message';
import Profile from './Profile';
import Search from './Search';
import Choise from './Choise'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='Choise' component={Choise}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Reagister" component={Register} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
