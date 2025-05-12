import {View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import AppHeader from '../../../../components/AppHeader';
import AppText from '../../../../components/AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../../utils/Responsive_Dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppColors from '../../../../utils/AppColors';
import Entypo from 'react-native-vector-icons/Entypo';
import AppButton from '../../../../components/AppButton';
import SocialAuthButton from '../../../../components/SocialAuthButton';
import AppTextInput from '../../../../components/AppTextInput';
import Octicons from 'react-native-vector-icons/Octicons'

const AddMedications = () => {
  return (
      <View style={{padding: 20}}>
      <AppHeader
        heading="Add Medication"
        icon={
          <Entypo
            name={'location-pin'}
            size={responsiveFontSize(2.5)}
            color={AppColors.BTNCOLOURS}
          />
        }
      />

        <View style={{gap:10}}>
             <AppTextInput inputPlaceHolder={"Search Medications"}  />
                <AppButton title={'Save'} bgColor={AppColors.BTNCOLOURS}   />
        </View> 

      
    </View>
  )
}

export default AddMedications