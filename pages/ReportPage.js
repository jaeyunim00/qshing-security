  // MyCamera.js
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';
import NavigationBar from '../components/OnlyBackPressNav';

  export default function MyCamera({ navigation, route }) {
    const gps = route.params.myGps;
    const address = route.params.url;

    const [detailAddress, setDetailAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleBackPress = () => {
      navigation.goBack();
    };

    const handleReportBtn = async () => {
      console.log("알리기 버튼 눌림!");
      setModalVisible(true); // 모달 보이기
      try {
        const response = await fetch('http://117.16.23.154:8080/api/address/spec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: `${address}`,
            spec: `${detailAddress}`,
          }),
        });
  
        if (response.ok) {
          console.log('신고가 성공적으로 전송되었습니다.');
          setModalVisible(); // 모달 보이기
        } else {
          console.error('신고 전송에 실패했습니다.');
        }
      } catch (error) {
        console.error('네트워크 오류:', error);
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.headMessage}>
          <Text>위치를 공유하면 추가 큐싱 피해를 방지할 수 있어요 😄</Text>
        </View>
        <View style={styles.inputInfoContainer}>
          <View style={styles.inputInfoMyLocation}>
            <Text style={{padding: 10, fontSize: "15", fontWeight: "bold", color: "#495057"}}>현재 내 위치</Text>
            <Text style={{padding: 10, fontSize: "15", fontWeight: 800}}>{gps}</Text>
          </View>
          <View style={styles.infoLine}></View>
          <View style={styles.inputInfoDetail}>
            <Text style={{padding: 10, fontSize: "15", fontWeight: "bold", color: "#495057"}}>상세 주소 입력</Text>
            <TextInput
            style={{ padding: 10, fontSize: 15, fontWeight: '800' }}
            placeholder="상세 주소를 입력하세요"
            value={detailAddress}
            onChangeText={text => setDetailAddress(text)}
          />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <View style={{
                      width: 200,
                      height: 50,
                      width: 150,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "#FFFFFF",
          }}>
            <TouchableOpacity onPress={handleReportBtn}>
              <Text style={{fontWeight: "bold"}}>알리기 📢</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>신고가 완료 됐어요 📢</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ fontSize: 13 }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <NavigationBar iconStyle_scanner={{ color: '#6B7EFF' }} onBackPress={handleBackPress} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FA"},
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
      // shadowColor: '#171717',
      // shadowOffset: {width: -2, height: 4},
      // shadowOpacity: 0.2,
      // shadowRadius: 3,
    },
    inputInfoContainer: {
      position: 'absolute',
      top: 150, 
      marginLeft: -175,
      left: "50%",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#FFFFFF",
      height: 300,
      width: 350,
      borderRadius: 15,
      // shadowColor: '#171717',
      // shadowOffset: {width: -2, height: 4},
      // shadowOpacity: 0.2,
      // shadowRadius: 3,
    },
    inputInfoMyLocation: {
      flex: 1,
      width: "100%",
      padding: 20,
    },
    inputInfoDetail: {
      flex: 1,
      width: "100%",
      padding: 20,
    },
    infoLine: {
      borderWidth:1,
      borderColor: "#495057",
      width: "100%"
    },
    btnContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: 'absolute',
      bottom: 100,
      marginLeft: -197,
      left: "50%",
      // shadowColor: '#171717',
      // shadowOffset: {width: -2, height: 4},
      // shadowOpacity: 0.2,
      // shadowRadius: 3,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      padding: 30,
      borderRadius: 10,
      alignItems: 'center',
    },
  });
