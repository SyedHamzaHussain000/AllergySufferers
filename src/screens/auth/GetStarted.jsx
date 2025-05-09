import { View, Text } from 'react-native'
import React from 'react'
import BackgroundScreen from '../../components/AppTextComps/BackgroundScreen'
import AppText from '../../components/AppTextComps/AppText'
import AppColors from '../../utils/AppColors'
import AppButton from '../../components/AppButton'

const GetStarted = () => {
  return (
    <BackgroundScreen >
        <View style={{ flex:0.98, justifyContent:'space-between',}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

                <AppText title={"Allergy Sufferers"} textColor={AppColors.WHITE} textSize={4} textFontWeight/>
                </View>

                <AppButton bgColor={AppColors.WHITE} title={"GET STARTED"} textColor={AppColors.BTNCOLOURS} textSize={2} />
        </View>
    </BackgroundScreen>
  )
}

export default GetStarted