import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './login/login.tsx';
import HomeMain from './home/homemain/homemain.tsx';
import ThuTucHanhChinh from './home/homemain/thutuchanhchinh/thutuchanhchinh.tsx';
import Header1 from './home/untils/header/header1.tsx';
import MotCuaKhaoThi from './home/homemain/thutuchanhchinh/motcuakhaothi/motcuakhaothi.tsx';
import PhucKhao from './home/homemain/thutuchanhchinh/motcuakhaothi/phuckhao/phuckhao.tsx';
import LichThi from './home/homemain/thutuchanhchinh/motcuakhaothi/lichthi/lichthi.tsx';
import MyTabsHome from './home/untils/footer/screens/home.tsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeMain" component={HomeMain} />
        <Stack.Screen name="ThuTucHanhChinh" component={ThuTucHanhChinh} />
        <Stack.Screen name="MotCuaKhaoThi" component={MotCuaKhaoThi} />
        <Stack.Screen name="PhucKhao" component={PhucKhao} />
        <Stack.Screen name="LichThi" component={LichThi} />
        <Stack.Screen name="MyTabsHome" component={MyTabsHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
