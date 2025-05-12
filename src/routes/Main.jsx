import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/main/Home';
import AppColors from '../utils/AppColors';
import Symptom from '../screens/main/Symptom';
import More from '../screens/main/More';
import AppSetting from '../screens/main/stacks/AppSetting';
import AddCity from '../screens/main/stacks/Cities/AddCity';
import ManageCities from '../screens/main/stacks/Cities/ManageCities';
import ManagePollens from '../screens/main/stacks/Pollens/ManagePollens';
import AddPollens from '../screens/main/stacks/Pollens/AddPollens';
import ManageMedications from '../screens/main/stacks/Medications/ManageMedications';
import AddMedications from '../screens/main/stacks/Medications/AddMedications';
import FeedBack from '../screens/main/stacks/info/FeedBack';
import PrivacyPolicy from '../screens/main/stacks/info/PrivacyPolicy';
import TermsCondition from '../screens/main/stacks/info/TermsCondition';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Stack.Navigator initialRouteName="TermsCondition" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="AppSetting" component={AppSetting} />
      <Stack.Screen name="AddCity" component={AddCity} />
      <Stack.Screen name="ManageCities" component={ManageCities} />
      <Stack.Screen name="ManagePollens" component={ManagePollens} />
      <Stack.Screen name="AddPollens" component={AddPollens} />
      <Stack.Screen name="ManageMedications" component={ManageMedications} />
      <Stack.Screen name="AddMedications" component={AddMedications} />

      <Stack.Screen name="FeedBack" component={FeedBack} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      



      

      

      

      

      
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