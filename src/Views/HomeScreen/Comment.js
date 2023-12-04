import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  FlatList,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  damping,
  runOnUI,
  runOnJS,
} from 'react-native-reanimated';
import {color, size} from '../../constants';
import {GlobalContext} from '../../context';
import axios from 'axios';
import {url} from '../../url_request';
import {formatDistanceToNowStrict} from 'date-fns';
import vi from 'date-fns/locale/vi';
import ConvertTime from '../../utils/ConvertTime';
export default function Comment() {
  const translationY = useSharedValue(0);
  const [keyboardIsShow, setKeyboardIsShow] = useState(false);
  const {postComment, setPostComment} = useContext(GlobalContext);
  const {user, setUser} = useContext(GlobalContext);
  const [startGetter, setStartGetter] = useState(0);
  const {setShowCommentScreen, showCommentScreen} = useContext(GlobalContext);
  const context = useSharedValue({y: 0});
  const [isShowButtonSend, setIsShowButonSend] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const [idParentComment, setIdParentComment] = useState(null);
  const setComment = () => {
    setShowCommentScreen(false);
  };
  const handlerInputComment = () => {
    if (commentContent.length > 0) {
      setIsShowButonSend(true);
    } else {
      setIsShowButonSend(false);
    }
  };
  const [commentList, setCommentList] = useState([]);
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
      postId: postComment.postId,
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
      const newData = {
        idParentComment: data.idParentComment,
        idComment: data.idComment,
        idUserComment: data.idUserComment,
        userName: data.userNameComment,
        urlAvatar: data.userUrlAvatar,
        content: data.contentComment,
        timeComment: "vừa xong",
        amountComment: data.amountReply,
      };
      setCommentList(prev => [newData, ...prev]);
    });
  };
  useEffect(() => {
    getComment();
    getDataFromSocket();
  }, []);


  
  const scrollTo = useCallback(destination => {
    'worklet';
    translationY.value = withTiming(destination);
    if (destination === 50) {
      ('worklet');
      runOnJS(setComment)();
    }
  }, []);
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translationY.value};
    })
    .onUpdate(event => {
      translationY.value = event.translationY + context.value.y;
      translationY.value = Math.max(
        translationY.value,
        -size.HEIGHT_SCREEN * 0.9,
      );
    })
    .onEnd(() => {
      if (translationY.value >= -size.HEIGHT_SCREEN * 0.7) {
        scrollTo(50);
      } else if (translationY.value < -size.HEIGHT_SCREEN * 0.7) {
        scrollTo(-size.HEIGHT_SCREEN * 0.9);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translationY.value}],
    };
  });
  useEffect(() => {
    scrollTo(-size.HEIGHT_SCREEN * 0.9);
  });
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsShow(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    handlerInputComment();
  }, [commentContent]);

  const commentItem = ({item, index}) => {
    return (
      <TouchableOpacity>
        <View style={styles.containerItemComment}>
          <View style={{padding: 5, marginTop: 5}}>
            <TouchableOpacity style={styles.buttonImage}>
              <Image
                source={{uri: item.urlAvatar}}
                style={{height: 35, width: 35, borderRadius: 25}}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: size.WIDTH_SCREEN - 60}}>
            <Text style={{color: '#616363', fontSize: 14}}>
              {item.userName}
            </Text>
            <Text style={{color: 'black', fontSize: 15}}>{item.content}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12, paddingTop: 5, color: color.white_6}}>
                {item.timeComment}
              </Text>
              <TouchableOpacity style={{marginLeft: 15}} onPress={() => {}}>
                <Text style={{fontSize: 13, paddingTop: 5}}>Trả lời</Text>
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
                <Text style={{fontSize: 13}}>
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
    <GestureDetector gesture={gesture}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}>
        <View style={styles.backGround}>
          <Animated.View
            style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
            <View style={{marginVertical: 10}}>
              <Text style={styles.containerHederComment}>Bình luận</Text>
              <View
                style={{
                  height: 2,
                  width: '30%',
                  backgroundColor: color.color_background,
                  alignSelf: 'center',
                  marginTop: 5,
                }}
              />
            </View>
            <View style={{height: 600}}>
              {commentList.length != 0 ? (
                <FlatList
                  data={commentList}
                  keyExtractor={item => item.idComment}
                  renderItem={commentItem}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 140,
                  }}>
                  <FontAwesome
                    name="comments"
                    color={color.color_background}
                    size={100}></FontAwesome>
                  <Text style={{fontSize: 16, color: color.color_background}}>
                    Chưa có bình luận nào
                  </Text>
                  <Text style={{color: color.color_background}}>
                    Hãy là người đầu tiên bình luận
                  </Text>
                </View>
              )}
            </View>
            <View
              style={[
                keyboardIsShow == false
                  ? styles.keyBoardNotShow
                  : styles.keyBoardIsShow,
                styles.containerFooterInput,
              ]}>
              <View style={styles.containerImageInput}>
                <Image
                  source={{uri: user.urlAvata}}
                  style={styles.ImageInput}
                />
              </View>
              <View style={styles.containerInputAndButton}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Aa"
                  onChangeText={text => {
                    setCommentContent(text);
                  }}
                  value={commentContent}
                  multiline={true}
                />
                {isShowButtonSend && (
                  <TouchableOpacity
                    style={styles.buttonSend}
                    onPress={() => {
                      sendComment();
                      setCommentContent('');
                      Keyboard.dismiss();
                    }}>
                    <FontAwesome name="send-o" size={20} color={'black'} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: size.HEIGHT_SCREEN,
    width: size.WIDTH_SCREEN,
    backgroundColor: 'white',
    position: 'absolute',
    top: size.HEIGHT_SCREEN,
    borderRadius: 25,
    alignSelf: 'center',
  },
  backGround: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0, 0.6)', // Độ mờ 70% và màu trắng
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerInputAndButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: size.WIDTH_SCREEN - 65,
    alignItems: 'center',
    backgroundColor: color.color_background,
    borderRadius: 15,
    marginHorizontal: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: color.color_background,
    borderRadius: 15,
    maxHeight: 85,
    fontSize: 16,
    paddingHorizontal: 15,
  },
  buttonSend: {padding: 15},
  containerItemComment: {
    flexDirection: 'row',
    marginRight: 7.5,
    marginTop: 5,
    marginLeft: 2.5,
    marginBottom: 5,
  },
  buttonImage: {
    borderWidth: 1 / 2,
    borderColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImageInput: {
    width: 45,
    height: 45,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageInput: {
    height: 40,
    width: 40,
    borderRadius: 25,
    borderWidth: 1 / 4,
    borderColor: 'black',
  },
  keyBoardNotShow: {
    position: 'absolute',
    top: size.HEIGHT_SCREEN * 0.82,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 350,
  },
  keyBoardIsShow: {
    position: 'absolute',
    top: size.HEIGHT_SCREEN * 0.45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 350,
  },
  containerFooterInput: {
    borderTopWidth: 1 / 4,
    borderColor: 'black',
    paddingTop: 7.5,
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  containerHederComment: {color: 'black', alignSelf: 'center', fontSize: 16},
});
