import { Dimensions, StyleSheet } from "react-native";
import { color } from "../../constants";
// '#2e2e2d'
const styles = StyleSheet.create({
    container: {
      backgroundColor: color.main_color,
      marginBottom: 5,
      paddingBottom:5
    },
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.45,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      marginLeft: 7.5,
      marginRight: 2.5,
      marginBottom: 2.5,
      marginTop: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImage: {
      height: 35,
      width: 35,
      borderRadius: 25,
      borderWidth:1,
      backgroundColor:'black'
    },
    profileName: {
      color: color.home_color_text,
      fontSize: 18,
      fontWeight: '600',
      marginHorizontal: 10,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      width: Dimensions.get('window').width * 0.9,
    },
    contentText: {
      color: color.home_color_text,
      fontSize: 16,
      marginTop: 5,
    },
    showContentButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      fontWeight: '600',
    },
    buttonText: {
      color: "#5b5c5e",
      fontSize: 16,
      marginTop: 5,
    },
    searhInput: {
      backgroundColor: '#666565',
      borderRadius: 15,
      paddingStart: 35,
      paddingVertical: 0,
      height: 40,
      width: '70%',
    },
    line: {
      height: 0.5,
      width: '98%',
      backgroundColor: "#929394",
      marginHorizontal: '1%',
      marginVertical: 5,
    },
    headerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: color.main_color,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 5,
      },
      topHeader:{
        height: 50,
        width: '100%',
        backgroundColor: color.main_color,
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingTop: 10,
        borderBottomWidth: 1,
        borderColor: color.color_background,
      },
      AddNewPost:{
        height: 35,
        width: 35,
        backgroundColor: color.color_background,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
      }
  });
  export default styles;