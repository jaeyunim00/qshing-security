import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyCamera from "./myCamera";
import ScannedDataScreen from './ScannedDataScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Camera" component={MyCamera} />
        <Stack.Screen name="ScannedData" component={ScannedDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}