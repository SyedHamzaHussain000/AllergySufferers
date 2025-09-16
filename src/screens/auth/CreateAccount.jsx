import {View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ToastAndroid} from 'react-native';
import React, { useState } from 'react';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import axios from 'axios';
import BASE_URL from '../../utils/BASE_URL';
import messaging from '@react-native-firebase/messaging'
import ShowError from '../../utils/ShowError';
import { useSelector } from 'react-redux';

const CreateAccount = ({navigation}) => {
const internetConnection = useSelector(state => state?.blacklist?.isInternetConnected)
  const [userData, setUserData] = useState({
    full_name: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
    phone: "",
  })

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const fullDob = `${day}-${month}-${year}`;
  const [loader, setLoader] = useState(false)



  const SignUpUser = async() => {

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if(userData.password !== userData.confirm_password){

      ShowError("Your password and current passowrd does not match", 1000)
      return
    }

    if(!regex.test(userData.email)){
     return  ShowError("Please enter a valid email", 1000)
    }

    if(!internetConnection){

      return ShowError("No Internet connection", 2000)
    }

    
    const token = await messaging().getToken();
    setLoader(true)
    let data = JSON.stringify({
      // full_name: userData.full_name,
      user_name: userData.user_name,
      email: userData.email,
      password: userData.password,
      dob: fullDob,
      gender: userData.gender,
      phone: userData.phone,
      fcm_token: token,
    })

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v2/user/signup`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        ShowError("Account created successfully", 1000)
        navigation.navigate("Login")
        setLoader(false)
      })
      .catch(error => {
        console.log(error.response.data.message);
        ShowError(error?.response?.data?.message, 1000)
        setLoader(false)
      });
  };



  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? 'padding': 'height'} style={{flex:1, }}>
      {/* <View style={{marginTop:30}}>  */}
      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{

          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          padding:20,
          // backgroundColor:AppColors.WHITE,
          marginTop:30
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <AppText
            title={'Create Account'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
          <AppText
            title={'Sign up to access the most accurate pollen and spore forecasts that uses actual data, 32 years of modelling and an accuracy rate of 80% annually'}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.8}
          />
        </View>

        <View style={{gap: 20}}>
          {/* <AppTextInput
            title="Full Name"
            inputPlaceHolder={'Input Full Name'}
            onChangeText={(text)=>  setUserData({...userData, full_name: text})} value={userData.full_name}
            textInput
          /> */}
          <AppTextInput title="Username" inputPlaceHolder={'Name'} onChangeText={(text)=>  setUserData({...userData, user_name: text})} value={userData.user_name} textInput/>
          <AppTextInput
            title="Email Address"
            inputPlaceHolder={'Email'}
            onChangeText={(text)=>  setUserData({...userData, email: text})} value={userData.email}
            textInput
          />
          <AppTextInput title="Password" inputPlaceHolder={'Password'} onChangeText={(text)=>  setUserData({...userData, password: text})} value={userData.password} textInput/>
            <AppTextInput title="Confirm Password" inputPlaceHolder={'Confirm Password'} onChangeText={(text)=>  setUserData({...userData, confirm_password: text})} value={userData.confirm_password} textInput/>

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
              onChangeText={(txt)=>{
                setDay(txt)
              }}
              value={day}
              
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
              onChangeText={(txt)=>{
                setMonth(txt)
              }}
              value={month}
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
              onChangeText={(txt)=>{
                setYear(txt)
              }}
              value={year}
            />
          </View>

          <AppTextInput title="Gender" textInput inputPlaceHolder={'Male'} onChangeText={(text)=>  setUserData({...userData, gender: text})} value={userData.gender}/>
          <AppTextInput title="Phone" textInput inputPlaceHolder={'123-456-7890'} onChangeText={(text)=>  setUserData({...userData, phone: text})} value={userData.phone} keyboardType={'number-pad'}/>

          <View style={{gap: 10}}>
            <AppButton title={'Sign up'} RightColour={AppColors.WHITE} handlePress={()=> SignUpUser()} isLoading={loader} loadingColour={AppColors.WHITE}/>
          </View>


          <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', paddingBottom:20}}>
                <AppText  title={"Already have an account? "} textSize={2} />

                <TouchableOpacity onPress={()=>navigation.navigate("Login")  }>
                <AppText  title={"Login"} textSize={2} textColor={AppColors.BLUE} textFontWeight/>
                </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* </View> */}

    </KeyboardAvoidingView>
  );
};

export default CreateAccount;
