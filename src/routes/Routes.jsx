import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
import Main from './Main';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Routes = () => {

const data = useSelector(state => state.auth.user)

  return (
    <Stack.Navigator initialRouteName='Auth'  screenOptions={{headerShown:false}}>
      
        <Stack.Screen name="Main" component={Main} />
        

      <Stack.Screen name="Auth" component={Auth} />
      
    </Stack.Navigator>
  );
};

export default Routes;
