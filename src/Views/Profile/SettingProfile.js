import {
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import stylesSettingProfile from './SettingProfile.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {color} from '../../constants';
import ButtonItem from './ButtonItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageItem, url} from '../../url_request';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context';

export default SettingProfile = () => {
  const navigation = useNavigation();
  const {user, setUser} = useContext(GlobalContext);

  const logout = async () => {
    await AsyncStorage.removeItem(AsyncStorageItem.jwtUser);
    navigation.navigate('SplashScreen');
  };
  const [infor, setInfor] = useState();
  return (
    <View style={{flex: 1, backgroundColor: color.backgroundColor}}>
      <ScrollView>
        {/* hearder */}
        <View style={stylesSettingProfile.header}>
          <TouchableOpacity
            style={stylesSettingProfile.buttonExit}
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialCommunityIcons name="arrow-left" color="black" size={25} />
          </TouchableOpacity>
          <View style={stylesSettingProfile.headerTitleContainer}>
            <Text style={stylesSettingProfile.headerTitle}>Cài đặt</Text>
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <ButtonItem
            buttonData={{
              title: 'Chỉnh sửa thông tin cá nhân',
            }}
            onPress={() => {
              navigation.navigate('ChangeInforUser');
            }}
          />
          <TouchableOpacity
            style={stylesSettingProfile.buttonItemContainer}
            onPress={() => {
              navigation.navigate('ChangeAvatar');
            }}>
            <Text style={stylesSettingProfile.titleItem}>
              Thay đổi hình đại diện
            </Text>
            <View style={{flex: 1}} />
            <FontAwesome6
              name="angle-right"
              color={color.white_3}
              size={18}
              style={{marginRight: 20}}></FontAwesome6>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 7.5}}>
          <ButtonItem
            buttonData={{
              title: 'Hướng dẫn cộng đồng',
            }}
            onPress={() => {}}
          />
          <ButtonItem
            buttonData={{
              title: 'Trung tâm hỗ trợ',
            }}
            onPress={() => {}}
          />
          <ButtonItem
            buttonData={{
              title: 'Điều khoản sử dụng',
            }}
            onPress={() => {}}
          />
          <ButtonItem
            buttonData={{
              title: 'Về chúng tôi',
            }}
            onPress={() => {}}
          />
        </View>
        <View>
          <ButtonItem
            buttonData={{
              title: 'Thay đổi địa chỉ email',
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
          <ButtonItem
            buttonData={{
              title: 'Thay đổi mật khẩu',
            }}
            onPress={() => {}}
          />
          <ButtonItem
            buttonData={{
              title: 'Tài khoản',
            }}
            onPress={() => {}}
          />
        </View>
        <View style={{height: 25}}></View>
        <View>
          <TouchableOpacity
            style={stylesSettingProfile.buttonItemContainer}
            onPress={() => {
              logout();
            }}>
            <SimpleLineIcons
              name="logout"
              color={color.red_4}
              size={18}
              style={{marginRight: 10}}></SimpleLineIcons>
            <Text
              style={[stylesSettingProfile.titleItem, {color: color.red_4}]}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
