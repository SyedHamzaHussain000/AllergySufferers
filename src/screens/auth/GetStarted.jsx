import {View, Text, Alert, Platform, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
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
import { setAddCity } from '../../redux/Slices/MedicationSlice';

const GetStarted = ({navigation}) => {
    const allMyCity = useSelector(state => state?.medications?.allMyCity);
  
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [fetchingCurrentLocation, setFechingCurrentLocation] = useState(false);

  const [subLoader, setSubLoader] = useState(false);
  const checkLoginandPremium = async() => {
    if (userData?.email) {



      setSubLoader(true);
      
      const checkSub = await CheckSubscription(userData.id)
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

        navigation.navigate('Main');
        // if(allMyCity?.length > 0){

        //   if(allMyCity[0]?.currentLocation){
        //     navigation.navigate('Main');
        //     return
        //   }else{
        //     getCurrentLocation()
        //   }
        // }else{
        //     getCurrentLocation()
        // }
        
        
      }else{
        dispatch(setSubscription({isExpired: true, expireDate: ""}))
        navigation.navigate('Main');
      }

    } else {
      navigation.navigate('Subscription');
    }
  };



    // const getCurrentLocation = async () => {
    //   // console.log('----------------------------');
    //   setFechingCurrentLocation(true);
    //   const gettingCurrentLatlng = await GetCurrentLocation();
  
    //   // Alert.alert("gettingCurrentLatlng",)
    //   console.log('triple H', gettingCurrentLatlng);
  
    //   const getCityName = await GetCityName(
    //     gettingCurrentLatlng.latitude,
    //     gettingCurrentLatlng.longitude,
    //   );

    //   dispatch(setAddCity({
    //     lat: JSON.stringify(gettingCurrentLatlng?.latitude),
    //     lng: JSON.stringify(gettingCurrentLatlng?.longitude),
    //     city_name: getCityName,
    //     currentLocation: true
    //   }))
    //   setSubLoader(false)
      
    //   // setMyLocation(gettingCurrentLatlng);
    //   // return
    // };
  

  return (
    <BackgroundScreen>
      <View style={{flex: 0.98, justifyContent: 'space-between'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AppText
            title={'Allergy Sufferers'}
            textColor={AppColors.WHITE}
            textSize={4}
            textFontWeight
          />
          {
          fetchingCurrentLocation && (
            <AppText title={"Fetching current location please wait..."} textSize={2} textColor={AppColors.WHITE}/>
          )
        }
        </View>

        

        <AppButton
          bgColor={AppColors.WHITE}
          title={'GET STARTED'}
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
