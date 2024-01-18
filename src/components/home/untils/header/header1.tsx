import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

function Header1(props) {
  const {title, onPress} = props;
  return (
    <View style={styles.ContainerHeader}>
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../../../../images/back.png')}
            style={styles.iconMenu}
          />
        </TouchableOpacity>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.textTieuDe}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerHeader: {
    height: '13%',
    width: '100%',
    justifyContent: 'center',
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
    width: 35,
    tintColor: '#fff',
  },
  textTieuDe: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 60,
  },
});

export default Header1;
