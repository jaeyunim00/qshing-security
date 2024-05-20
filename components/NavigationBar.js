// NavigationBar.js
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NavigationBar({ onScannerPress, onHistoryPress, iconStyle_scanner, iconStyle_history }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onScannerPress}>
        <MaterialIcons name="qr-code-scanner" size={24} style={[styles.icon, iconStyle_scanner]}/>
        <Text style={[styles.buttonText, iconStyle_scanner]}>스캐너</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onHistoryPress}>
        <MaterialIcons name="history" size={24} style={[styles.icon, iconStyle_history]}/>
        <Text style={[styles.buttonText, iconStyle_history]}>이용기록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // 절대 위치 설정
    bottom: 0, // 아래에 위치
    left: 0, // 왼쪽 정렬
    right: 0, // 오른쪽 정렬
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  icon: {
    color: '#A2A2A2', // 아이콘 기본 색상
  },

  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#A2A2A2',
    marginTop: 4,
  },
});