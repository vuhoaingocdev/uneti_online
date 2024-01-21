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
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import {token} from '../../../../../login/login';
import {maSinhVien} from '../../../../../login/login';
var IdSinhVien,
  Hodem,
  Ten,
  GioiTinh,
  NgaySinh,
  NoiSinh,
  SoCMND,
  NgayCapCMND,
  NoiCapCMND,
  SoTaiKhoan,
  TenTaiKhoan,
  ChiNhanhNganHang,
  Email_TruongCap,
  SoDienThoai,
  SoDienThoai2,
  SoDienThoai3,
  DiaChiThuongTru,
  DiaChiLienHe,
  SoDienThoaiPhuHuynh,
  ThoiGianVaoTruong,
  TrangThaiHocTap,
  CoSo,
  KhoaHoc,
  Khoa,
  BacDaoTao,
  LoaiHinhDaoTao,
  ChuyenNganh,
  LopHoc,
  Role;
import CheckBox from '@react-native-community/checkbox';

const dataLoaiThi = [
  {labelLoaiThi: 'Thi lần 1', valueLoaiThi: '2'},
  {labelLoaiThi: 'Thi lại', valueLoaiThi: '1'},
];

const tableHead = [
  'Chọn',
  'Mã lớp học phần',
  'Tên học phần',
  'Hình thức thi',
  'Ngày thi',
  'Điểm thi',
  'Điểm tổng kết',
];

const getapi = 'https://apiv2.uneti.edu.vn/api/SP_EDU/Load_TenDot';

const bienToanCuc = {
  checkBoxValue: '',
  maLopHocPhan: '',
  tenMonHoc: '',
  hinhThucThi: '',
  ngayThi: '',
  diemThi: '',
  diemTongKet: '',
};

var thu, nhom, tuTiet, denTiet, khoaChuQuanMon, ngayThi, ngaySinh;

function PhucKhao({navigation}: any) {
  const [tendot, setTenDot] = useState([]);
  const [valueDotThi, setValueDotThi] = useState('');
  const [isFocusDotThi, setIsFocusDotThi] = useState(false);
  const [dotThi, setDotThi] = useState('');

  const [loaiThi, setLoaiThi] = useState('');
  const [valueLoaiThi, setValueLoaiThi] = useState('');
  const [isFocusLoaiThi, setIsFocusLoaiThi] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const [countDem, setCountDem] = useState(false);

  //Lấy giá trị
  // const bienToanCuc = {
  //   checkBoxValue: '',
  //   maLopHocPhan: '',
  //   tenMonHoc: '',
  //   hinhThucThi: '',
  //   ngayThi: '',
  //   diemThi: '',
  //   diemTongKet: '',
  // };

  var selectedData;
  function LayDuLieuCheckBox() {
    selectedData = selectedRows.map((index: number) => tableData[index] as any);

    selectedData.forEach((row: any) => {
      [
        bienToanCuc.checkBoxValue,
        bienToanCuc.maLopHocPhan,
        bienToanCuc.tenMonHoc,
        bienToanCuc.hinhThucThi,
        bienToanCuc.ngayThi,
        bienToanCuc.diemThi,
        bienToanCuc.diemTongKet,
      ] = row;
    });

    console.log('------------------------------------------------');
    console.log('Mã lớp học phần:', bienToanCuc.maLopHocPhan);
    console.log('Tên môn học:', bienToanCuc.tenMonHoc);
    console.log('Hình thức thi:', bienToanCuc.hinhThucThi);
    console.log('Ngày thi:', bienToanCuc.ngayThi);
    console.log('Điểm thi:', bienToanCuc.diemThi);
    console.log('Điểm tổng kết:', bienToanCuc.diemTongKet);
  }

  const getAPISinhVien =
    'https://apiv2.uneti.edu.vn/api/SP_MC_MaSinhVien/Load_Web_App_Para';

  const fetchDataSinhVien = async () => {
    try {
      const response = await axios.post(
        getAPISinhVien,
        {
          TC_SV_MaSinhVien: maSinhVien,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(response.data.body);
      response.data.body.map(function (td) {
        IdSinhVien = td.IdSinhVien;
        Hodem = td.HoDem;
        Ten = td.Ten;
        GioiTinh = td.GioiTinh;
        NgaySinh = td.NgaySinh;
        NoiSinh = td.NoiSinh;
        SoCMND = td.SoCMND;
        NgayCapCMND = td.NgayCapCMND;
        NoiCapCMND = td.NoiCapCMND;
        SoTaiKhoan = td.SoTaiKhoan;
        TenTaiKhoan = td.TenTaiKhoan;
        ChiNhanhNganHang = td.ChiNhanhNganHang;
        Email_TruongCap = td.Email_TruongCap;
        SoDienThoai = td.SoDienThoai;
        SoDienThoai2 = td.SoDienThoai2;
        SoDienThoai3 = td.SoDienThoai3;
        DiaChiThuongTru = td.DiaChiThuongTru;
        DiaChiLienHe = td.DiaChiLienHe;
        SoDienThoaiPhuHuynh = td.SoDienThoaiPhuHuynh;
        ThoiGianVaoTruong = td.ThoiGianVaoTruong;
        TrangThaiHocTap = td.TrangThaiHocTap;
        CoSo = td.CoSo;
        KhoaHoc = td.KhoaHoc;
        Khoa = td.Khoa;
        BacDaoTao = td.BacDaoTao;
        LoaiHinhDaoTao = td.LoaiHinhDaoTao;
        ChuyenNganh = td.ChuyenNganh;
        LopHoc = td.LopHoc;
        Role = td.Role;
      });
    } catch (error) {
      console.error(error);
    }
  };

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
      console.log('Ten dot', tendot);
    } catch (error) {
      console.error(error);
    }
  };
  //var MangMonHoc = [];
  //const getAPI = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_PhucKhao_TiepNhan/EDU_Load_R_Para_MaSinhVien_KetQuaHT?MaSinhVien=${maSinhVien}&MC_KT_PhucKhao_TenDot=${dotThi}&MC_KT_PhucKhao_LoaiThi=${valueLoaiThi}&MC_KT_LichThi_YeuCau=0`;

  // var thu, nhom, tuTiet, denTiet, khoaChuQuanMon;
  const getAPI = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_PhucKhao_TiepNhan/EDU_Load_R_Para_MaSinhVien_KetQuaHT?MaSinhVien=${maSinhVien}&MC_KT_PhucKhao_TenDot=${dotThi}&MC_KT_PhucKhao_LoaiThi=${valueLoaiThi}`;
  const fetchDataMonHoc = async () => {
    try {
      const response = await axios.get(getAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const newTableData = response.data.body.map(mh => [
        '',
        mh.MaLopHocPhan,
        mh.TenMonHoc,
        mh.TenHinhThucThi,
        new Date(mh.NgayThi).toLocaleDateString('vi-VN'),
        mh.DiemThi,
        mh.DiemTongKet1,
      ]);

      const getData = response.data.body.map(tk => {
        if (tk.MaLopHocPhan === bienToanCuc.maLopHocPhan) {
          nhom = tk.Nhom;
          thu = tk.Thu;
          tuTiet = tk.TuTiet;
          denTiet = tk.DenTiet;
          khoaChuQuanMon = tk.KhoaChuQuanMon;
          ngayThi = tk.NgayThi;
          ngaySinh = tk.NgaySinh;
        }
      });

      console.log(
        'Data toi can : ',
        nhom,
        thu,
        tuTiet,
        denTiet,
        khoaChuQuanMon,
      );

      console.log('====================Kiem tra thong tin====================');
      console.log('1.', dotThi);
      console.log('2.', loaiThi);
      console.log('3.', CoSo);
      console.log('4.', maSinhVien);
      console.log('5.', Hodem);
      console.log('6.', Ten);
      console.log('7.', GioiTinh);
      console.log('8.', BacDaoTao);
      console.log('9.', LoaiHinhDaoTao);
      console.log('10.', KhoaHoc);
      console.log('11.', ChuyenNganh);
      console.log('12.', LopHoc);
      console.log('13.', SoDienThoai);
      console.log('14.', Email_TruongCap);
      console.log('15.', `${IdSinhVien}`);
      console.log('16.', NgaySinh + 'T00:00:00.000Z');
      console.log('17.', bienToanCuc.maLopHocPhan);
      console.log('18.', bienToanCuc.tenMonHoc);
      console.log('19.', khoaChuQuanMon);
      console.log('20.', bienToanCuc.hinhThucThi);
      console.log('21.', ngayThi);
      console.log('22.', thu);
      console.log('23.', nhom);
      console.log('24.', tuTiet);
      console.log('25.', denTiet);
      console.log('26.', bienToanCuc.diemThi);
      console.log('27.', bienToanCuc.diemTongKet);

      // const getData = response.data.body.map(tk => [
      //   tk.Thu,
      //   tk.Nhom,
      //   tk.TuTiet,
      //   tk.DenTiet,
      //   tk.KhoaChuQuanMon,
      // ]);

      console.log('Mang:', newTableData);
      //console.log('Data toi can: ', getData);
      setTableData(newTableData);
    } catch (error) {
      console.error(error);
    }
  };

  //post phuc khảo
  var apiPhucKhao =
    'https://apiv2.uneti.edu.vn/api/SP_MC_KT_PhucKhao_TiepNhan/Add_Para';
  console.log('181', token);
  const PostSinhVien = async () => {
    var data = {
      MC_KT_PhucKhao_TenDot: dotThi,
      MC_KT_PhucKhao_LoaiThi: loaiThi,
      MC_KT_PhucKhao_TenCoSo: CoSo,
      MC_KT_PhucKhao_MaSinhVien: maSinhVien,
      MC_KT_PhucKhao_HoDem: Hodem,
      MC_KT_PhucKhao_Ten: Ten,
      MC_KT_PhucKhao_GioiTinh: GioiTinh,
      MC_KT_PhucKhao_TenHeDaoTao: BacDaoTao,
      MC_KT_PhucKhao_TenLoaiHinhDT: LoaiHinhDaoTao,
      MC_KT_PhucKhao_TenKhoaHoc: KhoaHoc,
      MC_KT_PhucKhao_TenNganh: ChuyenNganh,
      MC_KT_PhucKhao_TenNghe: ChuyenNganh,
      MC_KT_PhucKhao_TenLop: LopHoc,
      MC_KT_PhucKhao_DienThoai: SoDienThoai,
      MC_KT_PhucKhao_Email: Email_TruongCap,
      MC_KT_PhucKhao_IDSinhVien: `${IdSinhVien}`,
      MC_KT_PhucKhao_NgaySinh2: ngayThi,
      MC_KT_PhucKhao_MaLopHocPhan: bienToanCuc.maLopHocPhan.toString(),
      MC_KT_PhucKhao_TenMonHoc: bienToanCuc.tenMonHoc,
      MC_KT_PhucKhao_KhoaChuQuanMon: khoaChuQuanMon,
      MC_KT_PhucKhao_TenHinhThucThi: bienToanCuc.hinhThucThi,
      MC_KT_PhucKhao_NgayThi: ngayThi,
      MC_KT_PhucKhao_Thu: thu.toString(),
      MC_KT_PhucKhao_Nhom: nhom.toString(),
      MC_KT_PhucKhao_TuTiet: tuTiet.toString(),
      MC_KT_PhucKhao_DenTiet: denTiet.toString(),
      MC_KT_PhucKhao_TenPhong: 'https://meet.google.com/hdb-foua-sro',
      MC_KT_PhucKhao_SBD: 'null',
      MC_KT_PhucKhao_DiemThi: bienToanCuc.diemThi.toString(),
      MC_KT_PhucKhao_DiemThi1: bienToanCuc.diemThi.toString(),
      MC_KT_PhucKhao_DiemThi2: 'null',
      MC_KT_PhucKhao_DiemTongKet: bienToanCuc.diemTongKet.toString(),
      MC_KT_PhucKhao_DiemTongKet1: bienToanCuc.diemTongKet.toString(),
      MC_KT_PhucKhao_DiemTongKet2: 'null',
      MC_KT_PhucKhao_TuiBaiThi: 'null',
      MC_KT_PhucKhao_SoPhach: 'null',
    };
    console.log('220', data);
    try {
      const response = await axios.post(apiPhucKhao, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('227', response.data.message);
      if (response.data.message === 'Bản ghi bị trùng.') {
        Alert.alert('Môn học đã được phúc khảo!!Vui lòng kiểm tra lại.');
      } else {
        Alert.alert('Phúc khảo thành công!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ClearDataTable = () => {
    setTableData([]);
    setValueDotThi('-1');
    setValueLoaiThi('-1');
  };

  //Call api
  useEffect(() => {
    fetchData();
    fetchDataSinhVien();
    LayDuLieuCheckBox();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Phúc khảo"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.viewBody}>
        <View style={styles.viewText}>
          <View style={styles.viewTextChild}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              1.Lưu ý
            </Text>
            <Text style={styles.styleText}>
              - Người họ thực hiện phúc khảo kết quả bài thi theo kế hoạch tổ
              chức thi (Ngày nộp đơn phúc khảo) tron từng học kỳ.
            </Text>

            <Text style={styles.styleText}>
              - Lệ phí phúc khảo kết quả học tập: Có mức thu theo quy định, được
              chuyển trực tiếp vào công nợ, người học nộp cùng học phí kì kế
              tiếp.
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

            <View style={styles.viewTable}>
              <ScrollView
                horizontal
                // showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                <ScrollView>
                  <Table>
                    <Row
                      data={tableHead}
                      style={[styles.head]}
                      textStyle={styles.texthead}
                    />
                    <Rows
                      data={tableData.map((rowData, rowIndex) => {
                        const isChecked = checkedItems[rowIndex] || false;

                        return [
                          <CheckBox
                            key={rowIndex}
                            value={isChecked}
                            onValueChange={() => {
                              const newSelectedRows = [...selectedRows];
                              const newCheckedItems = {...checkedItems};

                              if (isChecked) {
                                const index = newSelectedRows.indexOf(rowIndex);
                                if (index !== -1) {
                                  newSelectedRows.splice(index, 1);
                                }
                              } else {
                                newSelectedRows.push(rowIndex);
                              }

                              setSelectedRows(newSelectedRows);

                              Object.keys(newCheckedItems).forEach(key => {
                                newCheckedItems[key] = false;
                              });
                              newCheckedItems[rowIndex] = !isChecked;
                              setCheckedItems(newCheckedItems);
                            }}
                          />,
                          ...rowData,
                        ];
                      })}
                      style={styles.body}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.viewFooter}>
          <View style={styles.buttonHuy}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                ClearDataTable();
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Hủy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonXacNhan}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                setCountDem(!countDem);
                if (selectedRows.length == 0) {
                  Alert.alert('Mời bạn chọn môn cần phúc khảo!');
                } else {
                  LayDuLieuCheckBox();
                  fetchDataMonHoc();
                }
              }}>
              <Text style={{color: 'black', fontSize: 17}}>Xác nhận</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonHienThi}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                if (dotThi === '' || loaiThi === '') {
                  Alert.alert('Mời chọn đợt thi và loại thi!');
                } else {
                  LayDuLieuCheckBox();
                  fetchDataMonHoc();
                }
              }}>
              <Text style={{color: 'black', fontSize: 17}}>Hiển thị</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonLuu}>
            <TouchableOpacity
              onPress={() => {
                if (countDem == true) {
                  if (selectedRows.length == 0) {
                    Alert.alert('Mời bạn xác nhận trước khi lưu!');
                  } else {
                    PostSinhVien();
                  }
                } else {
                  Alert.alert('Mời bạn xác nhận trước khi lưu!');
                }
              }}
              style={styles.touchableOpacity}>
              <Text style={{color: 'black', fontSize: 17}}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PhucKhao;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#528B8B',
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
    textAlign: 'left',
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

  viewTenDot: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },

  viewTable: {
    width: '100%',
    height: 220,
    borderWidth: 1,
    borderColor: 'gray',
  },

  viewFooter: {
    height: '10%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#BEBEBE',
  },
  buttonHuy: {
    width: '20%',
    height: 45,
    marginLeft: 30,
    borderRadius: 40,
    backgroundColor: '#F8F8FF',
  },

  buttonXacNhan: {
    width: '20%',
    height: 45,
    borderRadius: 40,
    backgroundColor: '#F8F8FF',
  },
  buttonHienThi: {
    width: '20%',
    height: 45,
    borderRadius: 40,
    backgroundColor: '#F8F8FF',
  },
  buttonLuu: {
    width: '20%',
    height: 45,
    marginRight: 30,
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

  scrollContainer: {
    flexDirection: 'row',
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

  head: {
    height: 40,
    backgroundColor: '#245d7c',
    color: 'white',
    textAlign: 'center',
  },
  body: {
    height: 40,
    backgroundColor: '#CCCCCC',
    color: 'white',
    borderColor: 'black',
    borderWidth: 0.6,
  },
  text: {
    position: 'absolute',
    left: 0,
    color: 'black',
    textAlign: 'center',
  },
  texthead: {
    marginLeft: 100,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
