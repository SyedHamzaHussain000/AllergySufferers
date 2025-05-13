import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

const Login = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}>
        <AppText
          title={'Allergy Sufferers'}
          textColor={AppColors.BTNCOLOURS}
          textSize={4}
          textFontWeight
        />

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <AppText
            title={'Getting Started'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
          <AppText
            title={'Let’s login for explore continues'}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.8}
          />
        </View>

        <View style={{gap: 20}}>
          <AppTextInput
            title="Email Address"
            inputPlaceHolder={'Input email'}
          />
          <View style={{gap:5}}>
            <AppTextInput
              title="Password"
              inputPlaceHolder={'Input password'}
            />
            <TouchableOpacity onPress={()=> navigation.navigate("ForgetPassword")}>
            <AppText
              title={'Forget Password'}
              textColor={AppColors.BLUE}
              textSize={1.8}
              textAlignment={'flex-end'}
              />
              </TouchableOpacity>
          </View>
          <View style={{gap: 10}}>
            <AppButton
              title={'LOGIN'}
              RightColour={AppColors.WHITE}
              handlePress={() => navigation.navigate('Main')}
            />
            <AppButton
              title={'Create Account'}
              RightColour={AppColors.WHITE}
              handlePress={() => navigation.navigate('CreateAccount')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
