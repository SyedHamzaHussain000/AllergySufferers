import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
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
const AddCity = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 20}}>
        <AppHeader
          heading="Add City"
          subheading="Pollen Forecast"
          icon={
            <Entypo
              name={'location-pin'}
              size={responsiveFontSize(2.5)}
              color={AppColors.BTNCOLOURS}
            />
          }
          goBack
        />

        <TextInput
          placeholder="Type City"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: AppColors.LIGHTGRAY,
            marginTop: 20,
            paddingHorizontal: 10,
            height: 50,
          }}
        />

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: AppColors.LIGHTGRAY,
            padding: 10,
            marginTop: 20,
          }}>
          <View style={{gap: 10}}>
            <AppButton
              title={'Add city'}
              bgColor={AppColors.BTNCOLOURS}
              buttoWidth={85}
            />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: AppColors.BTNCOLOURS,
                height: responsiveHeight(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText
                title={'Cancel'}
                textSize={2}
                textColor={AppColors.BTNCOLOURS}
                textFontWeight
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddCity;
