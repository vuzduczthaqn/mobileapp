import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
              flex: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
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
      <View
        style={styles.boxIconChangePage}>
        <View
          style={[
            {
              backgroundColor:
                currentImageIndex == 0 ? 'white' : 'rgba(0, 0, 0, 0)',
            },
            styles.iconChangepage,
          ]}
        />
        <View
          style={[
            {
              backgroundColor:
                currentImageIndex == 1 ? 'white' : 'rgba(0, 0, 0, 0)',
            },
            styles.iconChangepage,
          ]}
        />
        <View
          style={[
            {
              backgroundColor:
                currentImageIndex == 2 ? 'white' : 'rgba(0, 0, 0, 0)',
            },
            styles.iconChangepage,
          ]}
        />
      </View>
      <TouchableOpacity style={styles.buttonNextPage}
      onPress={()=>{
        navigation.navigate('Choise')
      }}>
        <Text style={{color: 'white', fontSize: 16}}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonNextPage: {
    height: 50,
    width: Dimensions.get('window').width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#69a1fa',
    bottom: Dimensions.get('window').height * 0.15,
    left: Dimensions.get('window').width * 0.2,
    borderRadius:15,
  },
  iconChangepage: {
    height: 10,
    width: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
  },
  boxIconChangePage:{
    width: Dimensions.get('window').width * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.25,
    left: Dimensions.get('window').width * 0.4,
  }
});
