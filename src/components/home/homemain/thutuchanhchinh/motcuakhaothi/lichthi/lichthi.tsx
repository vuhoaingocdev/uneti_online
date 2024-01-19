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
import axios from 'axios';
import {token} from '../../../../../login/login';
import {maSinhVien} from '../../../../../login/login';
import {Table, Row, Rows, TableWrapper} from 'react-native-table-component';
import {
  getThongTinhSinhVien,
  ThongTinSinhVien,
} from '../../../../../../api/GetThongTinSinhVien';

function LichThi({navigation}: any) {
  const [tableHead, setTableHead] = useState([
    'Mã lớp học phần',
    'Tên học phần',
    'Hình thức thi',
    'Ngày thi',
    'Thứ',
    'Nhóm',
    'Tiết',
    'Phòng thi',
  ]);
  const [tableHead2, setTableHead2] = useState([
    'Chọn',
    'Mã lớp học phần',
    'Tên học phần',
    'Hình thức thi',
    'Ngày thi',
    'Thứ',
    'Nhóm',
    'Tiết',
    'Phòng thi',
  ]);
  const dataLoaiThi = [
    {labelLoaiThi: 'Thi lần 1', valueLoaiThi: '2'},
    {labelLoaiThi: 'Thi lại', valueLoaiThi: '1'},
  ];

  const dataLiDo = [
    {labelLiDo: 'Xem lịch thi', valueLiDo: '0'},
    {labelLiDo: 'Trùng lịch thi', valueLiDo: '1'},
    {labelLiDo: 'Không có lịch thi', valueLiDo: '2'},
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

  const [tableDataXemLichThi, setTableDataXemLichThi] = useState([]);
  const [tableDataXemLichThi1, setTableDataXemLichThi1] = useState([]);

  const [mangDuLieuTable, setMangDuLieuTable] = useState([]);
  const [maLopHocPhan, setMaLopHocPhan] = useState('');
  const [tenHocPhan, setTenHocPhan] = useState('');
  const [hinhThucThi, setHinhThucThi] = useState('');
  const [ngayThi, setNgayThi] = useState('');
  const [thu, setThu] = useState('');
  const [nhom, setNhom] = useState('');
  const [tiet, setTiet] = useState('');
  const [phongThi, setPhongThi] = useState('');
  const [ngayThiChuaDinhDang, setNgayThiChuaDinhDang] = useState('');

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
    } catch (error) {
      console.error(error);
    }
  };

  //Xem lịch thi
  var apiXemLichThi = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_LichThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_LichThiLichHoc?MaSinhVien=${maSinhVien}&MC_KT_LichThi_TenDot=${dotThi}&MC_KT_LichThi_LoaiThi=${valueLoaiThi}&MC_KT_LichThi_YeuCau=${valueLiDo}`;
  const fetchDataXemLichThi = async () => {
    try {
      const response = await axios.get(apiXemLichThi, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const newTableData = response.data.body.map(lt => [
        lt.MaLopHocPhan,
        lt.TenMonHoc,
        lt.TenHinhThucThi,
        new Date(lt.NgayThi).toLocaleDateString('vi-VN'),
        lt.Thu,
        lt.Nhom,
        lt.TuTiet,
        lt.TenPhong,
      ]);

      const newTableData1 = response.data.body.map(lt => [
        false,
        lt.MaLopHocPhan,
        lt.TenMonHoc,
        lt.TenHinhThucThi,
        new Date(lt.NgayThi).toLocaleDateString('vi-VN'),
        lt.Thu,
        lt.Nhom,
        lt.TuTiet,
        lt.TenPhong,
      ]);

      response.data.body.map(nt => {
        setNgayThiChuaDinhDang(nt.NgayThi);
      });

      setTableDataXemLichThi(newTableData);
      setTableDataXemLichThi1(newTableData1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = rowIndex => {
    // const newData = [...tableDataXemLichThi1];
    // newData[rowIndex][0] = !newData[rowIndex][0];
    // setTableDataXemLichThi1(newData);
    const newData = [...tableDataXemLichThi1];
    newData[rowIndex][0] = !newData[rowIndex][0];
    setTableDataXemLichThi1(newData);

    if (newData[rowIndex][0]) {
      const selectedRowData = newData[rowIndex].slice(1);
      setMangDuLieuTable(selectedRowData);
      setMaLopHocPhan(selectedRowData[0]);
      setTenHocPhan(selectedRowData[1]);
      setHinhThucThi(selectedRowData[2]);
      setNgayThi(selectedRowData[3]);
      setThu(selectedRowData[4]);
      setNhom(selectedRowData[5]);
      setTiet(selectedRowData[6]);
      setPhongThi(selectedRowData[7]);
    }
  };

  //Post
  var apiTiepNhan =
    'https://apiv2.uneti.edu.vn/api/SP_MC_KT_LichThi_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var data = {
      MC_KT_LichThi_TenDot: dotThi ? dotThi : 'null',
      MC_KT_LichThi_LoaiThi: loaiThi ? loaiThi : 'null',
      MC_KT_LichThi_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : 'null',
      MC_KT_LichThi_MaSinhVien: '15107100413',
      MC_KT_LichThi_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : 'null',
      MC_KT_LichThi_Ten: ThongTinSinhVien.Ten ? ThongTinSinhVien.Ten : 'null',
      MC_KT_LichThi_GioiTinh: false,
      MC_KT_LichThi_TenHeDaoTao: 'Đại học',
      MC_KT_LichThi_TenLoaiHinhDT: 'Chính quy đợt 1',
      MC_KT_LichThi_TenKhoaHoc: ThongTinSinhVien.KhoaHoc
        ? ThongTinSinhVien.KhoaHoc
        : 'null',
      MC_KT_LichThi_TenNganh: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_KT_LichThi_TenNghe: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_KT_LichThi_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : 'null',
      MC_KT_LichThi_DienThoai: ThongTinSinhVien.SoDienThoai
        ? ThongTinSinhVien.SoDienThoai
        : 'null',
      MC_KT_LichThi_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'null',
      MC_KT_LichThi_YeuCau: valueLiDo.toString()
        ? valueLiDo.toString()
        : 'null',
      MC_KT_LichThi_IDSinhVien: ThongTinSinhVien.IdSinhVien.toString()
        ? ThongTinSinhVien.IdSinhVien.toString()
        : 'null',
      MC_KT_LichThi_NgaySinh2: '2002-09-07T00:00:00.000Z',
      MC_KT_LichThi_MaLopHocPhan: maLopHocPhan.toString()
        ? maLopHocPhan.toString()
        : 'null',
      MC_KT_LichThi_MaMonHoc: '010100074045',
      MC_KT_LichThi_TenMonHoc: 'Giáo dục thể chất 4',
      MC_KT_LichThi_KhoaChuQuanMon: 'Khoa Giáo dục thể chất HN',
      MC_KT_LichThi_TenHinhThucThi: hinhThucThi ? hinhThucThi : 'null',
      MC_KT_LichThi_NgayThi: '2022-11-02T00:00:00.000Z',
      MC_KT_LichThi_Thu: thu.toString() ? thu.toString() : 'null',
      MC_KT_LichThi_Nhom: 'null',
      MC_KT_LichThi_TuTiet: '8',
      MC_KT_LichThi_DenTiet: '12',
      MC_KT_LichThi_TenPhong: 'Sân thể chất Lĩnh Nam 10',
      MC_KT_LichThi_YeuCau_KhongCoLich_MaLopHP: 'null',
      MC_KT_LichThi_YeuCau_KhongCoLich_TenLopHP: 'null',
      MC_KT_LichThi_YeuCau_KhongCoLich_TenPhong: 'null',
    };
    console.log('220', data);
    try {
      const response = await axios.post(apiTiepNhan, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status == 200) {
        Alert.alert('Gửi yêu cầu thành công!');
      } else {
        Alert.alert('Gửi yêu cầu thất bại!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataTenDot();
    getThongTinhSinhVien();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Lịch thi"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.viewBody}>
        <View style={styles.viewText}>
          <View style={styles.viewTextChild}>
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
              <ScrollView>
                {lido == 'Xem lịch thi' ? (
                  <Table borderStyle={styles.table}>
                    <Row
                      data={tableHead}
                      flexArr={[1, 2, 1, 1]}
                      style={styles.head}
                      textStyle={styles.text}
                    />
                    <TableWrapper style={styles.wrapper}>
                      <Rows
                        data={tableDataXemLichThi}
                        flexArr={[1, 2, 1, 1]}
                        textStyle={StyleSheet.flatten([
                          styles.text,
                          styles.row,
                        ])}
                      />
                    </TableWrapper>
                  </Table>
                ) : (
                  <Table borderStyle={styles.table}>
                    <Row
                      data={tableHead2}
                      flexArr={[1, 2, 1, 1]}
                      style={styles.head}
                      textStyle={styles.text}
                    />
                    <TableWrapper style={styles.wrapper}>
                      <Rows
                        data={tableDataXemLichThi1.map((rowData, index) => [
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
                )}
              </ScrollView>
            </View>
          </View>
        </View>

        {lido === 'Xem lịch thi' ? (
          <View style={styles.viewFooter1}>
            <View style={styles.buttonHuy}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  fetchDataXemLichThi();
                }}>
                <Text style={{color: 'black', fontSize: 21}}>Xem</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.viewFooter}>
            <View style={[styles.buttonHuy, {marginLeft: 20}]}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  Alert.alert('Data Huy: ' + dotThi, valueLiDo);
                }}>
                <Text style={{color: 'black', fontSize: 21}}>Hủy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonHuy}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  fetchDataXemLichThi();
                }}>
                <Text style={{color: 'black', fontSize: 21}}>Xem</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.buttonHuy, {marginRight: 20}]}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  fetchDataXemLichThi();
                  // console.log('Mang du lieu nhan duoc la: ' + mangDuLieuTable);
                  // console.log('Ma lop hoc phan: ', maLopHocPhan);
                  // console.log('Ten hoc phan: ', tenHocPhan);
                  // console.log('Hinh thuc thi: ', hinhThucThi);
                  // console.log('Ngay thi: ', ngayThi);
                  // console.log('Thu: ', thu);
                  // console.log('Nhom: ', nhom);
                  // console.log('Tiet: ', tiet);
                  //console.log('Phong thi: ',dotThi);
                  PostYeuCau();
                }}>
                <Text style={{color: 'black', fontSize: 21}}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default LichThi;

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
    alignItems: 'center',
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
  viewFooter1: {
    height: '10%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BEBEBE',
    justifyContent: 'center',
  },
  buttonHuy: {
    width: '25%',
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
    color: 'blue',
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
