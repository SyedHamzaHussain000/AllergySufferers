import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
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
  textInput?: boolean;
  isNotification?: boolean
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
  textInput,
  isNotification
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

        {textInput == true ? (
          <TextInput
            placeholder={inputPlaceHolder}
            placeholderTextColor={AppColors.LIGHTGRAY}
            style={{width: responsiveWidth(inputWidth), height: 50, color: AppColors.BLACK}}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secure}
          />
        ) : (
          <AppText
            title={inputPlaceHolder}
            textColor={AppColors.LIGHTGRAY}
            textwidth={65}
            textSize={2}
          />
        )}

    {textInput == true ? 
      null
      :
        <View style={{flexDirection: 'row', gap: 5, marginRight: 100, }}>
          {isNotification}
          {rightLogo}
          {arrowDelete}
        </View>
        
    }
      </View>
    </View>
  );
};

export default AppTextInput;
