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


const ManageMedications = ({navigation}) => {
  return (
        <View style={{padding: 20}}>
      <AppHeader
        heading="Manage Medications"
        icon={
          <Entypo
            name={'location-pin'}
            size={responsiveFontSize(2.5)}
            color={AppColors.BTNCOLOURS}
          />
        }
      />

        <View style={{gap:10}}>
      <AppTextInput inputPlaceHolder={"Advil Cold and Sinus"} inputWidth={75} rightLogo={<Octicons name={"arrow-switch"} size={responsiveFontSize(2)} color={AppColors.LIGHTGRAY} />}/>
         <AppTextInput inputPlaceHolder={"A Generic Brand"} inputWidth={75} rightLogo={<Octicons name={"arrow-switch"} size={responsiveFontSize(2)} color={AppColors.LIGHTGRAY} />}/>
        </View>

      <View style={{marginTop: 20, gap: 10}}>
        <AppButton title={'Add MEDICATION'} bgColor={AppColors.BTNCOLOURS} RightColour={AppColors.rightArrowCOlor} handlePress={()=> navigation.navigate("AddMedications")}  />
      </View>
    </View>
  )
}

export default ManageMedications