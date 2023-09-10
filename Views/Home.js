import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={{backgroundColor: 'blue'}}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={{color: 'red'}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: 'red'}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>go back</Text>
      </TouchableOpacity>
    </View>
  );
}
