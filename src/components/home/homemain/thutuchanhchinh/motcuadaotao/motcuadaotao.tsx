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

function MotCuaDaoTao({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Một cửa - Đào tạo"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.viewBody}>
        <ScrollView style={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('BangDiem');
            }}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/daotao_bangdiem.png')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>BẢNG ĐIỂM</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Cấp bảng điểm tạm thời hệ 4, hệ 10;
              </Text>
              <Text style={[styles.styleText, {color: 'red'}]}>
                Cấp bảng điểm tốt nghiệp hệ 4, hệ 10)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('XacNhan');
            }}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/daotao_xacnhan.png')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>XÁC NHẬN</Text>
              <Text style={[styles.styleText, {marginTop: 5}]}>
                (Xác nhận đang chờ xét tốt nghiệp; Xác nhận nợ môn (chưa tốt
                nghiệp);
              </Text>
              <Text style={[styles.styleText, {color: 'red'}]}>
                Xác nhận hoàn thành khóa học;
              </Text>
              <Text style={styles.styleText}>
                Xác nhận thời khóa biểu theo học kỳ)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('DangKyTotNghiep');
            }}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/daotao_dktotnghiep.png')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>

            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>ĐĂNG KÝ TỐT NGHIỆP</Text>
              <Text style={[styles.styleText, {color: 'red'}]}>
                (Xét tốt nghiệp; Thi tốt nghiệp;
              </Text>
              <Text style={styles.styleText}>Hoãn xét tốt nghiệp)</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('TaiKhoanLMS');
            }}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/daotao_taikhoanemaillms.png')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>

            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>TÀI KHOẢN EMAIL / LMS</Text>
              <Text style={styles.styleText}>
                (Tài khoản Email UNETI; Tài khoản LMS)
              </Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewThuTuc, {marginBottom: 70}]}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('LopChatLuong');
            }}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../../images/daotao_lopchatluong.png')}
                style={styles.styleImage}
                resizeMode="stretch"
              />
            </View>

            <View style={styles.viewText}>
              <Text style={styles.styleTieuDe}>LỚP CHẤT LƯỢNG</Text>
              <Text style={styles.styleText}>(Học lớp chất lượng)</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View
        style={{
          height: '8%',
          backgroundColor: '#ffffff',
          width: '100%',
        }}>
        <View
          style={{
            height: '100%',
            borderBlockColor: 'gray',
            backgroundColor: 'white',
            width: '100%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
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
      </View>
    </SafeAreaView>
  );
}

export default MotCuaDaoTao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 110,
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
    width: 68,
    height: 68,
    marginLeft: 10,
    borderRadius: 10,
  },
});
