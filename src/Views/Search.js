import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from './HomeScreen';
import Message from './MessageScreen/Message';
import Profile from './Profile/Profile';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {url} from '../url_request';
import axios from 'axios';
const Drawer = createDrawerNavigator();
export default function Search() {
  const navigation = useNavigation();
  const [dataFromDB, setDataFromDB] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [pageCurrent, setPageCurrent] = useState('0');
  const [searchIsShow, setSearchIsShow] = useState(true);
  const parseData = jsonData => {
    return {
      userId: jsonData.userId,
      userName: jsonData.userName,
      urlAvata: jsonData.urlAvata,
      amountFriend: jsonData.amountFriend,
      isFriend: jsonData.isFriend,
    };
  };
  const loadDataFromDB = async () => {
    const requestData = {
      dataSeach: textSearch,
      currenSearch: pageCurrent,
    };
    console.log(url.get_data_search);
    try {
      axios.get(url.get_data_search, {params: requestData}).then(respone => {
        console.log(respone.data);
        if (respone.status === 200) {
          const parsedDataList = respone.data.map();
        }
      });
    } catch (Error) {
      console.log(Error);
    }
  };
  const iconSearchIsShow=()=>{
    if (textSearch.toString.lenght > 0) {
      setSearchIsShow(true);
    } else {
      setSearchIsShow(false);
    }
  }
  useEffect(() => {
    if (textSearch.toString.lenght > 0) {
      Alert.alert("abh")
      setSearchIsShow(true);
    } else {
      setSearchIsShow(false);
    }
  }, [textSearch]);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.searchBack}>
            <FontAwesome6
              name="angle-left"
              color="black"
              size={30}></FontAwesome6>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              height: 45,
              marginHorizontal: 5,
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.searhInput}
              placeholder="Search"
              placeholderTextColor={'#a7a8a8'}
              onChangeText={text => {
                setTextSearch(text);
                iconSearchIsShow()
              }}
            />
            <View style={{position: 'absolute', top: 12.5, left: 7.5}}>
                <FontAwesome5 name="search" size={18} color="#b3afaf" />
            </View>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: '#0291f0',
                fontSize: 16,
                fontWeight: 500,
                marginHorizontal: 5,
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        {/* <FlatList
          data={dataFromDB}
          renderItem={renderItem}
          keyExtractor={item => {
            item.id;
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {}}
          onEndReachedThreshold={0.1}
        /> */}
        <View style={styles.containerItem}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/women/76.jpg'}}
              style={styles.imgeItemRender}
            />
            <View>
              <Text style={{color: 'black', fontSize: 18}}>Vu Duc Thang</Text>
              <Text style={{color: 'black', flex: 14}}>18 bạn bè</Text>
            </View>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={{
                height: 30,
                backgroundColor: 'blue',
                paddingHorizontal: 7.5,
                marginEnd: 15,
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'red'}}>Kết bạn</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  function renderItem(item, index) {
    return (
      <View>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/women/76.jpg'}}
          style={styles.imgeItemRender}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: 'center',
    // backgroundColor: '#e8eaeb',
  },
  searchBack: {paddingLeft: 5, paddingRight: 15},
  searhInput: {
    backgroundColor: '#ededed',
    borderRadius: 15,
    paddingStart: 35,
    paddingVertical: 0,
    height: 40,
    color: 'black',
    fontSize:16
    // borderBottomWidth:1,
    // borderBottomColor:'black'
  },
  imgeItemRender: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  containerItem: {
    height: 80,
    marginVertical: 5,
  },
});
