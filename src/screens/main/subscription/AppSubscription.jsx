import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  requestSubscription,
} from 'react-native-iap';

const AppSubscription = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const expireDate = useSelector(state => state.auth.expireDate);
  const isAndroid = Platform.OS === 'android'; // check platform is android or not

  const androidsubscriptionsId = ['premium_oneyear', 'premium_monthly'];

  const [connection, setConnection] = useState(false); // set in-app purchase is connected or not
  const [subscriptionLocal, setSubscriptionLocal] = useState([]);
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

      setSubscriptionLocal(subscriptions); // set subscription information
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  const subscribeNow = async (data, isExpired, type) => {
    if (Platform.OS == 'android') {
      if (userData?.email) {

        navigation.navigate('Home');
        return 
        const offerToken = data?.subscriptionOfferDetails[0].offerToken;

        const purchaseData = await requestSubscription({
          sku: data?.productId,
          ...(offerToken && {
            subscriptionOffers: [{sku: data?.productId, offerToken}],
          }),
        });
        console.log('offerToken', purchaseData);

        return;
        if (isExpired == false) {
          const subscribeApi = await SubscribeNow(type, userData?.id);
          console.log('userData', userData.email, isExpired, subscribeApi);
          dispatch(
            setSubscription({
              isExpired: isExpired,
              SubscriptionType: type,
              expireDate: subscribeApi.expiry,
            }),
          );
          navigation.navigate('Home');
        }
      } else {

        navigation.navigate('Login');
        return;
        
        const offerToken = data?.subscriptionOfferDetails[0].offerToken;
        const purchaseData = await requestSubscription({
          sku: data?.productId,
          ...(offerToken && {
            subscriptionOffers: [{sku: data?.productId, offerToken}],
          }),
        });
        console.log('offerToken', purchaseData);
        
        return;
        if (isExpired == false) {
          navigation.navigate('Login');
          dispatch(
            setSubscription({isExpired: isExpired, SubscriptionType: type}),
          );
        }
      }
    }

    return;
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, padding: 20}}>
      <AppHeader goBack={true} heading="Subscription" />

      <View style={{gap: 20}}>
        <FlatList
          contentContainerStyle={{gap: 10}}
          data={subscriptionLocal}
          renderItem={({item}) => {
            const priceObjectIndex =
              item?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList
                ?.length;
            const PriceArray =
              item?.subscriptionOfferDetails[0]?.pricingPhases
                ?.pricingPhaseList[priceObjectIndex - 1];
            return (
              <SubscriptionCard
                title={item?.displayName}
                price={PriceArray?.formattedPrice}
                type={PriceArray?.billingPeriod == 'P1M' ? 'monthly' : 'yearly'}
                subscribeNow={() => subscribeNow(item, false, 'month')}
              />
            );
          }}
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
    </ScrollView>
  );
};

export default AppSubscription;
