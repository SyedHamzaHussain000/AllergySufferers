import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import BASE_URL from '../../utils/BASE_URL';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CurrentLogin } from '../../redux/Slices/AuthSlice';

const Login = ({navigation}) => {


  const dispatch = useDispatch()

  const LoginUser = () => {
    let data = new FormData();
    data.append('email', 'john@example.com');
    data.append('password', 'mysecurepassword');


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v2/user/signin`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    dispatch(CurrentLogin(config))

  };


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
          <View style={{gap: 5}}>
            <AppTextInput
              title="Password"
              inputPlaceHolder={'Input password'}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
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
              handlePress={() => LoginUser()}
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
