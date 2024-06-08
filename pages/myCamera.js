import React, { useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';

export default function MyCamera({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();

  const GridOverlay = () => {
    return (
      <View style={styles.gridOverlay}>
        {Array.from({ length: 5 }).map((_, i) => (
          <View key={i} style={[styles.gridLineHorizontal, { top: `${i * 20}%` }]} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <View key={i} style={[styles.gridLineVertical, { left: `${i * 20}%` }]} />
        ))}
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.camerapermissioncontainer}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    navigation.navigate('ScannedData', { data: data });
  };

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
        <GridOverlay />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camerapermissioncontainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },  
  camera: { flex: 1 },
  headMessage: {
    position: 'absolute',
    top: 35,
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
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  gridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  gridLineVertical: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
