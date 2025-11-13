import {View, Text, Image, FlatList, SafeAreaView} from 'react-native';
import React from 'react';
import AppHeader from '../../../../components/AppHeader';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../../utils/Responsive_Dimensions';
import AppColors from '../../../../utils/AppColors';
import FreeTutorials from '../../../../assets/freetutorials/FreeTutorials';
import PaidTutorials from '../../../../assets/tutorials/Tutorials';

const ViewSubGuideInstruction = ({navigation, route}) => {
  const {type, SubType} = route.params;

  const ForcastFreeAppGuide = [
    {id: 1, img: FreeTutorials[1]},
    {id: 2, img: FreeTutorials[2]},
    {id: 3, img: FreeTutorials[3]},
    {id: 4, img: FreeTutorials[4]},
    {id: 5, img: FreeTutorials[5]},
    {id: 6, img: FreeTutorials[6]},
    {id: 7, img: FreeTutorials[7]},
    {id: 8, img: FreeTutorials[8]},
    {id: 9, img: FreeTutorials[9]},
    {id: 10, img: FreeTutorials[10]},
  ];

  const SymtomsFreeAppGuide = [
    {id: 1, img: FreeTutorials[11]},
    {id: 2, img: FreeTutorials[12]},
  ];

  const MedicationFreeAppGuide = [
    {id: 1, img: FreeTutorials[13]},
    {id: 2, img: FreeTutorials[14]},
  ];

  const OtherFreeAppGuide = [
    {id: 1, img: FreeTutorials[15]},
    {id: 2, img: FreeTutorials[16]},
    {id: 3, img: FreeTutorials[17]},
    {id: 4, img: FreeTutorials[18]},
    {id: 5, img: FreeTutorials[19]},
    {id: 6, img: FreeTutorials[20]},
    {id: 7, img: FreeTutorials[21]},
    {id: 8, img: FreeTutorials[22]},
  ];


  //paid app guide
   const ForcastPaidAppGuide = [
    {id: 1, img: PaidTutorials[1]},
    {id: 2, img: PaidTutorials[2]},
    {id: 3, img: PaidTutorials[3]},
    {id: 4, img: PaidTutorials[4]},
    {id: 5, img: PaidTutorials[5]},
    {id: 6, img: PaidTutorials[6]},
    {id: 7, img: PaidTutorials[7]},
    {id: 8, img: PaidTutorials[8]},
    {id: 9, img: PaidTutorials[9]},
    {id: 10, img: PaidTutorials[10]},
    {id: 11, img: PaidTutorials[11]},
  ];

  const SymtomsPaidAppGuide = [
    {id: 1, img: PaidTutorials[12]},
    {id: 2, img: PaidTutorials[13]},
    {id: 3, img: PaidTutorials[14]},
    {id: 4, img: PaidTutorials[15]},
    {id: 5, img: PaidTutorials[16]},
    
  ]

  const MedicationPaidAppGuide = [
    {id: 1, img: PaidTutorials[17]},
    {id: 2, img: PaidTutorials[18]},
    {id: 2, img: PaidTutorials[19]},
    
  ];
  const DataVisualizerPaidAppGuide = [
    {id: 1, img: PaidTutorials[20]},
    {id: 2, img: PaidTutorials[21]},
    {id: 2, img: PaidTutorials[22]},
    {id: 2, img: PaidTutorials[23]},
    
  ];


  const OtherFreePaidGuide = [
    {id: 1, img: PaidTutorials[24]},
    {id: 2, img: PaidTutorials[25]},
    {id: 3, img: PaidTutorials[26]},
    {id: 4, img: PaidTutorials[27]},
    {id: 5, img: PaidTutorials[28]},
    {id: 6, img: PaidTutorials[29]},
    {id: 7, img: PaidTutorials[30]},
    {id: 8, img: PaidTutorials[31]},
    {id: 9, img: PaidTutorials[32]},
    {id: 10, img: PaidTutorials[33]},
    {id: 11, img: PaidTutorials[34]},
    {id: 12, img: PaidTutorials[35]},
    {id: 13, img: PaidTutorials[36]},
    {id: 14, img: PaidTutorials[37]},
    
  ];


  const Tut = () => {
    if (type == 'Forecast' && SubType == 'free') {
      return ForcastFreeAppGuide;
    } else if (type == 'Symptoms'&& SubType == 'free') {
      return SymtomsFreeAppGuide;
    } else if (type == 'Medication'&& SubType == 'free') {
      return MedicationFreeAppGuide;
    } else if (type == 'Data Visualizer'&& SubType == 'free') {
      return;
    } else if (type == 'Other' && SubType == 'free') {
      return OtherFreeAppGuide;
    }


     if (type == 'Forecast' && SubType == 'paid') {
      return ForcastPaidAppGuide;
    } else if (type == 'Symptoms'&& SubType == 'paid') {
      return SymtomsPaidAppGuide;
    } else if (type == 'Medication'&& SubType == 'paid') {
      return MedicationPaidAppGuide;
    } else if (type == 'Data Visualizer'&& SubType == 'paid') {
      return DataVisualizerPaidAppGuide;
    } else if (type == 'Other' && SubType == 'paid') {
      return OtherFreePaidGuide;
    }


  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 10, marginTop: 30}}>
        <AppHeader goBack={true} heading="Go Back" skipButton={true} />
      </View>

      <FlatList
        data={Tut()}
        horizontal
        renderItem={({item}) => {
          return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={item.img}
                style={{
                  width: responsiveWidth(100),
                  height: responsiveHeight(90),
                  resizeMode: 'contain',
                }}
              />
              <View
                style={{
                  height: responsiveHeight(90),
                  width: 2,
                  backgroundColor: AppColors.BLACK,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ViewSubGuideInstruction;
