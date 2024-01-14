import React from 'react';
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

function LichThi({navigation}: any) {
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
            </View>

            <View style={styles.viewTenDot}>
              <Text style={styles.styleText}>Loại thi: (*)</Text>
            </View>
            <View style={styles.viewTenDot}>
              <Text style={styles.styleText}>Lí do: (*)</Text>
            </View>

            <View style={styles.viewButtonList}>
              <ScrollView
                horizontal
                // showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity style={styles.TouchableOpacity}>
                  <Text style={[styles.styleTextButton, {width: 200}]}>
                    Mã lớp học phần
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacity}>
                  <Text style={[styles.styleTextButton, {width: 200}]}>
                    Tên học phần
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacity}>
                  <Text style={[styles.styleTextButton, {width: 200}]}>
                    Hình thức thi
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacity}>
                  <Text style={[styles.styleTextButton, {width: 200}]}>
                    Ngày thi
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacity}>
                  <Text style={[styles.styleTextButton, {width: 100}]}>
                    Thứ
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacity}>
                  <Text style={[styles.styleTextButton, {width: 100}]}>
                    Nhóm
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacity}>
                  <Text style={[styles.styleTextButton, {width: 100}]}>
                    Tiết
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacity}>
                  <Text style={[styles.styleTextButton, {width: 200}]}>
                    Phòng thi
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.viewFooter}>
          <View style={styles.buttonHuy}>
            <TouchableOpacity style={styles.touchableOpacity}>
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

  TouchableOpacity: {
    marginRight: 15,
    backgroundColor: '#245d7c',
    height: 40,
    justifyContent: 'center',
  },
  styleTextButton: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
  },
});
