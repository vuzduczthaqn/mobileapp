import {StyleSheet} from 'react-native';
import {color, size} from '../constants';

const stylesNotification = StyleSheet.create({
  header: {
    backgroundColor: color.color_background,
    height: size.HEIGHT_SCREEN * 0.07,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageItem: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'pink',
  },
  containerButton: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 7.5,
  },
  textItemName: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
  textContent: {
    color: 'black',
    fontSize: 14,

  },
  textTime: {
    fontSize: 12,
    paddingLeft:5,
    color:'#898b8c'

  },containerButtonIsRead: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 7.5,
    backgroundColor:"#dcecf7"
  },
});
export default stylesNotification;
