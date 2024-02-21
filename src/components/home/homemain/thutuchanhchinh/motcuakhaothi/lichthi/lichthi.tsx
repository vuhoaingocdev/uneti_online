import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
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
import {
  getThongTinhSinhVien,
  ThongTinSinhVien,
} from '../../../../../../api/GetThongTinSinhVien';

function LichThi({navigation}: any) {
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
  const [tableTrungLichThi, setTableTrungLichThi] = useState([]);
  const [tableDataKhongCoLichThi, setTableDataKhongCoLichThi] = useState([]);

  const [kiemTraChonMonHoc, setKiemTraChonMonHoc] = useState(false);

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
      //console.log('Ten dot', tendot);
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

      const newTableDataXemLichThi = response.data.body.map(lt => [
        lt.MaLopHocPhan,
        lt.TenMonHoc,
        lt.TenHinhThucThi,
        new Date(lt.NgayThi).toLocaleDateString('vi-VN'),
        lt.Thu,
        lt.Nhom,
        lt.TuTiet,
        lt.DenTiet,
        lt.TenPhong,
      ]);
      var id = 0;
      const newTableDataTrungLichThi = response.data.body.map(lt => [
        id++,
        lt.MaLopHocPhan,
        lt.TenMonHoc,
        lt.TenHinhThucThi,
        new Date(lt.NgayThi).toLocaleDateString('vi-VN'),
        lt.Thu,
        lt.Nhom,
        lt.TuTiet,
        lt.DenTiet,
        lt.TenPhong,
      ]);

      var id1 = 0;
      const newTableDataKhongCoLichThi = response.data.body.map(lt => [
        id1++,
        lt.KhongCoLich_MaHocPhan,
        lt.KhongCoLich_TenMonHoc,
        lt.TenHinhThucThi,
        lt.NgayThi,
        lt.Thu,
        lt.Nhom,
        lt.TuTiet,
        lt.DenTiet,
        lt.TenPhong,
      ]);

      setTableDataXemLichThi(newTableDataXemLichThi);
      setTableTrungLichThi(newTableDataTrungLichThi);
      setTableDataKhongCoLichThi(newTableDataKhongCoLichThi);
    } catch (error) {
      console.error(error);
    }
  };

  //Xử lí check box table trùng lịch thi
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
        tableTrungLichThi.map(function (tk) {
          if (tk[0] === newCheckedItems[0]) {
            setmangmonhoc([
              tk[0],
              tk[1],
              tk[2],
              tk[3],
              tk[4],
              tk[5],
              tk[6],
              tk[7],
              tk[8],
              tk[9],
            ]);
          }
        });
      }
    } else {
      newCheckedItems.push(rowIndex);
      tableTrungLichThi.map(function (tk) {
        if (tk[0] === rowIndex) {
          setmangmonhoc([
            tk[0],
            tk[1],
            tk[2],
            tk[3],
            tk[4],
            tk[5],
            tk[6],
            tk[7],
            tk[8],
            tk[9],
          ]);
        }
      });
    }
    setCheckedItems(newCheckedItems);
    setKiemTraChonMonHoc(newCheckedItems.length > 0);
  };

  //Xử lí check box
  const handleCheckboxToggle1 = rowIndex => {
    const newCheckedItems = [...checkedItems];
    const index = newCheckedItems.indexOf(rowIndex);

    //Check box đã tồn tại rồi
    if (index !== -1) {
      newCheckedItems.splice(index, 1);
      if (newCheckedItems.length === 0) {
        setmangmonhoc([]);
      } else {
        tableDataKhongCoLichThi.map(function (tk) {
          if (tk[0] === newCheckedItems[0]) {
            setmangmonhoc([
              tk[0],
              tk[1],
              tk[2],
              tk[3],
              tk[4],
              tk[5],
              tk[6],
              tk[7],
              tk[8],
              tk[9],
            ]);
          }
        });
      }
    } else {
      newCheckedItems.push(rowIndex);
      tableDataKhongCoLichThi.map(function (tk) {
        if (tk[0] === rowIndex) {
          setmangmonhoc([
            tk[0],
            tk[1],
            tk[2],
            tk[3],
            tk[4],
            tk[5],
            tk[6],
            tk[7],
            tk[8],
            tk[9],
          ]);
        }
      });
    }
    setCheckedItems(newCheckedItems);
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
      MC_KT_LichThi_MaSinhVien: maSinhVien ? maSinhVien : 'null',
      MC_KT_LichThi_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : 'null',
      MC_KT_LichThi_Ten: ThongTinSinhVien.Ten ? ThongTinSinhVien.Ten : 'null',
      MC_KT_LichThi_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_KT_LichThi_TenHeDaoTao: ThongTinSinhVien.BacDaoTao
        ? ThongTinSinhVien.BacDaoTao
        : 'null',
      MC_KT_LichThi_TenLoaiHinhDT: ThongTinSinhVien.LoaiHinhDaoTao
        ? ThongTinSinhVien.LoaiHinhDaoTao
        : 'null',
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
      MC_KT_LichThi_NgaySinh2: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      MC_KT_LichThi_MaLopHocPhan: mangmonhoc[1].toString()
        ? mangmonhoc[1].toString()
        : 'null',
      MC_KT_LichThi_MaMonHoc: '010100074045',
      MC_KT_LichThi_TenMonHoc: mangmonhoc[2].toString()
        ? mangmonhoc[2].toString()
        : 'null',
      MC_KT_LichThi_KhoaChuQuanMon: 'Khoa Giáo dục thể chất HN',
      MC_KT_LichThi_TenHinhThucThi: mangmonhoc[3].toString()
        ? mangmonhoc[3].toString()
        : 'null',
      MC_KT_LichThi_NgayThi: '2022-11-02T00:00:00.000Z',
      MC_KT_LichThi_Thu: '4',
      MC_KT_LichThi_Nhom: mangmonhoc[6] ? mangmonhoc[6].toString() : 'null',
      MC_KT_LichThi_TuTiet: '8',
      MC_KT_LichThi_DenTiet: '12',
      MC_KT_LichThi_TenPhong: mangmonhoc[8].toString()
        ? mangmonhoc[8].toString()
        : 'null',
      MC_KT_LichThi_YeuCau_KhongCoLich_MaLopHP: 'null',
      MC_KT_LichThi_YeuCau_KhongCoLich_TenLopHP: 'null',
      MC_KT_LichThi_YeuCau_KhongCoLich_TenPhong: 'null',
      images: [],

      // MC_KT_LichThi_MaMonHoc: '010100074045',
      // MC_KT_LichThi_TenMonHoc: 'Giáo dục thể chất 4',
      // MC_KT_LichThi_KhoaChuQuanMon: 'Khoa Giáo dục thể chất HN',
      // MC_KT_LichThi_TenHinhThucThi: 'Tự luận',
      // MC_KT_LichThi_NgayThi: '2022-11-02T00:00:00.000Z',
      // MC_KT_LichThi_Thu: '4',
      // MC_KT_LichThi_Nhom: 'null',
      // MC_KT_LichThi_TuTiet: '8',
      // MC_KT_LichThi_DenTiet: '12',
      // MC_KT_LichThi_TenPhong: 'Sân thể chất Lĩnh Nam 10',
      // MC_KT_LichThi_YeuCau_KhongCoLich_MaLopHP: 'null',
      // MC_KT_LichThi_YeuCau_KhongCoLich_TenLopHP: 'null',
      // MC_KT_LichThi_YeuCau_KhongCoLich_TenPhong: 'null',
      // images: [],
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
        Alert.alert(
          'Thông báo',
          `Yêu cầu cho môn: ${mangmonhoc[2]} đã được gửi!!`,
        );
      } else {
        if (response.status == 200) {
          Alert.alert('Thông báo', 'Gửi yêu cầu thành công!');
        } else {
          Alert.alert('Thông báo', 'Gửi yêu cầu thất bại!');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ClearData = () => {
    setTableDataXemLichThi([]);
    setTableDataKhongCoLichThi([]);
    setTableTrungLichThi([]);
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
      fetchDataXemLichThi();
    }
  }, [valueDotThi, valueLoaiThi, valueLiDo]);

  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Lịch thi"
        onPress={() => {
          navigation.goBack();
        }}
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
                    styles.dropdown1,
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

              {lido === 'Xem lịch thi' ? (
                <ScrollView>
                  <View style={styles.container1}>
                    <ScrollView horizontal>
                      <DataTable style={{width: 1350, height: 600}}>
                        <DataTable.Header>
                          <DataTable.Title
                            style={{
                              flex: 0.9,
                              backgroundColor: '#2e6b8b',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Mã lớp học phần
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1.1,
                              backgroundColor: '#2e6b8b',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Tên học phần
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1.1,
                              backgroundColor: '#2e6b8b',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Hình thức thi
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
                              Ngày thi
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
                              Thứ
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
                              Nhóm
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
                              Tiết
                            </Text>
                          </DataTable.Title>

                          <DataTable.Title
                            style={{
                              flex: 1.2,
                              backgroundColor: '#2e6b8b',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Tên phòng
                            </Text>
                          </DataTable.Title>
                        </DataTable.Header>

                        {tableDataXemLichThi.map(item => (
                          <DataTable.Row key={item[0]}>
                            <DataTable.Cell
                              style={{
                                flex: 0.9,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[0]}
                              </Text>
                            </DataTable.Cell>

                            <DataTable.Cell
                              style={{
                                flex: 1.1,
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: 'black',
                                  marginLeft: 10,
                                }}>
                                {item[1]}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell
                              style={{
                                flex: 1.1,
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
                                flex: 0.9,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[3]}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell
                              style={{
                                flex: 0.5,
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
                                {`${item[6]} - ${item[7]}`}
                              </Text>
                            </DataTable.Title>

                            <DataTable.Title
                              style={{
                                flex: 1.2,
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: 'black',
                                }}>
                                {item[8]}
                              </Text>
                            </DataTable.Title>
                          </DataTable.Row>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              ) : lido === 'Trùng lịch thi' ? (
                <ScrollView>
                  <View style={styles.container1}>
                    <ScrollView horizontal>
                      <DataTable style={{width: 1500, height: 600}}>
                        <DataTable.Header>
                          <DataTable.Title
                            style={{
                              flex: 0.6,
                              backgroundColor: '#2e6b8b',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Chọn
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
                              Mã lớp học phần
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1.3,
                              backgroundColor: '#2e6b8b',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Tên học phần
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1.1,
                              backgroundColor: '#2e6b8b',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Hình thức thi
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
                              Ngày thi
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
                              Thứ
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
                              Nhóm
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
                              Tiết
                            </Text>
                          </DataTable.Title>

                          <DataTable.Title
                            style={{
                              flex: 1.2,
                              backgroundColor: '#2e6b8b',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Tên phòng
                            </Text>
                          </DataTable.Title>
                        </DataTable.Header>

                        {tableTrungLichThi.map(item => (
                          <DataTable.Row key={item[0]}>
                            <DataTable.Cell
                              style={{
                                flex: 0.6,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                              }}>
                              <CheckBox
                                isChecked={checkedItems.includes(item[0])}
                                onClick={() => handleCheckboxToggle(item[0])}
                                checkBoxColor="#2e6b8b"
                              />
                            </DataTable.Cell>

                            <DataTable.Cell
                              style={{
                                flex: 0.9,
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
                                flex: 1.3,
                                alignItems: 'center',
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
                                flex: 1.1,
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
                                flex: 0.9,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[4]}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell
                              style={{
                                flex: 0.5,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[5]}
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
                                {item[6]}
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
                                {`${item[7]} - ${item[8]}`}
                              </Text>
                            </DataTable.Title>

                            <DataTable.Title
                              style={{
                                flex: 1.2,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[9]}
                              </Text>
                            </DataTable.Title>
                          </DataTable.Row>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              ) : (
                <ScrollView>
                  <View style={styles.container1}>
                    <ScrollView horizontal>
                      <DataTable style={{width: 1500, height: 600}}>
                        <DataTable.Header>
                          <DataTable.Title
                            style={{
                              flex: 0.6,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Chọn
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.9,
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
                              flex: 1.3,
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
                              flex: 1.1,
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
                              flex: 0.9,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Ngày thi
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
                              Thứ
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
                              Nhóm
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
                              Tiết
                            </Text>
                          </DataTable.Title>

                          <DataTable.Title
                            style={{
                              flex: 1.2,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Tên phòng
                            </Text>
                          </DataTable.Title>
                        </DataTable.Header>

                        {tableDataKhongCoLichThi.map(item => (
                          <DataTable.Row key={item[0]}>
                            <DataTable.Cell
                              style={{
                                flex: 0.6,
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
                                flex: 0.9,
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
                                flex: 1.3,
                                alignItems: 'center',
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
                                flex: 1.1,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[3]}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell
                              style={{
                                flex: 0.9,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[4]}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell
                              style={{
                                flex: 0.5,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[5]}
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
                                {item[6]}
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
                                {`${item[7]} - ${item[8]}`}
                              </Text>
                            </DataTable.Title>

                            <DataTable.Title
                              style={{
                                flex: 1.2,
                                justifyContent: 'center',
                                backgroundColor: '#d3d3d3',
                                marginLeft: 10,
                              }}>
                              <Text style={{fontSize: 16, color: 'black'}}>
                                {item[9]}
                              </Text>
                            </DataTable.Title>
                          </DataTable.Row>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </ScrollView>

        {lido === 'Xem lịch thi' ? (
          <View style={styles.viewFooter1}>
            <View style={styles.buttonHuy}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  if (
                    tableDataKhongCoLichThi.length != 0 ||
                    tableTrungLichThi.length != 0
                  ) {
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
          </View>
        ) : (
          <View style={styles.viewFooter}>
            <View style={[styles.buttonHuy, {marginLeft: 30}]}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  if (
                    tableDataKhongCoLichThi.length != 0 ||
                    tableTrungLichThi.length != 0
                  ) {
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
                  if (
                    tableDataKhongCoLichThi.length == 0 ||
                    tableTrungLichThi.length == 0
                  ) {
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
        )}
      </View>

      <View
        style={{
          height: '8%',
          backgroundColor: '#dcdcdc',
          width: '100%',
        }}>
        <View
          style={{
            height: '100%',
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
    backgroundColor: '#dcdcdc',
  },
  viewFooter1: {
    height: '12%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dcdcdc',
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
