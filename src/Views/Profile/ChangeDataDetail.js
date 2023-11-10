import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {color, size} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {AsyncStorageItem, url} from '../../url_request';
import { GlobalContext } from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ChangeDataDetail = () => {
  const route = useRoute();
  const {user, setUser} = useContext(GlobalContext);
  const refInput = useRef(null);
  const {title, value, type, userId} = route.params;
  const [content, setContent] = useState(value);
  const navigation = useNavigation();
  const [showButtonCheck, setShowButtonCheck] = useState(true);

  const showButton = () => {
    if (content.length > 0) {
      setShowButtonCheck(true);
    } else {
      setShowButtonCheck(false);
    }
  };
  const update = async () => {
    const dataRequest = new FormData();
    dataRequest.append('userId', userId);
    dataRequest.append('type', type);
    dataRequest.append('content', content);
    try {
      const response = await axios.post(url.updateProfile, dataRequest);
      
      if (response.status === 200) {
        if(type=="EMAIL") setUser({...user,email:content})
        else if(type=="DESCRIBE") setUser({...user,describe:content})
        else if(type=="USERNAME") setUser({...user,userName:content})
        else if(type=="FULLNAME") setUser({...user,fullName:content})
        await AsyncStorage.setItem(AsyncStorageItem.user,JSON.stringify(user))
        setContent('');

        navigation.goBack();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Keyboard.dismiss();
    refInput.current.focus();
  }, []);
  useEffect(() => {
    showButton();
  }, [content]);
  return (
    <View>
      <View style={styleChangeInfor.header}>
        <TouchableOpacity
          style={styleChangeInfor.buttonOut}
          onPress={() => navigation.goBack()}>
          <Feather name="x" color="black" size={25}></Feather>
        </TouchableOpacity>
        <Text style={styleChangeInfor.titleHeader}>{title}</Text>
        {showButtonCheck ? (
          <TouchableOpacity style={{padding: 15}} onPress={update}>
            <Feather name="check" color={color.blue_7} size={25}></Feather>
          </TouchableOpacity>
        ) : (
          <View style={{padding: 15}}>
            <Feather name="check" color={color.blue_4} size={25}></Feather>
          </View>
        )}
      </View>
      <View style={styleChangeInfor.containerItemChange}>
        <TextInput
          ref={refInput}
          style={styleChangeInfor.buttonChangeData}
          onChangeText={Text => {
            setContent(Text);
          }}
          value={content}></TextInput>
      </View>
    </View>
  );
};
const styleChangeInfor = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  titleHeader: {
    color: 'black',
    fontSize: 18,
    width: 250,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  buttonOut: {
    paddingLeft: 15,
    paddingVertical: 5,
  },
  containerItemChange: {
    margin: 5,
    borderBottomWidth: 1 / 2,
    borderColor: color.white_6,
    marginLeft: 10,
    marginRight: 10,
    width: size.WIDTH_SCREEN - 20,
  },
  lableInputItem: {
    color: color.white_6,
    fontSize: 12,
  },
  valueInputItem: {
    color: color.black_9,
    fontSize: 14,
  },
  buttonChangeData: {
    paddingBottom: 2.5,
    paddingTop: 7.5,
    width: size.WIDTH_SCREEN - 30,
  },
});
