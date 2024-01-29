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
} from 'react-native';

import Header1 from '../../../untils/header/header1';

function MotCuaKhaoThi({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Một cửa - Khảo thí"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.viewBody}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert(
                'Thông báo',
                'Miễn học, thi tiếng anh chưa hoàn thành!',
              );
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#483d8b'}]}>
              <Image
                source={require('../../../../../images/hoanThi.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>MIỄN HỌC, THI TIẾNG ANH</Text>
              <Text style={[styles.styleText, {marginTop: 5, color: 'red'}]}>
                (Xin miễn học, miễn thi học phần đã đăng ký trong cùng học kỳ)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PhucKhao')}>
            <View style={[styles.viewImage, {backgroundColor: '#000080'}]}>
              <Image
                source={require('../../../../../images/phucKhao.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>PHÚC KHẢO</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Phúc khảo bài thi lần 1; Phúc khảo bài thi lại)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('LichThi')}>
            <View style={[styles.viewImage, {backgroundColor: '#ffa500'}]}>
              <Image
                source={require('../../../../../images/lichThi.png')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>LỊCH THI</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Xem lịch thi; Trùng lịch thi; Không có lịch thi...)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('DangKiThiLai');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#afeeee'}]}>
              <Image
                source={require('../../../../../images/dangKyThiLai.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>ĐĂNG KÝ THI LẠI</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Trùng lỗi lịch; lỗi website sinhvien.uneti.edu.vn; Khác hệ;
                Loại hình đào tạo; Thi không theo kế hoạch; Lý do khác)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('Hoanthi');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#b0c4de'}]}>
              <Image
                source={require('../../../../../images/hoanThi.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>HOÃN THI</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Đi viện theo yêu cầu bác sĩ; Thực hiện nhiệm vụ nhà trường
                giao; Lý do khác)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('HuyDangKiThiLai');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#f0e68c'}]}>
              <Image
                source={require('../../../../../images/huyDangKyThiLai.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>HỦY ĐĂNG KÝ THI LẠI</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Đạt điểm học phần sau khi phúc khảo; Điều chỉnh điểm thường kỳ
                (quá trình); Hủy đăng kí thi lại để học lại; Lý do khác)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.viewThuTuc, {marginBottom: 70}]}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert('Thông báo', 'Kết quả học tập chưa hoàn thành!');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#006400'}]}>
              <Image
                source={require('../../../../../images/ketQuaHocTap.jpg')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>KẾT QUẢ HỌC TẬP</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Xem kết quả học tập; Điều chỉnh, bổ sung điểm thường kỳ; Điều
                chỉnh, bổ sung điểm thi)
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default MotCuaKhaoThi;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#245d7c',
    flex: 1,
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  scrollViewContent: {
    width: '100%',
    justifyContent: 'center',
  },
  viewThuTuc: {
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: 100,
    width: '90%',
    marginTop: 25,
    flexDirection: 'row',
  },
  viewImage: {
    width: 110,
    height: '100%',
    backgroundColor: 'red',
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
