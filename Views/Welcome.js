import React from 'react';
import {Text, View, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export default function Welcome({navigation}) {
  const arr = [1, 2, 3, 4, 5, 6];
  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          index % 2 == 0 ? {backgroundColor: 'blue'} : {backgroundColor: 'red'},
          {flex: 1, height: Dimensions.get('window').height-56},
        ]}>
        <Image source={index % 2 == 0 ? {uri:"https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/hinh-nen-dien-thoai-4k-1-1.jpg"}
      :{uri:"https://i.pinimg.com/564x/cd/fe/dd/cdfedd217ee53876c87fa3481b02f1e6.jpg"}  
      } style={{
          height:Dimensions.get('window').height-56,
        }}/>
      </View>
    );
  };
  return (
    // <View>
    //   <TouchableOpacity
    //     style={{backgroundColor: 'blue'}}
    //     onPress={() => {
    //       navigation.navigate('Home');
    //     }}>
    //     <Text style={{color: 'red'}}>Home</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={{backgroundColor:'red'}}
    //   onPress={()=>{
    //     navigation.goBack()
    //   }}>
    //     <Text>go back</Text>
    //   </TouchableOpacity>
    // </View>
    <View style={{backgroundColor: 'red', flex: 1, height: '100%'}}>
      <FlatList
        data={arr}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={item => item}
        decelerationRate={"normal"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={{height:100,backgroundColor:'white'}} 
      onPress={()=>{
        navigation.navigate("Login")
      }}>
        <Text style={{color:'black'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
