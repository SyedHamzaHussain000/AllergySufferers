import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import BackgroundScreen from '../../components/AppTextComps/BackgroundScreen';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import AppButton from '../../components/AppButton';
import AppImages from '../../assets/images/AppImages';
import Logo from '../../components/AppTextComps/Logo';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';

import MarqueeText from '@react-native-oh-tpl/react-native-marquee';

const Loading = () => {
  return (
    <BackgroundScreen stylesPorp={{paddingTop: 0, paddingLeft:0}}>
      <Logo
        logoUrl={AppImages.worldmap}
        logoWeight={responsiveWidth(100)}
        logoHeight={responsiveHeight(40)}
      />
      <View style={{flex: 0.98, justifyContent: 'space-between'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <AppText
            title={'Allergy Sufferers'}
            textColor={AppColors.WHITE}
            textSize={4}
            textFontWeight
          />
          <AppText
            title={
              'Clean floors with a vacuum cleaner that has a HEPA filter to get rid of pollen that has been tracked in from outdoors.'
            }
            textColor={AppColors.WHITE}
            textSize={2}
            textFontWeight={false}
            textAlignment={'center'}
          />

          <View
            style={{
              marginTop: responsiveHeight(5),
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}>
            <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            <AppText
              title={'Loading...'}
              textColor={AppColors.WHITE}
              textSize={2}
              textFontWeight
            />
          </View>
        </View>

        <View style={{height:responsiveHeight(5), width:responsiveWidth(100), backgroundColor:AppColors.WHITE, alignItems:'center'}}>

        <MarqueeText
          style={{ fontSize: 18, }}
          speed={1}
          marqueeOnStart={true}
          loop={true}
          delay={100}
        >
          . Get Started  . Getting Current Location
        </MarqueeText>
        </View>

        <View style={{height:responsiveHeight(5), width:responsiveWidth(100), backgroundColor:AppColors.WHITE, alignItems:'center'}}>

<MarqueeText
  style={{ fontSize: 18, }}
  speed={1}
  marqueeOnStart={true}
  loop={true}
  delay={0}
>
  . connecting to store  . Initializing interface . Downloading forecasts
</MarqueeText>
</View>
      </View>
    </BackgroundScreen>
  );
};

export default Loading;
