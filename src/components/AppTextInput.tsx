import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
type props = {
  logo?: any;
  inputPlaceHolder?: any;
  inputBgColour?: any;
  inputWidth?: number;
  containerBg?: any;
  rightLogo?: any;
};
const AppTextInput = ({
  logo,
  inputBgColour,
  inputPlaceHolder,
  inputWidth = 80,
  containerBg,
  rightLogo,
}: props) => {
  return (
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
  );
};

export default AppTextInput;
