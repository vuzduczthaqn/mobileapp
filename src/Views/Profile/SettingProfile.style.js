import {StyleSheet} from 'react-native';
import {size} from '../../constants';

const stylesSettingProfile = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  buttonExit: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerTitleContainer: {
    width: size.WIDTH_SCREEN - 124,
    alignItems: 'center',
  },
  buttonItemContainer:{
    alignItems:'center',
    paddingLeft:20,
    flexDirection:'row',
    paddingVertical:10,
    backgroundColor:'white'
  },
  titleItem:{
    fontSize:16,
    color:'black'
  }
});

export default stylesSettingProfile;
