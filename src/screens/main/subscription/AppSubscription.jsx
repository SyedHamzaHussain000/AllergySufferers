import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
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
  purchaseUpdatedListener,
  finishTransaction,
  purchaseErrorListener,
  acknowledgePurchaseAndroid,
  getAvailablePurchases,
} from 'react-native-iap';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {hideNavigationBar} from 'react-native-navigation-bar-color';

const AppSubscription = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const expireDate = useSelector(state => state.auth.expireDate);
  const isAndroid = Platform.OS === 'android'; // check platform is android or not

  const androidsubscriptionsId = ['premium_oneyear', 'premium_monthly'];

  const [connection, setConnection] = useState(false); // set in-app purchase is connected or not
  const [subscriptionLocal, setSubscriptionLocal] = useState([]);
  const [offerings, setOfferings] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const onRestorePurchase = async () => {
    if (Platform.OS == 'android') {
      setLoading(true);
      try {
        // const purchases = await RNIap.getAvailablePurchases();
        const purchases = await getAvailablePurchases();

        console.log("getAvailablePurchases", purchases)
        // GPA.3367-3679-0099-64031
        if (purchases.length > 0) {
           if (userData?.email) {
          try {
            const subscribeApi = await SubscribeNow(
              purchases[0].productId === "premium_monthly" ? "monthly" : "yearly",
              userData?.id,
              purchases[0].orderId,
            );
            dispatch(
              setSubscription({
                isExpired: false,
                SubscriptionType: purchases[0]?.productId,
                expireDate: subscribeApi.expiry,
                transactionId: purchases[0]?.orderId,
              }),
            );
            Toast.show({
              type:"success",
              text1: "Your subscription has been restored!",
            });
            navigation.navigate("Home");
          } catch (error) {
            ShowError(error)
          }
        } else {
          Toast.show({
            type: "success",
            text1: "Please create or login to enjoy the subscription",
          });
          dispatch(
            setSubscription({
              isExpired: false,
              SubscriptionType: purchases[0].productId,
              expireDate: moment().add(1, "month").format("YYYY-MM-DD"),
              transactionId: purchases[0].orderId,
            }),
          );
          navigation.navigate("Login");
        }

          // navigation.navigate('Login');
        } else {
          Alert.alert(
            'Please buy the subscription',
            'To continue, please purchase a subscription.',
          );
        }
      } catch (e) {
        console.error('Failed to restore purchases:', e);
      } finally {
        setLoading(false);
      }
    } else {
      // setLoading(true);
      // try {
      //   const customerInfo = await Purchases.restorePurchases();
      //   console.log('restore', customerInfo.entitlements.active);
      //   if (
      //     Object.keys(customerInfo.entitlements.active).length > 0 &&
      //     !context?.token
      //   ) {
      //     // note('Purchases Restored!', 'Your subscription has been restored successfully');
      //     navigation.navigate('Message', {
      //       theme: 'light',
      //       title: 'Login Required',
      //       message:
      //         'To access your subscription benefits, please create or log in to your account',
      //       screen: 'Login',
      //     });
      //     // navigation.replace('Home');
      //   } else if (
      //     Object.keys(customerInfo.entitlements.active).length > 0 &&
      //     context?.token
      //   ) {
      //     note(
      //       'Purchases Restored!',
      //       'Your subscription has been restored successfully',
      //     );
      //   } else {
      //     note(
      //       'Please buy the subscription',
      //       'You have to buy the subscription first to continue',
      //     );
      //   }
      // } catch (e) {
      //   console.error('Failed to restore purchases:', e);
      // } finally {
      //   setLoading(false);
      // }
    }
  };

  const NoSubscription = () => {
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


      setSubscriptionLocal(subscriptions); // set subscription information
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  const subscribeNow = async (data, isExpired, type) => {
    if (Platform.OS == 'android') {

      try {
        
      
      if (userData?.email) {
        // navigation.navigate('Home');
        // return
        const offerToken = data?.subscriptionOfferDetails[0]?.offerToken;

        const purchaseData = await requestSubscription({
          sku: data?.productId,
          ...(offerToken && {
            subscriptionOffers: [{sku: data?.productId, offerToken}],
          }),
        });
        console.log('offerToken', purchaseData);

        if (purchaseData.length > 0) {
          const subscribeApi = await SubscribeNow(
            purchaseData[0]?.productId == 'premium_monthly'
              ? 'monthly'
              : 'yearly',
            userData?.id,
          );

          dispatch(
            setSubscription({
              isExpired: false,
              SubscriptionType: purchaseData[0]?.productId,
              expireDate: subscribeApi.expiry,
            }),
          );
          navigation.navigate('Home');
        }
      } else {
        const offerToken = data?.subscriptionOfferDetails[0]?.offerToken;
        const purchaseData = await requestSubscription({
          sku: data?.productId,
          ...(offerToken && {
            subscriptionOffers: [{sku: data?.productId, offerToken}],
          }),
        });

        if (purchaseData.length > 0) {
          Toast.show({
            type: 'success',
            text1:
              'Please create or login to account to enjoy the subscription',
          });

          dispatch(
            setSubscription({
              isExpired: false,
              SubscriptionType: purchaseData[0]?.productId,
              expireDate: moment().add(1, 'month').format('YYYY-MM-DD'),
            }),
          );
          navigation.navigate('Login');
        }
      }
    } catch (error) {
        console.log("error", error)
      }
    }


    return;
  };

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async purchase => {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          try {
            if (Platform.OS === 'android') {
              if (!purchase.isAcknowledgedAndroid) {
                await acknowledgePurchaseAndroid({
                  token: purchase.purchaseToken,
                });
                await finishTransaction({purchase, isConsumable: false});
              }
            } else {
              await finishTransaction({
                purchase: purchase,
                isConsumable: false,
              });
            }

            console.log('Purchase finished/acknowledged ✅');
          } catch (err) {
            console.warn('finishTransaction error', err);
          }
        }
      },
    );

    const purchaseErrorSubscription = purchaseErrorListener(error => {
      console.warn('purchaseErrorListener', error);
    });

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, padding: 20, paddingBottom: 200}}>
      <AppHeader goBack={true} heading="Subscription" />

      <View style={{gap: 20}}>
        <View style={{marginTop: 0, gap: 2}}>
          <AppText
            title={`Benefits`}
            textSize={2}
            textFontWeight
            textColor={AppColors.BLACK}
          />

          <AppText
            title={`- Get 4 day forecasts including today for all pollen and spores in the air`}
            textSize={1.8}
            textColor={AppColors.BLACK}
          />
          <AppText
            title={`- See past forecasts up to 14 days (5 days with everything in the air)`}
            textSize={1.8}
            textColor={AppColors.BLACK}
          />
          <AppText
            title={`- Get push notifications for the pollen and spores you want and levels`}
            textSize={1.8}
            textColor={AppColors.BLACK}
          />

          <AppText
            title={`- Log your symptoms, medication and graph in the data visualizer`}
            textSize={1.8}
            textColor={AppColors.BLACK}
          />

          <AppText
            title={`- Your choice of a yearly subscription ( whole pollen and spore season) or monthly option aswell`}
            textSize={1.8}
            textColor={AppColors.BLACK}
          />
        </View>

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
        
        
           
           {loading == true ? (
             <ActivityIndicator size={'large'} color={AppColors.BLACK} />
           ) : (
             <TouchableOpacity onPress={() => onRestorePurchase()}>
               <AppText
                 title={'Restore Purchase'}
                 textSize={2}
                 textAlignment={'center'}
                 textColor={AppColors.BLUE}
               />
             </TouchableOpacity>
           )}
      
        

         <TouchableOpacity
          onPress={() => NoSubscription()}
          style={{marginTop: 5, flexDirection:'row', alignSelf:'center', gap:4}}>
          <AppText
            title={'If you already have a subscription please'}
            textSize={2}
            textAlignment={'center'}
            textColor={AppColors.BLACK}
          />
          <AppText
            title={'Login'}
            textSize={2}
            textAlignment={'center'}
            textFontWeight

            textColor={AppColors.BLACK}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => NoSubscription()}
          style={{marginTop: 10}}>
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
