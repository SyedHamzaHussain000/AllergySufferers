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

const ManagePollens = ({navigation}) => {
  return (
      <View style={{padding: 20}}>
      <AppHeader
        heading="Manage Pollens"
        icon={
          <Entypo
            name={'location-pin'}
            size={responsiveFontSize(2.5)}
            color={AppColors.BTNCOLOURS}
          />
        }
        goBack
      />

        <View style={{gap:10}}>
      <AppTextInput inputPlaceHolder={"Toronto-Downtown"} inputWidth={75} rightLogo={<Octicons name={"arrow-switch"} size={responsiveFontSize(2)} color={AppColors.LIGHTGRAY} />}/>
         <AppTextInput inputPlaceHolder={"Calgary-Central"} inputWidth={75} rightLogo={<Octicons name={"arrow-switch"} size={responsiveFontSize(2)} color={AppColors.LIGHTGRAY} />}/>
        </View>

      <View style={{marginTop: 20, gap: 10}}>
        <AppButton title={'Add Pollens'} bgColor={AppColors.BTNCOLOURS} RightColour={AppColors.rightArrowCOlor} handlePress={()=> navigation.navigate("AddPollens")}  />
      </View>
    </View>
  )
}

export default ManagePollens    