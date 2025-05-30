import {View, Text, ToastAndroid, Alert} from 'react-native';
import React, { useState } from 'react';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import BASE_URL from '../../../utils/BASE_URL';
import axios from 'axios';

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
        console.log(JSON.stringify(response.data));
        if(response?.data?.status == "success"){
          setLoader(false)
          navigation.navigate('EnterOtp', {email: email})
        }else{
          setLoader(false)
        }
      })
      .catch(error => {
        console.log(error);
        setLoader(false)
      });
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: AppColors.WHITE,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
    </View>
  );
};

export default ForgetPassword;
