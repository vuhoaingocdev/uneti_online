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
} from 'react-native';
import Header1 from '../../../../untils/header/header1';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {token} from '../../../../../login/login';
import {maSinhVien} from '../../../../../login/login';
import {DataTable} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
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
        Alert.alert('Thông báo', 'Môn học này đã hết hạn đăng kí thi lại!');
      } else {
        if (response.data.message === 'Bản ghi bị trùng.') {
          Alert.alert(
            'Thông báo',
            `Yêu cầu cho môn: ${mangmonhoc[2]} đã được gửi!!`,
          );
        } else {
          if (response.status == 200) {
            Alert.alert('Thông báo', 'Gửi yêu cầu thành công!');
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

              <View style={styles.viewTenDot}>
                <Text style={styles.styleText}>Loại thi: (*)</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusLoaiThi && {borderColor: 'blue'},
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
                    isFocusLiDo && {borderColor: 'blue'},
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
                    <DataTable style={{width: 1200, height: 600}}>
                      <DataTable.Header>
                        <DataTable.Title
                          style={{
                            flex: 0.35,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Chọn
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
                              flex: 0.35,
                              justifyContent: 'center',
                              backgroundColor: '#d3d3d3',
                            }}>
                            <CheckBox
                              isChecked={checkedItems.includes(item[0])}
                              onClick={() => handleCheckboxToggle(item[0])}
                              checkBoxColor="#245d7c"
                            />
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              flex: 0.6,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#d3d3d3',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[1]}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              flex: 0.8,
                              backgroundColor: '#d3d3d3',
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
                              backgroundColor: '#d3d3d3',
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
                              backgroundColor: '#d3d3d3',
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
                              backgroundColor: '#d3d3d3',
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
                              backgroundColor: '#d3d3d3',
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
                  Alert.alert(
                    'Thông báo!',
                    'Bạn có chắc chắn muốn hủy không?',
                    [
                      {
                        text: 'Không',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'Có',
                        onPress: () => {
                          ClearData();
                        },
                      },
                    ],
                  );
                } else {
                  Alert.alert('Thông báo', 'Không có dữ liệu!');
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
                  Alert.alert(
                    'Thông báo',
                    'Không có dữ liệu môn học để gửi yêu cầu!',
                  );
                } else {
                  if (!kiemTraChonMonHoc) {
                    Alert.alert(
                      'Thông báo',
                      'Vui lòng chọn môn học trước khi gửi yêu cầu!',
                    );
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
    backgroundColor: '#E8E8E8',
  },
  styleText: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    lineHeight: 36,
  },
  viewText: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewTextChild: {
    width: '90%',
    height: '100%',
    marginTop: 15,
  },

  viewFooter: {
    height: '10%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BEBEBE',
    justifyContent: 'space-between',
  },

  buttonHuy: {
    width: '35%',
    height: 40,
    borderRadius: 40,
    backgroundColor: '#F8F8FF',
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
  },
});
