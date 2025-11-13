import { View, Text, Image, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import AppHeader from '../../../../components/AppHeader'

import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../../utils/Responsive_Dimensions'
import AppColors from '../../../../utils/AppColors'
import FreeTutorials from '../../../../assets/freetutorials/FreeTutorials'
const ViewFreeAppGuide = () => {

const tutArray = [
  { id: 1, img: FreeTutorials[1] },
  { id: 2, img: FreeTutorials[2] },
  { id: 3, img: FreeTutorials[3] },
  { id: 4, img: FreeTutorials[4] },
  { id: 5, img: FreeTutorials[5] },
  { id: 6, img: FreeTutorials[6] },
  { id: 7, img: FreeTutorials[7] },
  { id: 8, img: FreeTutorials[8] },
  { id: 9, img: FreeTutorials[9] },
  { id: 10, img: FreeTutorials[10] },
  { id: 11, img: FreeTutorials[11] },
  { id: 12, img: FreeTutorials[12] },
  { id: 13, img: FreeTutorials[13] },
  { id: 14, img: FreeTutorials[14] },
  { id: 15, img: FreeTutorials[15] },
  { id: 16, img: FreeTutorials[16] },
  { id: 17, img: FreeTutorials[17] },
  { id: 18, img: FreeTutorials[18] },
  { id: 19, img: FreeTutorials[19] },
  { id: 20, img: FreeTutorials[20] },
  { id: 21, img: FreeTutorials[21] },
  { id: 22, img: FreeTutorials[22] },
];

  return (
    <SafeAreaView style={{flex:1}} >
        <View style={{paddingHorizontal:10, marginTop:30}}>

        <AppHeader goBack={true} heading="Go Back" skipButton={true}  />
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

export default ViewFreeAppGuide