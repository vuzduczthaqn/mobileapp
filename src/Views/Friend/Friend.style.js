import {color, size} from '../../constants';

const {StyleSheet} = require('react-native');

const styleFriends = StyleSheet.create({
  header: {
    backgroundColor: color.color_background,
    height: size.HEIGHT_SCREEN * 0.07,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageItem: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'pink',
  },
  buttonItem: {
    padding: 5,
    marginVertical:5,
    marginHorizontal:5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameItem: {
    color: 'black',
    fontSize: 16,
  },
  containerContentText: {
    flex:1,
    marginLeft: 5,
    flexDirection:"row",
    alignItems:"center"
  },
  containerButtonSendDB: {
    flexDirection: 'row',
    justifyContent:'center'
  },
  ButtonSendBD: {
    padding: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position:'absolute',
    right:15,
  },
  timeReceiver:{
    fontSize:12,
    color:color.white_8
  }
});
export default styleFriends;
