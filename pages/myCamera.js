  // MyCamera.js
  import React, { useState, useEffect } from 'react';
  import { CameraView, useCameraPermissions } from 'expo-camera/next';
  import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
  import * as Location from 'expo-location';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import NavigationBar from '../components/NavigationBar';
  import HistoryPage from './HistoryPage';

  export default function MyCamera({ navigation }) {
    const [facing, setFacing] = useState('back');
    const [scannedData, setScannedData] = useState(null);

    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleBarCodeScanned = ({ data }) => {
      setScannedData(data);
      navigation.navigate('ScannedData', { data: data });
    };

    const handleHistoryPress = () => {
      navigation.navigate('HistoryPage'); // 이용기록 페이지로 이동
    };

    return (
      <View style={styles.container}>
        <CameraView 
        style={styles.camera} 
        facing={facing} 
        barcodeScannerSettings={{ barcodeTypes: ['qr'], size: {
          width: 20,
          height: 20,
        }}} 
        onBarcodeScanned={handleBarCodeScanned}
        >
          <View style={styles.headMessage}>
            <Text>큐알코드 피싱, 미리 방지하세요 🔒</Text>
          </View>
          <View style={styles.qrBox}></View>
          <NavigationBar iconStyle_scanner={{ color: '#6B7EFF' }}  onHistoryPress={handleHistoryPress} />
        </CameraView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    headMessage: {
      position: 'absolute', // 절대 위치 설정
      top: 70, // 아래에 위치
      marginLeft: -175,
      left: "50%",
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: 60,
      width: 350,
      borderRadius: 15,
    },
    qrBox: {
      width: 200,
      height: 200,
      position: "absolute",
      top: "50%",
      left: "50%",
      backgroundColor: "transparent",
      transform: [{ translateX: -100 }, { translateY: -100 }],
      borderColor: "white",
      borderWidth: 2,
    }
  });
