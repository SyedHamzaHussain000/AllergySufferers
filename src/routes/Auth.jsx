import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import GetStarted from '../screens/auth/GetStarted';
import Loading from '../screens/auth/Loading';
import Login from '../screens/auth/Login';
import CreateAccount from '../screens/auth/CreateAccount';
import ForgetPassword from '../screens/auth/ForgetPassword/ForgetPassword';
import EnterOtp from '../screens/auth/ForgetPassword/EnterOtp';
import EnternewPassword from '../screens/auth/ForgetPassword/EnternewPassword';
import Subscription from '../screens/main/subscription/Subscription';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="GetStarted" screenOptions={{headerShown:false}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="EnternewPassword" component={EnternewPassword} />

      <Stack.Screen name="EnterOtp" component={EnterOtp} />

    
      <Stack.Screen
        name="Subscription"
        component={HomeWithSafeArea(Subscription)}
      />

      
      {/* <Stack.Screen name="Loading" component={Loading} /> */}

      

    </Stack.Navigator>
  )
}

// If needed, wrap MyTabs too:
const HomeWithSafeArea = Component => props => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Component {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // or AppColors.BACKGROUND
  },
});
export default Auth