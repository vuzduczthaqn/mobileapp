import axios from "axios";
import React, { useEffect, useState } from "react";
import { View,Text, FlatList } from "react-native";
export default function Login(){
    const [user,setUser]=useState([])
    useEffect(()=>{
        return(
        axios
      .get("http://10.0.60.61:8888/login/data")
      .then((response) => {
        setUser((response.data));
         console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      }));
  }, []);
    return (
        <View><Text>{user}</Text></View>
    )
}