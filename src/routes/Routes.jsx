import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
import Main from './Main';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo'
import { setInternet } from '../redux/Slices/BlackListSlice';
import InternetConnection from '../screens/InternetConnection/InternetConnection';
const Stack = createStackNavigator();
const Routes = () => {

  const internetConnection = useSelector(state => state?.blacklist?.isInternetConnected)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setInternet(state.isConnected))
        // console.log("is",state.isConnected)
      // setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName='Auth'  screenOptions={{headerShown:false}}>
      
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Main" component={Main} />
         
      
    </Stack.Navigator>
  );
};

export default Routes;
