import {StyleSheet} from 'react-native';
import {color, size} from '../../constants';

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
    marginLeft:size.WIDTH_SCREEN/2-140
  },
  buttonOut: {
    paddingLeft: 15,
    paddingVertical: 5,
  },
  containerAvatarSetting: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop:10,
    marginBottom:30,
  },
  avatar: {
    height: 85,
    width: 85,
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 50,
  },
  buttonChangeAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  labelButtonChangeAvatar: {
    color: color.blue_7,
  },
  containerItemChange: {
    margin: 5,
    borderBottomWidth: 1 / 2,
    borderColor: color.white_6,
    marginLeft: 10,
    marginRight: 10,
    width: size.WIDTH_SCREEN - 30,
  },
  lableInputItem: {
    color: color.white_6,
    fontSize: 12,
  },
  valueInputItem: {
    color: color.black_9,
    fontSize: 14,
  },
  buttonChangeData:{
    paddingBottom: 5,
    paddingTop: 7.5,
    width: size.WIDTH_SCREEN - 30,
  }
});

export default styleChangeInfor;
