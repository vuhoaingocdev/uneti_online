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
import ModalThongBao1 from '../../../../untils/modalThongBao/modalYesNo';
import {
  getThongTinhSinhVien,
  ThongTinSinhVien,
} from '../../../../../../api/GetThongTinSinhVien';

const dataLoaiThi = [
  {labelLoaiThi: 'Thi lần 1', valueLoaiThi: '2'},
  {labelLoaiThi: 'Thi lại', valueLoaiThi: '1'},
];

const PhucKhao = ({navigation}: any) => {
  const [tendot, setTenDot] = useState([]);
  const [valueDotThi, setValueDotThi] = useState('');
  const [isFocusDotThi, setIsFocusDotThi] = useState(false);
  const [dotThi, setDotThi] = useState('');

  const [loaiThi, setLoaiThi] = useState('');
  const [valueLoaiThi, setValueLoaiThi] = useState('');
  const [isFocusLoaiThi, setIsFocusLoaiThi] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [kiemTraChonMonHoc, setKiemTraChonMonHoc] = useState(false);

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
    setShowModal5(false);
  };

  const xuLiPost = () => {
    PostYeuCau();
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

  //
  const getAPI = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_PhucKhao_TiepNhan/EDU_Load_R_Para_MaSinhVien_KetQuaHT?MaSinhVien=${maSinhVien}&MC_KT_PhucKhao_TenDot=${dotThi}&MC_KT_PhucKhao_LoaiThi=${valueLoaiThi}`;
  const getDataTable = async () => {
    try {
      const response = await axios.get(getAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      var id = 0;
      const newTableData = response.data.body.map(mh => [
        id++,
        mh.MaLopHocPhan,
        mh.TenMonHoc,
        mh.TenHinhThucThi,
        new Date(mh.NgayThi).toLocaleDateString('vi-VN'),
        mh.DiemThi,
        mh.DiemTongKet1,
      ]);

      setTableData(newTableData);
    } catch (error) {
      console.error(error);
    }
  };

  //Xử lí check box
  const [checkedItems, setCheckedItems] = useState([]);
  // const [mangmonhoc, setmangmonhoc] = useState([]);

  // const handleCheckboxToggle = rowIndex => {
  //   const newCheckedItems = [...checkedItems];
  //   const index = newCheckedItems.indexOf(rowIndex);

  //   //Check box đã tồn tại rồi
  //   if (index !== -1) {
  //     newCheckedItems.splice(index, 1);
  //     if (newCheckedItems.length === 0) {
  //       setmangmonhoc([]);
  //     } else {
  //       tableData.map(function (tk) {
  //         if (tk[0] === newCheckedItems[0]) {
  //           setmangmonhoc([tk[0], tk[1], tk[2], tk[3], tk[4], tk[5], tk[6]]);
  //         }
  //       });
  //     }
  //   } else {
  //     newCheckedItems.push(rowIndex);
  //     tableData.map(function (tk) {
  //       if (tk[0] === rowIndex) {
  //         setmangmonhoc([tk[0], tk[1], tk[2], tk[3], tk[4], tk[5], tk[6]]);
  //       }
  //     });
  //   }
  //   setCheckedItems(newCheckedItems);
  //   setKiemTraChonMonHoc(newCheckedItems.length > 0);
  // };

  //post phuc khảo
  // Định nghĩa kiểu dữ liệu cho mảng môn học

  type MonHoc = {
    id: number;
    maLopHocPhan: string;
    tenMonHoc: string;
    hinhThucThi: string;
    ngayThi: string;
    diemThi: number;
    diemTongKet: number;
  };

  // Khởi tạo mảng môn học với kiểu dữ liệu đã định nghĩa
  const [mangmonhoc, setmangmonhoc] = useState<MonHoc[]>([]);
  // Xử lý khi checkbox được chọn hoặc bỏ chọn
  const handleCheckboxToggle = (rowIndex: number) => {
    const newCheckedItems = [...checkedItems];
    const index = newCheckedItems.indexOf(rowIndex);

    // Nếu checkbox được chọn đã tồn tại trong mảng, loại bỏ nó
    if (index !== -1) {
      newCheckedItems.splice(index, 1);
    } else {
      // Nếu không, loại bỏ checkbox đầu tiên trong mảng
      if (newCheckedItems.length > 0) {
        newCheckedItems.splice(0, 1);
      }
      newCheckedItems.push(rowIndex);
    }

    // Cập nhật mảng checkedItems với chỉ một checkbox được chọn
    setCheckedItems(newCheckedItems);

    // Cập nhật mảng môn học tương ứng
    const newMangMonHoc: MonHoc[] = [];
    newCheckedItems.forEach(id => {
      const monHoc = tableData.find(item => item[0] === id);
      if (monHoc) {
        newMangMonHoc.push({
          id: monHoc[0],
          maLopHocPhan: monHoc[1],
          tenMonHoc: monHoc[2],
          hinhThucThi: monHoc[3],
          ngayThi: monHoc[4],
          diemThi: monHoc[5],
          diemTongKet: monHoc[6],
        });
      }
    });
    setmangmonhoc(newMangMonHoc);

    // Cập nhật kiểm tra chọn môn học
    setKiemTraChonMonHoc(newCheckedItems.length > 0);
  };

  var apiPhucKhao =
    'https://apiv2.uneti.edu.vn/api/SP_MC_KT_PhucKhao_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var postdata = {
      MC_KT_PhucKhao_TenDot: dotThi ? dotThi : 'null',
      MC_KT_PhucKhao_LoaiThi: loaiThi ? loaiThi : 'null',
      MC_KT_PhucKhao_TenCoSo: ThongTinSinhVien.CoSo
        ? ThongTinSinhVien.CoSo
        : 'null',
      MC_KT_PhucKhao_MaSinhVien: maSinhVien ? maSinhVien : 'null',
      MC_KT_PhucKhao_HoDem: ThongTinSinhVien.Hodem
        ? ThongTinSinhVien.Hodem
        : 'null',
      MC_KT_PhucKhao_Ten: ThongTinSinhVien.Ten ? ThongTinSinhVien.Ten : 'null',
      MC_KT_PhucKhao_GioiTinh: ThongTinSinhVien.GioiTinh,
      MC_KT_PhucKhao_TenHeDaoTao: ThongTinSinhVien.BacDaoTao
        ? ThongTinSinhVien.BacDaoTao
        : 'null',
      MC_KT_PhucKhao_TenLoaiHinhDT: ThongTinSinhVien.LoaiHinhDaoTao
        ? ThongTinSinhVien.LoaiHinhDaoTao
        : 'null',
      MC_KT_PhucKhao_TenKhoaHoc: ThongTinSinhVien.KhoaHoc
        ? ThongTinSinhVien.KhoaHoc
        : 'null',
      MC_KT_PhucKhao_TenNganh: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_KT_PhucKhao_TenNghe: ThongTinSinhVien.ChuyenNganh
        ? ThongTinSinhVien.ChuyenNganh
        : 'null',
      MC_KT_PhucKhao_TenLop: ThongTinSinhVien.LopHoc
        ? ThongTinSinhVien.LopHoc
        : 'null',
      MC_KT_PhucKhao_DienThoai: ThongTinSinhVien.SoDienThoai
        ? ThongTinSinhVien.SoDienThoai
        : 'null',
      MC_KT_PhucKhao_Email: ThongTinSinhVien.Email_TruongCap
        ? ThongTinSinhVien.Email_TruongCap
        : 'null',
      MC_KT_PhucKhao_IDSinhVien: ThongTinSinhVien.IdSinhVien.toString()
        ? ThongTinSinhVien.IdSinhVien.toString()
        : 'null',
      MC_KT_PhucKhao_NgaySinh2: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      // data from table
      //MC_KT_PhucKhao_MaLopHocPhan: mangmonhoc[0].maLopHocPhan.toString(),
      MC_KT_PhucKhao_MaLopHocPhan: mangmonhoc[0].maLopHocPhan.toString(),
      MC_KT_PhucKhao_TenMonHoc: 'Tiếng anh 4',
      MC_KT_PhucKhao_KhoaChuQuanMon: ThongTinSinhVien.Khoa
        ? ThongTinSinhVien.Khoa
        : 'null',
      MC_KT_PhucKhao_TenHinhThucThi: 'Tự luận',
      MC_KT_PhucKhao_NgayThi: moment
        .utc(ThongTinSinhVien.NgaySinh, 'DD/MM/YYYY')
        .toISOString(),
      MC_KT_PhucKhao_Thu: '2',
      MC_KT_PhucKhao_Nhom: '1',
      MC_KT_PhucKhao_TuTiet: '2',
      MC_KT_PhucKhao_DenTiet: '3',
      MC_KT_PhucKhao_TenPhong: 'https://meet.google.com/hdb-foua-sro',
      MC_KT_PhucKhao_SBD: 'null',
      MC_KT_PhucKhao_DiemThi: '7',
      MC_KT_PhucKhao_DiemThi1: '7',
      MC_KT_PhucKhao_DiemThi2: 'null',
      MC_KT_PhucKhao_DiemTongKet: '8',
      MC_KT_PhucKhao_DiemTongKet1: '8',
      MC_KT_PhucKhao_DiemTongKet2: 'null',
      MC_KT_PhucKhao_TuiBaiThi: 'null',
      MC_KT_PhucKhao_SoPhach: 'null',
    };

    try {
      const response = await axios.post(apiPhucKhao, postdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message === 'Bản ghi bị trùng.') {
        handleModalPress3();
      } else {
        handleModalPress4();
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
    getThongTinhSinhVien();
    if (
      dotThi !== '' &&
      loaiThi !== '' &&
      valueDotThi !== '-1' &&
      valueLoaiThi !== '-1'
    ) {
      getDataTable();
    }
  }, [valueDotThi, valueLoaiThi]);

  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Phúc khảo"
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
        message="Môn học này đã được phúc khảo! Vui lòng kiểm tra lại!"
      />

      <ModalThongBao
        visible={showModal4}
        onClose={handleCloseModal4}
        message="Gửi phúc khảo thành công!"
      />
      <ModalThongBao1
        visible={showModal5}
        onClose={handleCloseModal5}
        onOK={xuLiPost}
        message="Gửi phúc khảo thành công!"
      />

      <View style={styles.viewBody}>
        <ScrollView>
          <View style={styles.viewText}>
            <View style={styles.viewTextChild}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                1.Lưu ý
              </Text>
              <Text style={styles.styleText}>
                - Người họ thực hiện phúc khảo kết quả bài thi theo kế hoạch tổ
                chức thi (Ngày nộp đơn phúc khảo) trong từng học kỳ.
              </Text>

              <Text style={styles.styleText}>
                - Lệ phí phúc khảo kết quả học tập: Có mức thu theo quy định,
                được chuyển trực tiếp vào công nợ, người học nộp cùng học phí kì
                kế tiếp.
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
                    styles.dropdown1,
                    isFocusLoaiThi && {borderColor: 'black'},
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

              <ScrollView>
                <View style={styles.container1}>
                  <ScrollView horizontal>
                    <DataTable style={{width: 1150}}>
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
                            flex: 0.65,
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
                            flex: 0.5,
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
                            flex: 0.4,
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
                            flex: 0.3,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Điểm thi
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.4,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            Điểm tổng kết
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
                              flex: 0.65,
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
                              flex: 0.4,
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
                              flex: 0.3,
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
                              flex: 0.4,
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
          <View style={styles.buttonHuy}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                if (tableData.length != 0) {
                  ClearDataTable();
                } else {
                  handleModalPress();
                }
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Hủy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonLuu}>
            <TouchableOpacity
              onPress={() => {
                if (tableData.length == 0) {
                  handleModalPress1();
                } else {
                  if (!kiemTraChonMonHoc) {
                    handleModalPress2();
                  } else {
                    PostYeuCau();
                  }
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
      </View>
    </SafeAreaView>
  );
};

export default PhucKhao;

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
    marginBottom: 20,
  },
});
