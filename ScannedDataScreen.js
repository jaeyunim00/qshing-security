// ScannedDataScreen.js
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function ScannedDataScreen({ route }) {
  const { data } = route.params;
  const navigation = useNavigation();

// 일단 위치정보만 코드 api넘겨주고 만약에 위조 api일떄만 위치정보 받아와서 보고하기
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log(data);
    // 여기 데이터 서버로 보내는 부분
    // sendDataToServer();

    (async () => {      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      
      // Url 정보를 받아온 후에 서버로 데이터 전송
    })();
  }, []);

  let text = "위치정보를 받아오는 중...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  const sendDataToServer = async () => {
    try {
      const response = await fetch('http://117.16.23.130:80/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: data })
      });
  
      if (!response.ok) {
        throw new Error('Network   response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData); // 서버로부터의 응답 처리
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{data}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.text}>Go Back</Text>
        <Text>{location ? `위도: ${location.coords.longitude} 경도: ${location.coords.latitude}` : text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});