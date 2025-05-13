import {View, Text, Image} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
import TipsTrick from '../screens/main/stacks/info/TipsTrick';
import PollenInfoForCad from '../screens/main/stacks/info/PollenInfoForCad';
import DeleteAllData from '../screens/main/stacks/info/DeleteAllData';
import Medication from '../screens/main/Medication';
import AppImages from '../assets/images/AppImages';
import DataVisualizer from '../screens/main/stacks/DataVisualizer';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="DataVisualizer"
      screenOptions={{headerShown: false}}>
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
      <Stack.Screen name="TipsTrick" component={TipsTrick} />
      <Stack.Screen name="PollenInfoForCad" component={PollenInfoForCad} />
      <Stack.Screen name="DeleteAllData" component={DeleteAllData} />
      <Stack.Screen name="DataVisualizer" component={DataVisualizer} />


      
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: AppColors.BTNCOLOURS,
          height: 70,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="Forecast"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={AppImages.Forcast}
                  style={{height: 30, width: 30}}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Symptoms"
        component={Symptom}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                source={AppImages.SYMPTOMS}
                style={{height: 30, width: 30}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Medication"
        component={Medication}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                source={AppImages.Medication}
                style={{height: 30, width: 30}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: () => {
            return (
              <Image source={AppImages.More} style={{height: 30, width: 30}} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
