import {View, Text} from 'react-native';
import React from 'react';
import AppColors from '../utils/AppColors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import AppButton from './AppButton';

type props = {
  title?: String;
  price?: String;
  type?: String;
  subscribeNow?: () => void;
};

const SubscriptionCard = ({price, title, type, subscribeNow}: props) => {
  return (
    <View
      style={{
        backgroundColor: AppColors.PRIMARY,
        width: responsiveWidth(90),
        borderRadius: 20,
        padding: 20,
        gap: 30,
      }}>
      <View>
        <AppText
          title={title}
          textSize={3}
          textFontWeight
          textColor={AppColors.WHITE}
          textAlignment={'center'}
        />
        <AppText
          title={`$${price}`}
          textSize={6}
          textFontWeight
          textColor={AppColors.WHITE}
          textAlignment={'center'}
        />
        <AppText
          title={`/${type}`}
          textSize={2}
          textFontWeight
          textColor={AppColors.WHITE}
          textAlignment={'center'}
        />
      </View>

      <AppButton
        title={'SUBSCRIBE'}
        textColor={AppColors.PRIMARY}
        textFontWeight={false}
        textSize={2}
        bgColor={AppColors.WHITE}
        buttoWidth={80}
        handlePress={subscribeNow}
      />
    </View>
  );
};

export default SubscriptionCard;
