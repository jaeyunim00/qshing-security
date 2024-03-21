// MyCamera.js
import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={handleBarCodeScanned}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'yellow',
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
