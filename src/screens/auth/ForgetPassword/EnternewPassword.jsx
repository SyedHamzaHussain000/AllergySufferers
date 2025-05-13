import {View, Text} from 'react-native';
import React from 'react';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';

const EnternewPassword = ({navigation}) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: AppColors.WHITE,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <AppText
          title={'Enter a New Password'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
        <AppText
          title={'We recovered your account'}
          textColor={AppColors.LIGHTGRAY}
          textSize={1.8}
        />
      </View>

      <View style={{gap:20}}>

      <AppTextInput title="New Password" inputPlaceHolder={'Input password'} />
      <AppTextInput title="Confirm New Password" inputPlaceHolder={'Input password'} />
      </View>
      <AppButton title={'Next'} RightColour={AppColors.WHITE} handlePress={() => navigation.navigate('Login')}  />
    </View>
  );
};

export default EnternewPassword;
