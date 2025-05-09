import { View, Text, Image } from 'react-native'
import React from 'react'
import AppImages from '../assets/images/AppImages'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions'
import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
    Marks,
    Indicator,
    DangerPath,
  } from 'react-native-cool-speedometer';

type props = {
 imgWeight?: Number,
 imgHeight?: Number,
 speedometerWidth?: Number,
 imageTop?: Number,
 TextBottom?: Number,
 TempreaturePriority?: string

}


const SpeedoMeter = ({imgWeight = 90, imgHeight = 20, speedometerWidth = 80, imageTop = 0 , TextBottom = -220, TempreaturePriority = "High", TempreaturePriorityFontSize=2.5}:props) => {
  return (
       <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={AppImages.graph}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  height: responsiveHeight(imgHeight),
                  width: responsiveWidth(imgWeight),
                  resizeMode: 'contain',
                  top: imageTop,
                }}
              />
    
              <Speedometer
                value={50}
                min={0}
                max={100}
                angle={180}
                rotation={-90}
                width={responsiveWidth(speedometerWidth)}
                fontFamily="Arial">
                <Arc arcWidth={0} color="url(#grad)" />
    
                <Needle
                  color="black"
                  baseOffset={20}
                  baseWidth={6}
                  circleRadius={12}
                  circleColor="black"
                />
    
                <Progress color="#99C817" arcWidth={0} />
    
                <Indicator fixValue={false}>
                  {(value, textProps) => (
                    <Text
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        bottom: TextBottom  ,
                        alignSelf: 'center',
                        fontSize: responsiveFontSize(TempreaturePriorityFontSize),
                        fontWeight: 'bold',
                      }}>
                      {TempreaturePriority}
                    </Text>
                  )}
                </Indicator>
              </Speedometer>
            </View>
  )
}

export default SpeedoMeter