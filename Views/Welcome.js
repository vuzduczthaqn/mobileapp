import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function Welcome({navigation}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundData = [
    {
      uri: 'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-toi-cho-dien-thoai-dep-nhat.jpg',
    },
    {
      uri: 'https://inkythuatso.com/uploads/thumbnails/800/2022/05/1-hinh-nen-dien-thoai-binh-yen-inkythuatso-18-16-16-38.jpg',
    },
    {
      uri: 'https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2023/01/b35d1aa9-hinh-nen-dien-thoai-may-man-cho-menh-moc-7.jpg',
    },
  ];
  const renderItem = ({item, index}) => {
    const isCurrentImage = currentImageIndex;
    return (
      <View
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          backgroundColor: 'red',
        }}>
        <ImageBackground source={{uri: item.uri}} style={{flex: 1}}>
          <View style={{flex: 60}}></View>
          <View
            style={{
              flex: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: '',
            }}>
            <View
              style={{
                backgroundColor: isCurrentImage == 0 ? 'green' : 'red',
                height: 15,
                width: 15,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'white',
              }}
            />
            <View
              style={{
                backgroundColor: isCurrentImage == 1 ? 'green' : 'red',
                height: 15,
                width: 15,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'white',
              }}
            />
            <View
              style={{
                backgroundColor: isCurrentImage == 2 ? 'green' : 'red',
                height: 15,
                width: 15,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'white',
              }}
            />
          </View>
          <View
            style={{
              flex: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row'
              }}>
              <Text style={{}}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={backgroundData}
        keyExtractor={item => item.uri}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.floor(
            (offsetX + 100) / Dimensions.get('window').width,
          );
          setCurrentImageIndex(newIndex);
        }}
      />
    </View>
  );
}
