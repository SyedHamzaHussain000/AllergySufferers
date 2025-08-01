import {View, Text, ScrollView, TouchableOpacity, Alert, ToastAndroid, Platform, PermissionsAndroid, } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import BASE_URL from '../../utils/BASE_URL';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentLogin, setLoader } from '../../redux/Slices/AuthSlice';
import { getMessaging, getToken, registerDeviceForRemoteMessages } from '@react-native-firebase/messaging'
const Login = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const loading = useSelector(state => state.auth.loader)
const userData = useSelector(state => state.auth.user)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(userData?.email){
      navigation.navigate("Main")
    }
  },[userData])

  // dispatch(setLoader(false))

  const LoginUser = async() => {
    if(email === '' || password === ''){
      if(Platform.OS === 'android'){

        ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT)
      }else{
        Alert.prompt('Please fill all fields')
      }
      return
    }
      // await messaging().registerDeviceForRemoteMessages();
      await registerDeviceForRemoteMessages(getMessaging());

    // const token = await messaging().getToken();
    const token = await getToken(getMessaging())

    // console.log('fcm token',token)



    dispatch(setLoader(true))
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('fcm_token', token)


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/signin`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };
      if(Platform.OS == "android"){
               await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: 'Allergy Sufferers',
                  message: 'Allergy sufferers want to access your location',
                },
              );
    
            }

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
          padding:20
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
            inputPlaceHolder={'Enter email'}
            onChangeText={(txt)=> setEmail(txt) }
            value={email}
            textInput={true}
          />
          <View style={{gap: 5}}>
            <AppTextInput
              title="Password"
              inputPlaceHolder={'Enter password'}
              onChangeText={(txt)=> setPassword(txt) }
            value={password}
            secure={true}
            textInput={true}
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
