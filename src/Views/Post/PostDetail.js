import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, size} from '../../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import Comment from '../HomeScreen/Comment';
import {GlobalContext} from '../../context';
import {formatDistance, formatDistanceToNowStrict} from 'date-fns';
import vi from 'date-fns/locale/vi';
import axios from 'axios';
import {url} from '../../url_request';
import styles from './PostDetail.style';
import ConvertTime from '../../utils/ConvertTime';

export default function PostDetail() {
  const {setShowCommentScreen, showCommentScreen} = useContext(GlobalContext);
  const {amountComment, setAmountComment} = useContext(GlobalContext);
  const {postComment, setPostComment} = useContext(GlobalContext);
  const {showPostSettting, setShowPostSettting} = useContext(GlobalContext);
  const navigation = useNavigation();
  const {user, setUser} = useContext(GlobalContext);
  const [commentList, setCommentList] = useState([]);
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const route = useRoute();
  const [commentContent, setCommentContent] = useState('');
  const {postDetail} = route.params;
  const [startGetter, setStartGetter] = useState(0);
  const flatListRef = useRef();
  const textInputRef = useRef(null);
  const [idParentComment, setIdParentComment] = useState(null);
  const [isShowButtonSend, setIsShowButonSend] = useState(false);
  const scrollToHeader = () => {
    flatListRef.current.scrollToIndex({index: 0, animated: true});
  };

  const handleStartTyping = () => {
    textInputRef.current.focus();
  };
  const mappingData = data => {
    return {
      idParentComment: data.idParentComment,
      idComment: data.idComment,
      idUserComment: data.idUserComment,
      userName: data.userNameComment,
      urlAvatar: data.userUrlAvatar,
      content: data.contentComment,
      timeComment: ConvertTime(data.timeComment),
      amountComment: data.amountReply,
    };
  };
  const getComment = async () => {
    const requestParam = {
      postId: postDetail.id,
      startGetter: startGetter,
    };
    try {
      const respone = await axios.get(url.get_list_comment, {
        params: requestParam,
      });
      if (respone.status === 200) {
        const newData = respone.data.map(mappingData);
        setCommentList(prev => [...prev, ...newData]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendComment = () => {
    const dataRequest = {
      idParentComment: idParentComment,
      idUserComment: user.userId,
      userNameComment: user.fullName,
      userUrlAvatar: user.urlAvata,
      contentComment: commentContent,
      idPostComment: postComment.postId,
      idReceiverUser: postComment.userIdCreatePost,
    };
    serviceSocket.sendComment(dataRequest);
  };
  const getDataFromSocket = () => {
    serviceSocket.subscribeToCommentIsSendSuccess(user, data => {
      console.log(data,'fatagdg');
      const newData = {
        idParentComment: data.idParentComment,
        idComment: data.idComment,
        idUserComment: data.idUserComment,
        userName: data.userNameComment,
        urlAvatar: data.userUrlAvatar,
        content: data.contentComment,
        timeComment: 'vừa xong',
        amountComment: data.amountReply,
      };
      setCommentList(prev => [newData, ...prev]);
    });
  };
  useEffect(() => {
    getComment();
    getDataFromSocket();
  }, []);

  const handlerInputComment = () => {
    if (commentContent.length > 0) {
      setIsShowButonSend(true);
    } else {
      setIsShowButonSend(false);
    }
  };

  useEffect(() => {
    handlerInputComment();
  }, [commentContent]);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => {
          scrollToHeader();
          handleStartTyping();
        }}>
        <View style={styles.containerItemComment}>
          <View style={{paddingLeft: 5, paddingRight: 10}}>
            <TouchableOpacity style={styles.buttonImage}>
              <Image
                source={{uri: item.urlAvatar}}
                style={{height: 35, width: 35, borderRadius: 25}}
              />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'column'}}>
            <View style={{width: size.WIDTH_SCREEN - 60}}>
              <Text
                style={{color: color.white_8, fontSize: 14, fontWeight: '500'}}>
                {item.userName}
              </Text>
              <Text style={{color: 'black', fontSize: 15, width: 320}}>
                {item.content}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 12, color: color.white_6}}>
                {item.timeComment}
              </Text>
              <TouchableOpacity
                style={{marginLeft: 15}}
                onPress={() => {
                  scrollToHeader();
                  handleStartTyping();
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: color.white_8,
                    fontWeight: '500',
                  }}>
                  Trả lời
                </Text>
              </TouchableOpacity>
            </View>
            {item.amountComment > 0 && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '5',
                }}>
                <View
                  style={{
                    height: 1 / 2,
                    width: 20,
                    margin: 3,
                    backgroundColor: 'black',
                  }}></View>
                <Text style={{fontSize: 13, color: color.white_6}}>
                  Xem {item.amountComment} câu trả lời
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            padding: 15,
            height: size.HEIGHT_SCREEN * 0.075,
            width: size.WIDTH_SCREEN,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <FontAwesome6 name="arrow-left" color="black" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:15}}>
          <FlatList
            ref={flatListRef}
            data={commentList}
            keyExtractor={item => item.idComment}
            renderItem={renderItem}
            ListHeaderComponent={header()}
            StickyHeaderComponent={[1000]}
          />
        </View>
          
      </View>
    </KeyboardAvoidingView>
  );
  function header() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              source={{uri: postDetail.imageProfile}}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.profileName}>{postDetail.name}</Text>
              <Text style={{fontSize: 14, marginLeft: 10, color: '#8f9294'}}>
                {formatDistance(new Date(postDetail.timePost), new Date(), {
                  locale: vi,
                  addSuffix: true,
                })}
              </Text>
            </View>
          </View>
          {postDetail.content && postDetail.content.length != 0 && (
            <View style={styles.textContainer}>
              <Text style={styles.contentText}>{postDetail.content}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowPostSettting({
              isShow: true,
              userId: user.userId,
              postId: postDetail.id,
              userCreatePostId: postDetail.userIdCreatePost,
            });
          }}
          style={{
            width: Dimensions.get('window').width / 3,
            alignItems: 'center',
            position: 'absolute',
            top: 11,
            left: Dimensions.get('screen').width * 0.77,
          }}>
          <Ionicons
            name={'ellipsis-horizontal'}
            size={20}
            color={color.home_color_text}
          />
        </TouchableOpacity>
        {postDetail.imageContent && postDetail.imageContent.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ImageShowFull', {
                imageUrl: postDetail.imageContent,
              });
            }}>
            <Image
              source={{uri: postDetail.imageContent}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <View style={styles.line} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              postDetail.postLike = postDetail.postLike + 1;
            }}
            style={{
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            {postDetail.isLikePost == 1 ? (
              <MaterialCommunityIcons name={'heart'} size={30} color={'red'} />
            ) : (
              <MaterialCommunityIcons
                name={'cards-heart-outline'}
                size={30}
                color={color.home_color_text}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowCommentScreen(true);
              setPostComment({
                userIdCreatePost: postDetail.userIdCreatePost,
                postId: postDetail.id,
              });
            }}
            style={{
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name={'comment-outline'}
              size={30}
              color={color.home_color_text}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 5}}>
          {postDetail.isAmountLike != 0 ? (
            <TouchableOpacity>
              <Text style={{color: '#636363'}}>
                {postDetail.isAmountLike} lượt thích
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{marginHorizontal: 5}}>
              <Text style={{color: color.white_3}}>
                Hãy là người thích đầu tiên
              </Text>
            </View>
          )}
          {/* <Text style={{color: '#323333', fontWeight: '600', fontSize: 16}}>
            Bình luận
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f2f0',
              borderRadius: 20,
              marginTop:5,
            }}>
            <TextInput
              style={{
                paddingLeft: 15,
                paddingVertical: 10,
                fontSize: 16,
                flex: 1,
                color:'black'
              }}
              placeholder="Thêm bình luận"
              placeholderTextColor={color.white_6}
              ref={textInputRef}
              onChangeText={text => {
                setCommentContent(text);
              }}
              value={commentContent}
              multiline={true}></TextInput>
            {isShowButtonSend && (
              <TouchableOpacity
                onPress={() => {
                  sendComment('')
                  setCommentContent('');
                }}>
                <FontAwesome
                  name="send-o"
                  size={25}
                  color={'black'}
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
