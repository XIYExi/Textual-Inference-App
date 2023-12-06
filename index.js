/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import ThemeApp from './App';
import {name as appName} from './app.json';
import './src/i18n/index';

AppRegistry.registerComponent(appName, () => ThemeApp);
