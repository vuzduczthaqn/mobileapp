import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Comment from './Comment';
import styles from './Home.styles';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {url} from '../../url_request';
import axios from 'axios';
import {Stomp} from '@stomp/stompjs';
import {color} from '../../constants';
import PostItem from './HomePostItem';
import { GlobalContext } from '../../context';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// const drawer=createDrawerNavigator();
export default function Home() {
  const navigation = useNavigation();;
  const [showContent, setShowContent] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(0);
  const [dataFromDB, setDataFromDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEndOfData, setIsEndOfData] = useState(false);
  const {setShowCommentScreen,showCommentScreen} =useContext(GlobalContext);


  const parseData = jsonData => {
    return {
      id: jsonData.idPost,
      name: jsonData.userNameCreatePost,
      content: jsonData.content,
      imageProfile: jsonData.urlAvataCreatePost,
      imageContent: jsonData.urlImagePost,
      postLike: jsonData.postLike,
      timePost: jsonData.timePost,
      userIdCreatePost: jsonData.userIdCreatePost,
      amountComment: jsonData.amountComment,
      isLikePost: jsonData.isLikePost,
      isAmountLike:jsonData.AmountLike
    };
  };
  const loadDataFromDB = () => {
    const requestData = {
      userId: '1',
      pageCurrent: pageCurrent,
    };
    console.log(url.get_post_data_home);
    try {
      axios
        .get(url.get_post_data_home, {
          params: requestData,
        })
        .then(response => {
          console.log(response.data);
          if (response.data == '') {
            setIsLoading(false);
            setIsEndOfData(true);
          }
          if (response.status === 200) {
            const parsedDataList = response.data.map(parseData);
            setDataFromDB(prevData => [...prevData, ...parsedDataList]);
          } else {
            console.log(
              'Yêu cầu không thành công. Trạng thái:',
              response.status,
            );
          }
          
        });
    } catch (error) {
      console.log('Lỗi:', error);
    }
  };
  const sendLikePost = () => {
    const StompConfig = {
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    };
    const stompSocket = Stomp.over(
      () => new WebSocket(url.socket_send_like_post),
      StompConfig,
    );
    const connect = stompSocket.connect(() => {
      console.log('onconnectted');
    });
  };
  useEffect(() => {
    setIsLoading(true);
    setIsEndOfData(false);
    loadDataFromDB();
  }, [pageCurrent]);
  const renderItem = ({item, index}) => {
    return (
      <PostItem
        item={item}
        showContent={showContent}
      />
    );
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: color.color_background,
          justifyContent: 'center',
        }}>
        <View
          style={styles.topHeader}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: color.color_text_logo_main,
            }}>
            Picky
          </Text>
          <View style={{flex:1}}></View>
          <View
            style={[styles.AddNewPost,{marginRight:7.5}]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PostNews');
              }}>
              <FontAwesome5
                name="plus"
                size={20}
                color={color.home_color_text}
              />
            </TouchableOpacity>
          </View>
          <View
            style={styles.AddNewPost}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <FontAwesome5
                name="search"
                size={20}
                color={color.home_color_text}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={dataFromDB}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={header()}
          ListFooterComponent={() => {
            if (isLoading) {
              return <Text>Loading...</Text>;
            } else if (isEndOfData) {
              return <Text>Đã xem hết bài đăng</Text>;
            }
          }}
          onEndReached={() => {
            if (!isLoading || !isEndOfData) setPageCurrent(pageCurrent + 1);
          }}
          onEndReachedThreshold={0.1}></FlatList>
      </View>
      {showCommentScreen && <Comment />}
    </GestureHandlerRootView>
  );
  function header() {
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity style={{}}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/76.jpg',
            }}
            style={{height: 35, width: 35, borderRadius: 25}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: color.main_color,
            height: 35,
            borderRadius: 20,
            borderWidth: 1 / 2,
            marginHorizontal: 15,
            justifyContent: 'center',
            paddingStart: 25,
          }}
          onPress={() => {
            navigation.navigate('PostNews');
          }}>
          <Text style={{color:"#636663"}}>Bạn đang nghĩ gì ?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
