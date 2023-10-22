import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function Friend() {
  const navigation = useNavigation();
  const handleIconPress = () => {
    navigation.navigate('addfriend');
  };
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 3,
          marginTop: 10,
          borderBottomWidth: 0.5,
        }}>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 40,
            marginBottom: -15,
            fontSize: 30,
          }}>
          {' '}
          Bạn bè
        </Text>
        {/* <Image source={require("./image/friend.png")} style={{ height: 140,width: 140,marginRight:10}} 
            resizeMode='contain'/> */}
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={handleIconPress}>
          {/* <Image source={require("./image/go_back_480px.png")} 
            style={{marginTop:-30,marginBottom:15, marginLeft:18, height: 27,width:27}}
             resizeMode='contain'/> */}
        </TouchableOpacity>
        <View style={styles.count}>
          <Text style={{marginVertical: 10, fontSize: 20, color: '#696969'}}>
            302 bạn bè
          </Text>
          <Pressable onPress={{}}>
            <Text
              style={{
                fontSize: 16,
                color: '#00ff',
                marginLeft: 6,
                marginTop: 14,
              }}>
              Sắp xếp
            </Text>
          </Pressable>
        </View>
        <Text style={{marginBottom: 4, color: '#000080'}}>Tìm kiếm </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm bạn..."
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <FlatList
        data={{}}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: '#696969',
              borderRadius: 20,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 3,
            }}>
            <View style={styles.friendItem}>
              <View style={{marginRight: 15}}>
                <Image
                  source={item.source}
                  style={{
                    paddingTop: 15,
                    width: 80,
                    height: 80,
                    borderRadius: 70,
                    borderWidth: 1,
                    borderColor: 'black',
                    overflow: 'hidden',
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text>{item.name}</Text>
                <Text style={{color: '#696969'}}>{item.mutualfriends}</Text>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Image
                source={item.more}
                style={{paddingTop: 5, width: 20, height: 20}}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DFD8C8',
  },
  count: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  searchContainer: {
    marginBottom: 30,
    marginTop: -25,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: -5,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 3,
  },
});
