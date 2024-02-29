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
import ModalThongBao from '../../../../untils/modalThongBao/modalThongBao';
import {DataTable} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
import {
  getThongTinhSinhVien,
  ThongTinSinhVien,
} from '../../../../../../api/GetThongTinSinhVien';

const LopChatLuong = ({navigation}: any) => {
  const [tendot, setTenDot] = useState([]);
  const [valueDotDangKy, setValueDotDangKy] = useState('');
  const [isFocusDotThi, setIsFocusDotThi] = useState(false);
  const [dotDangKy, setDotDangKy] = useState('');

  const [valueLyDo, setValueLyDo] = useState('');
  const [isFocusLyDo, setIsFocusLyDo] = useState(false);
  const [lyDo, setLyDo] = useState('');

  const [lyDoChiTiet, setLyDoChiTiet] = useState('');

  const [tableData, setTableData] = useState([]);

  const data = {tenLoaiHinh: 'Học lớp chất lượng', valueLoaiHinh: '0'};

  const dataLiDo = [
    {
      tenLyDo:
        'Căn cứ năng lực, nguyện vọng của bản thân và điều kiện gia đình',
      valueLyDo: '0',
    },
    {
      tenLyDo: 'Lý do khác ...',
      valueLyDo: '1',
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);

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

  const handleModalPress5 = () => {
    setShowModal5(true);
  };

  const handleCloseModal5 = () => {
    setShowModal5(false);
  };

  const handleModalPress6 = () => {
    setShowModal6(true);
  };

  const handleCloseModal6 = () => {
    setShowModal6(false);
  };

  //get tên đợt
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

  var ngaybd: any, ngaykt: any;
  //get Ngày kiểm tra giới hạn
  const apiNgayGioiHan =
    'https://apiv2.uneti.edu.vn/api/SP_MC_DT_DKHocChatLuong_TiepNhan/KiemTra_GioiHan';
  const getDataNgayGioiHan = async () => {
    try {
      const response = await axios.get(apiNgayGioiHan, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      ngaybd = moment(response.data.body[0].HT_TLGH_NgayBD).format(
        'MM/DD/YYYY',
      );
      ngaykt = moment(response.data.body[0].HT_TLGH_NgayKT).format(
        'MM/DD/YYYY',
      );
    } catch (error) {
      console.error(error);
    }
  };
  //get dataTable
  var apiTable = `https://apiv2.uneti.edu.vn/api/SP_MC_DT_DKHocChatLuong_TiepNhan/EDU_Load_Para_View_TKB_LopHocPhan?MC_DT_DKHocChatLuong_TenDot=${dotDangKy}&MC_DT_DKHocChatLuong_MaSinhVien=${maSinhVien}`;
  const getDataTable = async () => {
    try {
      const response = await axios.get(apiTable, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      var id = 0;
      const newTableData = response.data.body.map(mh => [
        id++,
        mh.MC_DT_DKHocChatLuong_MaLopHoc,
        mh.MC_DT_DKHocChatLuong_TenLop,
        mh.MC_DT_DKHocChatLuong_KhoaChuQuanLHP,
        mh.MC_DT_DKHocChatLuong_SiSo,
      ]);

      setTableData(newTableData);
    } catch (error) {
      console.error(error);
    }
  };

  //Xử lí check box
  const [checkedItems, setCheckedItems] = useState([]);
  const [kiemTraChonMonHoc, setKiemTraChonMonHoc] = useState(false);
  const [mangmonhoc, setmangmonhoc] = useState<MonHoc[]>([]);
  type MonHoc = {
    id: number;
    maLopHocPhan: string;
    tenLopHoc: string;
    khoaChuQuan: string;
    siSo: number;
  };

  const handleCheckboxToggle = (rowIndex: number) => {
    const newCheckedItems = [...checkedItems];
    const index = newCheckedItems.indexOf(rowIndex);

    if (index !== -1) {
      newCheckedItems.splice(index, 1);
    } else {
      if (newCheckedItems.length > 0) {
        newCheckedItems.splice(0, 1);
      }
      newCheckedItems.push(rowIndex);
    }

    setCheckedItems(newCheckedItems);

    const newMangMonHoc: MonHoc[] = [];
    newCheckedItems.forEach(id => {
      const monHoc = tableData.find(item => item[0] === id);
      if (monHoc) {
        newMangMonHoc.push({
          id: monHoc[0],
          maLopHocPhan: monHoc[1],
          tenLopHoc: monHoc[2],
          khoaChuQuan: monHoc[3],
          siSo: monHoc[4],
        });
      }
    });
    setmangmonhoc(newMangMonHoc);

    // Cập nhật kiểm tra chọn môn học
    setKiemTraChonMonHoc(newCheckedItems.length > 0);
  };

  var apiGuiYeuCau =
    'https://apiv2.uneti.edu.vn/api/SP_MC_DT_DKHocChatLuong_TiepNhan/Add_Para';

  const GuiYeuCau = async () => {
    var dataYeuCau = {
      MC_DT_DKHocChatLuong_MaSinhVien: maSinhVien ? maSinhVien : 'null',
      MC_DT_DKHocChatLuong_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_DT_DKHocChatLuong_NgaySinh2: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      MC_DT_DKHocChatLuong_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : 'null',
      MC_DT_DKHocChatLuong_DienThoai: ThongTinSinhVien.SoDienThoai.toString()
        ? ThongTinSinhVien.SoDienThoai.toString()
        : 'null',
      MC_DT_DKHocChatLuong_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'null',
      MC_DT_DKHocChatLuong_TenDot: dotDangKy,
      MC_DT_DKHocChatLuong_MaLopHoc: mangmonhoc[0].maLopHocPhan.toString()
        ? mangmonhoc[0].maLopHocPhan.toString()
        : 'null',
      MC_DT_DKHocChatLuong_TenLopHoc: mangmonhoc[0].tenLopHoc
        ? mangmonhoc[0].tenLopHoc
        : 'null',
      MC_DT_DKHocChatLuong_KhoaChuQuanLHP: mangmonhoc[0].khoaChuQuan
        ? mangmonhoc[0].khoaChuQuan
        : 'null',
      MC_DT_DKHocChatLuong_SiSo: mangmonhoc[0].siSo.toString()
        ? mangmonhoc[0].siSo.toString()
        : 'null',
      MC_DT_DKHocChatLuong_GhiChu: 'string',
      MC_DT_DKHocChatLuong_YeuCau_LoaiHocTap: valueDotDangKy.toString()
        ? valueDotDangKy.toString()
        : 'null',
      MC_DT_DKHocChatLuong_YeuCau_LyDo: valueLyDo.toString()
        ? valueLyDo.toString()
        : 'null',
      MC_DT_DKHocChatLuong_YeuCau_LyDo_LyDoKhac_LyDoChiTiet: lyDoChiTiet
        ? lyDoChiTiet
        : 'null',
    };

    try {
      const response = await axios.post(apiGuiYeuCau, dataYeuCau, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (
        moment().isBetween(
          moment(ngaybd, 'MM/DD/YYYY'),
          moment(ngaykt, 'MM/DD/YYYY'),
        )
      ) {
        if (response.data.message === 'Bản ghi bị trùng.') {
          handleModalPress6();
        } else {
          handleModalPress4();
        }
      } else {
        handleModalPress3();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ClearData = () => {
    setValueDotDangKy('-1');
    setValueLyDo('-1');
    setLyDoChiTiet('');
    setTableData([]);
  };

  useEffect(() => {
    fetchData();
    getThongTinhSinhVien();
    if (valueDotDangKy !== '-1' && dotDangKy !== '') {
      getDataTable();
    }
  }, [valueDotDangKy]);

  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Lớp chất lượng"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <ModalThongBao
        visible={showModal}
        onClose={handleCloseModal}
        message="Vui lòng chọn tên đợt!"
      />

      <ModalThongBao
        visible={showModal1}
        onClose={handleCloseModal1}
        message="Vui lòng chọn lớp học!"
      />

      <ModalThongBao
        visible={showModal2}
        onClose={handleCloseModal2}
        message="Vui lòng nhập lý do của bạn!"
      />

      <ModalThongBao
        visible={showModal3}
        onClose={handleCloseModal3}
        message={`Chức năng đăng ký lớp học chất lượng tạm thời bị khóa do hết hạn đăng ký`}
      />

      <ModalThongBao
        visible={showModal4}
        onClose={handleCloseModal4}
        message="Đăng ký lớp học chất lượng thành công!"
      />

      <ModalThongBao
        visible={showModal5}
        onClose={handleCloseModal5}
        message="Vui lòng chọn lý do!"
      />

      <ModalThongBao
        visible={showModal6}
        onClose={handleCloseModal6}
        message="Yêu cầu này đã được gửi!"
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
                  marginTop: 5,
                }}>
                Nội dung đề nghị
              </Text>

              <View style={styles.viewTenDot}>
                <Text style={[styles.styleText, {marginTop: 25}]}>
                  Tên đợt: (*)
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusDotThi && {borderColor: 'black'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={tendot.map((item, index) => ({
                    labelDotThi: item,
                    valueDotThi: index.toString(),
                  }))}
                  maxHeight={300}
                  labelField="labelDotThi"
                  valueField="valueDotThi"
                  placeholder={!isFocusDotThi ? 'Chọn tên đợt' : '...'}
                  value={valueDotDangKy}
                  onFocus={() => setIsFocusDotThi(true)}
                  onBlur={() => setIsFocusDotThi(false)}
                  onChange={item => {
                    setValueDotDangKy(item.valueDotThi);
                    setDotDangKy(item.labelDotThi);
                    setIsFocusDotThi(false);
                  }}
                />
              </View>

              <View style={styles.viewTenDot}>
                <Text style={[styles.styleText, {marginTop: 20}]}>
                  Loại đăng ký học tập: (*)
                </Text>

                <Text
                  style={[styles.styleText, {marginTop: 20, marginLeft: 20}]}>
                  {data.tenLoaiHinh}
                </Text>
              </View>

              <View style={styles.viewTenDot}>
                <Text style={[styles.styleText, {marginTop: 20}]}>
                  Lý do: (*)
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusLyDo && {borderColor: 'black'},
                    {marginLeft: 31, marginTop: 15},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={dataLiDo}
                  maxHeight={300}
                  labelField="tenLyDo"
                  valueField="valueLyDo"
                  placeholder={!isFocusDotThi ? 'Chọn lý do' : '...'}
                  value={valueLyDo}
                  onFocus={() => setIsFocusLyDo(true)}
                  onBlur={() => setIsFocusLyDo(false)}
                  onChange={item => {
                    setValueLyDo(item.valueLyDo);
                    setLyDo(item.tenLyDo);
                    setIsFocusLyDo(false);
                  }}
                />
              </View>

              {lyDo === 'Lý do khác ...' ? (
                <View
                  style={{
                    backgroundColor: '#f7f9ff',
                    width: 'auto',
                    height: 180,
                    borderRadius: 10,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      marginTop: 10,
                      marginLeft: 20,
                      lineHeight: 36,
                    }}>
                    Chi tiết lý do khác:(*)
                  </Text>
                  <View
                    style={{
                      marginTop: 25,
                      backgroundColor: '#ffffff',
                      marginHorizontal: 20,
                      borderRadius: 10,
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      value={lyDoChiTiet}
                      placeholder="Lý do khác của bạn....."
                      style={{fontSize: 18, backgroundColor: '#ffffff'}}
                      onChangeText={text => setLyDoChiTiet(text)}
                    />
                  </View>
                </View>
              ) : null}

              <ScrollView>
                <View style={styles.container1}>
                  <ScrollView horizontal>
                    <DataTable style={{width: 740}}>
                      <DataTable.Header>
                        <DataTable.Title
                          style={{
                            flex: 0.3,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Chọn
                          </Text>
                        </DataTable.Title>

                        <DataTable.Title
                          style={{
                            flex: 0.5,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Mã lớp học phần
                          </Text>
                        </DataTable.Title>

                        <DataTable.Title
                          style={{
                            flex: 0.7,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Tên lớp học
                          </Text>
                        </DataTable.Title>

                        <DataTable.Title
                          style={{
                            flex: 0.9,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Khoa chủ quản
                          </Text>
                        </DataTable.Title>

                        <DataTable.Title
                          style={{
                            flex: 0.3,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Sĩ số
                          </Text>
                        </DataTable.Title>
                      </DataTable.Header>

                      {tableData.map(item => (
                        <DataTable.Row key={item[0]}>
                          <DataTable.Cell
                            style={{
                              flex: 0.3,
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                            }}>
                            <CheckBox
                              isChecked={checkedItems.includes(item[0])}
                              onClick={() => handleCheckboxToggle(item[0])}
                              checkBoxColor="#2e6b8b"
                            />
                          </DataTable.Cell>

                          <DataTable.Cell
                            style={{
                              flex: 0.5,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[1]}
                            </Text>
                          </DataTable.Cell>

                          <DataTable.Cell
                            style={{
                              flex: 0.7,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[2]}
                            </Text>
                          </DataTable.Cell>

                          <DataTable.Cell
                            style={{
                              flex: 0.9,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[3]}
                            </Text>
                          </DataTable.Cell>

                          <DataTable.Cell
                            style={{
                              flex: 0.3,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[4]}
                            </Text>
                          </DataTable.Cell>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                  </ScrollView>
                </View>
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
                ClearData();
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Hủy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonLuu}>
            <TouchableOpacity
              onPress={() => {
                if (dotDangKy === '') {
                  handleModalPress();
                } else if (lyDo === '') {
                  handleModalPress5();
                } else if (mangmonhoc.length === 0) {
                  handleModalPress1();
                } else if (lyDo === 'Lý do khác ...' && lyDoChiTiet === '') {
                  handleModalPress2();
                } else {
                  GuiYeuCau();
                  ClearData();
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
            backgroundColor: '#f7f9ff',
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
    marginBottom: 5,
  },

  viewTenDot: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },

  dropdown: {
    flex: 1,
    marginLeft: 16,
    marginTop: 20,
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

  container1: {
    marginTop: 20,
    marginBottom: 20,
  },
});
export default LopChatLuong;
