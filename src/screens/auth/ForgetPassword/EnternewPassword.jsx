import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import axios from 'axios';

const EnternewPassword = ({navigation, route}) => {
  const {email} = route.params;

  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false)

  const resetPassword = () => {
    if (password !== confirmpassword) {
      Alert.alert("Your password and current password does'nt match");
      return;
    }

    setLoader(true)
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/reset-password`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response?.data?.status == 'success') {
          Alert.alert('Successfull', response?.data?.message);
          navigation.navigate('Login', {email: email});
          setLoader(false)
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
          title={'Enter a New Password'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
        <AppText
          title={'We recovered your account'}
          textColor={AppColors.LIGHTGRAY}
          textSize={1.8}
        />
      </View>

      <View style={{gap: 20}}>
        <AppTextInput
          title="New Password"
          inputPlaceHolder={'New password'}
          textInput
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <AppTextInput
          title="Confirm New Password"
          inputPlaceHolder={'Confirm New password'}
          textInput
          onChangeText={text => setConfirmPassword(text)}
          value={confirmpassword}
        />
      </View>
      <AppButton
        title={'Next'}
        RightColour={AppColors.WHITE}
        handlePress={() => resetPassword()}
        isLoading={loader}
      />
    </View>
  );
};

export default EnternewPassword;
