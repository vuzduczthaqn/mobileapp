/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/Views/App';
import {name as appName} from './app.json';
import SocketAPI from './src/utils/api';
import * as encoding from 'text-encoding';
AppRegistry.registerComponent(appName, () => App);
