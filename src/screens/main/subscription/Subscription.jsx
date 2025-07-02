import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppHeader from '../../../components/AppHeader';
import SubscriptionCard from '../../../components/SubscriptionCard';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import {useDispatch, useSelector} from 'react-redux';
import {setSubscription} from '../../../redux/Slices/AuthSlice';
import SubscribeNow from '../../../global/SubscribeNow';

const Subscription = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const isExpiredRedux = useSelector(state => state.auth.isExpired);
  const expireDate = useSelector(state => state.auth.expireDate);
  const SubscriptionType = useSelector(state => state.auth.SubscriptionType);

  const NoSubscription = () => {
    dispatch(setSubscription({isExpired: true}));
    if (userData?.email) {


      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };

  const subscribeNow = async(isExpired, type) => {
    
    if (userData?.email) {
      if (isExpired == false) {
        
        const subscribeApi = await SubscribeNow(type , userData?.id)
        console.log("userData", userData.email,isExpired , subscribeApi);
        dispatch(setSubscription({isExpired: isExpired, SubscriptionType: type, expireDate: subscribeApi.expiry}));
        navigation.navigate('Home');
      }

    } else {
      if (isExpired == false) {
        navigation.navigate('Login');
        dispatch(setSubscription({isExpired: isExpired, SubscriptionType: type}));
      }
    }

  };

  return (
    <View style={{padding: 20}}>
      <AppHeader goBack={true} heading="Subscription" />

      <View style={{gap: 20}}>
        <SubscriptionCard
          title={'Monthly Package'}
          price={'3.99'}
          type={'month'}
          subscribeNow={() => subscribeNow(false, 'month')}
        />
        <SubscriptionCard
          title={'Yearly Package'}
          price={'14.99'}
          type={'yearly'}
          subscribeNow={() => subscribeNow(false, 'yearly')}
        />

        <TouchableOpacity onPress={() => NoSubscription()}>
          <AppText
            title={'Continue without subscription'}
            textSize={2}
            textAlignment={'center'}
            textFontWeight
            textColor={AppColors.BLUE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Subscription;
