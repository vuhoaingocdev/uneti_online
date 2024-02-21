import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../../header/header.tsx';
const Tab = createBottomTabNavigator();

function HomeBottom({navigation}: any) {
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
              source={require('../../../../../images/hanhchinhsinhvien.png')}
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

        <TouchableOpacity
          style={styles.viewThuTuc}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert('Thông báo', 'Mục tra cứu chưa hoàn thành!');
          }}>
          <View style={[styles.viewImage, {backgroundColor: '#191970'}]}>
            <Image
              source={require('../../../../../images/Lichhoc_lichthi_Congno.png')}
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

        <TouchableOpacity
          style={styles.viewThuTuc}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert('Thông báo', 'Mục học tập chưa hoàn thành!');
          }}>
          <View style={[styles.viewImage, {backgroundColor: 'orange'}]}>
            <Image
              source={require('../../../../../images/KetQuaHocTap.png')}
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
    </SafeAreaView>
  );
}

export default HomeBottom;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
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
    borderTopRightRadius: 80,
    justifyContent: 'center',
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
    textAlign: 'center',
  },
  styleImage: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 10,
  },
});
