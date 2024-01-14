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
        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>MIỄN HỌC, THI TIẾNG ANH</Text>
            <Text style={[styles.styleText, {marginTop: 5, color: 'red'}]}>
              (Xin miễn học, miễn thi học phần đã
            </Text>
            <Text style={[styles.styleText, {color: 'red'}]}>
              đăng ký trong cùng học kỳ)
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewThuTuc}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('PhucKhao')}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>PHÚC KHẢO</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Phúc khảo bài thi lần 1; Phúc khảo bài
            </Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>thi lại)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewThuTuc}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('LichThi')}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>LỊCH THI</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Xem lịch thi; Trùng lịch thi; Không có
            </Text>
            <Text style={styles.styleText}>lịch thi...)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>ĐĂNG KÝ THI LẠI</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Trùng lỗi lịch; lỗi website
            </Text>
            <Text style={styles.styleText}>
              sinhvien.uneti.edu.vn; Khác hệ; Loại hình
            </Text>
            <Text style={styles.styleText}>
              đào tạo; Thi không theo kế hoạch; Lý do
            </Text>
            <Text style={styles.styleText}>khác)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>HOÃN THI</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Đi viện theo yêu cầu bác sĩ; Thực
            </Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              hiện nhiệm vụ nhà trường giao; Lý do
            </Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>khác)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>HỦY ĐĂNG KÝ THI LẠI</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Đạt điểm học phần sau khi phúc khảo;
            </Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              Điều chỉnh điểm thường kỳ (quá trình);
            </Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              Hủy đăng kí thi lại để học lại; Lý do
            </Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>khác)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewThuTuc} activeOpacity={0.8}>
          <View style={styles.viewImage}></View>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>KẾT QUẢ HỌC TẬP</Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              (Xem kết quả học tập; Điều chỉnh, bổ
            </Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              sung điểm thường kỳ; Điều chỉnh, bổ
            </Text>
            <Text style={[styles.styleText, {marginTop: 5}]}>
              sung điểm thi)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default MotCuaKhaoThi;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#528B8B',
    width: '100%',
    height: '100%',
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#E8E8E8',
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
