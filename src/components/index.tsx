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
// import MyTabsHome from './home/untils/footer/screens/home.tsx';
import DangKiThiLai from './home/homemain/thutuchanhchinh/motcuakhaothi/dangkithilai/dangkithilai.tsx';
import HuyDangKiThiLai from './home/homemain/thutuchanhchinh/motcuakhaothi/huydangkithilai/huydangkithilai.tsx';
import Hoanthi from './home/homemain/thutuchanhchinh/motcuakhaothi/hoanthi/hoanthi.tsx';
import HomeBottom from './home/untils/footer/screens/home.tsx';
import ThongTinSinhVien1 from './home/untils/footer/screens/thongtinsinhvien.tsx';
import TheoDoiDeNghi from './home/untils/footer/screens/theodoidenghi.tsx';
import KetQuaHocTap from './home/homemain/thutuchanhchinh/motcuakhaothi/ketquahoctap/ketquahoctap.tsx';
const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="DangKiThiLai" component={DangKiThiLai} />
        {/* <Stack.Screen name="MyTabsHome" component={MyTabsHome} /> */}
        <Stack.Screen name="HuyDangKiThiLai" component={HuyDangKiThiLai} />
        <Stack.Screen name="Hoanthi" component={Hoanthi} />
        <Stack.Screen name="HomeBottom" component={HomeBottom} />
        <Stack.Screen name="Thongtinsinhvien" component={ThongTinSinhVien1} />
        <Stack.Screen name="TheoDoiDeNghi" component={TheoDoiDeNghi} />
        <Stack.Screen name="KetQuaHocTap" component={KetQuaHocTap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
