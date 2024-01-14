import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Index from './src/components/index.tsx'

AppRegistry.registerComponent(appName, () => Index);
