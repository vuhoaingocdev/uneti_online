import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../untils/header/header';
import MyTabsHome from '../untils/footer/footer';
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
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>THỦ TỤC HÀNH CHÍNH</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Tiếp nhận các đề nghị: Lịch học; Lịch
            </Text>
            <Text style={styles.styleText}>
              thi; Kết quả học tập; Đăng ký học tập
            </Text>
            <Text style={styles.styleText}>
              Đăng ký cấp/xác nhận giấy tờ...)
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>TRA CỨU</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Tra cứu thông tin: Lịch học; Điểm danh;
            </Text>
            <Text style={styles.styleText}>Rèn luyện; Lịch thi; Công nợ)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>HỌC TẬP</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Kết quả học tập, Chương trình đào tạo;
            </Text>
            <Text style={styles.styleText}>Ôn luyện, Dự kiến KQHT)</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function BottomTabs() {
  return <MyTabsHome />;
}
export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#245d7c',
    width: '100%',
    height: '100%',
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  viewThuTuc: {
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: '16%',
    width: '90%',
    marginTop: 25,
    flexDirection: 'row',
  },
  viewImage: {
    width: 110,
    height: '100%',
    backgroundColor: 'red',
    borderTopRightRadius: 80,
  },
  viewText: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  styleTieuDe: {
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
  },
  styleText: {
    color: 'black',
    fontStyle: 'italic',
  },
});