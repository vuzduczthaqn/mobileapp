import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styleFriends from './Friend.style';
import axios from 'axios';
import {url} from '../../url_request';
import {GlobalContext} from '../../context';
import {it} from 'date-fns/locale';
import {formatDistanceToNow} from 'date-fns';
import vi from 'date-fns/locale/vi';
import {color} from '../../constants';
export default function InvitationRecerverFriend() {
  const route = useRoute();
  const {headerName, url, isSender} = route.params;
  const navigation = useNavigation();
  const {user, setUser} = useContext(GlobalContext);
  const [pageCurrentSendDB, setPageCurrentSendDB] = useState(0);
  const [listInvitationFriend, setListInvitationFriend] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEndOfData, setIsEndOfData] = useState(false);
  const mappingData = data => {
    return {
      friendInvitationId: data.friendInvitationId,
      userId: data.userId,
      fullName: data.fullName,
      urlAvatar: data.urlAvatar,
      amountMutualFriend: data.amountMutualFriend,
      // timeSender: data.timeSender,
      // isFriend: data.isFriend,
    };
  };
  const getDataFromDB = async () => {
    const requestParams = {
      userId: user.userId,
      startGetter: pageCurrentSendDB,
    };
    try {
      const respone = await axios.get(url, {
        params: requestParams,
      });
      if (respone.status === 200) {
        const newData = respone.data.map(mappingData);
        console.log(newData);
        setListInvitationFriend(prev => [...prev, ...newData]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    setIsEndOfData(false);
    getDataFromDB();
    setIsLoading(false);
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity style={styleFriends.buttonItem}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: item.urlAvatar}}
              style={styleFriends.imageItem}
            />
          </View>
          <View style={styleFriends.containerContentText}>
            <Text style={styleFriends.nameItem}>{item.fullName}</Text>
            <TouchableOpacity
              style={[
                styleFriends.ButtonSendBD,
                {backgroundColor: color.color_background},
              ]}>
              <Text style={{fontSize: 12, color: 'black'}}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      {/* header */}
      <View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            height: 50,
            borderBottomWidth: 1 / 2,
          }}>
          <TouchableOpacity
            style={{
              height: 30,
              width: 40,
              marginLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialCommunityIcons name="arrow-left" color="black" size={25} />
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: 'black', alignSelf: 'center'}}>
            {headerName}
          </Text>
        </View>
        {listInvitationFriend.lenght > 0 ? (
          <FlatList
            data={listInvitationFriend}
            keyExtractor={item => item.friendInvitationId}
            renderItem={renderItem}
            ListFooterComponent={() => {
              if (isLoading) {
                return <Text>Loading...</Text>;
              }
            }}
            onEndReached={() => {
              if ((listInvitationFriend.lenght = (pageCurrentSendDB - 1) * 1))
                if (!isLoading || !isEndOfData) {
                  setPageCurrentSendDB(pageCurrentSendDB + 1);
                }
            }}
            onEndReachedThreshold={0.1}
          />
        ) : (
          <View
            style={{
              height: 500,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name="users"
              size={80}
              color={color.color_background}
            />
            <Text style={{color: '#aeafb0', fontSize: 18, marginTop: 5}}>
              Chưa có lời mời kết bạn nào
            </Text>
            <Text style={{color: '#aeafb0', fontSize: 16}}>được gửi đến</Text>
          </View>
        )}
      </View>
    </View>
  );
}
