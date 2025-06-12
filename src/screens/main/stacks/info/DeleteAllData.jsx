import {View, Text} from 'react-native';
import React from 'react';
import AppText from '../../../../components/AppTextComps/AppText';
import AppColors from '../../../../utils/AppColors';
import AppHeader from '../../../../components/AppHeader';
import { responsiveHeight, responsiveWidth } from '../../../../utils/Responsive_Dimensions';
import AppButton from '../../../../components/AppButton';

const DeleteAllData = () => {
  return (
    <View style={{ padding: 20}}>
      <AppHeader  goBack={true} heading="Delete All Data" />

        <View style={{height:responsiveHeight(100), justifyContent:'center',    gap:20}}>
        <View style={{flexDirection:'row', width:responsiveWidth(80)}}>
                <AppText title={"Note:"} textFontWeight textColor={AppColors.BLACK} textSize={1.7}/>
                <AppText textSize={1.7} title={"This will send a request to irrevocably delete all your data. Are you sure you want to do this?"} textColor={AppColors.LIGHTGRAY} />
        </View>  
        <AppButton title={"Yes, delete my data"} RightColour={AppColors.rightArrowCOlor}/>
        </View>
    </View>
  );
};

export default DeleteAllData;
