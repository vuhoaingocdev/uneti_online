import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import Header1 from '../../../../untils/header/header1';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {token} from '../../../../../login/login';
import {maSinhVien} from '../../../../../login/login';
import {DataTable} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
import ModalThongBao from '../../../../untils/modalThongBao/modalThongBao';
import {
  getThongTinhSinhVien,
  ThongTinSinhVien,
} from '../../../../../../api/GetThongTinSinhVien';

const DangKiThiLai = ({navigation}: any) => {
  const dataLoaiThi = [{labelLoaiThi: 'Thi lại', valueLoaiThi: '3'}];

  const dataLiDo = [
    {labelLiDo: 'Trùng lịch thi', valueLiDo: '0'},
    {labelLiDo: 'Lỗi website sinhvien.uneti.edu.vn', valueLiDo: '1'},
    {labelLiDo: 'Khác hệ, loại hình đào tạo', valueLiDo: '2'},
    {labelLiDo: 'Thi không theo kế hoạch', valueLiDo: '3'},
    {labelLiDo: 'Lí do khác', valueLiDo: '4'},
  ];

  const [tendot, setTenDot] = useState([]);
  const [valueDotThi, setValueDotThi] = useState('');
  const [isFocusDotThi, setIsFocusDotThi] = useState(false);
  const [dotThi, setDotThi] = useState('');

  const [loaiThi, setLoaiThi] = useState('');
  const [valueLoaiThi, setValueLoaiThi] = useState('');
  const [isFocusLoaiThi, setIsFocusLoaiThi] = useState(false);

  const [lido, setLiDo] = useState('');
  const [valueLiDo, setValueLiDo] = useState('');
  const [isFocusLiDo, setIsFocusLiDo] = useState(false);

  const [dataTable, setDataTable] = useState([]);

  const [liDoKhac, setLiDoKhac] = useState('');

  const [diemTongKet1, setDiemTongKet1] = useState('');
  const [diemTongKet2, setDiemTongKet2] = useState('');
  const [diemThi1, setDiemThi1] = useState('');
  const [diemThi2, setDiemThi2] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);

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
    setShowModal4(false);
  };

  const [kiemTraChonMonHoc, setKiemTraChonMonHoc] = useState(false);

  var apiDataTable = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_DangKyThi?MaSinhVien=${maSinhVien}&MC_KT_DangKyThi_TenDot=${dotThi}&MC_KT_DangKyThi_LoaiThi=3&MC_KT_DangKyThi_YeuCau=${valueLiDo}`;

  //Load tên đợt
  var getAPI_TenDot = 'https://apiv2.uneti.edu.vn/api/SP_EDU/Load_TenDot';
  const fetchDataTenDot = async () => {
    try {
      const response = await axios.get(getAPI_TenDot, {
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

  //Data Table
  const getDataTable = async () => {
    try {
      const response = await axios.get(apiDataTable, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      var id = 0;
      const newDataTabe = response.data.body.map(dk => [
        id++,
        dk.MaLopHocPhan,
        dk.TenMonHoc,
        dk.TenHinhThucThi,
        dk.DiemThi,
        dk.DiemTongKet,
        dk.GhiChu,
      ]);

      setDataTable(newDataTabe);
    } catch (error) {
      console.error(error);
    }
  };

  //Xử lí check box
  const [checkedItems, setCheckedItems] = useState([]);
  const [mangmonhoc, setmangmonhoc] = useState([]);
  const handleCheckboxToggle = rowIndex => {
    const newCheckedItems = [...checkedItems];
    const index = newCheckedItems.indexOf(rowIndex);

    //Check box đã tồn tại rồi
    if (index !== -1) {
      newCheckedItems.splice(index, 1);
      if (newCheckedItems.length === 0) {
        setmangmonhoc([]);
      } else {
        dataTable.map(function (tk) {
          if (tk[0] === newCheckedItems[0]) {
            setmangmonhoc([tk[0], tk[1], tk[2], tk[3], tk[4], tk[5], tk[6]]);
          }
        });
      }
    } else {
      newCheckedItems.push(rowIndex);
      dataTable.map(function (tk) {
        if (tk[0] === rowIndex) {
          setmangmonhoc([tk[0], tk[1], tk[2], tk[3], tk[4], tk[5], tk[6]]);
        }
      });
    }
    setCheckedItems(newCheckedItems);
    setKiemTraChonMonHoc(newCheckedItems.length > 0);
  };

  //Post yêu cầu
  var apiTiepNhan =
    'https://apiv2.uneti.edu.vn/api/SP_MC_KT_DangKyThi_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var data = {
      MC_KT_DangKyThi_TenDot: dotThi ? dotThi : 'null',
      MC_KT_DangKyThi_LoaiThi: loaiThi ? loaiThi : 'null',
      MC_KT_DangKyThi_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : 'null',
      MC_KT_DangKyThi_MaSinhVien: maSinhVien ? maSinhVien : 'null',
      MC_KT_DangKyThi_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : 'null',
      MC_KT_DangKyThi_Ten: ThongTinSinhVien.Ten ? ThongTinSinhVien.Ten : 'null',
      MC_KT_DangKyThi_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_KT_DangKyThi_TenHeDaoTao: ThongTinSinhVien.BacDaoTao
        ? ThongTinSinhVien.BacDaoTao
        : 'null',
      MC_KT_DangKyThi_TenLoaiHinhDT: ThongTinSinhVien.LoaiHinhDaoTao
        ? ThongTinSinhVien.LoaiHinhDaoTao
        : 'null',
      MC_KT_DangKyThi_TenKhoaHoc: ThongTinSinhVien.KhoaHoc
        ? ThongTinSinhVien.KhoaHoc
        : 'null',
      MC_KT_DangKyThi_TenNganh: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_KT_DangKyThi_TenNghe: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_KT_DangKyThi_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : 'null',
      MC_KT_DangKyThi_DienThoai: ThongTinSinhVien.SoDienThoai
        ? ThongTinSinhVien.SoDienThoai
        : 'null',
      MC_KT_DangKyThi_YeuCau: valueLiDo.toString()
        ? valueLiDo.toString()
        : 'null',
      MC_KT_DangKyThi_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'null',
      MC_KT_DangKyThi_NgaySinh2: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      MC_KT_DangKyThi_IDSinhVien: ThongTinSinhVien.IdSinhVien.toString()
        ? ThongTinSinhVien.IdSinhVien.toString()
        : 'null',
      MC_KT_DangKyThi_MaLopHocPhan: mangmonhoc[1].toString()
        ? mangmonhoc[1].toString()
        : 'null',
      MC_KT_DangKyThi_TenMonHoc: mangmonhoc[2] ? mangmonhoc[2] : 'null',
      MC_KT_DangKyThi_TenHinhThucThi: mangmonhoc[3] ? mangmonhoc[3] : 'null',
      MC_KT_DangKyThi_DiemThi: mangmonhoc[4].toString()
        ? mangmonhoc[4].toString()
        : 'null',
      MC_KT_DangKyThi_DiemThi1: diemThi1.toString()
        ? diemThi1.toString()
        : 'null',
      MC_KT_DangKyThi_DiemThi2: diemThi2.toString()
        ? diemThi2.toString()
        : 'null',
      MC_KT_DangKyThi_DiemTongKet: mangmonhoc[5].toString()
        ? mangmonhoc[5].toString()
        : 'null',
      MC_KT_DangKyThi_DiemTongKet1: diemTongKet1.toString()
        ? diemTongKet1.toString()
        : 'null',
      MC_KT_DangKyThi_DiemTongKet2: diemTongKet2.toString()
        ? diemTongKet2.toString()
        : 'null',
      MC_KT_DangKyThi_YeuCau_LyDoKhacChiTiet: liDoKhac ? liDoKhac : 'null',
    };
    console.log('220', data);
    try {
      const response = await axios.post(apiTiepNhan, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      var kiemTraQuaHan = false;
      if (kiemTraQuaHan == false) {
        handleModalPress5();
      } else {
        if (response.data.message === 'Bản ghi bị trùng.') {
          handleModalPress3();
        } else {
          if (response.status == 200) {
            handleModalPress4();
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ClearData = () => {
    setDataTable([]);
    setValueDotThi('-1');
    setValueLiDo('-1');
    setValueLoaiThi('-1');
  };

  useEffect(() => {
    fetchDataTenDot();
    getThongTinhSinhVien();
    if (
      dotThi !== '' &&
      loaiThi !== '' &&
      lido !== '' &&
      valueDotThi !== '-1' &&
      valueLoaiThi !== '-1' &&
      valueLiDo !== '-1'
    ) {
      getDataTable();
    }
  }, [valueDotThi, valueLoaiThi, valueLiDo]);
  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Đăng kí thi lại"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <ModalThongBao
        visible={showModal}
        onClose={handleCloseModal}
        message="Không có dữ liệu!"
      />

      <ModalThongBao
        visible={showModal1}
        onClose={handleCloseModal1}
        message="Không có dữ liệu môn học để gửi yêu cầu!"
      />

      <ModalThongBao
        visible={showModal2}
        onClose={handleCloseModal2}
        message="Mời chọn môn học trước khi gửi yêu cầu!"
      />

      <ModalThongBao
        visible={showModal3}
        onClose={handleCloseModal3}
        message="Môn học này đã được gửi yêu cầu! Vui lòng kiểm tra lại!"
      />

      <ModalThongBao
        visible={showModal4}
        onClose={handleCloseModal4}
        message="Gửi yêu cầu thành công!"
      />

      <ModalThongBao
        visible={showModal5}
        onClose={handleCloseModal5}
        message="Môn học đã quá hạn đăng ký thi lại!"
      />

      <View style={styles.viewBody}>
        <ScrollView>
          <View style={styles.viewText}>
            <View style={styles.viewTextChild}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                1.Lưu ý
              </Text>
              <Text style={styles.styleText}>
                - Lệ phí thi sẽ nộp cùng học phi kì tiếp theo
              </Text>

              <Text style={styles.styleText}>
                - Người học chỉ nên đăng kí thi lại tại đây, nếu gặp phải một số
                trường học như: Trùng lịch thi; Khác hệ loại hình đào tạo; Thi
                không theo kế hoạch; Lí do khác hoặc không đăng kí được trên
                website sinhvien.uneti.edu.vn
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                1.Nội dung đề nghị
              </Text>

              <View style={styles.viewTenDot}>
                <Text style={styles.styleText}>Tên đợt: (*)</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusDotThi && {borderColor: 'black'},
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

              <View style={styles.viewTenDot}>
                <Text style={styles.styleText}>Loại thi: (*)</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusLoaiThi && {borderColor: 'black'},
                    {marginLeft: 19},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={dataLoaiThi}
                  maxHeight={300}
                  labelField="labelLoaiThi"
                  valueField="valueLoaiThi"
                  placeholder={!isFocusLoaiThi ? 'Chọn loại thi' : '...'}
                  value={valueLoaiThi}
                  onFocus={() => setIsFocusLoaiThi(true)}
                  onBlur={() => setIsFocusLoaiThi(false)}
                  onChange={item => {
                    setValueLoaiThi(item.valueLoaiThi);
                    setLoaiThi(item.labelLoaiThi);
                    setIsFocusLoaiThi(false);
                  }}
                />
              </View>

              <View style={styles.viewTenDot}>
                <Text style={styles.styleText}>Lí do: (*)</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusLiDo && {borderColor: 'black'},
                    {marginLeft: 36},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={dataLiDo}
                  maxHeight={300}
                  labelField="labelLiDo"
                  valueField="valueLiDo"
                  placeholder={!isFocusLiDo ? 'Chọn lí do' : '...'}
                  value={valueLiDo}
                  onFocus={() => setIsFocusLiDo(true)}
                  onBlur={() => setIsFocusLiDo(false)}
                  onChange={item => {
                    setValueLiDo(item.valueLiDo);
                    setLiDo(item.labelLiDo);
                    setIsFocusLiDo(false);
                  }}
                />
              </View>

              {lido === 'Lí do khác' ? (
                <View style={styles.viewContainerInput}>
                  <View style={{width: '90%', height: '85%'}}>
                    <Text style={{fontSize: 19, color: 'black'}}>
                      Chi tiết lí do: (*)
                    </Text>
                    <TextInput
                      autoCapitalize="none"
                      placeholderTextColor={'gray'}
                      style={styles.textInput}
                      placeholder="Lí do của bạn..."
                      value={liDoKhac}
                      onChangeText={text => setLiDoKhac(text)}
                      multiline={true}
                      numberOfLines={4}
                    />
                  </View>
                </View>
              ) : null}

              <ScrollView>
                <View style={styles.container1}>
                  <ScrollView horizontal>
                    <DataTable style={{width: 1100}}>
                      <DataTable.Header>
                        <DataTable.Title
                          style={{
                            flex: 0.3,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Chọn
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.5,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Mã lớp học phần
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.8,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Tên học phần
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.6,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Hình thức thi
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.35,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Điểm thi
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.5,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Điểm tổng kết
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.5,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Ghi chú
                          </Text>
                        </DataTable.Title>
                      </DataTable.Header>

                      {dataTable.map(item => (
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
                              checkBoxColor="#245d7c"
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
                              flex: 0.8,
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'black',
                                marginLeft: 10,
                              }}>
                              {item[2]}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              flex: 0.6,
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'black',
                                marginLeft: 10,
                              }}>
                              {item[3]}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              flex: 0.35,
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[4]}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[5]}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[6]}
                            </Text>
                          </DataTable.Title>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <View style={styles.viewFooter}>
          <View style={[styles.buttonHuy, {marginLeft: 30}]}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                if (dataTable.length != 0) {
                  ClearData();
                } else {
                  handleModalPress();
                }
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
                if (dataTable.length == 0) {
                  handleModalPress1();
                } else {
                  if (!kiemTraChonMonHoc) {
                    handleModalPress3();
                  } else {
                    PostYeuCau();
                  }
                }
              }}>
              <Text style={{color: '#ffffff', fontSize: 19}}>Lưu</Text>
            </TouchableOpacity>
          </View>
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

export default DangKiThiLai;

const styles = StyleSheet.create({
  container: {
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
    fontSize: 20,
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

  viewFooter: {
    height: '12%',
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
  viewTenDot: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },

  viewButtonList: {
    width: '100%',
    height: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    padding: 10,
  },

  //dropdown
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

  textInput: {
    width: '100%',
    fontSize: 17,
    marginTop: 15,
    borderColor: 'gray',
    padding: 7,
    borderRadius: 6,
    color: 'black',
    backgroundColor: '#E8E8E8',
  },
  viewContainerInput: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    backgroundColor: '#DDDDDD',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container1: {
    marginTop: 20,
    marginBottom: 20,
  },
});
