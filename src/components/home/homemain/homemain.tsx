import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  DrawerLayoutAndroid,
  Button,
  Alert,
  Image,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../untils/header/header';
// import MyTabsHome from '../untils/footer/footer';
const Tab = createBottomTabNavigator();

function HomeMain({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="UNETI ONLINE" />

      <View style={styles.viewBody}>
        <TouchableOpacity
          style={styles.viewThuTuc}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ThuTucHanhChinh');
          }}>
          <View style={[styles.viewImage, {backgroundColor: '#245d7c'}]}>
            <Image
              source={require('../../../images/hanhchinhsinhvien.png')}
              style={styles.styleImage}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>THỦ TỤC HÀNH CHÍNH</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Tiếp nhận các đề nghị: Lịch học; Lịch thi; Kết quả học tập; Đăng
              ký học tập Đăng ký cấp/xác nhận giấy tờ...)
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={[styles.viewImage, {backgroundColor: '#191970'}]}>
            <Image
              source={require('../../../images/Lichhoc_lichthi_Congno.png')}
              style={styles.styleImage}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>TRA CỨU</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Tra cứu thông tin: Lịch học; Điểm danh; Rèn luyện; Lịch thi; Công
              nợ)
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={[styles.viewImage, {backgroundColor: 'orange'}]}>
            <Image
              source={require('../../../images/KetQuaHocTap.png')}
              style={styles.styleImage}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>HỌC TẬP</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Kết quả học tập, Chương trình đào tạo; Ôn luyện, Dự kiến KQHT)
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: '8%',
          backgroundColor: '#E8E8E8',
          width: '100%',
        }}>
        <View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: '100%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '30%',
              height: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('TheoDoiDeNghi');
            }}>
            <Image
              resizeMode="stretch"
              source={require('../../../images/notification.png')}
              style={{width: 33, height: 33}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '30%',
              height: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('HomeMain');
            }}>
            <Image
              resizeMode="stretch"
              source={require('../../../images/home.png')}
              style={{width: 33, height: 33}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '30%',
              height: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('Thongtinsinhvien');
            }}>
            <Image
              resizeMode="stretch"
              source={require('../../../images/person.png')}
              style={{width: 33, height: 33}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// function BottomTabs() {
//   return <MyTabsHome />;
// }
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
    alignItems: 'center',
  },
  viewThuTuc: {
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: '16%',
    width: '94%',
    marginTop: 25,
    flexDirection: 'row',
  },
  viewImage: {
    width: 110,
    height: '100%',
    borderTopRightRadius: 80,
    justifyContent: 'center',
  },

  viewText: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginRight: 25,
    marginLeft: 25,
  },
  styleTieuDe: {
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
  },
  styleText: {
    color: 'black',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  styleImage: {
    width: 60,
    height: 60,
    marginLeft: 17,
    borderRadius: 10,
  },
});
