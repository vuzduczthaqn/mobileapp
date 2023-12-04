import React, {useContext, useEffect} from 'react';
import {Image, Text, Touchable, TouchableOpacity, View} from 'react-native';
import {color} from '../../constants';
import ConvertTime from '../../utils/ConvertTime';
import {GlobalContext} from '../../context';

export default function ChatItems(props) {
  let {
    fullName,
    idMessage,
    idParticipant,
    idUserSendNewMessage,
    timeSendNewMessage,
    urlAvatar,
    contentMessage,
    userId,
    amountMessageNoRead,
    userIdChatTogether,
    conversationId
  } = props.user;
  const mappingData = responeData => {
    return {
      conversationId:responeData.conversationId,
      userIdSender: responeData.userIdSender,
      messageId: responeData.messageId,
      timeSender: responeData.timeSender,
      contentMessage: responeData.contentMessage,
    };
  };
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const getMessageFromSocket = async () => {
    console.log(conversationId ,'id ')
    await serviceSocket.subscribeToMessage(conversationId, data => {
      const newData = mappingData(data);
      console.log(newData, 'chat');
      onDataChange(newData)
    });
  };
  useEffect(()=>{
    getMessageFromSocket()
  },[])
  const { onPress, onDataChange } = props;
  const maxLength = 25;
  const content =
    contentMessage.length > maxLength
      ? contentMessage.slice(0, maxLength) + '...'
      : contentMessage;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: '10',
        paddingLeft: 10,
        paddingVertical: 7.5,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{}}>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'cover',
              borderRadius: 50,
              marginRight: 15,
              borderWidth: 1/4,
              borderColor: color.black_9,
            }}
            source={{
              uri: urlAvatar,
            }}></Image>
        </View>
        <View>
          <Text
            style={{
              color: color.black_9,
              fontSize: 16,
            }}>
            {fullName}
          </Text>
          <View style={{flexDirection: 'row', width: 270}}>
            {userId == idUserSendNewMessage ? (
              <Text
                style={{color: amountMessageNoRead == 0 ? color.white_8 : 'black'}}>
                Bạn: {contentMessage}
              </Text>
            ) : (
              <Text
                style={{color: amountMessageNoRead == 0 ? color.white_8 : 'black'}}>
                {content}
              </Text>
            )}
            <Text
              style={{color: color.white_8,marginLeft:5}}>
              {ConvertTime(timeSendNewMessage)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
