import {View, Text, TextInput, TouchableOpacity} from 'react-native';
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
  keyboardType?:any
  password?:any
  onEyePress?:() => void
  eye?: boolean
  onNotificationPress?:() => void,
  cities?:boolean
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
  isNotification,
  keyboardType,
  password,
  onEyePress,
  eye,
  onNotificationPress,
  cities
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
          <>
          <TextInput
            placeholder={inputPlaceHolder}
            placeholderTextColor={AppColors.LIGHTGRAY}
            style={{width: responsiveWidth(inputWidth), height: 50, color: AppColors.BLACK}}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secure}
            keyboardType={keyboardType}
          />

          
            </>
          
        ) : (
          <AppText
            title={inputPlaceHolder}
            textColor={AppColors.LIGHTGRAY}
            textwidth={cities ?  50 : 67}
            textSize={2}
          />
        )}

        <>
        {

        
            password && (
              <TouchableOpacity onPress={onEyePress}>
        {        
                  password
                }
              </TouchableOpacity>
            )
            }
          </>

    {textInput == true ? 
      null
      :
        <View style={{flexDirection: 'row', gap: 5, alignItems:'center' }}>
          {
            cities && (

          <TouchableOpacity onPress={onNotificationPress} style={{backgroundColor:AppColors.PRIMARY, paddingHorizontal:10, borderRadius:100, alignItems:'center', justifyContent:'center', paddingVertical:7}}>
            <AppText title={"Notify"} textColor={AppColors.WHITE} textFontWeight textSize={1.8}/>
          </TouchableOpacity>
            )
          }
          {rightLogo}
          {arrowDelete}
        </View>
        
    }
      </View>
    </View>
  );
};

export default AppTextInput;
