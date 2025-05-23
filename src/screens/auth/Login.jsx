import {View, Text, ScrollView, TouchableOpacity, Alert, ToastAndroid, Platform, } from 'react-native';
import React, { useState } from 'react';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import BASE_URL from '../../utils/BASE_URL';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentLogin, setLoader } from '../../redux/Slices/AuthSlice';

const Login = ({navigation}) => {

  const [email, setEmail] = useState('william.austin3939@gmail.com')
  const [password, setPassword] = useState('mysecurepassword')


  const loading = useSelector(state => state.auth.loader)


  const dispatch = useDispatch()

  const LoginUser = () => {
    if(email === '' || password === ''){
      if(Platform.OS === 'android'){

        ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT)
      }else{
        Alert.prompt('Please fill all fields')
      }
      return
    }
    dispatch(setLoader(true))
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/signin`,
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
            onChangeText={(txt)=> setEmail(txt) }
            value={email}
          />
          <View style={{gap: 5}}>
            <AppTextInput
              title="Password"
              inputPlaceHolder={'Input password'}
              onChangeText={(txt)=> setPassword(txt) }
            value={password}
            secure={true}
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
              isLoading={loading}
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
