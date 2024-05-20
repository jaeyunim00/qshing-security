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
        <View style={styles.infoContainer}>
          <Text style={styles.infoMessageText}>이용기록</Text>
          <View style={styles.infoLine}></View>
        </View>
        <View style={styles.listContainer}>
          
        </View>
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
  infoContainer: {
    flex: 1,
    width: "90%",
    color: "#495057",
  },
  infoMessageText: {
    fontSize: 40,
    marginTop: 60,
    marginBottom: 10,
    color: "#495057",
  },
  infoLine: {
    borderWidth:1,
    borderColor: "#495057",
  },
  listContainer: {
    flex: 6,
    width: "90%",
  }
});