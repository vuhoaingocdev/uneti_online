import React, {Component, useState} from 'react';
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

const KetQuaHocTap = ({navigation}: any) => {
  const dataDeNghi = [
    {labelDeNghi: 'Xem kết quả học tập', valueDeNghi: '0'},
    {labelDeNghi: 'Điều chỉnh, bổ sung: Điểm thường kỳ', valueDeNghi: '1'},
    {labelDeNghi: 'Điều chinh, bổ sung: Điểm thi', valueDeNghi: '2'},
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

  const [tenDot, setTenDot] = useState([]);

  const [deNghi, setDeNghi] = useState('');
  const [valueDeNghi, setValueDeNghi] = useState('');
  const [isFocusDeNghi, setIsFocusDeNghi] = useState(false);

  const [deNghiDTK, setDeNghiDTK] = useState('');
  const [valueDeNghiDTK, setValueDeNghiDTK] = useState('');
  const [isFocusDeNghiDTK, setIsFocusDeNghiDTK] = useState(false);

  const [deNghiDT, setDeNghiDT] = useState('');
  const [valueDeNghiDT, setValueDeNghiDT] = useState('');
  const [isFocusDeNghiDT, setIsFocusDeNghiDT] = useState(false);

  const [diemThuongKy, setDiemThuongKy] = useState('');

  const [onClickText, setOnClickText] = useState(true);

  const [getDataKetQuaHocTap, setGetDataKetQuaHocTap] = useState([]);

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

      const getData = response.data.body.map(dt => [dt.TenMonHoc]);
      setGetDataKetQuaHocTap(getData);

      console.log(getDataKetQuaHocTap);
    } catch (error) {
      console.error(error);
    }
  };
  //return
  return (
    <SafeAreaView style={styles.container}>
      <Header1 title="Kết quả học tập" onPress={() => navigation.goBack()} />

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
                1.Nội dung đề nghị
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
                  placeholder={!isFocusDeNghi ? 'Chọn đợt thi' : '...'}
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
                      placeholder={!isFocusDeNghiDTK ? 'Chọn đợt thi' : '...'}
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
                        backgroundColor: '#E8E8E8',
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
                      />
                    </View>
                  </View>
                </View>
              ) : null}

              {deNghi === 'Điều chinh, bổ sung: Điểm thi' ? (
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
                      placeholder={!isFocusDeNghiDTK ? 'Chọn đợt thi' : '...'}
                      value={valueDeNghiDTK}
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
                      Điểm thường kỳ: (*)
                    </Text>
                    <View
                      style={{
                        width: 232,
                        backgroundColor: '#E8E8E8',
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
                      />
                    </View>
                  </View>
                </View>
              ) : null}

              <ScrollView>
                <View style={{marginTop: 20}}>
                  <ScrollView horizontal>
                    <DataTable style={{width: 1000, height: 400}}>
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
                    </DataTable>
                  </ScrollView>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setOnClickText(!onClickText);
                  }}>
                  {onClickText ? (
                    <View style={styles.viewTenHocKy}>
                      <Image
                        source={require('../../../../../../images/plus.png')}
                        style={styles.iconHocKy}
                        resizeMode="stretch"
                      />
                      <Text style={styles.styleTextBold}>
                        Học kỳ: 1 (2020 - 2021)
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.viewTenHocKy}>
                      <Image
                        source={require('../../../../../../images/minus.png')}
                        style={styles.iconHocKy}
                        resizeMode="stretch"
                      />
                      <Text style={[styles.styleTextBold, {color: '#245d7c'}]}>
                        Học kỳ: 1 (2020 - 2021)
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.viewFooter}>
        <View style={[styles.buttonHuy, {marginLeft: 30}]}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => {}}>
            <Text style={{color: 'black', fontSize: 19}}>Hủy</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.buttonHuy,
            {marginRight: 30, backgroundColor: '#245d7c'},
          ]}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => {}}>
            <Text style={{color: '#ffffff', fontSize: 19}}>Lưu</Text>
          </TouchableOpacity>
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
    marginVertical: 10,
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

  viewFooter: {
    height: '9%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#dcdcdc',
  },
});

export default KetQuaHocTap;
