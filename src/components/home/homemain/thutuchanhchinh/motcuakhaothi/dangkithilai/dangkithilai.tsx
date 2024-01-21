import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Header1 from '../../../../untils/header/header1';
import {Dropdown} from 'react-native-element-dropdown';
import {Table, Row, Rows, TableWrapper} from 'react-native-table-component';
import axios from 'axios';
import {token} from '../../../../../login/login';
import {maSinhVien} from '../../../../../login/login';
import {
  getThongTinhSinhVien,
  ThongTinSinhVien,
} from '../../../../../../api/GetThongTinSinhVien';

const DangKiThiLai = ({navigation}: any) => {
  const [tableHead, setTableHead] = useState([
    'Chọn',
    'Mã lớp học phần',
    'Tên học phần',
    'Hình thức thi',
    'Điểm thi',
    'Điểm tông kết',
    'Ghi chú',
  ]);

  const dataLoaiThi = [{labelLoaiThi: 'Thi lần 1', valueLoaiThi: '3'}];

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
  const [dataTableNoData, setDataTableNoDaTa] = useState([]);
  const [mangDataTable, setMangDataTable] = useState([]);
  const [maLopHocPhan, setMaLopHocPhan] = useState('');
  const [tenLopHocPhan, setTenLopHocPhan] = useState('');
  const [hinhThucThi, setHinhThucThi] = useState('');
  const [diemThi, setDiemThi] = useState('');
  const [diemTongKet, setDiemTongKet] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [diemThi1, setDiemThi1] = useState('');
  const [diemThi2, setDiemThi2] = useState('');
  const [diemTongKet1, setDiemTongKet1] = useState('');
  const [diemTongKet2, setDiemTongKet2] = useState('');
  const [kiemTraQuaHan, setKiemTraQuaHan] = useState(true);

  const handleCheckboxChange = rowIndex => {
    const newData = [...dataTable];
    newData[rowIndex][0] = !newData[rowIndex][0];
    setDataTable(newData);

    if (newData[rowIndex][0]) {
      const selectedRowData = newData[rowIndex].slice(1);
      setMangDataTable(selectedRowData);
      setMaLopHocPhan(selectedRowData[0]);
      setTenLopHocPhan(selectedRowData[1]);
      setHinhThucThi(selectedRowData[2]);
      setDiemThi(selectedRowData[3]);
      setDiemTongKet(selectedRowData[4]);
      setGhiChu(selectedRowData[5]);
    }
  };

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

      console.log('Ten dot', tendot);
      console.log('token: ', token);
    } catch (error) {
      console.error(error);
    }
  };

  //Data Table
  var apiDataTable = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_DangKyThi?MaSinhVien=${maSinhVien}&MC_KT_DangKyThi_TenDot=${dotThi}&MC_KT_DangKyThi_LoaiThi=3&MC_KT_DangKyThi_LiDo=${lido}`;
  const getDataTable = async () => {
    try {
      const response = await axios.get(apiDataTable, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const newDataTabe = response.data.body.map(dk => [
        false,
        dk.MaLopHocPhan,
        dk.TenMonHoc,
        dk.TenHinhThucThi,
        dk.DiemThi,
        dk.DiemTongKet,
        dk.GhiChu,
      ]);

      response.data.body.map(dk1 => {
        setDiemThi1(dk1.DiemThi1);
        setDiemThi2(dk1.DiemThi2);
        setDiemTongKet1(dk1.DiemTongKet1);
        setDiemTongKet2(dk1.DiemTongKet2);
        setKiemTraQuaHan(dk1.MC_DangKyThi_KiemTra_NgayThi_NgayHienTai);
      });

      setDataTable(newDataTabe);
      console.log('DataTable: ', newDataTabe);
    } catch (error) {
      console.error(error);
    }
  };

  //Post yêu cầu
  var apiTiepNhan =
    'https://apiv2.uneti.edu.vn//api/SP_MC_KT_DangKyThi_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var data = {
      MC_KT_DangKyThi_TenDot: dotThi,
      MC_KT_DangKyThi_LoaiThi: loaiThi,
      MC_KT_DangKyThi_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : 'null',
      MC_KT_DangKyThi_MaSinhVien: maSinhVien,
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
      MC_KT_DangKyThi_DienThoai: ' ',
      MC_KT_DangKyThi_YeuCau: valueLiDo.toString()
        ? valueLiDo.toString()
        : 'null',
      MC_KT_DangKyThi_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'null',
      MC_KT_DangKyThi_NgaySinh2: '1999-10-18T00:00:00.000Z',
      MC_KT_DangKyThi_IDSinhVien: ThongTinSinhVien.IdSinhVien.toString()
        ? ThongTinSinhVien.IdSinhVien.toString()
        : 'null',
      MC_KT_DangKyThi_MaLopHocPhan: maLopHocPhan.toString()
        ? maLopHocPhan.toString()
        : 'null',
      MC_KT_DangKyThi_TenMonHoc: tenLopHocPhan ? tenLopHocPhan : 'null',
      MC_KT_DangKyThi_TenHinhThucThi: hinhThucThi ? hinhThucThi : 'null',
      MC_KT_DangKyThi_DiemThi: diemThi.toString() ? diemThi.toString() : 'null',
      MC_KT_DangKyThi_DiemThi1: diemThi1.toString()
        ? diemThi1.toString()
        : 'null',
      MC_KT_DangKyThi_DiemThi2: diemThi2.toString()
        ? diemThi2.toString()
        : 'null',
      MC_KT_DangKyThi_DiemTongKet: diemTongKet.toString()
        ? diemTongKet.toString()
        : 'null',
      MC_KT_DangKyThi_DiemTongKet1: diemTongKet1.toString()
        ? diemTongKet1.toString()
        : 'null',
      MC_KT_DangKyThi_DiemTongKet2: diemTongKet2.toString()
        ? diemTongKet2.toString()
        : 'null',
      MC_KT_DangKyThi_YeuCau_LyDoKhacChiTiet: ' ',
    };
    console.log('220', data);
    try {
      const response = await axios.post(apiTiepNhan, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (kiemTraQuaHan == false) {
        Alert.alert('Thông báo', 'Môn học này đã hết hạn đăng kí thi lại!');
      } else {
        if (response.data.message === 'Bản ghi bị trùng.') {
          Alert.alert(
            'Thông báo',
            `Yêu cầu cho môn: ${tenLopHocPhan} đã được gửi!!`,
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
  }, []);
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
                    {marginLeft: 34},
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

              <View style={styles.containerTable}>
                <Table borderStyle={styles.table}>
                  <Row
                    data={tableHead}
                    flexArr={[1, 2, 1, 1]}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                  <TableWrapper style={styles.wrapper}>
                    <Rows
                      data={dataTable.map((rowData, index) => [
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleCheckboxChange(index)}>
                          <View style={styles.checkboxContainer}>
                            <View style={styles.checkbox}>
                              {rowData[0] && (
                                <View style={styles.innerCheckbox} />
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>,
                        ...rowData.slice(1),
                      ])}
                      flexArr={[1, 2, 1, 1]}
                      textStyle={[styles.text, styles.row]}
                    />
                  </TableWrapper>
                </Table>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.viewFooter}>
          <View style={[styles.buttonHuy, {marginLeft: 20}]}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                ClearData();
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Hủy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonHuy}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                if (dotThi === '' || valueLoaiThi === '' || valueLiDo === '') {
                  Alert.alert(
                    'Thông báo',
                    'Vui lòng chọn đầy đủ thông tin: Tên đợt, Loại thi, Lí do.',
                  );
                } else {
                  getDataTable();
                }
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Xem</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonHuy, {marginRight: 20}]}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                PostYeuCau();
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Lưu</Text>
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
    width: '23%',
    height: 45,
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

  //Table
  containerTable: {
    marginTop: 30,
    height: 300,
    width: '100%',
    overflow: 'hidden',
  },
  table: {
    borderColor: '#c8e1ff',
    borderWidth: 1,
  },
  head: {
    height: 70,
    backgroundColor: '#245d7c',
    borderColor: '#c8e1ff',
  },
  text: {
    margin: 6,
    color: 'black',
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    backgroundColor: '#999999',
  },
  row: {height: 90},

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
    color: 'gray',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCheckbox: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 2,
  },
});
