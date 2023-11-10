import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatItems from './ChatItems';
import {useNavigation} from '@react-navigation/native';
import {color, size} from '../../constants';
import {GlobalContext} from '../../context';
import axios from 'axios';
import {url} from '../../url_request';
export default function Chats() {
  const navigation = useNavigation();
  const [chatListUsers, setChatListUsers] = useState([]);
  const [listUserHeader, setListUserHeader] = useState([]);
  const {user, setUser} = useContext(GlobalContext);
  const [pageCurrent, setPageCurrent] = useState(0);
  const [pageSendDb, setPageSendDb] = useState(0);

  const getChatListUsers = async () => {
    const requestData = {
      userId: user.userId,
      startGetter: pageSendDb,
    };
    try {
      const reponse = await axios.get(url, {params: requestData});
      if (reponse.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const mappingDataHeader = data => {
    return {
      friendInvitationId: data.friendInvitationId,
      userId: data.userId,
      fullName: data.fullName,
      urlAvatar: data.urlAvatar,
      amountMutualFriend: data.amountMutualFriend,
    };
  };
  const getListUserHeader = async () => {
    const requestParams = {
      userId: user.userId,
      startGetter: 0,
    };
    try {
      const respone = await axios.get(url.get_list_friend, {
        params: requestParams,
      });
      if (respone.status === 200) {
        const newData = respone.data.map(mappingDataHeader);
        console.log(newData, 'chats');
        setListUserHeader(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [users, setUsers] = useState([
    {
      url: 'https://randomuser.me/api/portraits/men/7.jpg',
      name: 'masjd',
      firstMessage: 'hello p1',
      numberUnReadMessage: 1,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/22.jpg',
      name: 'jaja',
      firstMessage: 'hello p2',
      numberUnReadMessage: 0,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'japed',
      firstMessage: 'hello p3',
      numberUnReadMessage: 12,
    },
    {
      url: 'https://randomuser.me/api/portraits/women/76.jpg',
      name: 'vera',
      firstMessage: 'hello p4',
      numberUnReadMessage: 0,
    },
    {
      url: 'https://randomuser.me/api/portraits/women/80.jpg',
      name: 'Nata',
      firstMessage: 'hello p5',
      numberUnReadMessage: 4,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'japed',
      firstMessage: 'hello p3',
      numberUnReadMessage: 12,
    },
    {
      url: 'https://randomuser.me/api/portraits/women/76.jpg',
      name: 'vera',
      firstMessage: 'hello p4',
      numberUnReadMessage: 0,
    },
    {
      url: 'https://randomuser.me/api/portraits/women/80.jpg',
      name: 'Nata',
      firstMessage: 'hello p5',
      numberUnReadMessage: 4,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'japed',
      firstMessage: 'hello p3',
      numberUnReadMessage: 12,
    },
    {
      url: 'https://randomuser.me/api/portraits/women/76.jpg',
      name: 'vera',
      firstMessage: 'hello p4',
      numberUnReadMessage: 0,
    },
    {
      url: 'https://randomuser.me/api/portraits/women/80.jpg',
      name: 'Nata',
      firstMessage: 'hello p5',
      numberUnReadMessage: 4,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'japed',
      firstMessage: 'hello p3',
      numberUnReadMessage: 12,
    },
    {
      url: 'https://randomuser.me/api/portraits/women/76.jpg',
      name: 'vera',
      firstMessage: 'hello p4',
      numberUnReadMessage: 0,
    },
    {
      url: 'https://randomuser.me/api/portraits/women/80.jpg',
      name: 'Nata',
      firstMessage: 'hello p5',
      numberUnReadMessage: 4,
    },
  ]);
  useEffect(() => {
    getListUserHeader();
  }, []);
  const renderItem = ({item, index}) => {
    const maxLength = 14; // Độ dài tối đa bạn muốn cắt
    const fullName =
      item.fullName.length > maxLength
        ? item.fullName.slice(0, maxLength)+'...'
        : item.fullName;
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.urlAvatar}}
          style={{
            height: 60,
            width: 60,
            borderRadius: 50,
            marginHorizontal: 7.5,
            borderWidth:1/2,
            borderColor:'pink'
          }}
        />
        <View
          style={{
            width: 65,
            // justifyContent: 'center',
            alignItems: 'center',
            height: 40,
          }}>
          <Text style={{color: 'black', textAlign: 'center'}}>{fullName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        marginLeft: 2.5,
      }}>
      <View
        style={{
          height: size.HEIGHT_SCREEN * 0.075,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
          Trò chuyện
        </Text>
      </View>
      <FlatList
        data={users}
        ListHeaderComponent={header()}
        renderItem={({item}) => (
          <ChatItems
            onPress={() => {
              navigation.navigate('Messages', {user: item});
            }}
            user={item}
            key={item.name}
            keyExtractor={item => item.url}
          />
        )}
      />
    </View>
  );
  function header() {
    return (
      <View style={{marginBottom: 0}}>
        <View style={{marginBottom: 15, marginHorizontal: 5, marginRight: 15}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f5f3f2',
              height: 35,
              borderRadius: 20,
              justifyContent: 'center',
              paddingStart: 25,
            }}
            onPress={() => {
              navigation.navigate('PostNews');
            }}>
            <Text style={{color: '#636663'}}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal={true}
          data={listUserHeader}
          keyExtractor={item => item.userId}
          renderItem={renderItem}
        />
      </View>
    );
  }
}
