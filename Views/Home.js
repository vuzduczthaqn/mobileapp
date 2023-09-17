import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const drawer=createDrawerNavigator();
export default function Home() {
  const navigation = useNavigation();
  const [showContent, setShowContent] = useState(true);

  const data = [
    {
      name: 'vu duc thang',
      content:
        'Chúng tôi là một công ty gồm 100 người đang phát triển và thiết kế các ứng dụng đa nền tảng với React Native bằng phương pháp Lean & Agile. Để có thêm thông tin về các giải pháp phù hợp với nhu cầu của bạn, vui lòng liên hệ qua email hoặc qua biểu mẫu liên hệ !',
      imageProfile:
        'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-toi-cho-dien-thoai-dep-nhat.jpg',
      imageContent:
        'https://img.meta.com.vn/Data/image/2021/09/29/anh-binh-minh-1.jpg',
      countInteract: 30,
    },
    {
      name: 'vu duc thang',
      content: 'hello world',
      imageProfile:
        'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-toi-cho-dien-thoai-dep-nhat.jpg',
      imageContent:
        'https://inkythuatso.com/uploads/thumbnails/800/2022/05/1-hinh-nen-dien-thoai-binh-yen-inkythuatso-18-16-16-38.jpg',
      countInteract: 30,
    },
    {
      name: 'vu duc thang',
      content: 'hello world',
      imageProfile:
        'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-toi-cho-dien-thoai-dep-nhat.jpg',
      imageContent:
        'https://inkythuatso.com/uploads/thumbnails/800/2022/05/1-hinh-nen-dien-thoai-binh-yen-inkythuatso-18-16-16-38.jpg',
      countInteract: 30,
    },
  ];

  const renderItem = ({item, index}) => {
    const showFullContent = item.content.length > 100 && showContent;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: item.imageContent}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              source={{uri: item.imageProfile}}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{item.name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.contentText}>
              {showFullContent
                ? `${item.content.slice(0, 68)}...`
                : item.content}
            </Text>
            {item.content.length > 100 && (
              <TouchableOpacity
                onPress={() => {
                  setShowContent(!showContent);
                }}
                style={styles.showContentButton}>
                <Text style={styles.buttonText}>
                  {showFullContent ? 'Xem thêm' : 'Ẩn'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 40,
            height: 200,
            justifyContent:'space-between'
          }}>
          <TouchableOpacity onPress={()=>{

          }}>
            <Icon name={'heart'} size={40} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name={'message-reply'} size={40} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            
          }}>
            <Ionicons name={'ellipsis-horizontal'} size={40} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      pagingEnabled={true}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: Dimensions.get('window').height * 0.93,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.93,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginHorizontal: 10,
    marginVertical: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.76,
  },
  contentText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  showContentButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});
