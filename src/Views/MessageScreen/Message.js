import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import MessageItem from './MessageItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '../../constants';
import axios from 'axios';
import {url} from '../../url_request';
import {GlobalContext} from '../../context';
export default function Message(props) {
  const [message, setMessage] = useState();
  const navigation = useNavigation();
  const [chatHistory, setChatHistory] = useState([]);
  const [startGetter, setStartGetter] = useState(0);
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const flatListRef = useRef(null);
  const route = useRoute();
  let {user} = route.params;

  const mappingData = responeData => {
    return {
      userIdSender: responeData.userIdSender,
      messageId: responeData.messageId,
      timeSender: responeData.timeSender,
      contentMessage: responeData.contentMessage,
    };
  };
  const getListHistoryChat = async () => {
    const dataRequest = {
      conversationId: user.conversationId,
      startGetter: startGetter,
    };
    try {
      const response = await axios.get(url.get_list_chat_history, {
        params: dataRequest,
      });
      if (response.status === 200) {
        const newData = response.data.map(mappingData);
        setChatHistory(prev => [...prev, ...newData]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = () => {
    const dataRequest = {
      messageContent: message,
      userIdSend: user.userId,
      userIdReceiver: user.userIdChatTogether,
      conversationId: user.conversationId,
    };
    serviceSocket.sendMessage(dataRequest);
    setMessage('');
  };
  const getMessageReply = () => {
    // serviceSocket.subscribeToMessageIsSendSuccess(user.userId, data => {
    //   const newData = mappingData(data);
    //   console.log(newData, 'data tra sau khi gui');
    //   setChatHistory(prev => [newData, ...prev]);
    // });
  };
  const getMessageFormSocket = () => {
    serviceSocket.subscribeToMessage(user.conversationId, data => {
      const newData = mappingData(data);
      console.log(newData, 'new data');
      setChatHistory(prev => [newData, ...prev]);
    });
  };
  useEffect(() => {
    getListHistoryChat();
    getMessageFormSocket();
    getMessageReply();
    flatListRef.current.scrollToEnd({animated: true});
    const index = chatHistory.length - 1;
  }, [user.conversationId]);

  const getItemLayout = (chatHistory, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  });
  function header() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 100,
          }}
          source={{uri: user.urlAvatar}}
        />
        <View style={{marginHorizontal: 10}}>
          <Text style={{color: 'black', fontSize: 16}}>{user.fullName}</Text>
          <Text style={{color: 'black', fontSize: 12}}></Text>
        </View>
        <TouchableOpacity>
          <Text>Xem trang cá nhân</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function handleNewMessage() {}
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          paddingVertical: 7.5,
          borderWidth: 1 / 2,
          borderColor: color.white_8,
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center', paddingHorizontal: 20}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 25,
            }}
            source={{uri: user.urlAvatar}}
          />
          <View style={{marginHorizontal: 10}}>
            <Text style={{color: 'black', fontSize: 16}}>{user.fullName}</Text>
            <Text style={{color: 'black', fontSize: 12}}></Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
      </View>
      <View style={{flex: 90}}></View>
      <FlatList
        data={chatHistory}
        ref={flatListRef}
        ListFooterComponent={header()}
        inverted={true}
        etItemLayout={getItemLayout}
        renderItem={({item}) => (
          <MessageItem
            onPress={() => {}}
            item={{
              userIdSender: item.userIdSender,
              messageId: item.messageId,
              timeSender: item.TimeSender,
              contentMessage: item.contentMessage,
              avatar: user.urlAvatar,
              avatarUserChat: user.avatarUserChat,
              userIdChatTogether: user.userIdChatTogether,
              userId: user.userId,
            }}
            key={`${item.messageId}`}
          />
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginStart: 10,
          paddingVertical: 10,
        }}>
        <TextInput
          style={{
            backgroundColor: color.color_background,
            borderRadius: 15,
            maxHeight: 100,
            fontSize: 16,
            paddingHorizontal: 15,
            width: '85%',
            padding: 6,
          }}
          placeholder="Aa"
          onChangeText={text => {
            setMessage(text);
          }}
          value={message}
          multiline={true}
        />
        <TouchableOpacity
          style={{
            paddingEnd: 15,
            marginStart: 10,
            position: 'absolute',
            bottom: 19,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={sendMessage}>
          <Text
            style={{
              color: '#279cf5',
              fontSize: 18,
              fontWeight: '600',
              alignSelf: 'center',
            }}>
            Gửi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: 200,
    height: 50,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
