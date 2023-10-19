import React, {useState} from 'react';
import {Alert, FlatList, ScrollView, Text, Touchable, TouchableOpacity, View} from 'react-native';
import ChatItems from './ChatItems';
import {useNavigation} from '@react-navigation/native';
export default function Chats() {
  const navigation=useNavigation();
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
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
      }}>
      <View>
        <Text>Có 6 cuộc trò chuyện</Text>
      </View>
      <FlatList
        style={{}}
        data={users}
        renderItem={({item}) => (
          <ChatItems
            onPress={() => {
                navigation.navigate('Messages',{user :item})
            }}
            user={item}
            key={item.name}
            keyExtractor={item => item.url}
          />
        )}
      />
    </View>
  );
}
