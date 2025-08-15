import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../../components/AppHeader';
import SubscriptionCard from '../../../components/SubscriptionCard';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import {useDispatch, useSelector} from 'react-redux';
import {setSubscription} from '../../../redux/Slices/AuthSlice';
import SubscribeNow from '../../../global/SubscribeNow';
import {
  endConnection,
  initConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  getSubscriptions,
  Subscription,
  presentCodeRedemptionSheetIOS,
} from 'react-native-iap';


const AppSubscription = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const expireDate = useSelector(state => state.auth.expireDate);
  const isAndroid = Platform.OS === 'android'; // check platform is android or not

    const androidsubscriptionsId = ['premium_oneyear'];
    
  const [connection, setConnection] = useState(false); // set in-app purchase is connected or not
  const [subscription, setSubscription] = useState([]);
  const [offerings, setOfferings] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const result = await initConnection();
      // console.log('IAP connected?', result);
      setConnection(result);

      if (Platform.OS === 'android') {
        await flushFailedPurchasesCachedAsPendingAndroid();
      }
    };

    setup();

    return () => {
      endConnection();
    };
  }, []);

   useEffect(() => {
    if (isAndroid) {
      if (connection) {
        getSubscriptionInfo();
      }
    }
  }, [connection]);

  const NoSubscription = () => {
    dispatch(setSubscription({isExpired: true}));
    if (userData?.email) {


      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };

  // To get Subscription information
  const getSubscriptionInfo = async () => {
    try {
      const subscriptions = await getSubscriptions({
        skus: androidsubscriptionsId,
      });
      console.log('sussssb', subscriptions);

      setSubscription(subscriptions); // set subscription information
    } catch (error) {
      console.error('Error fetching products: ', error);
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

export default AppSubscription;
