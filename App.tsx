import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  const [currentLink, setCurrentLink] = useState(null);
  const [showModalQR, setShowModalQR] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [getImageFromAPI, setImageFromAPI] = useState('');

  const items = [
    {
      id: 1,
      title: 'USB',
      image: require('./images/usb.png'),
      color: '#33FF57',
      link: 'https://google.com/',
    },
    {
      id: 2,
      title: 'Youtube',
      image: require('./images/youtube.png'),
      color: '#FF8C33',
      link: 'https://www.youtube.com/',
    },
    {
      id: 3,
      title: 'Google Chrome',
      image: require('./images/chrome.png'),
      color: '#FF5733',
      link: 'https://www.google.com',
    },
    {
      id: 4,
      title: 'Hỗ trợ TBGĐ',
      image: require('./images/LogoUNETI.png'),
      color: '#3357FF',
      link: 'https://support.uneti.edu.vn/',
    },
    {
      id: 5,
      title: 'Egoz.uneti.edu.vn',
      image: require('./images/LogoUNETI.png'),
      color: '#FF33A8',
      link: 'https://egov.uneti.edu.vn/login.html',
    },
    {
      id: 6,
      title: 'QR phòng học',
      image: require('./images/qr-code.png'),
      color: '#33FFF1',
      link: null,
    },
  ];

  const handlePress = (item: any) => {
    if (item.title === 'QR phòng học') {
      setShowModalQR(true);
    } else if (item.link) {
      setCurrentLink(item.link);
    } else {
      Alert.alert('Thông báo!', 'Button này chưa có link!.');
    }
  };

  const urlAPI =
    'https://apiv2.uneti.edu.vn/api/ThietBi_GiangDuong/QLP_Phong_Load_R_Para_File_box?DT_QLP_Phong_ID=73';
  // Gọi API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(urlAPI);
      const image = response.data.body[0];
      console.log('====================================');
      console.log('Image', image);
      console.log('====================================');
      setImageFromAPI(image);
      setData(response.data.body);
      setError('');
    } catch (err) {
      setError('Không thể tải dữ liệu từ API!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {currentLink ? (
        <WebView source={{uri: currentLink}} style={{flex: 1, width: '100%'}} />
      ) : (
        <ImageBackground
          source={require('./images/uneti.jpeg')}
          style={styles.background}>
          <View style={styles.grid}>
            {items.map(item => (
              <View key={item.id} style={styles.itemContainer}>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={() => handlePress(item)}>
                  <Image
                    source={item.image}
                    style={styles.buttonImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <Text style={styles.buttonText}>{item.title}</Text>
              </View>
            ))}
          </View>
        </ImageBackground>
      )}

      {/* Modal QR */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalQR}
        onRequestClose={() => setShowModalQR(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              src={getImageFromAPI} // Đường dẫn ảnh mã QR
              style={styles.qrImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModalQR(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    //justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginTop: 15,
  },
  itemContainer: {
    alignItems: 'center',
    margin: 15,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  buttonText: {
    marginTop: 5,
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 14,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
