// ScannedDataScreen.js
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Linking } from 'react-native';

import MyCamera from './myCamera';
import NavigationBar from '../components/AfterScannedNavbar';
import { MaterialIcons } from '@expo/vector-icons';

export default function ScannedDataScreen({ route }) {
  const { data } = route.params;
  const navigation = useNavigation();

// 일단 위치정보만 코드 api넘겨주고 만약에 위조 api일떄만 위치정보 받아와서 보고하기
  const [location, setLocation] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  // 안전한지, 아닌지 전달 받기
  const [isItSecure, setIsItSecure] = useState(false);

  useEffect(() => {
    (async () => {      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location2 = await Location.getCurrentPositionAsync({});

      setLocation(location2);

      // 여기가 받아온 주소랑, 현재 위치 확인
      // console.log(data);
      // console.log(location);
    })();
  }, []);

  useEffect(() => {
    // location 값이 변경될 때마다 이 효과가 실행됩니다.
    sendDataToServer();
  }, [location]);

  let text = "위치정보를 받아오는 중...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(text);
  }
  
  const sendDataToServer = async () => {
    try {
      console.log(location.coords.longitude);
      const response = await fetch('http://117.16.23.130:8016/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          address: data,
          gps: location.coords.longitude,
         })
      });
  
      if (!response.ok) {
        throw new Error('Network   response was not ok');
      }
  
      const responseData = await response.json();
      // console.log(responseData); // 서버로부터의 응답 처리
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSharePress = () => {
    console.log("share btn pressed");
  }

  //리포트 버튼 누르면 location값 전달하면서 이동하기
  const handleNotifyPress = () => {
    navigation.navigate("Report", {location: location.coords.longitude});
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
            <TouchableOpacity onPress={() => Linking.openURL(data)}>
              <Text style={styles.btnBoxMessage}>접속하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      {/* <Text>{location ? `위도: ${location.coords.longitude} 경도: ${location.coords.latitude}` : text}</Text> */}
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
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    color: "white",
  }
});