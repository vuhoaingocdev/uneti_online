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

function ThongTinSinhVien({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ContainerHeader}>
        <View style={styles.viewHeader}>
          <TouchableOpacity
            onPress={() => {
              //   navigation.navigate('Home');
            }}>
            <Image
              source={require('../../../../../images/back.png')}
              style={styles.iconMenu}
            />
          </TouchableOpacity>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={styles.textTieuDe}>Thông tin sinh viên</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.viewBody}>
          <View style={styles.viewBodyChild}>
            <View style={styles.viewThongTinCoBan}>
              <View style={styles.viewImage}>
                <Image
                  source={require('../../../../../images/avatar.jpg')}
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
                  <Text style={{color: 'black', fontSize: 17}}>Họ và tên:</Text>
                  <Text style={styles.styleTextBold}> Vũ Hoài Ngọc</Text>
                </View>

                <View style={styles.viewContainerText}>
                  <Text style={{color: 'black', fontSize: 17}}>Giới tính:</Text>
                  <Text style={styles.styleTextBold}> Nam</Text>
                </View>

                <View style={styles.viewContainerText}>
                  <Text style={{color: 'black', fontSize: 17}}>
                    Mã sinh viên:
                  </Text>
                  <Text style={styles.styleTextBold}> 20103100584</Text>
                </View>

                <View style={styles.viewContainerText}>
                  <Text style={{color: 'black', fontSize: 17}}>Lớp: </Text>
                  <Text style={styles.styleTextBold}> DHTI14A10HN</Text>
                </View>
              </View>
            </View>
            <View style={styles.viewUnderThongTinCoBan}>
              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Cơ sở:</Text>
                <Text style={styles.styleTextBold}> Hà nội</Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Bậc đào tạo:</Text>
                <Text style={styles.styleTextBold}> Đại học</Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Loại hình đào tạo:
                </Text>
                <Text style={styles.styleTextBold}> Chính quy đợt 1</Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Khoa:</Text>
                <Text style={styles.styleTextBold}>
                  Khoa Công nghệ thông tin HN
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Chuyên ngành:
                </Text>
                <Text style={styles.styleTextBold}> Công nghệ thông tin</Text>
              </View>

              <View style={[styles.viewContainerText, {marginTop: 15}]}>
                <Text style={{color: 'black', fontSize: 17}}>Trạng thái:</Text>
                <Text style={styles.styleTextBold}> Đang học</Text>
                <View style={styles.viewKhoaHoc}>
                  <Text style={{color: 'black', fontSize: 17}}>Khóa học:</Text>
                  <Text style={styles.styleTextBold}> 2020</Text>
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
                <Text style={styles.styleTextBold}> 0965457291</Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Email:</Text>
                <Text style={styles.styleTextBold}>
                  vhngoc.dhti14a10hn@sv.uneti.edu.vn
                </Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Số CMT/CCCD:</Text>
                <Text style={styles.styleTextBold}> 030202005652</Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Ngày cấp:</Text>
                <Text style={styles.styleTextBold}> 05/06/2021</Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Nơi cấp:</Text>
                <Text style={styles.styleTextBold}></Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Địa chỉ hiện tại:
                </Text>
                <Text style={styles.styleTextBold}></Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>Nơi sinh:</Text>
                <Text style={styles.styleTextBold}></Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Hộ khẩu thường trú:
                </Text>
                <Text style={styles.styleTextBold}></Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Tên chi nhánh:
                </Text>
                <Text style={styles.styleTextBold}></Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Tên chủ tại khoản:
                </Text>
                <Text style={styles.styleTextBold}> VU HOAI NGOC</Text>
              </View>

              <View style={styles.viewContainerText}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Số tài khoản:
                </Text>
                <Text style={styles.styleTextBold}> 2309205333031</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ThongTinSinhVien;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#245d7c',
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
    backgroundColor: '#E8E8E8',
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
