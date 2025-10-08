import {View, Text, Alert, Platform, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackgroundScreen from '../../components/AppTextComps/BackgroundScreen';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import AppButton from '../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import BASE_URL from '../../utils/BASE_URL';
import axios from 'axios';
import {setSubscription} from '../../redux/Slices/AuthSlice';
import moment from 'moment';
import CheckSubscription from '../../global/CheckSubscription';
import { GetCurrentLocation } from '../../global/GetCurrentLocation';
import { GetCityName } from '../../global/GetCityName';
import Geocoder from 'react-native-geocoding';
import { setAddCity, setAllMedicationFromApi } from '../../redux/Slices/MedicationSlice';
import GetAllLocation from '../../global/GetAllLocation';
import { ApiCallWithUserId } from '../../global/ApiCall';
import { getAvailablePurchases } from 'react-native-iap';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import NetInfo from '@react-native-community/netinfo'
import ShowError from '../../utils/ShowError';
const GetStarted = ({navigation}) => {
    const allMyCity = useSelector(state => state?.medications?.allMyCity);
    const subscribeType = useSelector(state => state?.auth?.SubscriptionType);
  
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [fetchingCurrentLocation, setFechingCurrentLocation] = useState(false);
  const [isInternetConnected, settInterenetConnected] = useState(true)

  const [subLoader, setSubLoader] = useState(false);

  useEffect(()=>{
    const nav = navigation.addListener('focus',()=>{

      hideNavigationBar();
    })
    return nav
  },[navigation])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
          // dispatch(setInternet(state.isConnected))
            console.log("is",state.isConnected)
            settInterenetConnected(state.isConnected)
          // setIsConnected(state.isConnected);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
    



  
  
  const checkLoginandPremium = async() => {

    if(isInternetConnected == false){
      ShowError("No Internet Connection", 3000)
      return
    }

    hideNavigationBar();
    try {
    

    if (userData?.email) {



      setSubLoader(true);
      
      const checkSub = await CheckSubscription(userData?.id)

      

      if(checkSub.expiry){

        dispatch(setSubscription({isExpired: false, expireDate: checkSub?.expiry }))
        
        
        if(Platform.OS == "android"){
           await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Allergy Sufferers',
              message: 'Allergy sufferers want to access your location',
            },
          );

        }

        const response = await ApiCallWithUserId('post', 'get_medications_active', userData?.id, )

        // Alert.alert("calling in getStarted")

        if(response?.data?.length > 0){
          console.log("get_medications_active....",response?.data)

          dispatch(setAllMedicationFromApi(response?.data))
        }
        setSubLoader(false);

        navigation.navigate('Main');
        
      }else{
        dispatch(setSubscription({isExpired: true, expireDate: "", SubscriptionType: ""}))
        navigation.navigate('Main');
      }

    } else {

        navigation.navigate('Subscription');
    }
    } catch (error) {
      console.log("error", error)
    }
  };




  

  return (
    <BackgroundScreen>
      <View style={{flex: 0.98, justifyContent: 'space-between'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap:10}}>
          <AppText
            title={'Allergy Sufferers'}
            textColor={AppColors.WHITE}
            textSize={4}
            textFontWeight
          />

          <AppText
            title={'Login for the most accurate pollen & spore forecasts in Canada'}
            textColor={AppColors.WHITE}
            textSize={2}
            textAlignment={'center'}
          />
          
          {
          fetchingCurrentLocation && (
            <AppText title={"Fetching current location please wait..."} textSize={2} textColor={AppColors.WHITE}/>
          )
        }
        </View>

        

        <AppButton
          bgColor={AppColors.WHITE}
          title={'Login'}
          textColor={AppColors.BTNCOLOURS}
          textSize={2}
          handlePress={() => checkLoginandPremium()}
          isLoading={subLoader}
          loadingColour={AppColors.PRIMARY}
        />
      </View>
    </BackgroundScreen>
  );
};

export default GetStarted;
