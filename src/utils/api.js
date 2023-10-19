import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {Client, Stomp} from '@stomp/stompjs';
import {url} from '../url_request';
import {TextEncoder} from 'text-encoding';
import { measure } from 'react-native-reanimated';

export default function SocketAPI() {
  const [inputMessage, setInputMessage] = useState('');
  const [serverState, setServerState] = useState('loading....');
  const [connected, setConnected] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: '',
  });
  const stompConfig = {
    connectHeaders: {},
    brokerURL: url.socket_send_like_post,
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,
    debug: function (str) {
      console.log('STOMP: ' + str);
    },
    reconnectDelay: 5000,
    onConnect: function (frame) {
      console.log('connected');
      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify('Vu duc thang'),
      });
      stompClient.subscribe('/topic/public', message =>{
        console.log(`Server:${JSON.parse(message.body)}`)}
      );
    },

    onStompError: frame => {
      console.log('Additional details: ' + frame.body);
    },
  };
  const stompClient = new Client(stompConfig);
  useEffect(() => {
    stompClient.activate();
  }, []);

  const sendMessage = msg => {
    const messageContent = 'test';
    if (messageContent && stompClient) {
      const chatMessage = {
        sender: 'vuducthang',
        content: 'Hey there',
        type: 'CHAT',
      };

      // Sử dụng TextEncoder để mã hóa dữ liệu JSON thành mảng dữ liệu
      const textEncoder = new TextEncoder();
      const encodeText = textEncoder.encode(JSON.stringify(chatMessage));

      stompClient.send(API_MESSAGE_SEND_URL, {name: 'Ali'}, encodeText);
    }
  };

  return (
    <View>
      <Text>Hello from React Native with STOMP!</Text>
      <Text>Status: {serverState}</Text>
      <TextInput
        placeholder="Type a message..."
        value={inputMessage}
        onChangeText={text => setInputMessage(text)}
      />
      <Button title="Send Message" onPress={sendMessage} />
    </View>
  );
}

// var ws= useRef(new WebSocket("http://192.168.2.148:8080/data")).current;
// useEffect(()=>{
//   ws.onopen=()=>{
//     setServerState('Connected to the server')
//     ws.send("bbbbb");
//   }

//   ws.onerror = (e) => {
//     setServerState(e.message);
//     console.log(serverState);
//   };
// })
