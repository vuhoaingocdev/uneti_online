import React, {useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import {user_login} from '../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isShowPass, setShowPass] = useState(true);

  const onChecked = () => {
    setChecked(!isChecked);
  };
  //navigation.navigate('HomeMain');
  function xuLiDangNhap() {
    user_login({
      TC_SV_MaSinhVien: username.toLocaleLowerCase(),
      TC_SV_MaSinhVien_Pass: password,
    })
      .then(result => {
        console.log(result);
        if (result.status == 200) {
          AsyncStorage.setItem('token', result.data.token);
          navigation.navigate('HomeMain');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          source={require('../../images/logo_uneti.jpg')}
          style={styles.image}
        />
      </View>

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
          <CheckBox value={isChecked} onValueChange={setChecked} />
          <Text
            style={{
              marginTop: 5,
              fontSize: 16,
            }}>
            Nhớ mật khẩu
          </Text>
        </View>

        <View style={styles.viewButtonLogin}>
          <TouchableOpacity
            onPress={xuLiDangNhap}
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
    backgroundColor: '#fff',
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
    marginTop: 60,
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
});

export default Login;
