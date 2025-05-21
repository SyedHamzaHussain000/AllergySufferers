import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import AppColors from '../utils/AppColors';
import AppText from './AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
type props = {
  title?: any;
  bgColor?: any;
  handlePress?: () => void;
  textColor?: any;
  textFontWeight?: boolean;
  textSize?: any;
  RightColour?: any;
  buttoWidth?: number;
  isLoading?: boolean;
};
const AppButton = ({
  title,
  handlePress,
  textColor = AppColors.WHITE,
  textFontWeight = true,
  textSize = 2.5,
  bgColor,
  RightColour = AppColors.BTNCOLOURS,
  buttoWidth = 90,
  isLoading,
}: props) => {
  return (
    <>
      {isLoading == true ? (
        <View style={{
            backgroundColor: bgColor ? bgColor : AppColors.BTNCOLOURS,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
            width: responsiveWidth(buttoWidth),
          }}> 

        <ActivityIndicator size={'large'} color={AppColors.WHITE} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={handlePress}
          style={{
            backgroundColor: bgColor ? bgColor : AppColors.BTNCOLOURS,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
            width: responsiveWidth(buttoWidth),
          }}>
          <View />

          <AppText
            textColor={textColor}
            textSize={textSize}
            title={title}
            textFontWeight={textFontWeight}
          />

          <FontAwesome6
            name={'circle-arrow-right'}
            color={RightColour}
            size={responsiveFontSize(3)}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default AppButton;
