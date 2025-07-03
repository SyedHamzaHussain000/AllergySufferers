import { View, Text, Image } from 'react-native'
import React from 'react'
import AppText from './AppTextComps/AppText'
import AppColors from '../utils/AppColors'
import AppImages from '../assets/images/AppImages'
import { responsiveWidth } from '../utils/Responsive_Dimensions'



type props = {
    index?: Number,
    PollenSporesArr?: any,
    item?: any,
    selected?:any,
    containerwidth?:any

}

const PointPollenSpores = ({PollenSporesArr,index,item,selected, containerwidth}: props) => {




    const getTheRoundColour = (level: any) => {
    switch (level) {
      case 4:
        return '#D72626';
      case 3:
        return '#F26D24';
      case 2:
        return '#FDEB48';
      case 1:
        return '#99C817';
      default:
        return '#99C817';
    }
  };


    
  return (

      
             <View
                                  style={{
                                    width:containerwidth ? containerwidth: null,
                                    borderWidth: 1,
                                    borderTopRightRadius: index == 0 ? 10 : 0,
                                    borderTopLeftRadius: index == 0 ? 10 : 0,
                                    borderBottomRightRadius:
                                      index == PollenSporesArr?.length - 1
                                        ? 10
                                        : 0,
                                    borderBottomLeftRadius:
                                      index == PollenSporesArr?.length - 1
                                        ? 10
                                        : 0,
                                    padding: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottomWidth:
                                      index == PollenSporesArr?.length - 1
                                        ? 1
                                        : 0,
                                  }}>
                                    <View >
                                    {
                                      <View style={{marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width: selected == "Future" ? responsiveWidth(70) : responsiveWidth(80)}}>
                                        <AppText title={item.type} textSize={2} textFontWeight />

                                        <Image  source={item.type == "spore" ? AppImages.spores : AppImages.pollen} style={{height:40, width:40, resizeMode:'contain'}}/>
                                      </View>
                                    }
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        gap: 10,
                                        alignItems: 'center',
                                      }}>
                                      <View
                                        style={{
                                          height: 20,
                                          width: 20,
                                          borderRadius: 200,
                                          borderWidth: 1,
                                          borderColor: getTheRoundColour(item.level),
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <View
                                          style={{
                                            height: 15,
                                            width: 15,
                                            borderRadius: 200,
                                            backgroundColor: getTheRoundColour(item.level),
                                          }}
                                        />
                                      </View>
      
                                      <AppText
                                        title={item.name}
                                        textSize={2}
                                        textColor={AppColors.BLACK}
                                        textFontWeight
                                      />

                                      
                                    </View>
                                  </View>
                                </View>
  )
}

export default PointPollenSpores