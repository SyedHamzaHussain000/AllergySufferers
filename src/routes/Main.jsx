import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
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

import DeleteAllData from '../screens/main/stacks/info/DeleteAllData';
import Medication from '../screens/main/Medication';
import AppImages from '../assets/images/AppImages';
import DataVisualizer from '../screens/main/stacks/DataVisualizer';
import Account from '../screens/main/stacks/accounts/Account';
import TipsTrick from '../screens/main/stacks/Help/TipsTrick';
import PollenInfoForCad from '../screens/main/stacks/Help/PollenInfoForCad';
import HelpScreen from '../screens/main/stacks/Help/HelpScreen';
import Notification from '../screens/main/stacks/notification/Notification';
import Subscription from '../screens/main/subscription/Subscription';
import ForcastExplaination from '../screens/main/stacks/forcastexplaination/ForcastExplaination';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen
        name="AppSetting"
        component={HomeWithSafeArea(AppSetting)}
      />
      <Stack.Screen name="AddCity" component={HomeWithSafeArea(AddCity)} />
      <Stack.Screen
        name="ManageCities"
        component={HomeWithSafeArea(ManageCities)}
      />
      <Stack.Screen
        name="ManagePollens"
        component={HomeWithSafeArea(ManagePollens)}
      />
      <Stack.Screen
        name="AddPollens"
        component={HomeWithSafeArea(AddPollens)}
      />
      <Stack.Screen
        name="ManageMedications"
        component={HomeWithSafeArea(ManageMedications)}
      />
      <Stack.Screen
        name="AddMedications"
        component={HomeWithSafeArea(AddMedications)}
      />

      <Stack.Screen name="FeedBack" component={HomeWithSafeArea(FeedBack)} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={HomeWithSafeArea(PrivacyPolicy)}
      />
      <Stack.Screen
        name="TermsCondition"
        component={HomeWithSafeArea(TermsCondition)}
      />
      <Stack.Screen name="TipsTrick" component={HomeWithSafeArea(TipsTrick)} />
      <Stack.Screen
        name="PollenInfoForCad"
        component={HomeWithSafeArea(PollenInfoForCad)}
      />
      <Stack.Screen
        name="DeleteAllData"
        component={HomeWithSafeArea(DeleteAllData)}
      />
      <Stack.Screen
        name="DataVisualizer"
        component={HomeWithSafeArea(DataVisualizer)}
      />
      <Stack.Screen name="Account" component={HomeWithSafeArea(Account)} />
      <Stack.Screen
        name="HelpScreen"
        component={HomeWithSafeArea(HelpScreen)}
      />

      <Stack.Screen
        name="Notification"
        component={HomeWithSafeArea(Notification)}
      />

<Stack.Screen
        name="ForcastExplaination"
        component={HomeWithSafeArea(ForcastExplaination)}
      />

      

      
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

export default Main;
