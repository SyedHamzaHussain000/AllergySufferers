import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from './AppTextComps/AppText';
type props = {
  logo?: any;
  inputPlaceHolder?: any;
  inputBgColour?: any;
  inputWidth?: number;
  containerBg?: any;
  rightLogo?: any;
  title?: string
};
const AppTextInput = ({
  logo,
  inputBgColour,
  inputPlaceHolder,
  inputWidth = 80,
  containerBg,
  rightLogo,
  title
}: props) => {
  return (
    <View style={{gap:5}}>
      <AppText title={title} textColor={AppColors.BLACK} textSize={2} textFontWeight/>
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: containerBg,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 12,
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: AppColors.LIGHTGRAY,
      }}>
      {logo}

      

      <TextInput
        placeholder={inputPlaceHolder}
        placeholderTextColor={AppColors.LIGHTGRAY}
        style={{width: responsiveWidth(inputWidth), color: AppColors.WHITE}}
      />

      {rightLogo}
    </View>
    </View>
  );
};

export default AppTextInput;
