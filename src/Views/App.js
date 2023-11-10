import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import {Home, Comment, ImageShowFull} from './HomeScreen';
import Register from './Register';
import Message from './MessageScreen/Message';
import Profile from './Profile/Profile';
import Search from './Search';
import Choise from './Choise';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '../utils/BottomTab';
// import NewPost from './NewPost';
import Chats from './MessageScreen/Chats';
import ChatItems from './MessageScreen/ChatItems';
import MessageItem from './MessageScreen/MessageItem';
import GlobalState from '../context';
import PostNews from './Post/PostNews';
import Friend from './Friend/Friend';
import test from './test';
import Setting from './Setting';
import SplashScreen from './SplashScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NotificationScreen from './NotificationScreen';
import InvitationRecerverFriend from './Friend/InvitationRecerverFriend';
import PostChoise from './Post/PostChoise';
import WebSocketService from '../utils/WebSocketServive';
import SettingProfile from './Profile/SettingProfile';
import PostDetail from './Post/PostDetail';
import ChangeAvatar from './Profile/ChangeAvatar';
import ChangeInforUser from './Profile/ChangeInforUser';
import ChangeDataDetail from './Profile/ChangeDataDetail';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <GlobalState>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Choise" component={Choise} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="ImageShowFull" component={ImageShowFull} />
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="ChatItems" component={ChatItems} />
            <Stack.Screen name="Messages" component={Message} />
            <Stack.Screen name="MessageItem" component={MessageItem} />
            <Stack.Screen name="PostNews" component={PostNews} />
            <Stack.Screen name="Friend" component={Friend} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="test" component={test} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Comment" component={Comment} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="InvitationRecerverFriend" component={InvitationRecerverFriend} />
            <Stack.Screen name="PostChoise" component={PostChoise} />
            <Stack.Screen name="WebSocketService" component={WebSocketService} />
            <Stack.Screen name="SettingProfile" component={SettingProfile} />
            <Stack.Screen name="PostDetail" component={PostDetail}/>
            <Stack.Screen name="ChangeAvatar" component={ChangeAvatar}/>
            <Stack.Screen name="ChangeInforUser" component={ChangeInforUser}/>
            <Stack.Screen name="ChangeDataDetail" component={ChangeDataDetail}/>
          </Stack.Navigator>
        </NavigationContainer>
    </GlobalState>
  );
}
