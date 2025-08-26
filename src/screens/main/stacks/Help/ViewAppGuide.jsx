import { View, Text, Image, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import AppHeader from '../../../../components/AppHeader'

import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../../utils/Responsive_Dimensions'
import AppColors from '../../../../utils/AppColors'
import Tutorials from '../../../../assets/tutorials/Tutorials'
const ViewAppGuide = () => {

const tutArray = [
  { id: 1, img: Tutorials[1] },
  { id: 2, img: Tutorials[2] },
  { id: 3, img: Tutorials[3] },
  { id: 4, img: Tutorials[4] },
  { id: 5, img: Tutorials[5] },
  { id: 6, img: Tutorials[6] },
  { id: 7, img: Tutorials[7] },
  { id: 8, img: Tutorials[8] },
  { id: 9, img: Tutorials[9] },
  { id: 10, img: Tutorials[10] },
  { id: 11, img: Tutorials[11] },
  { id: 12, img: Tutorials[12] },
  { id: 13, img: Tutorials[13] },
  { id: 14, img: Tutorials[14] },
  { id: 15, img: Tutorials[15] },
  { id: 16, img: Tutorials[16] },
  { id: 17, img: Tutorials[17] },
  { id: 18, img: Tutorials[18] },
  { id: 19, img: Tutorials[19] },
  { id: 20, img: Tutorials[20] },
  { id: 21, img: Tutorials[21] },
  { id: 22, img: Tutorials[22] },
  { id: 23, img: Tutorials[23] },
  { id: 24, img: Tutorials[24] },
  { id: 25, img: Tutorials[25] },
  { id: 26, img: Tutorials[26] },
  { id: 27, img: Tutorials[27] },
  { id: 28, img: Tutorials[28] },
  { id: 29, img: Tutorials[29] },
  { id: 30, img: Tutorials[30] },
  { id: 31, img: Tutorials[31] },
  { id: 32, img: Tutorials[32] },
  { id: 33, img: Tutorials[33] },
  { id: 34, img: Tutorials[34] },
  { id: 35, img: Tutorials[35] },
  { id: 36, img: Tutorials[36] },
  { id: 37, img: Tutorials[37] },
];

  return (
    <SafeAreaView style={{flex:1}} >
        <View style={{paddingHorizontal:10, marginTop:30}}>

        <AppHeader goBack={true} heading="Go Back"  />
        </View>



      
        <FlatList
        data={tutArray}        
        horizontal

        renderItem={({item})=>{
          return(
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image source={item.img} style={{width:responsiveWidth(100), height:responsiveHeight(90),resizeMode:'contain'}}/>
            <View style={{height:responsiveHeight(90), width:2, backgroundColor:AppColors.BLACK, marginLeft:5, marginRight:5}}/>
            </View>
          )
        }}
        />
    </SafeAreaView>
  )
}

export default ViewAppGuide