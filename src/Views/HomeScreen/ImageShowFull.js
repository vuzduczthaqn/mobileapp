import React from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function ImageShowFull({route}) {
  const navigation = useNavigation();
  const {imageUrl} = route.params;
  return (
    <View style={{backgroundColor: 'black'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={{uri: imageUrl}}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
    </View>
  );
}
