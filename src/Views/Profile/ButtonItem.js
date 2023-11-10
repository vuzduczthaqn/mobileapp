import {Text, TouchableOpacity, View} from 'react-native';
import stylesSettingProfile from './SettingProfile.style';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { color } from '../../constants';
const ButtonItem = props => {
  let {title} = props.buttonData;
  const {onPress}=props;
  return (
    <TouchableOpacity style={stylesSettingProfile.buttonItemContainer}
    onPress={onPress}>
      <Text style={stylesSettingProfile.titleItem}>
        {title}
      </Text>
      <View style={{flex: 1}} />
      <FontAwesome6
        name="angle-right"
        color={color.white_3}
        size={18}
        style={{marginRight: 20}}></FontAwesome6>
    </TouchableOpacity>
  );
};
export default ButtonItem;
