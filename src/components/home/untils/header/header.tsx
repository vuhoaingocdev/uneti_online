import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

function Header(props) {
  const {title} = props;
  return (
    <View style={styles.ContainerHeader}>
      <View style={styles.viewHeader}>
        <TouchableOpacity>
          <Image
            source={require('../../../../images/menu.png')}
            style={styles.iconMenu}
          />
        </TouchableOpacity>
        <Text style={styles.textTieuDe}>{title}</Text>
        <Image
          source={require('../../../../images/logo_uneti.jpg')}
          style={styles.imageLogo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerHeader: {
    height: '22%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#245d7c',
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
    width: 30,
    tintColor: '#fff',
  },
  textTieuDe: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageLogo: {
    height: 80,
    width: 70,
  },
});

export default Header;
