import React, {Component, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TextInput,
  ImageBackground,
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

const KetQuaHocTap = ({navigation}: any) => {
  const dataDeNghi = [
    {labelDeNghi: 'Xem kết quả học tập', valueDeNghi: '0'},
    {labelDeNghi: 'Điều chỉnh, bổ sung: Điểm thường kỳ', valueDeNghi: '1'},
    {labelDeNghi: 'Điều chỉnh, bổ sung: Điểm thi', valueDeNghi: '2'},
  ];

  const dataDeNghiDiemThuongKy = [
    {
      labelDeNghiDTK: 'Có đi học nhưng không có điểm thường kỳ',
      valueDeNghiDTK: '0',
    },
    {
      labelDeNghiDTK:
        'Tự nhận thấy điểm thường kỳ chưa phản ánh đúng năng lực học tập. Đề nghị kiểm tra lại điểm thường kỳ.',
      valueDeNghiDTK: '1',
    },
    {
      labelDeNghiDTK: 'Điểm thường kỳ thay đổi so với trước đây xem',
      valueDeNghiDTK: '2',
    },
  ];

  const dataDeNghiDiemThi = [
    {labelDeNghiDT: 'Bị mất điểm thi trên trang cá nhân', valueDeNghiDT: '0'},
    {
      labelDeNghiDT: 'Điểm thi thay đổi so với điểm trước đây đã xem',
      valueDeNghiDT: '1',
    },
  ];

  const [tenDot, setTenDot] = useState<string[]>([]);

  const [deNghi, setDeNghi] = useState('-1');
  const [valueDeNghi, setValueDeNghi] = useState('');
  const [isFocusDeNghi, setIsFocusDeNghi] = useState(false);

  const [deNghiDTK, setDeNghiDTK] = useState('');
  const [valueDeNghiDTK, setValueDeNghiDTK] = useState('');
  const [isFocusDeNghiDTK, setIsFocusDeNghiDTK] = useState(false);

  const [deNghiDT, setDeNghiDT] = useState('');
  const [valueDeNghiDT, setValueDeNghiDT] = useState('');
  const [isFocusDeNghiDT, setIsFocusDeNghiDT] = useState(false);

  const [onClickText, setOnClickText] = useState(false);

  const [selectedHocKy, setSelectedHocKy] = useState('');

  const [monHocTheoKy, setMonHocTheoKy] = useState([]);
  const [monHocTheoKyDTK, setMonHocTheoKyDTK] = useState([]);
  const [monHocTheoKyDT, setMonHocTheoKyDT] = useState([]);

  const [hienDuLieuHocKy, setHienDuLieuHocKy] = useState({});

  const [diemThuongKy, setDiemThuongKy] = useState('');
  const [diemThi, setDiemThi] = useState('');

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

  //Lấy tên đợt
  var apiKetQuaHocTap = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_KetQuaHT_TiepNhan/EDU_Load_Para_MaSinhVien_KetQuaHT?MaSinhVien=${maSinhVien}`;
  const fetchDataKetQuaHocTap = async () => {
    try {
      const response = await axios.get(apiKetQuaHocTap, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data: string[] = response.data.body.map(
        (dt: {TenDot: string}) => dt.TenDot,
      );

      const dataTableXemKetQuaHocTap = response.data.body.map(dt => [
        dt.TenDot,
        dt.MaMonHoc,
        dt.TenMonHoc,
        dt.DiemThuongKy1,
        dt.DiemThi,
        dt.DiemTongKet,
      ]);

      var id = 0;
      const dataXemDTK = response.data.body.map(dt => [
        id++,
        dt.TenDot,
        dt.MaMonHoc,
        dt.TenMonHoc,
        dt.DiemThuongKy1,
        dt.DiemThi,
        dt.DiemTongKet,
      ]);

      var id1 = 0;
      const dataXemDT = response.data.body.map(dt => [
        id1++,
        dt.TenDot,
        dt.MaMonHoc,
        dt.TenMonHoc,
        dt.DiemThuongKy1,
        dt.DiemThi,
        dt.DiemTongKet,
      ]);

      const filteredByHocKy = dataTableXemKetQuaHocTap.filter(
        item => item[0] === selectedHocKy,
      );

      const filteredByHocKy1 = dataXemDTK.filter(
        item1 => item1[1] === selectedHocKy,
      );

      const filteredByHocKy2 = dataXemDT.filter(
        item2 => item2[1] === selectedHocKy,
      );

      setMonHocTheoKy(filteredByHocKy);
      setMonHocTheoKyDTK(filteredByHocKy1);
      setMonHocTheoKyDT(filteredByHocKy2);

      // Loại bỏ các phần tử trùng nhau
      const uniqueData = [...new Set(data)];

      setTenDot(uniqueData.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  //Xử lí check box table trùng lịch thi
  const [kiemTraChonMonHoc, setKiemTraChonMonHoc] = useState(false);
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
        monHocTheoKyDTK.map(function (tk) {
          if (tk[0] === newCheckedItems[0]) {
            setmangmonhoc([tk[0], tk[1], tk[2], tk[3], tk[4], tk[5], tk[6]]);
          }
        });
      }
    } else {
      newCheckedItems.push(rowIndex);
      monHocTheoKyDTK.map(function (tk) {
        if (tk[0] === rowIndex) {
          setmangmonhoc([tk[0], tk[1], tk[2], tk[3], tk[4], tk[5], tk[6]]);
        }
      });
    }
    setCheckedItems(newCheckedItems);
    setKiemTraChonMonHoc(newCheckedItems.length > 0);
  };

  //Hủy
  const ClearData = () => {
    setMonHocTheoKy([]);
    setMonHocTheoKyDTK([]);
    setMonHocTheoKyDT([]);
    setValueDeNghi('-1');
    setValueDeNghiDTK('-1');
    setValueDeNghiDT('-1');
    setDiemThi('');
    setDiemThuongKy('');
  };

  //post dữ liệu
  var apiTiepNhan =
    'https://apiv2.uneti.edu.vn/api/SP_MC_KT_KetQuaHT_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var data = {
      MC_KT_KetQuaHT_YeuCau: valueDeNghi.toString()
        ? valueDeNghi.toString()
        : null,
      MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCauLyDo: 'null',
      MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCau: 'null',
      MC_KT_KetQuaHT_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : null,
      MC_KT_KetQuaHT_TenDot: selectedHocKy ? selectedHocKy : null,
      MC_KT_KetQuaHT_MaSinhVien: maSinhVien.toString()
        ? maSinhVien.toString()
        : null,
      MC_KT_KetQuaHT_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : null,
      MC_KT_KetQuaHT_Ten: ThongTinSinhVien.Ten ? ThongTinSinhVien.Ten : null,
      MC_KT_KetQuaHT_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_KT_KetQuaHT_TenHeDaoTao: ThongTinSinhVien.BacDaoTao
        ? ThongTinSinhVien.BacDaoTao
        : null,
      MC_KT_KetQuaHT_TenLoaiHinhDT: ThongTinSinhVien.LoaiHinhDaoTao
        ? ThongTinSinhVien.LoaiHinhDaoTao
        : null,
      MC_KT_KetQuaHT_TenKhoaHoc: ThongTinSinhVien.KhoaHoc
        ? ThongTinSinhVien.Khoa
        : null,
      MC_KT_KetQuaHT_TenNganh: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : null,
      MC_KT_KetQuaHT_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : null,
      MC_KT_KetQuaHT_DienThoai: ThongTinSinhVien.SoDienThoai.toString()
        ? ThongTinSinhVien.SoDienThoai.toString()
        : null,
      MC_KT_KetQuaHT_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : null,
      MC_KT_KetQuaHT_NgaySinh2: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      MC_KT_KetQuaHT_IDSinhVien: ThongTinSinhVien.IdSinhVien.toString()
        ? ThongTinSinhVien.toString()
        : null,
      MC_KT_KetQuaHT_TenMonHoc: 'Kỹ năng nghề nghiệp - QTKD',
      MC_KT_KetQuaHT_DiemThuongKy1: 'null',
      MC_KT_KetQuaHT_DiemThi: '7',
      MC_KT_KetQuaHT_DiemThi1: '7',
      MC_KT_KetQuaHT_DiemThi2: 'null',
      MC_KT_KetQuaHT_DiemTongKet: '3.5',
      MC_KT_KetQuaHT_DiemTongKet1: '3.5',
      MC_KT_KetQuaHT_DiemTongKet2: 'null',
      MC_KT_KetQuaHT_DiemTinChi: '0.5',
      MC_KT_KetQuaHT_DiemChu: 'F+',
      MC_KT_KetQuaHT_IsDat: 'false',
      MC_KT_KetQuaHT_IDLopHocPhan: '133752',
      MC_KT_KetQuaHT_MaMonHoc: '002238',
      MC_KT_KetQuaHT_KhoaChuQuanMon: 'Khoa Quản trị kinh doanh HN',
      MC_KT_KetQuaHT_YeuCau_XemKetQuaHT_LyDo: '1',
      MC_KT_KetQuaHT_YeuCau_XemKetQuaHT_LyDoChiTiet: '1',
      MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCau: '9',
      MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCauLyDo:
        'Bị mất điểm thi trên trang cá nhân',
    };
    try {
      const response = await axios.post(apiTiepNhan, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === 'Bản ghi bị trùng.') {
        handleCloseModal3();
      } else {
        handleModalPress4();
      }
    } catch (error) {
      console.error(error);
    }
    handleModalPress3();
  };

  useEffect(() => {
    getThongTinhSinhVien();
    if (deNghi !== '' && valueDeNghi !== '-1') {
      fetchDataKetQuaHocTap();
    }
  }, [selectedHocKy, valueDeNghi]);

  //return
  return (
    <SafeAreaView style={styles.container}>
      <Header1 title="Kết quả học tập" onPress={() => navigation.goBack()} />

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
        message="Với đề nghị xem kết quả học tập tính năng này không gửi yêu cầu!"
      />

      <ModalThongBao
        visible={showModal6}
        onClose={handleCloseModal6}
        message="Vui lòng chọn đầy đủ dữ liệu!"
      />

      <View style={styles.viewBody}>
        <ScrollView>
          <View style={styles.viewText}>
            <View style={styles.viewTextChild}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                1.Lưu ý
              </Text>
              <Text style={styles.styleText}>
                - Người học được thắc mắc điểm quá trình trong vòng 7 ngày kể từ
                khi điểm quá trình được công bố trên trang cá nhân và sau khi
                người đọc đã phản hồi với giảng viên giảng dạy.
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                2.Nội dung đề nghị
              </Text>

              <View style={styles.viewTenDot}>
                <Text style={[styles.styleText, {marginTop: 15}]}>
                  Đề nghị: (*)
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusDeNghi && {borderColor: 'black'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={dataDeNghi}
                  maxHeight={300}
                  labelField="labelDeNghi"
                  valueField="valueDeNghi"
                  placeholder={!isFocusDeNghi ? 'Chọn đề nghị' : '...'}
                  value={valueDeNghi}
                  onFocus={() => setIsFocusDeNghi(true)}
                  onBlur={() => setIsFocusDeNghi(false)}
                  onChange={item => {
                    setValueDeNghi(item.valueDeNghi);
                    setDeNghi(item.labelDeNghi);
                    setIsFocusDeNghi(false);
                  }}
                />
              </View>

              {deNghi === 'Điều chỉnh, bổ sung: Điểm thường kỳ' ? (
                <View>
                  <View style={styles.viewTenDot}>
                    <Text style={[styles.styleText, {marginTop: 15}]}>
                      Lí do: (*)
                    </Text>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocusDeNghi && {borderColor: 'black'},
                        {marginLeft: 35},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={dataDeNghiDiemThuongKy}
                      maxHeight={300}
                      labelField="labelDeNghiDTK"
                      valueField="valueDeNghiDTK"
                      placeholder={!isFocusDeNghiDTK ? 'Chọn lí do' : '...'}
                      value={valueDeNghiDTK}
                      onFocus={() => setIsFocusDeNghiDTK(true)}
                      onBlur={() => setIsFocusDeNghiDTK(false)}
                      onChange={item => {
                        setValueDeNghiDTK(item.valueDeNghiDTK);
                        setDeNghiDTK(item.labelDeNghiDTK);
                        setIsFocusDeNghiDTK(false);
                      }}
                    />
                  </View>

                  <View style={[styles.viewTenDot, {marginTop: 10}]}>
                    <Text style={[styles.styleText, {marginTop: 7}]}>
                      Điểm thường kỳ: (*)
                    </Text>
                    <View
                      style={{
                        width: 232,
                        backgroundColor: '#ffffff',
                        marginHorizontal: 20,
                        borderRadius: 10,
                        marginTop: 1,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'gray',
                      }}>
                      <TextInput
                        textAlign="center"
                        placeholderTextColor={'gray'}
                        placeholder="0.0"
                        style={{fontSize: 18, color: 'black', height: '100%'}}
                        onChangeText={text => setDiemThuongKy(text)}
                        keyboardType="numeric"
                        value={diemThuongKy}
                      />
                    </View>
                  </View>
                </View>
              ) : null}

              {deNghi === 'Điều chỉnh, bổ sung: Điểm thi' ? (
                <View>
                  <View style={styles.viewTenDot}>
                    <Text style={[styles.styleText, {marginTop: 15}]}>
                      Lí do: (*)
                    </Text>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocusDeNghi && {borderColor: 'black'},
                        {marginLeft: 35},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={dataDeNghiDiemThi}
                      maxHeight={300}
                      labelField="labelDeNghiDT"
                      valueField="valueDeNghiDT"
                      placeholder={!isFocusDeNghiDT ? 'Chọn lí do' : '...'}
                      value={valueDeNghiDT}
                      onFocus={() => setIsFocusDeNghiDT(true)}
                      onBlur={() => setIsFocusDeNghiDT(false)}
                      onChange={item => {
                        setValueDeNghiDT(item.valueDeNghiDT);
                        setDeNghiDT(item.labelDeNghiDT);
                        setIsFocusDeNghiDT(false);
                      }}
                    />
                  </View>

                  <View style={[styles.viewTenDot, {marginTop: 10}]}>
                    <Text style={[styles.styleText, {marginTop: 7}]}>
                      Điểm thi: (*)
                    </Text>
                    <View
                      style={{
                        width: 295,
                        backgroundColor: '#ffffff',
                        marginLeft: 10,
                        borderRadius: 10,
                        marginTop: 1,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'gray',
                      }}>
                      <TextInput
                        textAlign="center"
                        placeholderTextColor={'gray'}
                        placeholder="0.0"
                        style={{fontSize: 18, color: 'black', height: '100%'}}
                        onChangeText={text => setDiemThi(text)}
                        keyboardType="numeric"
                        value={diemThi}
                      />
                    </View>
                  </View>
                </View>
              ) : null}

              {deNghi === '-1' ? (
                <ScrollView>
                  <View style={{marginTop: 20}}>
                    <ScrollView horizontal>
                      <DataTable style={{width: 700}}>
                        <DataTable.Header>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Mã môn học
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1,
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
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Điểm thường kì
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.3,
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
                        </DataTable.Header>

                        {tenDot.map((item, index) => (
                          <View>
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setSelectedHocKy(item);
                                setOnClickText(!onClickText);
                              }}>
                              <View style={styles.viewTenHocKy}>
                                {onClickText && selectedHocKy === item ? (
                                  <Image
                                    source={require('../../../../../../images/minus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                ) : (
                                  <Image
                                    source={require('../../../../../../images/plus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                )}
                                {onClickText && selectedHocKy === item ? (
                                  <Text
                                    style={[
                                      styles.styleTextBold,
                                      {color: '#245d7c'},
                                    ]}>
                                    Học kỳ: {item}
                                  </Text>
                                ) : (
                                  <Text style={[styles.styleTextBold]}>
                                    Học kỳ: {item}
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>

                            {onClickText && item === selectedHocKy
                              ? monHocTheoKy.map(item => (
                                  <View>
                                    <DataTable.Row key={item[1]}>
                                      <DataTable.Cell
                                        style={{
                                          flex: 0.5,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[1]}
                                        </Text>
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 1,
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
                                          flex: 0.5,
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                          justifyContent: 'center',
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
                                          flex: 0.3,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[4]}
                                        </Text>
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 0.5,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[5]}
                                        </Text>
                                      </DataTable.Cell>
                                    </DataTable.Row>
                                  </View>
                                ))
                              : null}
                          </View>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              ) : null}

              {deNghi === 'Xem kết quả học tập' ? (
                <ScrollView>
                  <View style={{marginTop: 20}}>
                    <ScrollView horizontal>
                      <DataTable style={{width: 700}}>
                        <DataTable.Header>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Mã môn học
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1,
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
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Điểm thường kì
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.3,
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
                        </DataTable.Header>

                        {tenDot.map((item, index) => (
                          <View>
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setSelectedHocKy(item);
                                setOnClickText(!onClickText);
                              }}>
                              <View style={styles.viewTenHocKy}>
                                {onClickText && selectedHocKy === item ? (
                                  <Image
                                    source={require('../../../../../../images/minus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                ) : (
                                  <Image
                                    source={require('../../../../../../images/plus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                )}
                                {onClickText && selectedHocKy === item ? (
                                  <Text
                                    style={[
                                      styles.styleTextBold,
                                      {color: '#245d7c'},
                                    ]}>
                                    Học kỳ: {item}
                                  </Text>
                                ) : (
                                  <Text style={[styles.styleTextBold]}>
                                    Học kỳ: {item}
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>

                            {onClickText && item === selectedHocKy
                              ? monHocTheoKy.map(item => (
                                  <View>
                                    <DataTable.Row key={item[1]}>
                                      <DataTable.Cell
                                        style={{
                                          flex: 0.5,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[1]}
                                        </Text>
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 1,
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
                                          flex: 0.5,
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                          justifyContent: 'center',
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
                                          flex: 0.3,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[4]}
                                        </Text>
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 0.5,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[5]}
                                        </Text>
                                      </DataTable.Cell>
                                    </DataTable.Row>
                                  </View>
                                ))
                              : null}
                          </View>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              ) : null}

              {deNghi === 'Điều chỉnh, bổ sung: Điểm thường kỳ' ? (
                <ScrollView>
                  <View style={{marginTop: 20}}>
                    <ScrollView horizontal>
                      <DataTable style={{width: 900}}>
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
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Mã môn học
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Tên môn học
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
                              Điểm thường kỳ
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.3,
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
                        </DataTable.Header>

                        {tenDot.map((item, index) => (
                          <View>
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setSelectedHocKy(item);
                                setOnClickText(!onClickText);
                              }}>
                              <View style={styles.viewTenHocKy}>
                                {onClickText && selectedHocKy === item ? (
                                  <Image
                                    source={require('../../../../../../images/minus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                ) : (
                                  <Image
                                    source={require('../../../../../../images/plus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                )}
                                {onClickText && selectedHocKy === item ? (
                                  <Text
                                    style={[
                                      styles.styleTextBold,
                                      {color: '#245d7c'},
                                    ]}>
                                    Học kỳ: {item}
                                  </Text>
                                ) : (
                                  <Text style={[styles.styleTextBold]}>
                                    Học kỳ: {item}
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>

                            {onClickText && item === selectedHocKy
                              ? monHocTheoKyDTK.map(item => (
                                  <View>
                                    <DataTable.Row key={item[0]}>
                                      <DataTable.Cell
                                        style={{
                                          flex: 0.35,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                        }}>
                                        <CheckBox
                                          isChecked={checkedItems.includes(
                                            item[0],
                                          )}
                                          onClick={() =>
                                            handleCheckboxToggle(item[0])
                                          }
                                          checkBoxColor="#2e6b8b"
                                        />
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 0.5,
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                          justifyContent: 'center',
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
                                          flex: 1,
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
                                          flex: 0.5,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[4]}
                                        </Text>
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 0.3,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[5]}
                                        </Text>
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 0.5,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[6]}
                                        </Text>
                                      </DataTable.Cell>
                                    </DataTable.Row>
                                  </View>
                                ))
                              : null}
                          </View>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              ) : null}

              {deNghi === 'Điều chỉnh, bổ sung: Điểm thi' ? (
                <ScrollView>
                  <View style={{marginTop: 20}}>
                    <ScrollView horizontal>
                      <DataTable style={{width: 900}}>
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
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Mã môn học
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                              Tên môn học
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
                              Điểm thường kỳ
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.3,
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
                        </DataTable.Header>

                        {tenDot.map((item, index) => (
                          <View>
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setSelectedHocKy(item);
                                setOnClickText(!onClickText);
                              }}>
                              <View style={styles.viewTenHocKy}>
                                {onClickText && selectedHocKy === item ? (
                                  <Image
                                    source={require('../../../../../../images/minus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                ) : (
                                  <Image
                                    source={require('../../../../../../images/plus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                )}
                                {onClickText && selectedHocKy === item ? (
                                  <Text
                                    style={[
                                      styles.styleTextBold,
                                      {color: '#245d7c'},
                                    ]}>
                                    Học kỳ: {item}
                                  </Text>
                                ) : (
                                  <Text style={[styles.styleTextBold]}>
                                    Học kỳ: {item}
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>

                            {onClickText && item === selectedHocKy
                              ? monHocTheoKyDT.map(item => (
                                  <View>
                                    <DataTable.Row key={item[0]}>
                                      <DataTable.Cell
                                        style={{
                                          flex: 0.35,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                        }}>
                                        <CheckBox
                                          isChecked={checkedItems.includes(
                                            item[0],
                                          )}
                                          onClick={() =>
                                            handleCheckboxToggle(item[0])
                                          }
                                          checkBoxColor="#2e6b8b"
                                        />
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 0.5,
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                          justifyContent: 'center',
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
                                          flex: 1,
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
                                          flex: 0.5,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[4]}
                                        </Text>
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 0.3,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[5]}
                                        </Text>
                                      </DataTable.Cell>

                                      <DataTable.Cell
                                        style={{
                                          flex: 0.5,
                                          justifyContent: 'center',
                                          backgroundColor: '#f7f9ff',
                                          marginLeft: 10,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: 'black',
                                          }}>
                                          {item[6]}
                                        </Text>
                                      </DataTable.Cell>
                                    </DataTable.Row>
                                  </View>
                                ))
                              : null}
                          </View>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.viewFooter}>
        <View style={[styles.buttonHuy, {marginLeft: 30}]}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              if (
                monHocTheoKy.length != 0 ||
                monHocTheoKyDTK.length != 0 ||
                monHocTheoKyDTK.length != 0
              ) {
                ClearData();
              } else {
                handleModalPress();
                setDiemThi('');
                setDiemThuongKy('');
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
              if (deNghi === 'Xem kết quả học tập') {
                handleModalPress5();
              } else {
                if (monHocTheoKyDT.length == 0 || monHocTheoKyDTK.length == 0) {
                  handleModalPress1();
                } else {
                  if (!kiemTraChonMonHoc) {
                    handleModalPress2();
                  } else {
                    // if (
                    //   valueDeNghiDT != '-1' ||
                    //   valueDeNghiDTK != '-1' ||
                    //   diemThi != '' ||
                    //   diemThuongKy != ''
                    // ) {
                    //   PostYeuCau();
                    // } else {
                    //   handleModalPress6();
                    // }

                    PostYeuCau();
                  }
                }
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

  viewTenDot: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },

  //dropdown
  dropdown: {
    flex: 1,
    marginLeft: 16,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 10,
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
  viewTenHocKy: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
  },

  iconHocKy: {
    width: 16,
    height: 16,
    tintColor: 'black',
  },
  styleTextBold: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
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

  viewFooter: {
    height: '9%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f7f9ff',
  },
});

export default KetQuaHocTap;
