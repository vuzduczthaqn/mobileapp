import React from 'react';
import {Image, Text, Touchable, TouchableOpacity, View} from 'react-native';
export default function MessageItem(props) {
  let {urlSender, isSender, message, timestand} = props.item;
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: '10',
        paddingStart: 10,
        paddingVertical: 12,
      }}>
      {isSender ? (
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Image
            source={{uri: urlSender}}
            style={{
              height: 20,
              width: 20,
              borderRadius: 25,
              marginBottom:4,
            }}
          />
          <Text
            style={{
              color: 'black',
              backgroundColor: '#cfd4d1',
              marginHorizontal: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              maxWidth: '70%',
            }}>
            {message}
          </Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              color: 'black',
              backgroundColor: '#cfd4d1',
              marginHorizontal: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            {message}
          </Text>
          <Image
            source={{uri: urlSender}}
            style={{height: 20, width: 20, borderRadius: 25}}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
