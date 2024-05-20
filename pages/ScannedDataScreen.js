// ScannedDataScreen.js
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import NavigationBar from '../components/AfterScannedNavbar';
import { MaterialIcons } from '@expo/vector-icons';

export default function ScannedDataScreen({ route }) {
  const { data } = route.params;
  const navigation = useNavigation();

  // 일단 위치정보만 코드 api넘겨주고 만약에 위조 api일떄만 위치정보 받아와서 보고하기
  const [location, setLocation] = useState(null);

  // 안전한지, 아닌지 전달 받기
  const [isItSecure, setIsItSecure] = useState(false);

  // 로딩(구별에 대한 결과 기다리는 중)
  const [loading, setLoading] = useState(true);

  // 경고 모달 창
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let forSetLocation = await Location.getCurrentPositionAsync({});
      setLocation(forSetLocation);
    })();
  }, []);

  useEffect(() => { 
    if (location !== null) {
      // console.log(location, "in useEffect");
      sendDataToServer();

    }
  }, [location]);

  const sendDataToServer = async () => {
    // console.log(location, "in sendDataToServer()");
    // 테스트용으로 여기 한번 넣어봄(지금은 여기위치는 위치 불러와지면 setloading 풀기)
    setLoading(false);
    try {
      const response = await fetch('http://180.67.59.4:80/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          address: data,
          gps: `위도: ${location.coords.latitude} 경도: ${location.coords.longitude}`,
          // 아래는 형식 예시
          // gps: "위도: 123 경도: 31",
         })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // POST요청에 대한 응답 이오면 IS IT SECURE 로딩 풀기, 민영이형한테 응답을 TRUE(안전) or FALSE(위험)로 부탁
      // const responseData = await response.json();
      // console.log(responseData);
      // setIsItSecure(responseData.isSecure);
      // console.log(location)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  // 모달 함수
  const handleAskOpenUrl = () => {
    setModalVisible(true); // 모달을 열음
  };
  const handleOpenUrl = () => {
    Linking.openURL(data);
    setModalVisible(false); // 모달을 닫음
  };
  const handleNoOpenUrl = () => {
    setModalVisible(false);
  }

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSharePress = () => {
    console.log("share btn pressed");
  }

  //리포트 버튼 누르면 location값 전달하면서 이동하기
  const handleNotifyPress = () => {
    navigation.navigate("Report", {location: location.coords});
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B7EFF" />
        <Text style={styles.loadingText}>분석중이에요 🧐</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoMessage}>
          <Text style={styles.infoMessageText}>검사결과</Text>
          <View style={styles.infoLine}></View>
        </View>
        <View style={styles.securityContainer}>
          {isItSecure ? <MaterialIcons name="security" size={130} style={{color: "#6B7EFF"}}/>: <MaterialIcons name="no-encryption-gmailerrorred" size={130} style={{color: "#DB4455"}}/>}
          {isItSecure ? <Text style={styles.securityMessage}>안전</Text> : <Text style={{color: "#DB4455", fontSize: 27, fontWeight: "bold"}}>위험</Text>}
        </View>
        <View style={styles.urlContainer}>
          <Text style={styles.urlContent}>주소: </Text>
          <Text>{data}</Text>
        </View>
      </View>
      {
        isItSecure ? 
        <View style={styles.btnContainer}>
          <View style={{
                      width: 200,
                      height: 50,
                      width: 150,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "#6B7EFF"
          }}>
            <TouchableOpacity onPress={() => Linking.openURL(data)}>
              <Text style={styles.btnBoxMessage}>접속하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.btnContainer}>
          <View style={{
                      width: 200,
                      height: 50,
                      width: 150,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "#DB4455"
          }}>
            <TouchableOpacity onPress={handleAskOpenUrl}>
              <Text style={styles.btnBoxMessage}>접속하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      {/* 모달 */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>안전한지 확인이 어려운 사이트에요 🥲</Text>
            <Text style={styles.modalText}>접속하시겠어요?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleOpenUrl}>
                <View style={{
                      height: 40,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "#495057"
                }}>
                  <Text style={styles.btnBoxMessage}>예</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNoOpenUrl}>
                <View style={{
                      height: 40,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "#495057"
                }}>
                  <Text style={styles.btnBoxMessage}>아니요</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>      
      <NavigationBar iconStyle_scanner={{ color: '#6B7EFF' }} onNotifyPress={handleNotifyPress} onBackPress={handleBackPress} onSharePress={handleSharePress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  infoContainer: {
    flex: 2,
    alignItems: "center",
  },
  infoMessage: {
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
  securityContainer: {
    backgroundColor: "#FFFFFF",
    height: 200,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10, 
    marginTop: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  urlContainer: {
    backgroundColor: "#FFFFFF",
    height: 80,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row', // 요소들을 가로로 나열
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  urlContent: {
    fontWeight: "bold",
  },
  btnContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnBoxMessage: {
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 12,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    width: "90%",
    justifyContent: "space-around",
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 10,
    fontSize: 18,
    color: '#007AFF',
  },
});