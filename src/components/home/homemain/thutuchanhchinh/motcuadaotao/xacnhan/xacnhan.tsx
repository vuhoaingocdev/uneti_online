import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';

import Header1 from '../../../../untils/header/header1';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {token} from '../../../../../login/login';
import {maSinhVien} from '../../../../../login/login';
import {TextInput} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import ModalThongBao from '../../../../untils/modalThongBao/modalThongBao';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import moment from 'moment';
import {
  getThongTinhSinhVien,
  ThongTinSinhVien,
} from '../../../../../../api/GetThongTinSinhVien';

const XacNhan = ({navigation}: any) => {
  const [isChecked, setChecked] = useState(-1);

  const [checkboxColor, setCheckboxColor] = useState('#245d7c');
  const [checkboxUncheckedColor, setCheckboxUncheckedColor] = useState('gray');

  const [isFocusNoiNhan, setIsFocusNoiNhan] = useState(false);
  const [noiNhan, setNoiNhan] = useState('');
  const [valueNoiNhan, setValueNoiNhan] = useState('');

  const dataNoiNhan = [
    {labelNoiNhan: '1 - Minh Khai', valueNoiNhan: '0'},
    {labelNoiNhan: '2 - Lĩnh Nam', valueNoiNhan: '1'},
    {labelNoiNhan: '3 - Nam Định', valueNoiNhan: '2'},
  ];

  const [liDo, setLiDo] = useState('');
  const [giayTo, setGiayTo] = useState('');
  const [hinhanh, sethinhanh] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const handleModalPress = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalPress1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleModalPress2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const handleModalPress3 = () => {
    setShowModal3(true);
  };

  const handleCloseModal3 = () => {
    setShowModal3(false);
  };

  const handleModalPress4 = () => {
    setShowModal4(true);
  };

  const handleCloseModal4 = () => {
    setShowModal4(false);
  };

  const [base64image, setbase64image] = useState('');
  const [filename, setfilename] = useState('');
  //Xử lí ảnh
  const Imagepicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 675,
      maxHeight: 1200,
    };

    launchImageLibrary(options, response => {
      try {
        const data = {
          url: response.assets[0].uri,
          base64:
            'data:' +
            response.assets[0].type +
            ';base64,' +
            response.assets[0].base64,
          FileName: response.assets[0].fileName,
        };
        sethinhanh([...hinhanh, data]);
      } catch {}
    });
  };
  const removeImage = indexToRemove => {
    sethinhanh(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };
  const mangYeuCau = [
    'Đang chờ xét tốt nghiệp',
    'Thời khóa biểu theo kỳ học',
    'Nợ môn (chưa tốt nghiệp)',
  ];

  var apiTiepNhan =
    'https://apiv2.uneti.edu.vn/api/SP_MC_DT_XacNhan_TiepNhan/Add_Para';

  const PostYeuCau = async () => {
    var data = {
      MC_DT_XacNhan_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : 'null',
      MC_DT_XacNhan_IDSinhVien: ThongTinSinhVien.IdSinhVien.toString()
        ? ThongTinSinhVien.IdSinhVien.toString()
        : 'null',
      MC_DT_XacNhan_MaSinhVien: maSinhVien.toString()
        ? maSinhVien.toString()
        : 'null',
      MC_DT_XacNhan_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : 'null',
      MC_DT_XacNhan_Ten: ThongTinSinhVien.Ten ? ThongTinSinhVien.Ten : 'null',
      MC_DT_XacNhan_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_DT_XacNhan_NgaySinh2: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      MC_DT_XacNhan_TenHeDaoTao: ThongTinSinhVien.BacDaoTao
        ? ThongTinSinhVien.BacDaoTao
        : 'null',
      MC_DT_XacNhan_TenLoaiHinhDT: ThongTinSinhVien.LoaiHinhDaoTao
        ? ThongTinSinhVien.LoaiHinhDaoTao
        : 'null',
      MC_DT_XacNhan_TenKhoaHoc: ThongTinSinhVien.KhoaHoc.toString()
        ? ThongTinSinhVien.KhoaHoc.toString()
        : 'null',
      MC_DT_XacNhan_TenNganh: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_DT_XacNhan_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : 'null',
      MC_DT_XacNhan_KhoaChuQuanLop: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_DT_XacNhan_DienThoai: ThongTinSinhVien.SoDienThoai.toString()
        ? ThongTinSinhVien.SoDienThoai.toString()
        : 'null',
      MC_DT_XacNhan_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'null',
      MC_DT_XacNhan_YeuCau: isChecked.toString()
        ? isChecked.toString()
        : 'null',
      MC_DT_XacNhan_YeuCau_LyDo: liDo,
      MC_DT_XacNhan_YeuCau_KemTheo: giayTo.length ? giayTo : 'null',
      MC_DT_XacNhan_DangKyNoiNhanKetQua: noiNhan,
      images: hinhanh.map(e => ({
        urlTemp: e.url,
        lastModified: '',
        MC_DT_XacNhan_YeuCau_DataFile: e.base64,
        MC_DT_XacNhan_YeuCau_TenFile: e.FileName,
      })),
    };
    try {
      const response = await axios.post(apiTiepNhan, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === 'Bản ghi bị trùng.') {
        handleModalPress();
      } else {
        if (response.status == 200) {
          handleModalPress1();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const XoaDuLieu = () => {
    setChecked(-1);
    setLiDo('');
    setGiayTo('');
    setValueNoiNhan('-1');
  };

  useEffect(() => {
    getThongTinhSinhVien();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Xác nhận"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <ModalThongBao
        visible={showModal}
        onClose={handleCloseModal}
        message="Yêu cầu này đã được gửi!"
      />

      <ModalThongBao
        visible={showModal1}
        onClose={handleCloseModal1}
        message="Gửi yêu cầu thành công!"
      />

      <ModalThongBao
        visible={showModal2}
        onClose={handleCloseModal2}
        message="Vui lòng chọn yêu cầu!"
      />

      <ModalThongBao
        visible={showModal3}
        onClose={handleCloseModal3}
        message="Vui lòng đăng ký nơi nhận kết quả!"
      />

      <ModalThongBao
        visible={showModal4}
        onClose={handleCloseModal4}
        message="Vui lòng nhập lí do!"
      />

      <View style={styles.viewBody}>
        <ScrollView>
          <View style={styles.viewText}>
            <View style={styles.viewTextChild}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                I.Lưu ý
              </Text>

              <Text style={styles.styleText}>
                - Các đề nghị xác nhận không cho phép đề nghị trực tuyến: Xác
                nhận hoàn thành khóa học.
              </Text>

              <Text style={styles.styleText}>
                - Người học cần đến bộ phận Một cửa đề nghị trực tiếp, do các
                chức năng này cần người học cung cấp đầy đủ hồ sơ, giấy tờ để
                việc xác nhận được thực hiện theo đúng quy định của trường.
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                II.Nội dung đề nghị
              </Text>

              <Text style={styles.styleText}>Xác nhận: (*)</Text>

              {mangYeuCau.map(yc => (
                <View
                  style={{
                    marginLeft: 10,
                    marginTop: 3,
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <CheckBox
                    value={isChecked === mangYeuCau.indexOf(yc)}
                    onValueChange={() => {
                      setChecked(mangYeuCau.indexOf(yc));
                    }}
                    tintColors={{
                      true: checkboxColor,
                      false: checkboxUncheckedColor,
                    }}
                  />
                  <Text style={styles.styleText1}>{yc}</Text>
                </View>
              ))}

              <View style={styles.viewTenDot}>
                <Text style={styles.styleText}>
                  Đăng ký nơi nhận kết quả: (*)
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusNoiNhan && {borderColor: 'black'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={dataNoiNhan}
                  maxHeight={200}
                  labelField="labelNoiNhan"
                  valueField="valueNoiNhan"
                  placeholder={!isFocusNoiNhan ? 'Chọn nơi nhận' : '...'}
                  value={valueNoiNhan}
                  onFocus={() => setIsFocusNoiNhan(true)}
                  onBlur={() => setIsFocusNoiNhan(false)}
                  onChange={item => {
                    setValueNoiNhan(item.valueNoiNhan);
                    setNoiNhan(item.labelNoiNhan);
                    setIsFocusNoiNhan(false);
                  }}
                />
              </View>

              <Text style={styles.styleText}>Lý do: (*)</Text>
              <TextInput
                placeholderTextColor={'gray'}
                style={styles.textInput}
                placeholder="Vui lòng nhập lí do của bạn!"
                value={liDo}
                onChangeText={text => setLiDo(text)}
                multiline={true}
                numberOfLines={4}
              />

              <Text style={styles.styleText}>Giấy tờ kèm theo:</Text>
              <TextInput
                placeholderTextColor={'gray'}
                style={styles.textInput}
                placeholder="Giấy tờ kèm theo"
                value={giayTo}
                onChangeText={text => setGiayTo(text)}
                multiline={true}
                numberOfLines={4}
              />

              <View>
                <Text style={[styles.styleText, {marginTop: 10}]}>
                  Giấy tờ:(*)
                </Text>
                <ScrollView horizontal={true}>
                  {hinhanh.length === 5 ? null : (
                    <TouchableOpacity onPress={Imagepicker}>
                      <View
                        style={{
                          width: 150,
                          height: 80,
                          marginTop: 8,
                          borderWidth: 1.5,
                          borderStyle: 'dashed',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: 'gray',
                        }}>
                        <Image
                          resizeMode="stretch"
                          style={{width: 35, height: 35, tintColor: '#a9a9a9'}}
                          source={require('../../../../../../images/add_image.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  )}

                  {hinhanh.length === 0
                    ? null
                    : hinhanh.map((e, index) => (
                        <View
                          style={{
                            marginTop: 7,
                            width: 100,
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 20,
                          }}>
                          <ImageBackground
                            resizeMode="stretch"
                            style={{width: 100, height: 80}}
                            source={{uri: e.url}}>
                            <TouchableOpacity
                              onPress={() => {
                                removeImage(index);
                              }}>
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  marginLeft: 78,
                                  marginTop: 3,
                                }}>
                                <Image
                                  resizeMode="stretch"
                                  style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: '#ffffff',
                                  }}
                                  source={require('../../../../../../images/close.png')}
                                />
                              </View>
                            </TouchableOpacity>
                          </ImageBackground>
                        </View>
                      ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.viewFooter}>
        <View style={[styles.buttonHuy, {marginLeft: 30}]}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              XoaDuLieu();
            }}>
            <Text style={{color: 'black', fontSize: 19}}>Hủy</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.buttonHuy,
            {marginRight: 30, backgroundColor: '#245d7c'},
          ]}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              if (isChecked === -1) {
                handleModalPress2();
              } else if (noiNhan === '') {
                handleModalPress3();
              } else if (liDo === '') {
                handleModalPress4();
              } else {
                PostYeuCau();
              }
            }}>
            <Text style={{color: '#ffffff', fontSize: 19}}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: '8%',
          backgroundColor: '#f7f9ff',
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
              source={require('../../../../../../images/notification.png')}
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
              source={require('../../../../../../images/home.png')}
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
              source={require('../../../../../../images/person.png')}
              style={{width: 33, height: 33}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default XacNhan;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  viewBody: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  styleText: {
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    lineHeight: 36,
    textAlign: 'justify',
  },

  styleText1: {
    color: 'black',
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
  },

  viewText: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewTextChild: {
    width: '95%',
    height: '100%',
    marginTop: 15,
    marginBottom: 5,
  },

  viewTenDot: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },

  dropdown: {
    flex: 1,
    marginLeft: 50,
    marginTop: 10,
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  placeholderStyle: {
    fontSize: 18,
    color: 'gray',
  },

  selectedTextStyle: {
    fontSize: 18,
    color: 'black',
  },

  textInput: {
    height: 70,
    width: '100%',
    fontSize: 18,
    marginTop: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 7,
    borderRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    color: 'black',
    backgroundColor: '#f8f8ff',
  },

  viewFooter: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f7f9ff',
  },

  buttonHuy: {
    width: '35%',
    height: 40,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },

  touchableOpacity: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
});
