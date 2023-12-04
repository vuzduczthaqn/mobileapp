import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
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
  const [listUserHeader, setListUserHeader] = useState([]);
  const {user, setUser} = useContext(GlobalContext);
  const [pageCurrent, setPageCurrent] = useState(0);
  const [pageSendDb, setPageSendDb] = useState(0);
  const [listChatUser, setListChatUser] = useState([]);
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const [newDataFromSocket,setNewDataFromSocket]=useState('');
  // const [chatListState, setChatListState] = useState({
  //   dataIdsList: [],
  //   dataById: {},
  // });
  // const mappingChatList = (data) => {
  //   const result = {
  //     dataIdsList: [],
  //     dataById: {}
  //   };

  //   data.forEach((item) => {
  //     const id = item.userId.toString();
  //     result.dataIdsList.push(id);
  //     result.dataById[id] = {
  //       fullName: item.fullName,
  //       idMessage: item.idMessage,
  //       idParticipant: item.idParticipant,
  //       idUserSendNewMessage: item.idUserSendNewMessage,
  //       timeSendNewMessage: item.timeSendNewMessage,
  //       urlAvatar: item.urlAvatar,
  //       contentMessage: item.contentMessage,
  //     };
  //   });

  //   return result;
  // };
  const mappingChatUser = item => {
    return {
      fullName: item.fullName,
      idMessage: item.idMessage,
      idParticipant: item.idParticipant,
      idUserSendNewMessage: item.idUserSendNewMessage,
      timeSendNewMessage: item.timeSendNewMessage,
      urlAvatar: item.urlAvatar,
      contentMessage: item.contentMessage,
      userIdChatTogether:item.userId,
      amountMessageNoRead:item.amountMessageNoRead,
      conversationId:item.conversationId,
      userId:user.userId,
      avatarUserChat:user.urlAvata
    };
  };
  const updateListChatUser =useCallback (newData => {
    console.log("co hoat dong nha ")
    setListChatUser((prevList) => {
      const updatedList = prevList.map((item) => {
        if (item.conversationId == newData.conversationId) {
          return {
            ...item,
            idUserSendNewMessage: newData.userIdSender,
            idMessage: newData.messageId,
            timeSendNewMessage: newData.timeSender,
            contentMessage: newData.contentMessage,
            amountMessageNoRead: (item.amountMessageNoRead || 0) + 1,
          };
        }
        return item;
      });
      console.log(updatedList,"lít ne")
      return updatedList;
    });
  },[setListChatUser])
  const getChatListUsers = async () => {
    const requestData = {
      userId: user.userId,
      startGetter: pageSendDb,
    };
    try {
      const response = await axios.get(url.get_list_chat_user, {
        params: requestData,
      });
      if (response.status === 200) {
        const newData=response.data.map(mappingChatUser)
        console.log(newData,'hhehehe')
        setListChatUser(prev=>[...prev,...newData])
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

  const mappingData = responeData => {
    return {
      conversationId:responeData.conversationId,
      userIdSender: responeData.userIdSender,
      messageId: responeData.messageId,
      timeSender: responeData.timeSender,
      contentMessage: responeData.contentMessage,
    };
  };
  const getMessageFromSocket = () => {
    // serviceSocket.subscribeToMessage(user.conversationId, data => {
    //   const newData = mappingData(data);
    //   console.log(newData, 'chat');
    //   updateListChatUser(newData)
    // });
  };

  
  useEffect(() => {getMessageFromSocket();
    getChatListUsers();
    getListUserHeader();
    
  }, []);
  const renderItem = ({item, index}) => {
    const maxLength = 14;
    const fullName =
      item.fullName.length > maxLength
        ? item.fullName.slice(0, maxLength) + '...'
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
            height: 50,
            width: 50,
            borderRadius: 50,
            marginHorizontal: 7.5,
            borderWidth: 1 / 2,
            borderColor: 'pink',
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
        data={listChatUser}
        ListHeaderComponent={header()}
        renderItem={({item}) => (
          <ChatItems
            onPress={() => {
              navigation.navigate('Messages', {user: item});
            }}
            user={item}
            key={item.userId}
            keyExtractor={item => item.userId}
            onDataChange={updateListChatUser}
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
            <TextInput style={{color: '#636663'}}>Tìm kiếm</TextInput>
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
