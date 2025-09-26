import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AppHeader from '../../../components/AppHeader'
import AppText from '../../../components/AppTextComps/AppText';
import { responsiveFontSize } from '../../../utils/Responsive_Dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AppColors from '../../../utils/AppColors';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../../redux/Slices/AuthSlice';
import { deleteAllData } from '../../../redux/Slices/MedicationSlice';
import { clearForaCastSlive } from '../../../redux/Slices/ForecastSlice';
const AppSetting = ({navigation}) => {

  const dispatch = useDispatch()
     const pollens = [
    {id: 1, name: 'Cities', top: true, onPress: ()=> navigation.navigate("ManageCities")},
    {id: 2, name: 'Pollen and Spores types', onPress: ()=> navigation.navigate("ManagePollens")},
    {id: 3, name: 'Medications', onPress: ()=> navigation.navigate("ManageMedications")},
    {id: 4, name: 'Push Notifications', onPress: ()=> navigation.navigate("Notification") },
    {id: 5, name: 'Logout',bottom: true, onPress: ()=>  logoutFunction()},
  ];

  const logoutFunction = () => {
    dispatch(setLogout())
    dispatch(clearForaCastSlive())
    dispatch(deleteAllData())
    navigation.navigate("Auth")
  }
  
  
  return (
    <SafeAreaView style={{flex:1}}>  
    <View style={{padding:20}}>

      <AppHeader heading='App Settings'  goBack={true}/>

        <FlatList
            data={pollens}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={item.onPress}
                  activeOpacity={0.8}
                  style={{
                    borderWidth: 1, 
                    borderTopRightRadius: item.top ? 10 : 0,
                    borderTopLeftRadius: item.top ? 10 : 0,
                    borderBottomRightRadius: item.bottom ? 10 : 0,
                    borderBottomLeftRadius: item.bottom ? 10 : 0,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: item.bottom ? 1 : 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <AppText
                      title={item.name}
                      textSize={2}
                      textColor={AppColors.BLACK}
                      textFontWeight
                    />
                  </View>

                  <FontAwesome6
                    name={'circle-arrow-right'}
                    size={responsiveFontSize(2.5)}
                    color={'#032198'}
                  />
                </TouchableOpacity>
              );
            }}
          />

    </View>
    </SafeAreaView>
  )
}

export default AppSetting