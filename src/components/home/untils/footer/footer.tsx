import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeBottom from './screens/home';
import TheoDoiDeNghi from './screens/theodoidenghi';
import ThongTinSinhVien from './screens/thongtinsinhvien';
import {Image} from 'react-native';
const Tab = createBottomTabNavigator();
function MyTabsHome() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      <Tab.Screen
        name="TheoDoiDeNghi"
        component={TheoDoiDeNghi}
        options={{
          tabBarIcon: () => (
            <Image
              style={{width: 30, height: 30}}
              source={require('../../../../images/notification.png')}
              resizeMode={'stretch'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HomeBottom"
        component={HomeBottom}
        options={{
          tabBarIcon: () => (
            <Image
              style={{height: 30, width: 30}}
              source={require('../../../../images/home.png')}
              resizeMode="stretch"
            />
          ),
        }}
      />

      <Tab.Screen
        name="ThongTinSinhVien"
        component={ThongTinSinhVien}
        options={{
          tabBarIcon: () => (
            <Image
              style={{height: 30, width: 30}}
              source={require('../../../../images/person.png')}
              resizeMode="stretch"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabsHome;
