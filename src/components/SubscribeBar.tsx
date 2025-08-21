import { View, Text } from 'react-native'
import React from 'react'
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import AppButton from './AppButton';


type props = {
    title?: string;
    title2?: string;
    handlePress?: () => void;

}

const SubscribeBar = ({title,title2 , handlePress}:props) => {
  return (
    <View style={{padding:20, borderWidth:1, borderRadius:20, borderColor:AppColors.BLACK, gap:20}}>
        <AppText title={title} textSize={2} textColor={AppColors.BLACK} textFontWeight/>
        <AppText title={title2} textSize={1.8} textColor={AppColors.BLACK}/>
        <AppButton title={"Subscribe"} buttoWidth={80} handlePress={handlePress}/>
    </View>
  )
}

export default SubscribeBar