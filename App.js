import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyCamera from "./pages/myCamera";
import ScannedDataScreen from './pages/ScannedDataScreen';
import * as Location from 'expo-location';
import HistoryPage from './pages/HistoryPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Camera" component={MyCamera} options={{ headerShown: false }}/>
        <Stack.Screen name="ScannedData" component={ScannedDataScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HistoryPage" options={{ headerShown: false }}>
          {props => <HistoryPage {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
