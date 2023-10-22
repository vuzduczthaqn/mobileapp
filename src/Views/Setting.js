import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import React from "react";
export default function Setting(){
    const navigation=useNavigation();
    const accountItems = [
        {
          icon: "person-outline",
          text: "Edit Profile"
         
        },
        { icon: "security", text: "Security" },
        {
          icon: "notifications-none",
          text: "Notifications",
         
        },
        { icon: "lock-outline", text: "Privacy" },
      ];
    
      const supportItems = [
        {
          icon: "credit-card",
          text: "My Subscription",
          
        },
        { icon: "help-outline", text: "Help & Support" },
        {
          icon: "info-outline",
          text: "Terms and Policies"
    
        },
      ];
    
      const cacheAndCellularItems = [
        {
          icon: "delete-outline",
          text: "Free up space",
         
        },
        { icon: "save-alt", text: "Date Saver"  },
      ];
    
      const actionsItems = [
        {
          icon: "outlined-flag",
          text: "Report a problem",
         
        },
        { icon: "people-outline", text: "Add Account"},
        { icon: "logout", text: "Log out" },
      ];
    
      const renderSettingsItem = ({ icon, text }) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            paddingLeft: 12,
            backgroundColor: "rgba(36, 39, 96, 0.05)",
          }}
        >
          <MaterialIcons name={icon} size={24} color="black" />
          <Text
            style={{
              marginLeft: 36,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {text}{" "}
          </Text>
        </TouchableOpacity>
      );
    // icon go back
    const handleIconPress = () => {
      navigation.goBack();
    };
      return (
        <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View
          style={{
            marginHorizontal: 12,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            
            style={{
              position: "absolute",
              left: 0,
            }}
          >
          </TouchableOpacity>
    
         
        </View>
        <ScrollView style={{ marginHorizontal: 12 ,marginTop:30}}>
        <TouchableOpacity onPress={handleIconPress}>
        <Ionicons style={{marginTop:10}} name="ios-arrow-back" size={35} color="#52575D"></Ionicons>
        </TouchableOpacity>
          {/* Account Settings */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{  fontSize: 16, lineHeight: 20, marginVertical: 10,marginTop:10 }}>Account</Text>
            <View
              style={{
                borderRadius: 12,
                backgrounColor: "rgba(36, 39, 96, 0.05)",
              }}
            >
              {accountItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
    
          {/* Support and About settings */}
    
          <View style={{ marginBottom: 12 }}>
            <Text style={{  fontSize: 16, lineHeight: 20, marginVertical: 10 }}>
              Support & About{" "}
            </Text>
            <View
              style={{
                borderRadius: 12,
                backgrounColor: "rgba(36, 39, 96, 0.05)",
              }}
            >
              {supportItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
    
          {/* Cache & Cellular */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{  fontSize: 16, lineHeight: 20, marginVertical: 10 }}>
              Cache & Cellular{" "}
            </Text>
            <View
              style={{
                borderRadius: 12,
                backgrounColor:"rgba(36, 39, 96, 0.05)",
              }}
            >
              {cacheAndCellularItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
    
          {/* Actions Settings */}
    
          <View style={{ marginBottom: 12 }}>
            <Text style={{  fontSize: 16, lineHeight: 20, marginVertical: 10 }}>Actions</Text>
            <View
              style={{
                borderRadius: 12,
                backgrounColor: "rgba(36, 39, 96, 0.05)",
              }}
            >
              {actionsItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      );
}