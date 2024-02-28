import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../untils/header/header';
import ModalThongBao from '../untils/modalThongBao/modalThongBao';
// import MyTabsHome from '../untils/footer/footer';
const Tab = createBottomTabNavigator();

const getHeight = Dimensions.get('window').height;
const getWidth = Dimensions.get('window').width;

function HomeMain({navigation}: any) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleHeaderPress = () => {
    setShowOverlay(!showOverlay);
  };

  const handleModalPress = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="UNETI ONLINE" onPress={handleHeaderPress} />

      <ModalThongBao
        visible={showModal}
        onClose={handleCloseModal}
        message="Chưa hoàn thành!"
      />

      {showOverlay && (
        <Modal transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={handleHeaderPress}>
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <View style={[styles.viewDrawer]}>
                <View style={{marginTop: 90}}>
                  <TouchableOpacity onPress={handleHeaderPress}>
                    <Image
                      source={require('../../../images/menu.png')}
                      style={styles.iconMenu}
                    />
                  </TouchableOpacity>

                  <View style={[styles.drawerText, {marginTop: 20}]}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Thongtinsinhvien');
                      }}>
                      <View style={styles.viewTouchableOpacity}>
                        <Image
                          source={require('../../../images/bell.png')}
                          style={styles.iconDrawer}
                          tintColor={'#ffffff'}
                        />
                        <Text style={styles.textTouchableOpacity}>
                          Trang cá nhân
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.drawerText}>
                    <TouchableOpacity>
                      <View style={styles.viewTouchableOpacity}>
                        <Image
                          source={require('../../../images/youtube.png')}
                          style={styles.iconDrawer}
                          tintColor={'#ffffff'}
                        />
                        <Text style={styles.textTouchableOpacity}>
                          Hướng dẫn sử dụng
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.drawerText}>
                    <TouchableOpacity>
                      <View style={styles.viewTouchableOpacity}>
                        <Image
                          source={require('../../../images/logout.png')}
                          style={styles.iconDrawer}
                          tintColor={'#ffffff'}
                        />
                        <Text style={styles.textTouchableOpacity}>
                          Đăng xuất
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <View style={styles.viewBody}>
        <TouchableOpacity
          style={styles.viewThuTuc}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ThuTucHanhChinh');
          }}>
          <View style={[styles.viewImage, {backgroundColor: '#2e6b8b'}]}>
            <Image
              source={require('../../../images/hanhchinhsinhvien.png')}
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
          onPress={() => handleModalPress()}>
          <View style={[styles.viewImage, {backgroundColor: '#134267'}]}>
            <Image
              source={require('../../../images/Lichhoc_lichthi_Congno.png')}
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
            handleModalPress();
          }}>
          <View style={[styles.viewImage, {backgroundColor: '#eea889'}]}>
            <Image
              source={require('../../../images/KetQuaHocTap.png')}
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

      <View
        style={{
          height: '8%',
          backgroundColor: '#ffffff',
          width: '100%',
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: '100%',
            backgroundColor: 'white',
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
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
              source={require('../../../images/notification.png')}
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
              source={require('../../../images/home.png')}
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
              source={require('../../../images/person.png')}
              style={{width: 33, height: 33}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// function BottomTabs() {
//   return <MyTabsHome />;
// }
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    marginTop: -45,
  },
  viewThuTuc: {
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: '16%',
    width: '85%',
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

  viewDrawer: {
    width: (2 * getWidth) / 3,
    height: getHeight,
    backgroundColor: '#245d7c',
  },

  drawerText: {
    marginLeft: 40,
    marginTop: 20,
  },

  iconMenu: {
    height: 30,
    width: 25,
    tintColor: '#fff',
    marginLeft: 15,
  },

  viewTouchableOpacity: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
  },

  iconDrawer: {
    width: 28,
    height: 28,
  },

  textTouchableOpacity: {
    color: '#ffffff',
    fontSize: 23,
    marginLeft: 15,
    fontWeight: 'bold',
  },
});
