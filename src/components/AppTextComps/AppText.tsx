import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';

type textProps = {
  title?: any;
  textSize?: any;
  textColor?: any;
  textFontWeight?: boolean;
  textAlignment?: any;
  textwidth?: any;
  textHeight?:any,
  marginTop?: any,
  style?: ViewStyle
};

const AppText = ({
  title,
  textSize,
  textColor,
  textFontWeight,
  textAlignment,
  textwidth,
  textHeight,
  marginTop,
  style,
}: textProps) => {
  return (
    <Text
      style={[{
        width: textwidth ? responsiveWidth(textwidth) : null,
        fontSize: textSize
          ? responsiveFontSize(textSize)
          : responsiveFontSize(1.4),
        fontWeight: textFontWeight ? 'bold' : 'regular',
        color: textColor ? textColor : AppColors.BLACK,
        textAlign: textAlignment ? textAlignment : null,
        alignSelf: textAlignment ? textAlignment : null,
        height: textHeight ? responsiveHeight(textHeight): null, 
        marginTop: responsiveHeight(marginTop),
      },style]}>
      {title}
    </Text>
  );
};

export default AppText;
