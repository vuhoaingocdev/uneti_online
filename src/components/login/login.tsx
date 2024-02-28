import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import {user_login} from '../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalThongBao from '../home/untils/modalThongBao/modalThongBao';
export var token: any;
export var maSinhVien: any;

function Login({navigation}: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isShowPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

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

  const [checkboxColor, setCheckboxColor] = useState('#245d7c');
  const [checkboxUncheckedColor, setCheckboxUncheckedColor] = useState('gray');

  const LuuTaiKhoanVaMatKhau = async () => {
    try {
      await AsyncStorage.setItem(
        'LuuTaiKhoan',
        JSON.stringify({username, password}),
      );
    } catch (error) {
      console.error('Lỗi khi lưu tài khoản và mật khẩu:', error);
    }
  };

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('LuuTaiKhoan');
      if (savedData) {
        const {username: savedUsername, password: savedPassword} =
          JSON.parse(savedData);
        setUsername(savedUsername);
        setPassword(savedPassword);
      }
    } catch (error) {
      console.error('Lỗi khi tải tài khoản và mật khẩu:', error);
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  function xuLiDangNhap() {
    user_login({
      TC_SV_MaSinhVien: username.toLocaleLowerCase(),
      TC_SV_MaSinhVien_Pass: password,
    })
      .then(result => {
        if (result.status == 200) {
          token = result.data.token;
          maSinhVien = username;

          if (isChecked && username !== '' && password !== '') {
            LuuTaiKhoanVaMatKhau();
          }

          navigation.navigate('HomeMain');
        } else if (username === '' || password === '') {
          handleModalPress2();
        } else {
          handleModalPress1();
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const xuLiVuiLongCho = () => {
    setLoading(true);

    setTimeout(() => {
      xuLiDangNhap();
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          source={require('../../images/logo_uneti.jpg')}
          style={styles.image}
        />
      </View>

      <ModalThongBao
        visible={showModal2}
        onClose={handleCloseModal2}
        message="Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu!"
      />

      <ModalThongBao
        visible={showModal1}
        onClose={handleCloseModal1}
        message="Đăng nhập nhất bại! Vui lòng kiểm tra lại thông tin tài khoản và mật khẩu!"
      />

      <View style={{marginHorizontal: 40}}>
        <View style={styles.viewTextInput}>
          <Text style={styles.text}>Tên đăng nhập</Text>
          <TextInput
            autoCapitalize="none"
            placeholderTextColor={'gray'}
            style={styles.textInput}
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>

        <View style={{marginTop: 15, width: '100%'}}>
          <Text style={styles.text}>Mật khẩu</Text>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <TextInput
              placeholderTextColor={'gray'}
              style={styles.textInput}
              placeholder="******"
              secureTextEntry={isShowPass ? true : false}
              value={password}
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={() => {
                setShowPass(!isShowPass);
              }}>
              <View style={styles.showPass}>
                {isShowPass ? (
                  <Image
                    style={styles.iconeye}
                    source={require('../../images/showpass.png')}
                    resizeMode="stretch"
                  />
                ) : (
                  <Image
                    style={styles.iconeye}
                    source={require('../../images/hidepass.png')}
                    resizeMode="stretch"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 3,
            flexDirection: 'row',
            width: '100%',
          }}>
          <CheckBox
            value={isChecked}
            onValueChange={setChecked}
            tintColors={{true: checkboxColor, false: checkboxUncheckedColor}}
          />
          <Text
            style={{
              marginTop: 5,
              fontSize: 16,
            }}>
            Nhớ mật khẩu
          </Text>
        </View>

        <View style={styles.viewModalCotainer}>
          {loading && (
            <View style={styles.viewModel}>
              <View style={styles.loaderContainer}>
                <ActivityIndicator
                  color="gray"
                  size="small"
                  style={{borderRadius: 10, overflow: 'hidden'}}
                />
                <Text style={{color: 'gray', fontSize: 20, marginLeft: 15}}>
                  Vui lòng đợi...
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.viewButtonLogin}>
          <TouchableOpacity
            onPress={xuLiVuiLongCho}
            style={styles.touchableOpacity}>
            <Text style={{color: '#fff', fontSize: 19}}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.textFooter}>TRƯỜNG ĐẠI HỌC</Text>
        <Text style={styles.textFooter}>KINH TẾ - KỸ THUẬT CÔNG NGHIỆP</Text>
        <Text style={[styles.text, styles.text2]}>
          Tel: (024)38621505 - (0228)3848706
        </Text>
        <View style={styles.viewfooter}>
          <Image
            source={require('../../images/internet.png')}
            style={[styles.imageCSS, styles.imageCSS1]}
            resizeMode="stretch"
          />

          <Image
            source={require('../../images/facebook.png')}
            style={styles.imageCSS}
            resizeMode="stretch"
          />

          <Image
            source={require('../../images/youtube.png')}
            style={[styles.imageCSS, styles.imageCSS3]}
            resizeMode="stretch"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 160,
    height: 180,
  },
  viewImage: {
    alignItems: 'center',
    marginTop: 20,
  },
  viewTextInput: {
    marginTop: 60,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  textInput: {
    width: '100%',
    fontSize: 16,
    marginTop: 5,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 7,
    borderRadius: 6,
    color: 'black',
  },
  viewButtonLogin: {
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    backgroundColor: '#245d7c',
    width: 110,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#245d7c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
  },

  footer: {
    width: '100%',
    height: '17%',
    marginTop: 55,
    alignItems: 'center',
  },
  textFooter: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 1.5,
  },
  viewfooter: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageCSS: {
    height: 25,
    width: 25,
  },
  imageCSS1: {
    marginLeft: 40,
  },
  imageCSS3: {
    marginRight: 40,
  },
  text2: {
    marginTop: 1.5,
  },
  showPass: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '90%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconeye: {
    height: 25,
    width: 25,
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewModel: {
    height: 60,
    width: 160,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  viewModalCotainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
