// PostItem.js

import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import styles from './Home.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../constants';

const PostItem = ({item, showContent}) => {
  const [showFull,setShowFull]=useState(false);
  const [idPostShowFull,setIdPostShowFull]=useState([])
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              source={{uri: item.imageProfile}}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{item.name}</Text>
          </View>
          {item.content.length != 0 && (
            <View style={styles.textContainer}>
              {}
              <Text style={styles.contentText}>
                {showFull ? item.content : `${item.content.slice(0, 12)}...`}
              </Text>
              {item.content.length > 100 && (
                <TouchableOpacity
                onPress={() => {
                  
                }}
                style={styles.showContentButton}>
                <Text style={styles.buttonText}>
                  {true ? 'Xem thêm' : 'Ẩn'}
                </Text>
              </TouchableOpacity>
              
              )}
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {}}
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
        {item.imageContent.length > 0 && (
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
              item.postLike = item.postLike + 1;
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
              setShowComment(true);
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
        {item.postLike != 0 && item.amountComment != 0 && (
          <View style={{paddingHorizontal: 10}}>
            {item.AmountLike != 0 && (
              <TouchableOpacity>
                <Text style={{color: color.home_color_text}}>
                  {item.AmountLike} lượt thích
                </Text>
              </TouchableOpacity>
            )}
            {item.amountComment != 0 && (
              <TouchableOpacity>
                <Text style={{color: color.home_color_text}}>
                  Xem tất cả {item.amountComment} bình luận
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default PostItem;
