import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '../../constants';
export default function Message(props) {
  const [message, setMessage] = useState();
  const navigation = useNavigation();
  const {url, name} = {
    url: 'https://randomuser.me/api/portraits/women/76.jpg',
    name: 'vu duc thang',
  };
  const [chatHistory, setChatHistory] = useState([
    {
      urlSender: url,
      isSender: true,
      message: 'hello',
      timestand: 1693736220,
    },

    {
      urlSender: url,
      isSender: true,
      message: "I'm fine",
      timestand: 1693736420,
    },
    {
      urlSender: url,
      isSender: true,
      message:
        'And youaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      timestand: 1693736430,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'hello',
      timestand: 1693736250,
    },
    {
      urlSender: 'https://randomuser.me/api/portraits/women/76.jpg',
      isSender: false,
      message: 'how are you',
      timestand: 1693736350,
    },
  ]);
  function handleNewMessage() {
    const timeSend = {
      hr: new Date().getHours()
        ? `0${new Date().getHours()}`
        : new Date().getHours(),
      mins: new Date().getMinutes()
        ? `0${new Date().getMinutes()}`
        : new Date().getMinutes(),
    };
  }
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
      }}>
      <View style={{flex: 90}}></View>
      <FlatList
        style={{}}
        data={chatHistory}
        renderItem={({item}) => (
          <MessageItem
            onPress={() => {
              Alert.alert('you press item');
            }}
            item={item}
            key={`${item.timestand}`}
          />
        )}
      />
      <View
        style={{
          flex: 10,
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
          backgroundColor: 'white',
          paddingVertical: 10,
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
            source={{uri: url}}
          />
          <View style={{marginHorizontal: 10}}>
            <Text style={{color: 'black', fontSize: 16}}>{name}</Text>
            <Text style={{color: 'black', fontSize: 12}}>
              Hoatj động 10p trước
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
      </View>
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
          onPress={handleNewMessage}>
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
