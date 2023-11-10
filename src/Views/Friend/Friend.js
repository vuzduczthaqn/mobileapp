import {useNavigation} from '@react-navigation/native';
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
export default function Friend() {
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
      const respone = await axios.get(url.get_list_friend, {
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
        <View style={styleFriends.header}>
          <Text style={{fontSize: 20, color: 'black', alignSelf: 'center'}}>
            Bạn bè
          </Text>
        </View>
        {listInvitationFriend.lenght != 0 ? (
          <FlatList
            data={listInvitationFriend}
            ListHeaderComponent={header}
            keyExtractor={item => item.friendInvitationId}
            renderItem={renderItem}
            ListFooterComponent={() => {
              if (isLoading) {
                return <Text>Loading...</Text>;
              }
            }}
            onEndReached={() => {
              if(listInvitationFriend.lenght=(pageCurrentSendDB-1)*1)
              if (!isLoading || !isEndOfData) {
                setPageCurrentSendDB(pageCurrentSendDB+1);
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
          </View>
        )}
      </View>
    </View>
  );
  function header() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              width: 150,
              backgroundColor: '#aeafb0',
              height: 40,
              margin: 10,
              marginVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={()=>{
              navigation.navigate('InvitationRecerverFriend', {
                headerName: 'Lời mời kết bạn',
                url: url.get_list_receiver_friend,
                isSender: false
              });
            }}>
            <Text style={{color: 'black'}}>Lời mời kết bạn</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              borderRadius: 10,
              width: 150,
              backgroundColor: '#aeafb0',
              height: 40,
              margin: 10,
              marginVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>Lời mời kết bạn đã gửi</Text>
          </TouchableOpacity> */}
        </View>
        <View>
          <Text style={{color: 'black', fontSize: 16, paddingLeft: 10}}>
            Bạn bè
          </Text>
        </View>
      </View>
    );
  }
}
