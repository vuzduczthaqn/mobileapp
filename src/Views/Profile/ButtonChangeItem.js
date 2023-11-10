import {Text, TouchableOpacity, View} from 'react-native';
import styleChangeInfor from './ChangeInforUser.style';

const ButtonChangeItem = (props) => {
  let {title,value} = props.data;
  const {onPress} = props;
  return (
    <View style={styleChangeInfor.containerItemChange}>
      <Text style={styleChangeInfor.lableInputItem}>{title}</Text>
      <TouchableOpacity style={styleChangeInfor.buttonChangeData} onPress={onPress}>
        <Text style={styleChangeInfor.valueInputItem}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ButtonChangeItem;
