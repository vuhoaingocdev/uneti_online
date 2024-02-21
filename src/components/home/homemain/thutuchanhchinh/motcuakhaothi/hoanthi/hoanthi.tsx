import React, {useState, useEffect} from 'react';
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
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
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

const Hoanthi = ({navigation}: any) => {
  const [tendot, setTenDot] = useState([]);
  const [valueDotThi, setValueDotThi] = useState('');
  const [isFocusDotThi, setIsFocusDotThi] = useState(false);
  const [dotThi, setDotThi] = useState('');

  const [loaiThi, setLoaiThi] = useState('');
  const [valueLoaiThi, setValueLoaiThi] = useState('');
  const [isFocusLoaiThi, setIsFocusLoaiThi] = useState(false);

  const [kiemTraChonMonHoc, setKiemTraChonMonHoc] = useState(false);
  const dataLoaiThi = [
    {labelLoaiThi: 'Thi lần 1', valueLoaiThi: '2'},
    {labelLoaiThi: 'Thi lại', valueLoaiThi: '3'},
  ];

  const [chitietlido, setlidochitiet] = useState('');
  const [lido, setLiDo] = useState('');
  const [valueLiDo, setValueLiDo] = useState('');
  const [isFocusLiDo, setIsFocusLiDo] = useState(false);
  const dataLiDo = [
    {labelLiDo: 'Trùng lịch thi', valueLiDo: '0'},
    {labelLiDo: 'Đi viện hoặc theo yêu cầu bác sĩ', valueLiDo: '1'},
    {labelLiDo: 'Thực hiện nhiệm vụ nhà trường giao', valueLiDo: '2'},
    {labelLiDo: 'Lý do khác', valueLiDo: '3'},
  ];

  const [dataTable, setDataTable] = useState([]);
  const [hinhanh, sethinhanh] = useState('');
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
        sethinhanh(response.assets[0].uri);
        setbase64image(
          'data:' +
            response.assets[0].type +
            ';base64,' +
            response.assets[0].base64,
        );
        setfilename(response.assets[0].fileName);
        // console.log(responsee.assets[0].base64);
        // console.log(
        //   'data:' +
        //     response.assets[0].type +
        //     ';base64,' +
        //     response.assets[0].base64,
        // );
      } catch {}
    });
  };

  const [Khoachuquan, setkhoachuquan] = useState('');

  //Load tên đợt
  var getAPI_TenDot = 'https:apiv2.uneti.edu.vn/api/SP_EDU/Load_TenDot';
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
  var apiDataTable = `https:apiv2.uneti.edu.vn/api/SP_MC_KT_HoanThi_TiepNhan/EDU_Load_Para_MaSinhVien_LichThi?MaSinhVien=${maSinhVien}&MC_KT_HoanThi_TenDot=${dotThi}&MC_KT_HoanThi_LoaiThi=${valueLoaiThi}&MC_KT_HoanThi_YeuCau=0`;
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
        dk.NgayThi,
        dk.Thu,
        dk.Nhom,
        dk.TuTiet,
        dk.DenTiet,
        dk.TenPhong,
      ]);

      setDataTable(newDataTabe);
    } catch (error) {
      console.error(error);
    }
  };

  //Lấy khoa chủ quản
  var apiDataTable = `https:apiv2.uneti.edu.vn/api/SP_MC_KT_HoanThi_TiepNhan/EDU_Load_Para_MaSinhVien_LichThi?MaSinhVien=${maSinhVien}&MC_KT_HoanThi_TenDot=${dotThi}&MC_KT_HoanThi_LoaiThi=${valueLoaiThi}&MC_KT_HoanThi_YeuCau=0`;
  const getKhoachuquanmon = async () => {
    try {
      const response = await axios.get(apiDataTable, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const getdata = response.data.body.map(dk => {
        if (dk.MaLopHocPhan === mangmonhoc[1]) {
          setkhoachuquan(dk.KhoaChuQuanMon);
        }
      });
      console.log('Khoa chủ quản: ', Khoachuquan);
    } catch (error) {
      console.error(error);
    }
  };

  //  Post yêu cầu
  var apiTiepNhan =
    'https:apiv2.uneti.edu.vn/api/SP_MC_KT_HoanThi_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var data = {
      MC_KT_HoanThi_TenDot: dotThi ? dotThi : 'null',
      MC_KT_HoanThi_LoaiThi: valueLoaiThi ? valueLoaiThi : 'null',
      MC_KT_HoanThi_YeuCau_XemLich_LyDo: valueLiDo ? valueLiDo : 'null',
      MC_KT_HoanThi_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : 'null',
      MC_KT_HoanThi_MaSinhVien: maSinhVien ? maSinhVien : 'null',
      MC_KT_HoanThi_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : 'null',
      MC_KT_HoanThi_Ten: ThongTinSinhVien.Ten ? ThongTinSinhVien.Ten : 'null',
      MC_KT_HoanThi_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_KT_HoanThi_TenHeDaoTao: ThongTinSinhVien.BacDaoTao
        ? ThongTinSinhVien.BacDaoTao
        : 'null',
      MC_KT_HoanThi_TenLoaiHinhDT: ThongTinSinhVien.LoaiHinhDaoTao
        ? ThongTinSinhVien.LoaiHinhDaoTao
        : 'null',
      MC_KT_HoanThi_TenKhoaHoc: ThongTinSinhVien.KhoaHoc
        ? ThongTinSinhVien.KhoaHoc
        : 'null',
      MC_KT_HoanThi_TenNganh: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_KT_HoanThi_TenNghe: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_KT_HoanThi_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : 'null',
      MC_KT_HoanThi_DienThoai: ThongTinSinhVien.SoDienThoai
        ? ThongTinSinhVien.SoDienThoai
        : 'null',
      MC_KT_HoanThi_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'null',
      MC_KT_HoanThi_YeuCau: valueLiDo ? valueLiDo : 'null',
      MC_KT_HoanThi_NgaySinh2: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      MC_KT_HoanThi_IDSinhVien: ThongTinSinhVien.IdSinhVien.toString()
        ? ThongTinSinhVien.IdSinhVien.toString()
        : 'null',
      MC_KT_HoanThi_MaLopHocPhan: mangmonhoc[1] ? mangmonhoc[1] : 'null',
      MC_KT_HoanThi_TenMonHoc: mangmonhoc[2] ? mangmonhoc[2] : 'null',
      MC_KT_HoanThi_KhoaChuQuanMon: Khoachuquan ? Khoachuquan : 'null',
      MC_KT_HoanThi_TenHinhThucThi: mangmonhoc[3] ? mangmonhoc[3] : 'null',
      MC_KT_HoanThi_NgayThi: mangmonhoc[4] ? mangmonhoc[4] : 'null',
      MC_KT_HoanThi_Thu: mangmonhoc[5].toString()
        ? mangmonhoc[5].toString()
        : 'null',
      MC_KT_HoanThi_Nhom: mangmonhoc[6] ? mangmonhoc[6].toString() : 'null',
      MC_KT_HoanThi_TuTiet: mangmonhoc[7].toString()
        ? mangmonhoc[7].toString()
        : 'null',
      MC_KT_HoanThi_DenTiet: mangmonhoc[8].toString()
        ? mangmonhoc[8].toString()
        : 'null',
      MC_KT_HoanThi_TenPhong: mangmonhoc[9] ? mangmonhoc[9] : 'null',
      MC_KT_HoanThi_YeuCau_LyDoKhac_LyDoChiTiet: chitietlido
        ? chitietlido
        : 'null',
      images: [
        {
          urlTemp: hinhanh,
          lastModified: '',
          MC_KT_HoanThi_YeuCau_DataFile: base64image,
          MC_KT_HoanThi_YeuCau_TenFile: filename,
        },
      ]
        ? [
            {
              urlTemp: hinhanh,
              lastModified: '',
              MC_KT_HoanThi_YeuCau_DataFile: base64image,
              MC_KT_HoanThi_YeuCau_TenFile: filename,
            },
          ]
        : 'null',
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
          `Yêu cầu hoãn thi cho môn: ${mangmonhoc[2]} đã được gửi!!`,
        );
      } else {
        if (response.status == 200) {
          Alert.alert('Thông báo', 'Gửi yêu cầu hoãn thi thành công!');
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
      dataTable.map(function (tk) {
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
        title="Hoãn thi"
        onPress={() => {
          navigation.navigate('MotCuaKhaoThi');
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
                - Thời điểm người học xin hủy đăng ký thi lại trước ngày thi 5
                ngày và người học chưa nộp lệ phí thi lại.
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
              {lido === 'Lý do khác' ? (
                <View
                  style={{
                    backgroundColor: '#DDDDDD',
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
                    Chi tiết lý do:(*)
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#E8E8E8',
                      marginHorizontal: 20,
                      borderRadius: 10,
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      placeholder="Lý do của bạn....."
                      style={{fontSize: 18}}
                      onChangeText={text => setlidochitiet(text)}
                    />
                  </View>
                </View>
              ) : null}

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={[styles.styleText, {marginTop: 20}]}>
                  Giấy tờ:(*)
                </Text>
                <ScrollView horizontal={true}>
                  <TouchableOpacity onPress={Imagepicker}>
                    <View
                      style={{
                        width: 100,
                        height: 80,
                        borderWidth: 1.5,
                        borderStyle: 'dashed',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 28,
                        borderColor: 'gray',
                      }}>
                      <Image
                        resizeMode="stretch"
                        style={{width: 35, height: 35, tintColor: '#a9a9a9'}}
                        source={require('../../../../../../images/add_image.png')}
                      />
                    </View>
                  </TouchableOpacity>
                  {hinhanh === '' ? null : (
                    <View
                      style={{
                        width: 100,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 20,
                      }}>
                      <ImageBackground
                        resizeMode="stretch"
                        style={{width: 100, height: 80}}
                        source={{uri: hinhanh}}>
                        <TouchableOpacity
                          onPress={() => {
                            sethinhanh('');
                          }}>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              marginLeft: 78,
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
                  )}
                </ScrollView>
              </View>

              <ScrollView>
                <View style={styles.container1}>
                  <ScrollView horizontal>
                    <DataTable style={{width: 1350, height: 600}}>
                      <DataTable.Header>
                        <DataTable.Title
                          style={{
                            flex: 0.65,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Chọn
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
                            Mã lớp học phần
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 1.5,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Tên Môn Học
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
                            Tên hình thức thi
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
                            flex: 1.3,
                            backgroundColor: '#245d7c',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Tên phòng
                          </Text>
                        </DataTable.Title>
                      </DataTable.Header>

                      {dataTable.map(item => (
                        <DataTable.Row key={item[0]}>
                          <DataTable.Cell
                            style={{
                              flex: 0.65,
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
                              flex: 1,
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
                              flex: 1.5,
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
                              flex: 1.2,
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
                              flex: 1,
                              justifyContent: 'center',
                              backgroundColor: '#d3d3d3',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {new Date(item[4]).toLocaleDateString('vi-VN')}
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
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              justifyContent: 'center',
                              backgroundColor: '#d3d3d3',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {item[7]} - {item[8]}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1.3,
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
      <View
        style={{
          height: '8%',
          backgroundColor: '#dcdcdc',
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
export default Hoanthi;
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
  viewHinhanh: {
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

  containerTable: {
    marginTop: 20,
    height: 650,
    width: '100%',
    overflow: 'hidden',
  },
  container1: {
    paddingTop: 20,
  },
  table: {
    borderColor: '#c8e1ff',
    borderWidth: 1,
  },
  head: {
    height: 50,
    backgroundColor: '#245d7c',
    borderColor: '#c8e1ff',
    width: '100%',
  },
  text: {
    margin: 6,
    color: 'black',
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    flex: 1,
    backgroundColor: '#999999',
  },
  row: {height: 60},

  //  dropdown
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
