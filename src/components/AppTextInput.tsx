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
  title?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  secure?: boolean;
  arrowDelete?: any;
};
const AppTextInput = ({
  logo,
  inputBgColour,
  inputPlaceHolder,
  inputWidth = 80,
  containerBg,
  rightLogo,
  title,
  value,
  secure,
  onChangeText,
  arrowDelete,
}: props) => {
  return (
    <View style={{gap: 5}}>
      {/* <AppText title={title} textColor={AppColors.BLACK} textSize={2} textFontWeight/> */}
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
          height: 50,
        }}>
        {logo}

        <AppText
          title={inputPlaceHolder}
          textColor={AppColors.LIGHTGRAY}
          textwidth={70}
          textSize={2}
        />

        {/* <TextInput
        placeholder={inputPlaceHolder}
        placeholderTextColor={AppColors.LIGHTGRAY}
        style={{width: responsiveWidth(inputWidth), color: AppColors.BLACK}}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secure}
      /> */}

        <View style={{flexDirection:'row', gap:5, marginRight:100}}>

        {rightLogo}
        {arrowDelete}
        </View>

      </View>
    </View>
  );
};

export default AppTextInput;
