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
import {DataTable, TextInput} from 'react-native-paper';
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

const DangKyTotNghiep = ({navigation}: any) => {
  const [lydo, setlydo] = useState(
    'Hoãn tốt nghiệp (Do: 1. Có nguyện vọng học cải thiện một số học phần để có kết quả học tập tốt hơn)',
  );
  const [giayto, setgiayto] = useState(
    '1. Đơn xin hoãn xét công nhận tốt nghiệp.',
  );

  const [tendot, setTenDot] = useState([]);
  const [valueDotThi, setValueDotThi] = useState('');
  const [isFocusDotThi, setIsFocusDotThi] = useState(false);
  const [dotThi, setDotThi] = useState('');
  const getapi = 'https://apiv2.uneti.edu.vn/api/SP_EDU/Load_TenDot';
  const fetchData = async () => {
    try {
      const response = await axios.get(getapi, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const arraytendot = response.data.body.map(td => td.TenDot);
      setTenDot(arraytendot);
    } catch (error) {
      console.error(error);
    }
  };

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

  const [hinhanh, sethinhanh] = useState([]);
  const [base64image, setbase64image] = useState('');
  const [filename, setfilename] = useState('');
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
  var apiTiepNhan =
    'https:apiv2.uneti.edu.vn/api/SP_MC_DT_TotNghiepXetThi_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var data = {
      MC_DT_TotNghiepXetThi_TenDot: dotThi ? dotThi : 'null',
      MC_DT_TotNghiepXetThi_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : 'null',
      MC_DT_TotNghiepXetThi_TenDotXet: dotThi ? dotThi : 'null',
      MC_DT_TotNghiepXetThi_IDSinhVien: ThongTinSinhVien.IdSinhVien
        ? ThongTinSinhVien.IdSinhVien.toString()
        : 'null',
      MC_DT_TotNghiepXetThi_MaSinhVien: maSinhVien ? maSinhVien : 'null',
      MC_DT_TotNghiepXetThi_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : 'null',
      MC_DT_TotNghiepXetThi_Ten: ThongTinSinhVien.Ten
        ? ThongTinSinhVien.Ten
        : 'null',
      MC_DT_TotNghiepXetThi_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_DT_TotNghiepXetThi_NgaySinh2: ThongTinSinhVien.NgaySinh
        ? moment.utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY').toISOString()
        : 'null',
      MC_DT_TotNghiepXetThi_TenKhoaHoc: ThongTinSinhVien.KhoaHoc
        ? ThongTinSinhVien.KhoaHoc
        : 'null',
      MC_DT_TotNghiepXetThi_TenNganh: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_DT_TotNghiepXetThi_TenHeDaoTao: ThongTinSinhVien.BacDaoTao
        ? ThongTinSinhVien.BacDaoTao
        : 'null',
      MC_DT_TotNghiepXetThi_KhoaChuQuanLop: ThongTinSinhVien.Khoa
        ? ThongTinSinhVien.Khoa
        : 'null',
      MC_DT_TotNghiepXetThi_TenLoaiHinhDT: ThongTinSinhVien.LoaiHinhDaoTao
        ? ThongTinSinhVien.LoaiHinhDaoTao
        : 'null',
      MC_DT_TotNghiepXetThi_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : 'null',
      MC_DT_TotNghiepXetThi_DienThoai: ThongTinSinhVien.SoDienThoai
        ? ThongTinSinhVien.SoDienThoai
        : 'null',
      MC_DT_TotNghiepXetThi_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'null',
      MC_DT_TotNghiepXetThi_YeuCau: '2',
      MC_DT_TotNghiepXetThi_YeuCau_LyDo: lydo ? lydo : 'null',
      MC_DT_TotNghiepXetThi_YeuCau_KemTheo: giayto ? giayto : 'null',
      images: hinhanh.map(e => ({
        urlTemp: e.url,
        lastModified: '',
        MC_DT_TotNghiepXetThi_YeuCau_DataFile: e.base64,
        MC_DT_TotNghiepXetThi_YeuCau_TenFile: e.FileName,
      })),
    };
    console.log('220', data);
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

  const ClearText = () => {
    setlydo('');
    setgiayto('');
    setfilename('');
    setbase64image('');
    setValueDotThi('');
  };
  useEffect(() => {
    getThongTinhSinhVien();
    fetchData();
  }, [valueDotThi]);
  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Đăng ký tốt nghiệp"
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
        message="Vui lòng chọn tên đợt!"
      />

      <ModalThongBao
        visible={showModal3}
        onClose={handleCloseModal3}
        message="Vui lòng nhập lí do!"
      />

      <ModalThongBao
        visible={showModal4}
        onClose={handleCloseModal4}
        message="Vui lòng nhập tên loại giấy tờ!"
      />

      <View style={styles.viewBody}>
        <ScrollView>
          <View style={styles.viewText}>
            <View style={styles.viewTextChild}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                I.Lưu ý
              </Text>
              <Text style={styles.styleText}>
                - Các đề nghị cấp bảng điểm không cho phép đề nghị trực tuyến:
                Xét tốt nghiệp; Thi tốt nghiệp.
              </Text>
              <Text style={styles.styleText}>
                - Người học cần đến bộ phận Một cửa đề nghị trực tiếp, do các
                chức năng này cần người học cung cấp đầy đủ hồ sơ, giấy tờ để
                việc đăng ký tốt nghiệp được thực hiện theo đúng quy định của
                trường.
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                II.Nội dung đề nghị
              </Text>

              <View style={styles.viewTenDot}>
                <Text style={[styles.styleText,{marginTop: 10}]}>Tên đợt: (*)</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusDotThi && {borderColor: 'blue'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={tendot.map((item, index) => ({
                    labelDotThi: item,
                    valueDotThi: index.toString(),
                  }))}
                  maxHeight={300}
                  labelField="labelDotThi"
                  valueField="valueDotThi"
                  placeholder={!isFocusDotThi ? 'Chọn đợt thi' : '...'}
                  value={valueDotThi}
                  onFocus={() => setIsFocusDotThi(true)}
                  onBlur={() => setIsFocusDotThi(false)}
                  onChange={item => {
                    setValueDotThi(item.valueDotThi);
                    setDotThi(item.labelDotThi);
                    setIsFocusDotThi(false);
                  }}
                />
              </View>

              <Text style={styles.styleText}>Cấp lại: (*)</Text>
              <Text style={styles.styleText}>Hoãn xét tốt nghiệp</Text>
              <Text style={styles.styleText}>Lý do:(*)</Text>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  height: 80,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  underlineColor="transparent"
                  multiline={true}
                  style={{
                    width: '95%',
                    backgroundColor: '#ffffff',
                    fontSize: 18,
                  }}
                  onChangeText={text => setlydo(text)}
                  value={lydo}
                />
              </View>
              <Text style={styles.styleText}>Giấy tờ:(*)</Text>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  height: 80,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  underlineColor="transparent"
                  multiline={true}
                  style={{
                    width: '95%',
                    backgroundColor: '#ffffff',
                    fontSize: 18,
                  }}
                  onChangeText={text => setgiayto(text)}
                  value={giayto}
                />
              </View>
              <Text style={styles.styleText}>Giấy tờ:</Text>
              <ScrollView horizontal={true}>
                {hinhanh.length === 5 ? null : (
                  <TouchableOpacity onPress={Imagepicker}>
                    <View
                      style={{
                        width: 220,
                        height: 130,
                        borderWidth: 1.5,
                        borderStyle: 'dashed',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                        borderColor: 'gray',
                      }}>
                      <Image
                        resizeMode="stretch"
                        style={{width: 50, height: 50, tintColor: '#a9a9a9'}}
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
                          width: 220,
                          height: 130,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 20,
                        }}>
                        <ImageBackground
                          resizeMode="stretch"
                          style={{width: 220, height: 130}}
                          source={{uri: e.url}}>
                          <TouchableOpacity
                            onPress={() => {
                              removeImage(index);
                            }}>
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                marginLeft: 10,
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
        </ScrollView>

       
      </View>
      <View style={styles.viewFooter}>
          <View style={styles.buttonHuy}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                ClearText();
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Hủy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonLuu}>
            <TouchableOpacity
              onPress={() => {
                if (valueDotThi === '') {
                  handleModalPress2();
                } else if (lydo === '') {
                  handleModalPress3();
                } else if (giayto === '') {
                  handleModalPress4();
                } else {
                  PostYeuCau();
                }
              }}
              style={styles.touchableOpacity}>
              <Text style={{color: '#ffffff', fontSize: 19}}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: '8%',
            backgroundColor: '#f8f8ff',
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

export default DangKyTotNghiep;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  ContainerHeader: {
    height: '13%',
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
    flex: 1,
    backgroundColor: '#ffffff',
  },
  styleText: {
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    lineHeight: 36,
    textAlign: 'justify',
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
  },

  viewTenDot: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },

  viewFooter: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8ff',
  },

  buttonHuy: {
    width: '35%',
    height: 40,
    marginLeft: 30,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },

  buttonLuu: {
    width: '35%',
    height: 40,
    marginRight: 30,
    borderRadius: 40,
    backgroundColor: '#245d7c',
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

  dropdown: {
    flex: 1,
    marginLeft: 16,
    marginTop: 10,
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdown1: {
    flex: 1,
    marginLeft: 18,
    marginTop: 10,
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },

  container1: {
    marginTop: 20,
  },
});
