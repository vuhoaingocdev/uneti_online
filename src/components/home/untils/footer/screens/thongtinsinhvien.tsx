import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import {
  getThongTinhSinhVien,
  ThongTinSinhVien,
} from '../../../../../api/GetThongTinSinhVien';

import {maSinhVien} from '../../../../login/login';
import Header1 from '../../header/header1';

function ThongTinSinhVien1({navigation}: any) {
  useEffect(() => {
    getThongTinhSinhVien();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Thông tin sinh viên"
        onPress={() => {
          navigation.navigate('HomeMain');
        }}
      />

      <ScrollView>
        <View style={styles.viewBody}>
          <View style={styles.viewBodyChild}>
            <View style={styles.viewThongTinCoBan}>
              <View style={styles.viewImage}>
                <Image
                  source={{uri:`${ThongTinSinhVien.Hinhanh}`}}
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'gray',
                  }}
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.viewTextImage}>
                <View style={styles.viewContainerText}>
                  <Text style={{color: 'black', fontSize: 17, marginLeft: 5}}>
                    Họ và tên:{' '}
                  </Text>
                  <Text style={styles.styleTextBold}>
                    {ThongTinSinhVien.Hodem} {ThongTinSinhVien.Ten}
                  </Text>
                </View>

                <View style={styles.viewContainerText}>
                  <Text style={{color: 'black', fontSize: 17, marginLeft: 5}}>
                    Giới tính:
                  </Text>
                  <Text style={styles.styleTextBold}> Nam</Text>
                </View>

                <View style={styles.viewContainerText}>
                  <Text style={{color: 'black', fontSize: 17, marginLeft: 5}}>
                    Mã sinh viên:
                  </Text>
                  <Text style={styles.styleTextBold}> {maSinhVien}</Text>
                </View>

                <View style={styles.viewContainerText}>
                  <Text style={{color: 'black', fontSize: 17, marginLeft: 5}}>
                    Lớp:{' '}
                  </Text>
                  <Text style={styles.styleTextBold}>
                    {ThongTinSinhVien.LopHoc}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.viewUnderThongTinCoBan}>
              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Cơ sở: </Text>
                <Text style={styles.styleTextBold}>
                  {ThongTinSinhVien.CoSo}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Bậc đào tạo:{' '}
                </Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.BacDaoTao}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Loại hình đào tạo:{' '}
                </Text>
                <Text style={styles.styleTextBold}>
                  {ThongTinSinhVien.LoaiHinhDaoTao}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Khoa: </Text>
                <Text style={styles.styleTextBold}>
                  {ThongTinSinhVien.Khoa}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Chuyên ngành:
                </Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.ChuyenNganh}
                </Text>
              </View>

              <View style={[styles.viewContainerText, {marginTop: 15}]}>
                <Text style={{color: 'black', fontSize: 17}}>Trạng thái:</Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.TrangThaiHocTap}
                </Text>
                <View style={styles.viewKhoaHoc}>
                  <Text style={{color: 'black', fontSize: 17}}>Khóa học:</Text>
                  <Text style={styles.styleTextBold}>
                    {' '}
                    {ThongTinSinhVien.KhoaHoc}
                  </Text>
                </View>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Ngày vào trường:
                </Text>
                <Text style={styles.styleTextBold}> 10/10/2020</Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>SĐT:</Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.SoDienThoai}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Email: </Text>
                <Text style={styles.styleTextBold}>
                  {ThongTinSinhVien.Email_TruongCap}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Số CMT/CCCD:</Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.SoCMND}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Ngày cấp:</Text>
                <Text style={styles.styleTextBold}></Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Nơi cấp:</Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.NoiCapCMND}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Địa chỉ hiện tại:
                </Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.DiaChiThuongTru}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Nơi sinh: </Text>
                <Text style={styles.styleTextBold}>
                  {ThongTinSinhVien.NoiSinh}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Hộ khẩu thường trú:
                </Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.DiaChiThuongTru}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Tên chi nhánh:
                </Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.ChiNhanhNganHang}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Tên chủ tại khoản:
                </Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.TenTaiKhoan}
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Số tài khoản:
                </Text>
                <Text style={styles.styleTextBold}>
                  {' '}
                  {ThongTinSinhVien.SoTaiKhoan}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          height: '8%',
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

export default ThongTinSinhVien1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  ContainerHeader: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 35,
    tintColor: '#fff',
  },
  textTieuDe: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 60,
  },

  viewBody: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBodyChild: {
    width: '95%',
    height: '100%',
    marginTop: 50,
  },

  viewThongTinCoBan: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
  },
  viewImage: {
    width: 120,
    height: '100%',
  },
  viewTextImage: {
    flex: 1,
    marginLeft: 5,
  },

  viewContainerText: {
    flexDirection: 'row',
    marginBottom: 14,
  },

  viewUnderThongTinCoBan: {
    flex: 1,
    marginTop: 20,
  },

  viewKhoaHoc: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },

  styleTextBold: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
