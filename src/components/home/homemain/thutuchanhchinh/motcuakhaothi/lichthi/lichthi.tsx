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
} from 'react-native';

import Header1 from '../../../../untils/header/header1';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {token} from '../../../../../login/login';
import {maSinhVien} from '../../../../../login/login';

import {Table, Row, Rows, TableWrapper} from 'react-native-table-component';

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
      setTableDataXemLichThi(newTableData);
      setTableDataXemLichThi1(newTableData1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataTenDot();
  }, []);

  const handleCheckboxChange = rowIndex => {
    const newData = [...tableDataXemLichThi1];
    newData[rowIndex][0] = !newData[rowIndex][0];
    setTableDataXemLichThi1(newData);
  };

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

        <View style={styles.viewFooter}>
          <View style={styles.buttonHuy}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={fetchDataXemLichThi}>
              <Text style={{color: 'black', fontSize: 21}}>Hủy</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
  },
  buttonHuy: {
    width: '35%',
    height: 45,
    marginLeft: 30,
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
