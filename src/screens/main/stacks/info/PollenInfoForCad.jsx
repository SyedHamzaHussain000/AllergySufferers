import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AppHeader from '../../../../components/AppHeader'
import AppText from '../../../../components/AppTextComps/AppText'
import AppColors from '../../../../utils/AppColors'
import { responsiveFontSize } from '../../../../utils/Responsive_Dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign'
const PollenInfoForCad = () => {

     const pollens = [
    {id:1, name: "Alberta", top: true},
    {id:2, name: "British Columbia", },
    {id:3, name: "Manitoba", },
    {id:4, name: "New Brunswick", },
    {id:5, name: "Ontario", },
    {id:6, name: "Prince Edward Island", },
    {id:7, name: "Quebec", },
    {id:8, name: "Saskatchewan", bottom:true },
  ]


  return (
    <View style={{padding:20}}>
        <AppHeader
        heading="Pollen Information for Canada"
      />

      <AppText 
      title={"Tree pollen seasons fluctuate from year to year by as much as two to six weeks due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs."}
      textColor={AppColors.LIGHTGRAY}
      textSize={1.8}
      />



         <FlatList
      data={pollens}
      contentContainerStyle={{marginTop:20}}
      renderItem={({item})=>{
        return(
          <View style={{borderWidth:1, borderTopRightRadius: item.top ? 10 : 0, borderTopLeftRadius: item.top ? 10 : 0, borderBottomRightRadius: item.bottom ? 10 : 0, borderBottomLeftRadius: item.bottom ? 10 : 0, padding:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth: item.bottom ? 1 :0 }}>
            <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
              

              <AppText title={item.name} textSize={2} textColor={AppColors.BLACK} textFontWeight/>
            </View>


            <AntDesign
            name={"plus"}
            size={responsiveFontSize(2.5)}
            color={AppColors.BLUE}
            
            />
          </View>
        )
      }}
      
      />



    </View>
  )
}

export default PollenInfoForCad