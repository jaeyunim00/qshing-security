// MyCamera.js
import React, { useState, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import * as Location from 'expo-location';
import NavigationBar from '../components/NavigationBar';

export default function MyCamera({ navigation }) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      requestLocationPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    console.log(data);
    navigation.navigate('ScannedData', { data: data });
  };

  const handleHistoryPress = () => {
    navigation.navigate('History'); // 이용기록 페이지로 이동
  };

  if (!cameraPermission || locationPermission === null) {
    // 카메라 또는 위치 권한을 아직 로딩 중인 경우
    return <View />;
  }

  if (!cameraPermission.granted || !locationPermission) {
    // 카메라 또는 위치 권한이 허용되지 않은 경우
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: 'center' }}>카메라 및 위치 접근 허용</Text>
        <Button onPress={requestCameraPermission} title="카메라 권한 허용" />
        <Button
          onPress={async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            requestLocationPermission(status === 'granted');
          }}
          title="위치 권한 허용"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.headMessage}>
          <Text>큐알코드 피싱, 미리 방지하세요 🔒</Text>
        </View>
        <View style={styles.qrBox}></View>
        <NavigationBar iconStyle_scanner={{ color: '#6B7EFF' }} onHistoryPress={handleHistoryPress} />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: { flex: 1 },
  headMessage: {
    position: 'absolute',
    top: 70,
    marginLeft: -175,
    left: "50%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 60,
    width: 350,
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  qrBox: {
    width: 200,
    height: 200,
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "transparent",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },
});
