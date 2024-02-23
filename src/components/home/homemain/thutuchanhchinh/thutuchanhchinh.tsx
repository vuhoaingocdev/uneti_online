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
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../untils/header/header';

const getHeight = Dimensions.get('window').height;
const getWidth = Dimensions.get('window').width;

function ThuTucHanhChinh({navigation}: any) {
  const [showOverlay, setShowOverlay] = useState(false);
  const handleHeaderPress = () => {
    setShowOverlay(!showOverlay);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="THỦ TỤC HÀNH CHÍNH" onPress={handleHeaderPress} />
      {showOverlay && (
        <Modal transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={handleHeaderPress}>
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <View style={[styles.viewDrawer]}>
                <View style={{marginTop: 90}}>
                  <TouchableOpacity onPress={handleHeaderPress}>
                    <Image
                      source={require('../../../../images/menu.png')}
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
                          source={require('../../../../images/bell.png')}
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
                          source={require('../../../../images/youtube.png')}
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
                          source={require('../../../../images/logout.png')}
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
        <ScrollView style={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.viewThuTuc}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert('Thông báo', 'Hướng dẫn chưa hoàn thành!');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#696969'}]}>
              <Image
                source={require('../../../../images/huongdan.png')}
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
            <View style={[styles.viewImage, {backgroundColor: '#000080'}]}>
              <Image
                source={require('../../../../images/OBJECTS_1_.png')}
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
              navigation.navigate('MotCuaDaoTao');
            }}>
            <View style={[styles.viewImage, {backgroundColor: '#0000cd'}]}>
              <Image
                source={require('../../../../images/daotao.png')}
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
            <View style={[styles.viewImage, {backgroundColor: '#48d1cc'}]}>
              <Image
                source={require('../../../../images/ctsv.png')}
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
            <View style={[styles.viewImage, {backgroundColor: '#f08080'}]}>
              <Image
                source={require('../../../../images/chitietcongviec.png')}
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
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
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
              source={require('../../../../images/notification.png')}
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
              source={require('../../../../images/home.png')}
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
              source={require('../../../../images/person.png')}
              style={{width: 33, height: 33}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ThuTucHanhChinh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 30,
    width: 25,
    tintColor: '#fff',
    marginLeft: 15,
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
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: -45,
  },
  viewThuTuc: {
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: 90,
    alignSelf: 'center',
    width: '94%',
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

  viewDrawer: {
    width: (2 * getWidth) / 3,
    height: getHeight,
    backgroundColor: '#245d7c',
  },

  drawerText: {
    marginLeft: 40,
    marginTop: 20,
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
