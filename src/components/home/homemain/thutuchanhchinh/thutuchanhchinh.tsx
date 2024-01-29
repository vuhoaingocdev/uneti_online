import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import Header from '../../untils/header/header';

const screenWidth = Dimensions.get('window').width;
function ThuTucHanhChinh({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="THỦ TỤC HÀNH CHÍNH" />

      <View style={styles.viewBody}>
        <ScrollView style={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert('Thông báo', 'Hướng dẫn chưa hoàn thành!');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#b0c4de'}]}>
              <Image
                source={require('../../../../images/huongDan.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>HƯỚNG DẪN</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Biểu mẫu tham khảo; Quy trình, thủ tục)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MotCuaKhaoThi')}>
            <View style={[styles.viewImage, {backgroundColor: '#ffa500'}]}>
              <Image
                source={require('../../../../images/motCuaKhaoThi.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>MỘT CỬA - KHẢO THÍ</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Tiếp nhận: Miễn học thi Tiếng Anh; Phúc khảo; Lịch thi; Đăng kí
                thi lại; Hoãn thi; Hủy đăng kí thi lại; Kết quả học tập)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert('Thông báo', 'Một cửa đào tạo chưa hoàn thành!');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#000080'}]}>
              <Image
                source={require('../../../../images/motCuaDaoTao.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>MỘT CỬA - ĐÀO TẠO</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Tiếp nhận: Bảng Điểm; Xác nhận; Đăng ký tốt nghiệp (xét, thi,
                hoãn); Cấp bản sao; Sửa thông tin (văn bằng, chứng chỉ); Miễn
                chứng chỉ; Chuyển điểm)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert(
                'Thông báo',
                'Một cửa công tác sinh viên chưa hoàn thành!',
              );
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#32cd32'}]}>
              <Image
                source={require('../../../../images/motCuaCongTacSinhVien.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>MỘT CỬA - CT&CTSV</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Tiếp nhận: Xác nhận; Quá trình học tập; Nghỉ học tạm thời; Xin
                chuyển)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.viewThuTuc, {marginBottom: 70}]}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert('Thông báo', 'Một cửa hành chính chưa hoàn thành!');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#48d1cc'}]}>
              <Image
                source={require('../../../../images/motCuaHanhChinh.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>MỘT CỬA - HÀNH CHÍNH</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Tiếp nhận: Giấy giới thiệu)
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default ThuTucHanhChinh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#245d7c',
  },
  ContainerHeader: {
    height: '16%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    width: '100%',
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
    overflow: 'hidden',
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
    marginLeft: 10,
    borderRadius: 10,
  },
});
