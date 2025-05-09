import { View, Text } from 'react-native'
import React from 'react'
import AppText from './AppTextComps/AppText'
import AppColors from '../utils/AppColors'

type props = {
    heading?: string
    subheading?: string
    Rightheading?: string
}

const AppHeader = ({Rightheading,heading,subheading}: props) => {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{}}>
                    <AppText title={heading} textFontWeight textSize={2.5} textColor={AppColors.BLACK}/>
                    <AppText title={subheading} textColor={"#777777"} textSize={2}/>
            </View>

            <AppText title={Rightheading} textFontWeight textSize={2} textColor={AppColors.BLACK}/>
    </View>
  )
}

export default AppHeader