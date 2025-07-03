import {View, Text} from 'react-native';
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

const GetStarted = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [subLoader, setSubLoader] = useState(false);
  const checkLoginandPremium = async() => {
    if (userData?.email) {
      setSubLoader(true);
      
      const checkSub = await CheckSubscription(userData.id)
      if(checkSub.expiry){

        dispatch(setSubscription({isExpired: false, expireDate: checkSub?.expiry }))
        navigation.navigate('Main');
      }else{
        dispatch(setSubscription({isExpired: true, expireDate: ""}))
        navigation.navigate('Main');
      }

    } else {
      navigation.navigate('Subscription');
    }
  };

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
