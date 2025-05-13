import {View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';

const CreateAccount = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingTop:20
      }}>
      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <AppText
            title={'Create Account'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
          <AppText
            title={'Let’s Sign Up for explore continues'}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.8}
          />
        </View>

        <View style={{gap: 20}}>
          <AppTextInput
            title="Full Name"
            inputPlaceHolder={'Input Full Name'}
          />
          <AppTextInput title="Username" inputPlaceHolder={'Input Username'} />
          <AppTextInput
            title="Email Address"
            inputPlaceHolder={'Input email'}
          />
          <AppTextInput title="Password" inputPlaceHolder={'Input password'} />

          <AppText
            title={'Date of Birth'}
            textSize={2}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="DD"
              placeholderTextColor={AppColors.LIGHTGRAY}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: responsiveWidth(28),
                height: responsiveHeight(9),
                textAlign: 'center',
                borderColor:AppColors.LIGHTGRAY
              }}
              maxLength={2}
              keyboardType="number-pad"
              
              
            />

            <TextInput
              placeholder="MM"
              placeholderTextColor={AppColors.LIGHTGRAY}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: responsiveWidth(28),
                height: responsiveHeight(9),
                textAlign: 'center',
                borderColor:AppColors.LIGHTGRAY
              }}
              maxLength={2}
              keyboardType="number-pad"
            />

            <TextInput
              placeholder="YYYY"
              placeholderTextColor={AppColors.LIGHTGRAY}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: responsiveWidth(28),
                height: responsiveHeight(9),
                textAlign: 'center',
                borderColor:AppColors.LIGHTGRAY
              }}
              maxLength={4}
              keyboardType="number-pad"
            />
          </View>

          <AppTextInput title="Gender" inputPlaceHolder={'Male'} />
          <AppTextInput title="Phone" inputPlaceHolder={'123-456-7890'} />

          <View style={{gap: 10}}>
            <AppButton title={'Sign up'} RightColour={AppColors.WHITE} />
          </View>


          <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', paddingBottom:20}}>
                <AppText  title={"Already have an account? "} textSize={2}/>
                <TouchableOpacity>
                <AppText  title={"Login"} textSize={2} textColor={AppColors.BLUE} textFontWeight/>
                </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;
