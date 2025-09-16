import { View, Text } from 'react-native'
import React from 'react'
import AppText from '../../components/AppTextComps/AppText'

const InternetConnection = () => {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <AppText title={"No Internet connection"} textSize={2.3}/>
    </View>
  )
}

export default InternetConnection