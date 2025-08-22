import { View, Text, Image } from 'react-native'
import React from 'react'
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import AppButton from './AppButton';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';


type props = {
    title?: string;
    title2?: string;
    handlePress?: () => void;
    img?: any

}

const SubscribeBar = ({title,title2 , handlePress,img}:props) => {
  return (
    <View style={{padding:20, borderWidth:1, borderRadius:20, borderColor:AppColors.BLACK, gap:20}}>
        <AppText title={title} textSize={2} textColor={AppColors.BLACK} textFontWeight/>
        <AppText title={title2} textSize={1.8} textColor={AppColors.BLACK}/>
        {
          img && (
            <Image source={img} style={{width:responsiveWidth(80), resizeMode:'contain', height:responsiveHeight(30)}}/>
          )
        }
        <AppButton title={"Subscribe"} buttoWidth={80} handlePress={handlePress}/>
    </View>
  )
}

export default SubscribeBar