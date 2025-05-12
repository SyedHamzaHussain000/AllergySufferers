import {View, Text, TextInput} from 'react-native';
import React from 'react';
import AppHeader from '../../../../components/AppHeader';
import AppText from '../../../../components/AppTextComps/AppText';
import AppColors from '../../../../utils/AppColors';
import { responsiveHeight } from '../../../../utils/Responsive_Dimensions';
import AppButton from '../../../../components/AppButton';

const FeedBack = () => {
  return (
    <View style={{padding: 20}}>
      <AppHeader heading="Aerobiology" subheading="Feedback" />

      <View style={{gap: 10, marginTop: 20}}>
        <AppText
          title={
            'Please complete the form below and a member of our team will reach out to you as soon as possible.'
          }
          textSize={1.8}
          textColor={AppColors.LIGHTGRAY}
          textwidth={80}
        />

        <AppText
          title={
            'Your account number, level (free or premium), and operating system (iOS or Android) will be sent along with the data you enter.'
          }
          textSize={1.8}
          textColor={AppColors.LIGHTGRAY}
          textwidth={80}
        />
      </View>


      <View style={{gap:10, marginTop:20}}>
        <View>
            <AppText title={"Full Name"} textColor={AppColors.BLACK} textSize={2} textFontWeight/>
            <TextInput
            style={{borderWidth:1, borderRadius:10, borderColor:AppColors.LIGHTGRAY, paddingHorizontal:10}}
            />
        </View>

        <View>
            <AppText title={"Email"} textColor={AppColors.BLACK} textSize={2} textFontWeight/>
            <TextInput
            style={{borderWidth:1, borderRadius:10, borderColor:AppColors.LIGHTGRAY, paddingHorizontal:10}}
            />
        </View>


        <View>
            <AppText title={"Message"} textColor={AppColors.BLACK} textSize={2} textFontWeight/>
            <TextInput
            style={{borderWidth:1, borderRadius:10, borderColor:AppColors.LIGHTGRAY, paddingHorizontal:10, height:responsiveHeight(20)}}
            />
        </View> 
        
        <AppButton title={"SUBMIT"} RightColour={AppColors.rightArrowCOlor}/>
      </View>
    </View>
  );
};

export default FeedBack;
