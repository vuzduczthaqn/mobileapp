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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import axios from 'axios';
import {url} from '../../url_request';
import {color, size} from '../../constants';
import {GlobalContext} from '../../context';
export default function PostChoise() {
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
  const {showPostSettting, setShowPostSettting} = useContext(GlobalContext);
  const setShowBottomSheet = () => {
    setShowPostSettting({
      isShow: false,
      userId: '',
      postId: '',
      userCreatePostId: '',
    });
  };
  const scrollTo = useCallback(destination => {
    'worklet';
    translationY.value = withTiming(destination);
    if (destination === 50) {
      ('worklet');
      runOnJS(setShowBottomSheet)();
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
        -size.HEIGHT_SCREEN * 0.35,
      );
    })
    .onEnd(() => {
      if (translationY.value >= -size.HEIGHT_SCREEN * 0.25) {
        scrollTo(50);
      } else if (translationY.value < -size.HEIGHT_SCREEN * 0.25) {
        scrollTo(-size.HEIGHT_SCREEN * 0.35);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translationY.value}],
    };
  });
  useEffect(() => {
    scrollTo(-size.HEIGHT_SCREEN * 0.35);
  });
  return (
    <GestureDetector gesture={gesture}>
      <TouchableWithoutFeedback
        onPress={() => {
          scrollTo(50);
        }}
        style={{flex: 1}}>
        <View style={styles.backGround}>
          <Animated.View
            style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
            <View
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 5,
                  width: 100,
                  backgroundColor: '#81c5db',
                  marginTop: 10,
                }}></View>
            </View>
            {showPostSettting.userId == showPostSettting.userCreatePostId ? (
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.button}>
                  <FontAwesome5 name={'bookmark'} size={25} color={'black'} />
                  <View style={{marginLeft: 20, justifyContent: 'center'}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                      Lưu bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <FontAwesome6 name={'bell-slash'} size={22} color={'black'} />
                  <View style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                      Tắt thông báo về bài viết này
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <FontAwesome6 name={'pencil'} size={25} color={'black'} />
                  <View style={{marginLeft: 15, justifyContent: 'center'}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                      Chỉnh sửa bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <AntDesign name={'delete'} size={25} color={'black'} />
                  <View style={{marginLeft: 15, justifyContent: 'center'}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                      Xóa bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity style={styles.button}>
                  <FontAwesome5 name={'bookmark'} size={25} color={'black'} />
                  <View style={{marginLeft: 20, justifyContent: 'center'}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                      Lưu bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <AntDesign name={'delete'} size={25} color={'black'} />
                  <View style={{marginLeft: 15, justifyContent: 'center'}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                      Ẩn bài viết khỏi bảng tin
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <MaterialIcons
                    name={'report-gmailerrorred'}
                    size={25}
                    color={'black'}
                  />
                  <View style={{marginLeft: 3, justifyContent: 'center'}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                      Báo cáo bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <AntDesign name={'user'} size={25} color={'black'} />
                  <FontAwesome6 name={'ban'} size={10} color={'red'} />
                  <View style={{marginLeft: 3, justifyContent: 'center'}}>
                    <Text
                      style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                      Xóa bạn
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: size.HEIGHT_SCREEN * 0.4,
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
    backgroundColor: 'rgba(0,0,0, 0.5)', // Độ mờ 70% và màu trắng
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingTop: 25,
    padding: 5,
    paddingLeft: 20,
    alignItems: 'center',
  },
});
