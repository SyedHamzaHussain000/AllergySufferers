import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions'
import AppColors from '../utils/AppColors'
import AppText from './AppTextComps/AppText'

const LoaderMode = () => {
  return (
    // <View  style={{alignItems:'center', justifyContent:'center'}}>
        <View style={{height:responsiveHeight(100), width:responsiveWidth(100), backgroundColor:AppColors.BLACK, opacity:0.5, alignItems:'center', justifyContent:'center', position:'absolute', zIndex:100}}>

            {/* <View style={{position:'absolute', zIndex:10}}> */}
                    <ActivityIndicator size={'large'} color={AppColors.WHITE}/>
                    <AppText title={"Please wait..."} textColor={AppColors.WHITE} textSize={2} textFontWeight/>
            {/* </View> */}
        </View>

    // </View>
  )
}

export default LoaderMode