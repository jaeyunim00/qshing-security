import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// PAGE IMPORT
import MyCamera from "./pages/myCamera";
import ScannedDataScreen from './pages/ScannedDataScreen';
import ReportPage from './pages/ReportPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Camera" component={MyCamera} options={{ headerShown: false }}/>
        <Stack.Screen name="Report" component={ReportPage} options={{ headerShown: false }}/>
        <Stack.Screen name="ScannedData" component={ScannedDataScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
