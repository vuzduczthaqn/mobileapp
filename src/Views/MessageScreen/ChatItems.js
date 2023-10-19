import React from 'react';
import {Image, Text, Touchable, TouchableOpacity, View} from 'react-native';
export default function ChatItems(props) {
  let {name, url, firstMessage, numberUnReadMessage} = props.user;
  const {onPress} = props;
  return <TouchableOpacity
      onPress={onPress}
      style={{
        height: '10',
        paddingStart: 10,
        paddingVertical: 12,
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
            }}
            source={{
              uri: url,
            }}></Image>
          {numberUnReadMessage > 0 && (
            <Text
              style={{
                backgroundColor: 'red',
                position: 'absolute',
                right: 10,
                borderRadius: 25,
                paddingHorizontal: numberUnReadMessage >= 10 ? 5 : 4,
                fontSize: 12,
              }}>
              {numberUnReadMessage}
            </Text>
          )}
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize:18,
            }}>
            {name}
          </Text>
          <Text style={{color: numberUnReadMessage==0?'#858585':'black'}}>{firstMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
}
