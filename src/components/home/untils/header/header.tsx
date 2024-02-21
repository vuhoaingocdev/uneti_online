import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';

function Header(props) {
  const {title} = props;
  return (
    <View style={styles.ContainerHeader}>
      <ImageBackground
        source={require('../../../../images/backgroundHeader.png')}>
        <View style={styles.viewHeader}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Thông báo', 'Menu chưa hoàn thành!');
            }}>
            <Image
              source={require('../../../../images/menu.png')}
              style={styles.iconMenu}
            />
          </TouchableOpacity>
          <Text style={styles.textTieuDe}>{title}</Text>
          <Image
            source={require('../../../../images/logo_uneti.png')}
            style={styles.imageLogo}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerHeader: {
    height: '22%',
    width: '100%',
    alignItems: 'center',
  },
  viewHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  iconMenu: {
    height: 40,
    width: 30,
    tintColor: '#fff',
    marginLeft: 20,
  },
  textTieuDe: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageLogo: {
    height: 80,
    width: 70,
    marginRight: 20,
  },
});

export default Header;
