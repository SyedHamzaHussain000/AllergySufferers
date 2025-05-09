import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import GetStarted from '../screens/auth/GetStarted';
import Loading from '../screens/auth/Loading';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Loading" screenOptions={{headerShown:false}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Loading" component={Loading} />
      {/* <Stack.Screen name="Login" component={Login} /> */}
      
    </Stack.Navigator>
  )
}

export default Auth