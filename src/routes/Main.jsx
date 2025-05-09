import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/main/Home';
import AppColors from '../utils/AppColors';
import Symptom from '../screens/main/Symptom';
import More from '../screens/main/More';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={MyTabs} />
      {/* <Stack.Screen name="Main" component={Main} /> */}
    </Stack.Navigator>
  )
}


function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarStyle:{backgroundColor:AppColors.BTNCOLOURS}}}>
      <Tab.Screen name="Forecast" component={Home} />
      <Tab.Screen name="Symptoms" component={Symptom} />
      <Tab.Screen name="Medication" component={Home} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}


export default Main