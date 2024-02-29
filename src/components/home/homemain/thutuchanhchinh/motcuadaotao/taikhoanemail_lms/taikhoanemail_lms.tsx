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
  KeyboardAvoidingView,
} from 'react-native';
import Header1 from '../../../../untils/header/header1';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {token} from '../../../../../login/login';
import {maSinhVien} from '../../../../../login/login';
import {DataTable, TextInput} from 'react-native-paper';
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

const TaiKhoanLMS = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const handleModalPress = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showModal1, setShowModal1] = useState(false);
  const handleModalPress1 = () => {
    setShowModal1(true);
  };
  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const [showModal2, setShowModal2] = useState(false);
  const handleModalPress2 = () => {
    setShowModal2(true);
  };
  const handleCloseModal2 = () => {
    setShowModal2(false);
  };
  const [showModal3, setShowModal3] = useState(false);
  const handleModalPress3 = () => {
    setShowModal3(true);
  };
  const handleCloseModal3 = () => {
    setShowModal3(false);
  };
  const [showModal4, setShowModal4] = useState(false);
  const handleModalPress4 = () => {
    setShowModal4(true);
  };
  const handleCloseModal4 = () => {
    setShowModal4(false);
  };
  const [showModal5, setShowModal5] = useState(false);
  const handleModalPress5 = () => {
    setShowModal5(true);
  };
  const handleCloseModal5 = () => {
    setShowModal5(false);
  };
  const [showModal6, setShowModal6] = useState(false);
  const handleModalPress6 = () => {
    setShowModal6(true);
  };
  const handleCloseModal6 = () => {
    setShowModal6(false);
  };
  const [showModal7, setShowModal7] = useState(false);
  const handleModalPress7 = () => {
    setShowModal7(true);
  };
  const handleCloseModal7 = () => {
    setShowModal7(false);
  };
  const [showModal8, setShowModal8] = useState(false);
  const handleModalPress8 = () => {
    setShowModal8(true);
  };
  const handleCloseModal8 = () => {
    setShowModal8(false);
  };
  const [showModal9, setShowModal9] = useState(false);
  const handleModalPress9 = () => {
    setShowModal9(true);
  };
  const handleCloseModal9 = () => {
    setShowModal9(false);
  };
  const [lydo, setlydo] = useState('');
  const [email, setemail] = useState('');

  const [loaidenghi, setdenghi] = useState('');
  const [valuedenghi, setValuedenghi] = useState('');
  const [isFocusdenghi, setIsdenghi] = useState(false);
  const dataLoaibangdiem = [
    {labelLoaiBangDiem: 'Cấp mới tài khoản Email', valueLoaiBangDiem: '0'},
    {labelLoaiBangDiem: 'Mở khóa Email (Vô hiệu hóa)', valueLoaiBangDiem: '1'},
    {
      labelLoaiBangDiem: 'Mở khóa Email (Bảo mật 2 lớp)',
      valueLoaiBangDiem: '2',
    },
    {labelLoaiBangDiem: 'Đổi tên tài khoản Email', valueLoaiBangDiem: '3'},
    {labelLoaiBangDiem: 'Reset mật khẩu', valueLoaiBangDiem: '4'},
    {
      labelLoaiBangDiem: 'Thay đổi số điện thoại xác minh 2 bước',
      valueLoaiBangDiem: '7',
    },
  ];

  const dataDenghi = [
    {labelDenghi: 'Cấp mới tài khoản LMS', valueDenghi: '5'},
    {labelDenghi: 'Reset mật khẩu', valueDenghi: '6'},
  ];

  var apiTiepNhan =
    'https:apiv2.uneti.edu.vn/api/SP_MC_DT_EMAILLMS_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var data = {
      MC_DT_EMAILLMS_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : 'string',
      MC_DT_EMAILLMS_IDSinhVien: ThongTinSinhVien.IdSinhVien.toString()
        ? ThongTinSinhVien.IdSinhVien.toString()
        : 'string',
      MC_DT_EMAILLMS_MaSinhVien: maSinhVien ? maSinhVien : 'string',
      MC_DT_EMAILLMS_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : 'string',
      MC_DT_EMAILLMS_Ten: ThongTinSinhVien.Ten
        ? ThongTinSinhVien.Ten
        : 'string',
      MC_DT_EMAILLMS_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_DT_EMAILLMS_NgaySinh2: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      MC_DT_EMAILLMS_TenHeDaoTao: ThongTinSinhVien.BacDaoTao
        ? ThongTinSinhVien.BacDaoTao
        : 'string',
      MC_DT_EMAILLMS_TenLoaiHinhDT: ThongTinSinhVien.LoaiHinhDaoTao
        ? ThongTinSinhVien.LoaiHinhDaoTao
        : 'string',
      MC_DT_EMAILLMS_TenKhoaHoc: ThongTinSinhVien.KhoaHoc
        ? ThongTinSinhVien.KhoaHoc
        : 'string',
      MC_DT_EMAILLMS_TenNganh: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'string',
      MC_DT_EMAILLMS_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : 'string',
      MC_DT_EMAILLMS_KhoaChuQuanLop: ThongTinSinhVien.Khoa
        ? ThongTinSinhVien.Khoa
        : 'string',
      MC_DT_EMAILLMS_DienThoai: ThongTinSinhVien.SoDienThoai
        ? ThongTinSinhVien.SoDienThoai
        : 'string',
      MC_DT_EMAILLMS_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'string',
      MC_DT_EMAILLMS_Loai: isChecked,
      MC_DT_EMAILLMS_YeuCau: valuedenghi,
      MC_DT_EMAILLMS_YeuCau_LyDo: lydo ? lydo : 'string',
      MC_DT_EMAILLMS_EmailCaNhan: email ? email : 'string',
      MC_DT_EMAILLMS_YeuCau_TaiKhoan: 'string',
      MC_DT_EMAILLMS_YeuCau_Pass: 'string',
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

  const [isChecked, setChecked] = useState(-1);
  const [checkboxColor, setCheckboxColor] = useState('#245d7c');
  const [checkboxUncheckedColor, setCheckboxUncheckedColor] = useState('gray');
  const mangYeuCau = ['Tài khoản Email UNETI', 'Tài khoản LMS'];
  const checkEmailType = email => {
    const personalEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const schoolEmailDomains = ['uneti.edu.vn', 'sv.uneti.edu.vn'];

    const domain = email.split('@')[1];

    if (personalEmailDomains.includes(domain)) {
      return 'personal';
    } else if (schoolEmailDomains.includes(domain)) {
      return 'school';
    } else {
      return 'unknown';
    }
  };
  const checkSDT = () => {
    const sdt = lydo.match(/(?:\b|(?<=\D))(\d{10})(?=\b|(?=\D))/g);
    return sdt;
  };
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    getThongTinhSinhVien();
  });
  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Tài khoản Email / LMS"
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
        message="Vui lòng chọn đề nghị!"
      />
      <ModalThongBao
        visible={showModal3}
        onClose={handleCloseModal3}
        message="Vui lòng chọn chi tiết đề nghị!"
      />
      <ModalThongBao
        visible={showModal4}
        onClose={handleCloseModal4}
        message="Vui lòng nhập email cá nhân!"
      />
      <ModalThongBao
        visible={showModal5}
        onClose={handleCloseModal5}
        message="Vui lòng nhập lý do!"
      />
      <ModalThongBao
        visible={showModal6}
        onClose={handleCloseModal6}
        message="Bạn đã có tài khoản trên hệ thống. Vui lòng kiểm tra lại tài khoản đã được cấp!"
      />
      <ModalThongBao
        visible={showModal7}
        onClose={handleCloseModal7}
        message="Email cá nhân không được nhập email nhà trường cấp (@uneti.edu.vn / @sv.uneti.edu.vn)!"
      />
      <ModalThongBao
        visible={showModal8}
        onClose={handleCloseModal8}
        message="Bạn phải nhập số điện thoại đúng định dạng kèm theo lý do!"
      />
      <ModalThongBao
        visible={showModal9}
        onClose={handleCloseModal9}
        message="Vui lòng nhập email cá nhân đúng định dạng!"
      />
      <View style={styles.viewBody}>
        <ScrollView>
          <View style={styles.viewText}>
            <View style={styles.viewTextChild}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Nội dung đề nghị
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  marginTop: 10,
                }}>
                Đề nghị: (*)
              </Text>
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
                      setValuedenghi('');
                      setlydo('');
                    }}
                    tintColors={{
                      true: checkboxColor,
                      false: checkboxUncheckedColor,
                    }}
                  />
                  <Text style={styles.styleText1}>{yc}</Text>
                </View>
              ))}

              {isChecked === 1 ? (
                <View style={styles.viewTenDot}>
                  <Text style={styles.styleText}>Chi tiết đề nghị: (*)</Text>
                  <Dropdown
                    style={[
                      styles.dropdown1,
                      isFocusdenghi && {borderColor: 'black'},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={dataDenghi}
                    maxHeight={300}
                    labelField="labelDenghi"
                    valueField="valueDenghi"
                    placeholder={
                      !isFocusdenghi ? 'Vui lòng chọn đề nghị' : '...'
                    }
                    value={valuedenghi}
                    onFocus={() => setIsdenghi(true)}
                    onBlur={() => setIsdenghi(false)}
                    onChange={item => {
                      setValuedenghi(item.valueDenghi);
                      setdenghi(item.labelDenghi);
                      setIsdenghi(false);
                    }}
                  />
                </View>
              ) : null}
              {isChecked === 0 || isChecked === -1 ? (
                <View>
                  <View style={styles.viewTenDot}>
                    <Text style={styles.styleText}>Chi tiết đề nghị: (*)</Text>
                    <Dropdown
                      style={[
                        styles.dropdown1,
                        isFocusdenghi && {borderColor: 'black'},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={dataLoaibangdiem}
                      maxHeight={300}
                      labelField="labelLoaiBangDiem"
                      valueField="valueLoaiBangDiem"
                      placeholder={
                        !isFocusdenghi ? 'Vui lòng chọn đề nghị' : '...'
                      }
                      value={valuedenghi}
                      onFocus={() => setIsdenghi(true)}
                      onBlur={() => setIsdenghi(false)}
                      onChange={item => {
                        setValuedenghi(item.valueLoaiBangDiem);
                        setdenghi(item.labelLoaiBangDiem);
                        setIsdenghi(false);
                      }}
                    />
                  </View>
                  <View style={styles.viewTenDot}>
                    <Text style={styles.styleText}>
                      Email cá nhân _ Ví dụ: @gmail.com (*)
                    </Text>
                  </View>

                  <TextInput
                    underlineColor="transparent"
                    style={styles.textInput}
                    onChangeText={text => {
                      setemail(text);
                    }}
                    placeholder="Vui lòng nhập Email cá nhân của bạn!"
                    value={email}
                  />
                </View>
              ) : null}
              <Text style={styles.styleText}>Lý do:(*)</Text>

              <TextInput
                underlineColor="transparent"
                style={styles.textInput}
                onChangeText={text => setlydo(text)}
                placeholder="Vui lòng nhập lý do của bạn!"
                value={lydo}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.viewFooter}>
        <View
          style={[
            styles.buttonHuy,
            {marginLeft: 30, backgroundColor: '#ffffff'},
          ]}>
          <TouchableOpacity
            style={[styles.touchableOpacity, {backgroundColor: '#ffffff'}]}
            onPress={() => {
              setChecked(-1);
              setValuedenghi('');
              setemail('');
              setlydo('');
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
            onPress={() => {
              if (isChecked === -1) {
                handleModalPress2();
              }
              if (isChecked === 0) {
                if (valuedenghi === '') {
                  handleModalPress3();
                } else if (email === '') {
                  handleModalPress4();
                } else if (lydo === '') {
                  handleModalPress5();
                } else {
                  if (
                    valuedenghi === '0' &&
                    ThongTinSinhVien.Email_TruongCap != ''
                  ) {
                    handleModalPress6();
                  } else if (!validateEmail(email)) {
                    handleModalPress9();
                  } else if (checkEmailType(email) === 'school') {
                    handleModalPress7();
                  } else if (valuedenghi === '7') {
                    if (checkSDT() != null) {
                      PostYeuCau();
                    } else {
                      handleModalPress8();
                    }
                  } else {
                    PostYeuCau();
                  }
                }
              }

              if (isChecked === 1) {
                if (valuedenghi === '') {
                  handleModalPress3();
                } else if (valuedenghi === '5') {
                  handleModalPress6();
                } else if (lydo === '') {
                  handleModalPress5();
                } else {
                  PostYeuCau();
                }
              }
            }}
            style={[styles.touchableOpacity, {backgroundColor: '#245d7c'}]}>
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

export default TaiKhoanLMS;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E8E8',
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
  textInput: {
    height: 85,
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
    backgroundColor: '#ffffff',
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

  buttonLuu: {
    width: '35%',
    height: 40,
    marginRight: 30,
    borderRadius: 40,
    backgroundColor: '#245d7c',
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
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
    fontSize: 18,
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
  styleText1: {
    color: 'black',
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
  },
  container1: {
    marginTop: 20,
  },
});
