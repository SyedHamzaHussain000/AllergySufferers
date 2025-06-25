import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppHeader from '../../../components/AppHeader';
import SubscriptionCard from '../../../components/SubscriptionCard';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import {useSelector} from 'react-redux';

const Subscription = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);

  const NoSubscription = () => {
    if (userData?.email) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
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
        />
        <SubscriptionCard
          title={'Yearly Package'}
          price={'14.99'}
          type={'yearly'}
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
