import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../../untils/header/header';
const Tab = createBottomTabNavigator();

function ThuTucHanhChinh({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="THỦ TỤC HÀNH CHÍNH" />

      <View style={styles.viewBody}>
        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>HƯỚNG DẪN</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Biểu mẫu tham khảo; Quy trình, thủ
            </Text>
            <Text style={styles.styleText}>tục)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewThuTuc}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MotCuaKhaoThi')}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>MỘT CỬA - KHẢO THÍ</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Tiếp nhận: Miễn học thi Tiếng Anh;
            </Text>
            <Text style={styles.styleText}>
              Phúc khảo; Lịch thi; Đăng kí thi lại;
            </Text>
            <Text style={styles.styleText}>
              Hoãn thi; Hủy đăng kí thi lại; Kết quả
            </Text>
            <Text style={styles.styleText}>học tập)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>MỘT CỬA - ĐÀO TẠO</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Tiếp nhận: Bảng Điểm; Xác nhận; Đăng
            </Text>
            <Text style={styles.styleText}>
              ký tốt nghiệp (xét, thi, hoãn); Cấp bản
            </Text>
            <Text style={styles.styleText}>
              sao; Sửa thông tin (văn bằng, chứng
            </Text>
            <Text style={styles.styleText}>
              chỉ); Miễn chứng chỉ; Chuyển điểm)
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>MỘT CỬA - CT&CTSV</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Tiếp nhận: Xác nhận; Quá trình học
            </Text>
            <Text style={styles.styleText}>
              tập; Nghỉ học tạm thời; Xin chuyển)
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>MỘT CỬA - HÀNH CHÍNH</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Tiếp nhận: Giấy giới thiệu)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ThuTucHanhChinh;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#245d7c',
    flex: 1,
  },
  ContainerHeader: {
    height: '16%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  viewHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '90%',
    flexDirection: 'row',
  },

  iconMenu: {
    height: 40,
    width: 30,
    tintColor: '#fff',
  },
  textTieuDe: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageLogo: {
    height: 80,
    width: 70,
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
    height: 90,
    alignSelf: 'center',
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
