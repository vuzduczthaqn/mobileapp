import React from 'react';
import {SafeAreaView, Text, Touchable, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function Friend() {
  return (
    <SafeAreaView>
      <View>
        <View>
          <Text>Bạn bè</Text>
          <TouchableOpacity>
          <FontAwesome5 name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
