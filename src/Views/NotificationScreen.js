import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Versions} from '@stomp/stompjs';
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GlobalContext} from '../context';
import {color, size} from '../constants';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {url} from '../url_request';
import stylesNotification from './Notification.style';
import {formatDistance, formatDistanceToNow, formatDistanceToNowStrict} from 'date-fns';
import vi from 'date-fns/locale/vi';
import ConvertTime from '../utils/ConvertTime';
export default function NotificationScreen() {
  const {notification, setNoification} = useContext(GlobalContext);
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const [dataFromDb, setDataFromDb] = useState([]);
  const {user, setUser} = useContext(GlobalContext);
  const [pageCurrent, setPageCurent] = useState(0);
  const [startGetter, setStartGetter] = useState(0);
  // const [postDetail, setPostDetail] = useState([]);
  const mappingDataPostDetail = jsonData => {
    return {
      id: jsonData.idPost,
      name: jsonData.fullNameCreatePost,
      content: jsonData.content,
      imageProfile: jsonData.urlAvataCreatePost,
      imageContent: jsonData.urlImagePost,
      postLike: jsonData.postLike,
      timePost: jsonData.timePost,
      userIdCreatePost: jsonData.userIdCreatePost,
      amountComment: jsonData.amountComment,
      isLikePost: jsonData.isLikePost,
      isAmountLike: jsonData.amountLike,
    };
  };
  const getPostDetail = async (postIdDetail) => {
    console.log('post id',postIdDetail)
    const requestParam = {
      postId: postIdDetail,
      userId: user.userId,
    };
    try {
      const Response = await axios.get(url.get_post_detail, {
        params: requestParam,
      });
      if (Response.status === 200) {
        const newData = mappingDataPostDetail(Response.data)
        console.log('postDetail', newData);
        // setPostDetail(newData);
        navigation.navigate("PostDetail",{postDetail:newData})
      }
    } catch (error) {
      console.log(error);
    }
  };
  const mappingData = data => {
    return {
      notificationId: data.notificationId,
      postId: data.postId,
      urlAvatarUser: data.urlAvatarUser,
      fullName: data.fullName,
      type: data.type,
      isRead: data.read,
      timeNotification: ConvertTime(data.timeNotification),
    };
  };
  const mappingDataFromSocket = data => {
    return {
      notificationId: data.notificationId,
      postId: data.postId,
      urlAvatarUser: data.urlAvatarUser,
      fullName: data.fullName,
      type: data.type,
      isRead: data.read,
      timeNotification:"vừa xong",
    };
  };
  const getData = async () => {
    const requestData = {
      userId: user.userId,
      startGetter: startGetter,
    };
    try {
      const respone = await axios.get(url.get_list_notification, {
        params: requestData,
      });
      if (respone.status === 200) {
        const newData = respone.data.map(mappingData);
        console.log("thong bao",newData)
        setDataFromDb(prev => [...prev, ...newData]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDataFromSocket = () => {
    serviceSocket.subscribeToComment(user, dataFromSocket => {
      if (dataFromSocket && dataFromSocket.length !== 0) {
        const newData = mappingDataFromSocket(dataFromSocket);
        newData.timeNotification='vừa xong'
        setDataFromDb(oldData => [newData, ...oldData]);
      }
    });
  };  
  useEffect(() => {
    getData();
    getDataFromSocket();
    // console.log(serviceSocket.subscribeToComment(user))
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity
          style={
            item.isRead == true
              ? stylesNotification.containerButton
              : stylesNotification.containerButtonIsRead
          }
          onPress={()=>{
            console.log("front send ",item.postId)
            getPostDetail(item.postId);

          }}>
          <View>
            <Image
              source={{uri: item.urlAvatarUser}}
              style={stylesNotification.imageItem}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                width: size.WIDTH_SCREEN * 0.7,
                marginLeft: 5,
              }}>
              <Text style={{justifyContent: 'center'}}>
                <Text style={stylesNotification.textItemName}>
                  {item.fullName}
                </Text>
                {item.type === 'LIKE' ? (
                  <Text style={stylesNotification.textContent}>
                    Đã thích bài viết của bạn
                  </Text>
                ) : (
                  <Text style={stylesNotification.textContent}>
                    Đã bình luận vào bài viết của bạn
                  </Text>
                )}
              </Text>
            </View>
            <Text style={stylesNotification.textTime}>
              {item.timeNotification}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* header */}
      <View style={stylesNotification.header}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 40,
            marginLeft: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons name="arrow-left" color="black" size={25} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'black'}}>Thông báo</Text>
      </View>
      {/* body */}
      {/* {dataFromDb.lenght!=0? */}
      <FlatList
        data={dataFromDb}
        keyExtractor={item => item.notificationId}
        renderItem={renderItem}
      />
      {/* :<View style={{height:600}}>
          <Text style={{color:color.color_background}}>Chưa có thông báo</Text>
      </View>} */}
    </View>
  );
}
