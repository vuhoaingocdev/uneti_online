import React, {useState} from 'react';
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
import ModalThongBao from '../../../untils/modalThongBao/modalThongBao';

function MotCuaKhaoThi({navigation}: any) {
  const [showModal, setShowModal] = useState(false);
  const handleModalPress = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Một cửa - Khảo thí"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <ModalThongBao
        visible={showModal}
        onClose={handleCloseModal}
        message="Chức năng này bị giới hạn không cho phép đề nghị trực tuyến,
         người học cần đến bộ phận Một cửa để đề nghị trực tiếp. Chức năng này
          sẽ được mở lại trực tuyến trong một số trường hợp mà người học không
           thể trực tiếp đến trường như: Dịch bệnh, thiên tai...!"
      />

      <View style={styles.viewBody}>
        <ScrollView style={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              handleModalPress();
            }}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/tienganh.png')}
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
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/phuckhao.png')}
                style={[styles.styleImage, {width: 80, height: 60}]}
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
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/LichThi_KT.png')}
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
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/dkthi.png')}
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
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/hoanthi.png')}
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
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/huydkthi.png')}
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
              navigation.navigate('KetQuaHocTap');
            }}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/tienganh.png')}
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

      <View
        style={{
          height: '8%',
          borderBlockColor: 'gray',
          backgroundColor: 'white',
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowColor: 'black',
          shadowOpacity: 0.8,
          shadowRadius: 4,
          elevation: 8,
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
            source={require('../../../../../images/notification.png')}
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
            source={require('../../../../../images/home.png')}
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
            source={require('../../../../../images/person.png')}
            style={{width: 33, height: 33}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default MotCuaKhaoThi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    overflow: 'hidden',
  },
  scrollViewContent: {
    width: '100%',
    marginLeft: 50,
  },
  viewThuTuc: {
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: 100,
    width: '88%',
    marginTop: 25,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 8,
  },
  viewImage: {
    width: 115,
    height: '100%',
    backgroundColor: '#245d7c',
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
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  styleText: {
    color: 'black',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  styleImage: {
    width: 65,
    height: 65,
    marginLeft: 10,
    borderRadius: 10,
  },
});
