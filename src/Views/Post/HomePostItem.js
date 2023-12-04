import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions, Alert} from 'react-native';
import styles from '../HomeScreen/Home.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context';
import ConvertTime from '../../utils/ConvertTime';
const PostItem = ({item,isLikePost}) => {
  const {setShowCommentScreen, showCommentScreen} = useContext(GlobalContext);
  const {postComment, setPostComment} = useContext(GlobalContext);
  const {showPostSettting, setShowPostSettting} = useContext(GlobalContext);
  const navigation = useNavigation();
  const {user, setUser} = useContext(GlobalContext);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              source={{uri: item.imageProfile}}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.profileName}>{item.name}</Text>
              <Text style={{fontSize: 14, marginLeft: 10, color: '#8f9294'}}>
                {ConvertTime(item.timePost)}
                  
              </Text>
            </View>
          </View>
          {item.content && item.content.length != 0 && (
            <View style={styles.textContainer}>
              <Text style={styles.contentText}>{item.content}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowPostSettting({
              isShow: true,
              userId: user.userId,
              postId: item.id,
              userCreatePostId: item.userIdCreatePost,
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
        {item.imageContent && item.imageContent.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ImageShowFull', {
                imageUrl: item.imageContent,
              });
            }}>
            <Image
              source={{uri: item.imageContent}}
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
              const data={
                id:item.id,
                isLikePost:item.isLikePost
              }
              isLikePost(data);
            }}
            style={{
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            {item.isLikePost == 1 ? (
              <Icon name={'heart'} size={30} color={'red'} />
            ) : (
              <Icon
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
                userIdCreatePost: item.userIdCreatePost,
                postId: item.id,
              });
            }}
            style={{
              alignItems: 'center',
            }}>
            <Icon
              name={'comment-outline'}
              size={30}
              color={color.home_color_text}
            />
          </TouchableOpacity>
        </View>
          <View style={{paddingHorizontal: 10}}>
            {item.isAmountLike != 0 && (
              <TouchableOpacity>
                <Text style={{color: "#636363"}}>
                  {item.isAmountLike} lượt thích
                </Text>
              </TouchableOpacity>
            )}
            {item.amountComment > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setShowCommentScreen(true);
                  setPostComment({
                    userIdCreatePost: item.userIdCreatePost,
                    postId: item.id,
                  });
                  console.log(item.id);
                }}>
                <Text style={{color: "#636363"}}>
                  Xem tất cả {item.amountComment} bình luận
                </Text>
              </TouchableOpacity>
            )}
          </View>
      </View>
    </View>
  );
};
export default PostItem;
