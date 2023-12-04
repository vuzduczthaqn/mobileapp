import React, {useContext, useEffect, useState} from 'react';
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
import {GlobalContext} from '../context';
import { color } from '../constants';
const Drawer = createDrawerNavigator();
export default function Search() {
  const navigation = useNavigation();
  const {serviceSocket, setServiceSocket} = useContext(GlobalContext);
  const [dataFromDB, setDataFromDB] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [pageCurrent, setPageCurrent] = useState('0');
  const [searchIsShow, setSearchIsShow] = useState(true);
  const {user, setUser} = useContext(GlobalContext);
  const parseData = jsonData => {
    return {
      userId: jsonData.userId,
      fullName: jsonData.fullName,
      urlAvatar: jsonData.urlAvatar,
      amountFriend: jsonData.amountFriend,
      isFriend: jsonData.isFriend,
      isReceiver: jsonData.receiver,
      isSender: jsonData.sender,
    };
  };
  const loadDataFromDB = async () => {
    const requestData = {
      content: textSearch,
      start_getter: pageCurrent,
      userId: user.userId,
    };
    try {
      const respone = await axios.get(url.get_data_search_user, {
        params: requestData,
      });
      if (respone.status === 200) {
        const newData = respone.data.map(parseData);
        setDataFromDB(newData);
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  const updatedList = idSet => {
    setDataFromDB(currentData => {
      const updateItem = currentData.map(item => {
        if (item.userId == idSet) {
          return {...item, isSender: true};
        }
        return item;
      });
      return updateItem;
    });
  };
  const updatedListAffterDelete = idSet => {
    setDataFromDB(currentData => {
      const updateItem = currentData.map(item => {
        if (item.userId == idSet) {
          return {...item, isSender: false};
        }
        return item;
      });
      return updateItem;
    });
  };


  const sendInvitaion = async idUserReceiver => {
    // const formData = new FormData();
    // formData.append('idUserSender', user.userId);
    // formData.append('idUserReceiver', idUserReceiver);
    try {
      // const respone = await axios.post(url.send_invitation, formData);
      // if (respone.status === 200) {
        // updatedList(idUserReceiver);
      // }
      serviceSocket.sendFriend({
        userIdSender:user.userId,
        userIdReceiver:idUserReceiver
      });
      updatedList(idUserReceiver);
    } catch (error) {
      console.log(error)
    }
  };
  const deleteInvitation=async idUserReceiver=>{
    const formData = new FormData();
    formData.append('userIdSender', user.userId);
    formData.append('userIdReceiver', idUserReceiver);
     const respone = await axios.post(url.delete_friend,{
      userIdSender: user.userId,
      userIdReceiver: idUserReceiver
     });
      if (respone.status === 200) {
        updatedListAffterDelete(idUserReceiver);
      }
  }


  const iconSearchIsShow = () => {
    if (textSearch.toString.lenght > 0) {
      setSearchIsShow(true);
    } else {
      setSearchIsShow(false);
    }
  };

  // useEffect(() => {
  //   if (textSearch.toString.lenght > 0) {
  //     Alert.alert("abh")
  //     setSearchIsShow(true);
  //   } else {
  //     setSearchIsShow(false);
  //   }
  // }, [textSearch]);
  return (
    <SafeAreaView style={{backgroundColor: color.color_background, flex: 1}}>
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
                iconSearchIsShow();
              }}
            />
            <View style={{position: 'absolute', top: 12.5, left: 7.5}}>
              <FontAwesome5 name="search" size={18} color="#b3afaf" />
            </View>
          </View>
          <TouchableOpacity onPress={loadDataFromDB}>
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
        <FlatList
          data={dataFromDB}
          renderItem={renderItem}
          keyExtractor={item => {
            item.userId;
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {}}
          onEndReachedThreshold={0.1}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  function renderItem({item, index}) {
    return (
      <View style={styles.containerItem}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.urlAvatar}} style={styles.imgeItemRender} />
          <View>
            <Text style={{color: 'black', fontSize: 18}}>{item.fullName}</Text>
            <Text style={{color: 'black', flex: 14}}>
              {item.amountFriend} Bạn bè
            </Text>
          </View>
          <View style={{flex: 1}} />
          {!item.isFriend ? (
            item.isReceiver ? (
              <TouchableOpacity
                style={styles.buttonIsNoFriend}>
                <Text style={{color: 'red'}}>Chấp nhân</Text>
              </TouchableOpacity>
            ) : item.isSender ? (
              <TouchableOpacity
              onPress={()=>{
                deleteInvitation(item.userId)
              }}
                style={styles.buttonIsNoFriend}>
                <Text style={{color: 'black'}}>Đã gửi</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => sendInvitaion(item.userId)}
                style={styles.buttonIsNoFriend}>
                <Text style={{color: 'black'}}>Kết bạn</Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              style={styles.buttonIsFriend}>
              <Text style={{color: 'red'}}>Nhắn tin</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
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
    backgroundColor: 'white'
  },
  searchBack: {paddingLeft: 5, paddingRight: 15},
  searhInput: {
    backgroundColor: '#ededed',
    borderRadius: 15,
    paddingStart: 35,
    paddingVertical: 0,
    height: 40,
    color: 'black',
    fontSize: 16,
    // borderBottomWidth:1,
    // borderBottomColor:'black'
  },
  imgeItemRender: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginHorizontal: 15,
    borderWidth:1,
    borderColor:color.white_3
  },
  containerItem: {
    height: 90,
    marginVertical: 2.5,
    paddingVertical:15,
    backgroundColor: 'white',
  },
  buttonIsNoFriend:{
    height: 30,
    backgroundColor: color.blue_4,
    paddingHorizontal: 7.5,
    marginEnd: 15,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
  },
  buttonIsFriend:{
    height: 30,
    backgroundColor: color.blue_4,
    paddingHorizontal: 7.5,
    marginEnd: 15,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
  }
});
