import {View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
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

const CreateAccount = ({navigation}) => {

  const [userData, setUserData] = useState({
    full_name: "test",
    user_name: "tester",
    email: "test@gmail.com",
    password: "1234567890",
    gender: "male",
    phone: "03121234567",
  })

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const fullDob = `${day}-${month}-${year}`;


  console.log("ul", fullDob)

  const SignUpUser = () => {

    let data = JSON.stringify({
      full_name: userData.full_name,
      user_name: userData.user_name,
      email: userData.email,
      password: userData.password,
      dob: userData.dob,
      gender: userData.gender,
      phone: userData.phone,
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
        navigation.navigate("Login")
      })
      .catch(error => {
        console.log(error);
      });
  };



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
          padding:20
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
            onChangeText={(text)=>  setUserData({...userData, full_name: text})} value={userData.full_name}
            textInput
          />
          <AppTextInput title="Username" inputPlaceHolder={'Input Username'} onChangeText={(text)=>  setUserData({...userData, user_name: text})} value={userData.user_name} textInput/>
          <AppTextInput
            title="Email Address"
            inputPlaceHolder={'Input email'}
            onChangeText={(text)=>  setUserData({...userData, email: text})} value={userData.email}
            textInput
          />
          <AppTextInput title="Password" inputPlaceHolder={'Input password'} onChangeText={(text)=>  setUserData({...userData, password: text})} value={userData.password} textInput/>

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
          <AppTextInput title="Phone" textInput inputPlaceHolder={'123-456-7890'} onChangeText={(text)=>  setUserData({...userData, phone: text})} value={userData.phone}/>

          <View style={{gap: 10}}>
            <AppButton title={'Sign up'} RightColour={AppColors.WHITE} handlePress={()=> SignUpUser()}/>
          </View>


          <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', paddingBottom:20}}>
                <AppText  title={"Already have an account? "} textSize={2} />

                <TouchableOpacity onPress={()=>navigation.navigate("Login")  }>
                <AppText  title={"Login"} textSize={2} textColor={AppColors.BLUE} textFontWeight/>
                </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;
