import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export default function Choise() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'red',flex:1}}>
      <TouchableOpacity >
      </TouchableOpacity>
    </View>
  );
}
