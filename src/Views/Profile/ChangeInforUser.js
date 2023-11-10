import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {hoverGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/hoverGesture';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {url} from '../../url_request';
import {color} from '../../constants';
import {GlobalContext} from '../../context';
import styleChangeInfor from './ChangeInforUser.style';
import ButtonChangeItem from './ButtonChangeItem';
export default function ChangeInforUser() {
  const {user, setUser} = useContext(GlobalContext);
  const navigation = useNavigation();
  return (
    <View>
      <View style={styleChangeInfor.header}>
        <TouchableOpacity
          style={styleChangeInfor.buttonOut}
          onPress={() => navigation.goBack()}>
          <Feather name="x" color="black" size={25}></Feather>
        </TouchableOpacity>
        <Text style={styleChangeInfor.titleHeader}>
          Chỉnh sửa trang cá nhân
        </Text>
      </View>
      <View style={styleChangeInfor.containerAvatarSetting}>
        <Image
          source={{
            uri: user.urlAvata,
          }}
          style={styleChangeInfor.avatar}
        />
        <TouchableOpacity style={styleChangeInfor.buttonChangeAvatar}>
          <Text style={styleChangeInfor.labelButtonChangeAvatar}>
            Thay đổi ảnh đại diện
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <ButtonChangeItem
          data={{
            title: 'Tên tài khoản',
            value: user.fullName,
          }}
          onPress={() => {
            navigation.navigate('ChangeDataDetail', {
              userId: user.userId,
              value: user.fullName,
              type: 'FULLNAME',
              title: 'Tên tài khoản',
            });
          }}
        />
        <ButtonChangeItem
          data={{
            title: 'Tiểu sử',
            value: user.describe,
          }}
          onPress={() => {
            navigation.navigate('ChangeDataDetail', {
              userId: user.userId,
              value: user.describe ? user.describe : '',
              type: 'DESCRIBE',
              title: 'Tiểu sử',
            });
          }}
        />
        <ButtonChangeItem
          data={{
            title: 'Tên đăng nhập',
            value: user.userName,
          }}
          onPress={() => {
            navigation.navigate('ChangeDataDetail', {
              userId: user.userId,
              value: user.userName,
              type: 'USERNAME',
              title: 'Tên đăng nhập',
            });
          }}
        />
        <ButtonChangeItem
          data={{
            title: 'Email',
            value: user.email,
          }}
          onPress={() => {
            navigation.navigate("ChangeDataDetail",{
                userId:user.userId,
                value:user.email,
                type:"EMAIL",
                title:"EMAIL"
            })
          }}
        />
      </View>
    </View>
  );
}
