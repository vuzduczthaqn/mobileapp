import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function Profile(){
    const navigation=useNavigation()
    const handleIconPress = () => {
        navigation.navigate('Setting');
     };
     return (
     
          <SafeAreaView style={styles.container}>
           <ScrollView showsVerticalScrollIndicator={false}>
           <View style={styles.titleBar}>
             <Ionicons name="ios-arrow-back" size={30} color="#52575D"></Ionicons>
             <TouchableOpacity onPress={handleIconPress}>
             <Ionicons name="add-circle-outline" size={30} color="#52575D"></Ionicons>
             </TouchableOpacity>
           </View>
        
          <View style={{alignSelf:"center"}}>
              <View style={styles.profileImage}>
               {/* <Image source={require('./image/vecteezy_happy-young-man-smiling_24095208_986.png')} style={styles.image} resizeMode="center"></Image> */}
              </View>
               <View style={styles.dm}>
                  <MaterialIcons name="chat" size={25} color="#DFD8C8" ></MaterialIcons> 
               </View>
               <View style={styles.active}></View>
               <View style={styles.add}>
                 <Ionicons name="ios-add" size={48} color={"#DFD8C8"} style={{marginRight:6 ,marginBottom:6}}></Ionicons>
               </View>
           </View>
           <View style={styles.infoContainer}>
             <Text style={[styles.text,{fontWeight:"500",fontSize:29}]}>Bùi Minh Đức</Text>
             <Text style={[styles.text,{color:"#a9a9a9",fontSize:16}]}>Programmer</Text>
             <Text style={[styles.text,{color:"#a9a9a9",fontSize:16}]}>Contact work : ducprime3172003@gmail.com!</Text>
           </View>
           {/* Touchableopacity  */}
           <View style={styles.buttonfollow}> 
              <TouchableOpacity
                     style={styles.button}
                     onPress={() =>{
                       Alert.alert("You have followed!")
                       }}
                     >
                 <Text style={styles.buttonText}>
                   Follow!
                 </Text>
               </TouchableOpacity>
               <TouchableOpacity
                     style={styles.button}
                     onPress={{}}
                     
                     >
                 <Text style={styles.buttonText}>
                   Message!
                   
                 </Text>
               </TouchableOpacity>
             </View>
            
           <View style={styles.startContainer}>
             <View style={styles.startBox}>
               <Text style={[styles.text,{fontSize:24}]}> 317</Text>
               <Text style={[styles.text,styles.subText]}> Posts</Text>
             </View>
   
             <View style={[styles.startBox,{borderColor:"DFD8C8",borderLeftWidth:1,borderRightWidth:1}]}>
               <Text style={[styles.text,{fontSize:24}]}> 20003</Text>
               <Text style={[styles.text,styles.subText]}>Followers </Text>
             </View>
   
             <View style={styles.startBox}>
                <Text style={[styles.text,{fontSize:24}]}> 70</Text>
                <Text style={[styles.text,styles.subText]}> Following</Text>
             </View>
           </View>
   
           <View style={{marginTop:32}}>
             {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/z4731810467593_350435a4dc97de97f786917ce0b8119d.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/3.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/4.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/7.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/z4731809707569_ef88c888d9686ed1213b8475dd2a5a53.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/z4731813054103_33d346dc707f912a7a1c84949fb39f8d.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/z4731813054216_94963b047a2eb469894ba60e1ae9eb29.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/z4731810383308_1b817be2bb7fbf75dd54bcf1b30be2d5.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/hell0.jpg")} style={styles.image} resizeMode="cover"></Image>
               </View>
               <View style={styles.medialImageContainer}>
                 <Image source={require("./image/vecteezy_happy-young-man-smiling_24095208_986.png")} style={styles.image} resizeMode="cover"></Image>
               </View>
             </ScrollView> */}
             <View style={styles.mediaCount}>
               <Text style={[styles.text,{fontSize:24,color:"#DFD8C8",fontWeight:"300"}]}> 70</Text>
               <Text style={[styles.text,{fontSize:14,color:"#DFD8C8",textTransform:"uppercase"}]}>Media</Text>
             </View>
           </View>
             <Text style={[styles.subText,styles.recent]}>Recent Activity</Text>
             <View style={{alignItems:"center"}}>
               <View style={styles.recentItem}>
                 <View style={styles.recentItemIndicator}></View>
                  <View>
                   <Text style={[styles.text,{color:"#41444b",fontWeight:"300"}]}>
                     Started following {""}
                     <Text style={{fontWeight:"400"}}>
                       Duck Milk and <Text style={{fontWeight:"400"}}>Duc-prime && Duckshop.click</Text>
                     </Text>
                   </Text>
                  </View>
               </View>
   
               <View style={styles.recentItem}>
                 <View style={styles.recentItemIndicator}></View>
                  <View>
                   <Text style={[styles.text,{color:"#41444b",fontWeight:"300"}]}>
                     Started following  {""}
                     <Text style={{fontWeight:"400"}}>
                       Duck Milk and <Text style={{fontWeight:"400"}}>Duc-prime && Duckshop.click</Text>
                     </Text>
                   </Text>
                  </View>
               </View>
   
               <View style={styles.recentItem}>
                 <View style={styles.recentItemIndicator}></View>
                  <View>
                   <Text style={[styles.text,{color:"#41444b",fontWeight:"300"}]}>
                     Started following {""}
                     <Text style={{fontWeight:"400"}}>
                       Duck Milk and <Text style={{fontWeight:"400"}}>Duc-prime && Duckshop.click</Text>
                     </Text>
                   </Text>
                  </View>
               </View>
               <View style={styles.recentItem}>
                 <View style={styles.recentItemIndicator}></View>
                  <View>
                   <Text style={[styles.text,{color:"#41444b",fontWeight:"300"}]}>
                     Started following {""}
                     <Text style={{fontWeight:"400"}}>
                       Duck Milk and <Text style={{fontWeight:"400"}}>Duc-prime && Duckshop.click</Text>
                     </Text>
                   </Text>
                  </View>
               </View>
                <View style={styles.recentItem}>
                 <View style={styles.recentItemIndicator}></View>
                  <View>
                   <Text style={[styles.text,{color:"#41444b",fontWeight:"300"}]}>
                     Started following {""}
                     <Text style={{fontWeight:"400"}}>
                       Duck Milk and <Text style={{fontWeight:"400"}}>Duc-prime && Duckshop.click</Text>
                     </Text>
                   </Text>
                  </View>
               </View>
             </View>
           </ScrollView>
           </SafeAreaView>
       
       
     );
   }
   
const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#FFF8',
       marginHorizontal:5,
       marginVertical:5

     },
     text: {
       
       color:"#52575D"
     },
     subText: {
       fontSize:12,
       color:"#AEB5BC",
       textTransform:"uppercase",
       fontWeight:"500"
     },
     titleBar: {
       flexDirection:"row",
       justifyContent:"space-between",
       marginTop:4,
       marginHorizontal:1
     },
     image: {
     
       flex:1,
       width:undefined,
       height:undefined
      
     },
     profileImage: {
       paddingTop: 15,
       width:150,
       height:150,
       borderRadius: 100 ,
       borderWidth: 2,
       borderColor:"black",
       overflow:"hidden"
     },
     dm: {
       backgroundColor:"#41444B",
       position:"absolute",
       top:20,
       width:40,
       height:40,
       borderRadius:20,
       alignItems:"center",
       justifyContent:"center"
     },
     active:{
      backgroundColor: "#34FF89",
      position:"absolute",
      bottom:28,
      left:1,
      padding:4,
      height:20,
      width:20,
      borderRadius:10
     },
     add: {
       backgroundColor:"#41444B",
       position:"absolute",
       bottom:1,
       right:0,
       height:46,
       width:44,
       borderRadius: 40,
       alignItems:"center",
       justifyContent:"center"
   
     },
     infoContainer:{
       alignSelf:"center",
       alignItems:"center",
       marginTop:16
     },
     startContainer: {
       flexDirection: "row",
       alignSelf:"center",
       marginTop:22.5,
     },
     startBox:{
       alignItems:'center',
       flex:1
     },
     medialImageContainer: {
       width:190,
       height:200,
       borderRadius: 12,
       overflow:"hidden",
       marginHorizontal:10
     }
     ,
     mediaCount: {
       backgroundColor:"#41444B",
       position:"absolute",
       top:"50%",
       marginTop:-50,
       marginLeft:30,
       width:100,
       height:100,
       alignItems:"center",
       justifyContent:"center",
       borderRadius:12,
       shadowColor:"rgba(0.0.0.0.38)",
       shadowOffset:{width:0,height:10 },
       shadowRadius:20,
       shadowOpacity:1
   
     },
     recent: {
       marginLeft:58,
       marginTop: 32,
       marginBottom:6,
       fontSize: 14
     },
     recentItem:{
       flexDirection:"row",
       alignItems:"flex-start",
       marginBottom:16
     },
     recentItemIndicator:{
       backgroundColor:"#CABFAB",
       padding:4,
       height:12,
       width:12,
       borderRadius:6,
       marginTop:3,
       marginRight:20
     },
     buttonfollow:{
       marginTop:10,
       flexDirection: 'row',
       justifyContent: "space-around", 
       marginLeft:2,
     },
     button: {
       backgroundColor: '#fff', 
       marginTop:10,
       borderRadius:20,
       borderColor: "black",
       borderWidth:2,
       width:140,
       height:40
   
     },
     buttonText: {
       color: '#000', 
       fontWeight: 'bold', 
       marginTop:5.5,
       fontSize: 16, 
       textAlign: 'center', 
     
     }
    })