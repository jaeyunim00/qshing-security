// HistoryPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from '../components/NavigationBar';


export default function HistoryPage({ navigation }) {
  const handleScannerPress = () => {
    navigation.navigate('Camera'); // 스캐너 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <Text>이용기록 페이지</Text>
      {/* 이용기록에 관련된 내용을 표시합니다. */}
      <NavigationBar onScannerPress={handleScannerPress} iconStyle_history={{ color: '#6B7EFF' }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});