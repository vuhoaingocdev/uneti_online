import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Index from './src/components/index.tsx';
import KetQuaHocTap from './src/components/home/homemain/thutuchanhchinh/motcuakhaothi/ketquahoctap/ketquahoctap.tsx';

AppRegistry.registerComponent(appName, () => Index);
