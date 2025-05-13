import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

const Login = () => {
  return (
      <View
      style={{
          flex: 1,
          backgroundColor: AppColors.WHITE,
          justifyContent: 'center',
          alignItems: 'center',
          gap:20
      }}>
          <ScrollView contentContainerStyle={{flexGrow:1, alignItems:'center', justifyContent:'center', gap:20}}>
      <AppText
        title={'Allergy Sufferers'}
        textColor={AppColors.BTNCOLOURS}
        textSize={4}
        textFontWeight
      />

    <View style={{alignItems:'center', justifyContent:"center"}}>
      <AppText
        title={'Getting Started'}
        textColor={AppColors.BLACK}
        textSize={2.5}
        textFontWeight
      />
      <AppText
        title={'Let’s login for explore continues'}
        textColor={AppColors.LIGHTGRAY}
        textSize={1.8}
      />
      </View>

      <View style={{gap: 20}}>
        <AppTextInput title="Email Address" inputPlaceHolder={'Input email'} />
        <AppTextInput title="Password" inputPlaceHolder={'Input password'} />
        <View style={{gap:10}}>
          <AppButton title={'LOGIN'} RightColour={AppColors.WHITE} />

          <AppText
            title={'Forget Password'}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.8}
          />
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

export default Login;
