import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import Comment from './Comment';
import styles from './Home.styles';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AsyncStorageItem, url} from '../../url_request';
import axios from 'axios';
import {Stomp} from '@stomp/stompjs';
import {color} from '../../constants';
import PostItem from '../Post/HomePostItem';
import {GlobalContext} from '../../context';
export default function Home() {
  const navigation = useNavigation();
  const [showContent, setShowContent] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(0);
  const [pageSendDb, setPageSendDb] = useState(0);
  const [dataFromDB, setDataFromDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEndOfData, setIsEndOfData] = useState(false);
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const {setShowCommentScreen, showCommentScreen} = useContext(GlobalContext);
  const {user, setUser} = useContext(GlobalContext);
  const parseData = jsonData => {
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
  const loadDataFromDB = () => {
    const requestData = {
      userId: user.userId,
      pageCurrent: pageSendDb,
    };
    try {
      axios
        .get(url.get_post_data_home, {
          params: requestData,
        })
        .then(response => {
          if (response.status === 200) {
            if (response.data.lenght != 0) {
              const parsedDataList = response.data.map(parseData);
              setDataFromDB(prevData => [...prevData, ...parsedDataList]);
              setPageCurrent(pageCurrent + 1);
            } else {
              setIsLoading(false);
              setIsEndOfData(true);
            }
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
  const sendLikePost = data=> {
    const dataRequest = {
      postId:data.id,
      userId:user.userId,
      isLikePost:data.isLikePost,
    };
    serviceSocket.sendLike(dataRequest);
  }
  const upDateListPostIsLike = useCallback(newData => {
    sendLikePost(newData)
    setDataFromDB(prevList => {
      const upDateList = prevList.map(item => {
        if (item.id === newData.id) {
          return {
            ...item,
            isAmountLike: !item.isLikePost==1?item.isAmountLike+1:item.isAmountLike-1,
            isLikePost: newData.isLikePost==1?0:1,
          };
        }
        return item;
      });
      return upDateList;
    });
  },[setDataFromDB]);
  
  useEffect(() => {
    setIsLoading(true);
    setIsEndOfData(false);
    loadDataFromDB();
    setIsLoading(false);
  }, [pageSendDb]);

  const renderItem = ({item, index}) => {
    return (
      <PostItem
        item={item}
        showComment={setShowCommentScreen}
        isLikePost={upDateListPostIsLike}
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
        <View style={styles.topHeader}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#da6df2',
            }}>
            Picky
          </Text>
          <View style={{flex: 1}}></View>
          <View style={[styles.AddNewPost, {marginRight: 7.5}]}>
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
          <View style={[styles.AddNewPost, {marginRight: 7.5}]}>
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
          <View style={styles.AddNewPost}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NotificationScreen');
              }}>
              <FontAwesome5
                name="bell"
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
              return <Text style={{color: 'red'}}>Loading...</Text>;
            } else if (isEndOfData) {
              return <Text style={{color: 'red'}}>Đã xem hết bài đăng</Text>;
            }
          }}
          onEndReached={() => {
            if (!isLoading || !isEndOfData) {
              setPageSendDb(pageCurrent);
            }
          }}
          onEndReachedThreshold={0.1}
          onRefresh={() => {
            setDataFromDB([]);
            setPageCurrent(1);
            setPageSendDb(1);
            setPageSendDb(0);
          }}
          refreshing={isLoading}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                setDataFromDB([]);
                setPageCurrent(1);
                setPageSendDb(1);
                setPageSendDb(0);
              }}
              colors={['blue', 'green']} // Màu sắc biểu tượng
            />
          }
        />
      </View>
      {/* <Comment /> */}
    </GestureHandlerRootView>
  );
  function header() {
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity style={{}}>
          <Image
            source={{
              uri: user.urlAvata,
            }}
            style={{
              height: 35,
              width: 35,
              borderRadius: 25,
              borderWidth: 1,
              backgroundColor: 'black',
            }}
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
          <Text style={{color: '#636663'}}>Bạn đang nghĩ gì ?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
