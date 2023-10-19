import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, Button, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {url} from '../url_request';

export default function Home() {
  const [pageCurrent, setPageCurrent] = useState(0);
  const [dataFromDB, setDataFromDB] = useState([]);

  const parseData = jsonData => {
    return {
      id: jsonData.idPost,
      name: jsonData.userNameCreatePost,
      content: jsonData.content,
      imageProfile: jsonData.urlAvataCreatePost,
      imageContent: jsonData.urlImagePost,
      countInteract: jsonData.postLike,
      timePost: jsonData.timePost,
      userIdCreatePost: jsonData.userIdCreatePost,
    };
  };

  const loadDataFromDB = () => {
    const requestData = {
      userId: '1',
      pageCurrent: pageCurrent,
    };

    try {
      axios
        .get(url.get_post_data_home, {
          params: requestData,
        })
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
            const parsedDataList = response.data.map(parseData);
            setDataFromDB(prevData => [...prevData, ...parsedDataList]);
          } else {
            console.log(
              'Yêu cầu không thành công. Trạng thái:',
              response.status,
            );
          }
        });
    } catch (error) {
      console.log('Lỗi:', error);
    }
  };
  useEffect(()=>{
    loadDataFromDB();
  },[pageCurrent])

  return (
    <View>
      <FlatList
        data={dataFromDB}
        keyExtractor={item => item.id.toString()} // Chắc chắn rằng key là một chuỗi hoặc số
        renderItem={({item}) => (
          <View>
            <Text style={{color: 'red'}}>Name: {item.name}</Text>
            <Text>Content: {item.content}</Text>
            {/* Thêm các phần tử khác mà bạn muốn hiển thị */}
          </View>
        )}
      />
      <TouchableOpacity onPress={()=>{
        setPageCurrent(pageCurrent+1)
      }}>
<Text style={{color: 'red'}}>Name:</Text>
      </TouchableOpacity>
    </View>
  );
}
