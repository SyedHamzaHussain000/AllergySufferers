import {View, Text, ToastAndroid, Alert, ScrollView} from 'react-native';
import React, { useState } from 'react';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import BASE_URL from '../../../utils/BASE_URL';
import axios from 'axios';
import ShowError from '../../../utils/ShowError';

const ForgetPassword = ({navigation}) => {

  const [email, setEmail] = useState("")
  const [loader, setLoader] = useState(false)

  const ForgetPassword = () => {

    if(email == ""){
      Alert.alert("Enter your email")
      return
    }

    setLoader(true)
    let data = new FormData();
    data.append('email', email);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/forget-password`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {

        if(response?.data?.status == "success"){
          setLoader(false)
          ShowError(response.data.message, 1000)
          navigation.navigate('EnterOtp', {email: email})
        }else{
          setLoader(false)
          ShowError(response.data.message, 1000)
        }
      })
      .catch(error => {
        ShowError(error?.response?.data?.message, 1000)
        console.log(error);
        setLoader(false)
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: AppColors.WHITE,
        flexGrow: 1,
        alignItems:'center',
        justifyContent:'center',
        gap:50
      }}>
        <View style={{alignItems:'center', justifyContent:'center', gap:5}}>
        <AppText
          title={'Forgot Password'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
        <AppText
          title={'We can help to recover your account'}
          textColor={AppColors.LIGHTGRAY}
          textSize={1.8}
        />
        </View>
      <AppTextInput
        title="Email Address"
        inputPlaceHolder={'Enter Email'}
        textInput
        onChangeText={(res) => {setEmail(res)}}
        value={email}
      />
      <AppButton
        title={'Next'}
        RightColour={AppColors.WHITE}
        handlePress={() => ForgetPassword() }
        isLoading={loader}
      />


    </ScrollView>
  );
};

export default ForgetPassword;
