import {View, Text, TextInput, ToastAndroid, ScrollView, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../../../components/AppHeader';
import AppText from '../../../../components/AppTextComps/AppText';
import AppColors from '../../../../utils/AppColors';
import {responsiveHeight} from '../../../../utils/Responsive_Dimensions';
import AppButton from '../../../../components/AppButton';
import axios from 'axios';
import BASE_URL from '../../../../utils/BASE_URL';

const FeedBack = () => {
  const [feedBackData, setFeedBackData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoader, setIsLaoder] = useState(false);

  const setFeedBack = () => {
    if(!feedBackData.name && !feedBackData.email && !feedBackData.message){ 
      ToastAndroid.show('Please enter your name', ToastAndroid.SHORT);
      return;
    }

    setIsLaoder(true);
    let data = JSON.stringify({
      name: feedBackData.name,
      email: feedBackData.email,
      message: feedBackData.message,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/submit_feedback`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response.data.status == 'success') {
          setIsLaoder(false);
          setFeedBackData({
            name: '',
            email: '',
            message: '',
          })
          ToastAndroid.show('Feedback submitted successfully', ToastAndroid.SHORT);
        } else {
          setIsLaoder(false);
        }
      })
      .catch(error => {
        setIsLaoder(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView behavior='position' style={{flex:1}}>
    <ScrollView contentContainerStyle={{flexGrow:1, padding: 20, paddingBottom:20}}>
      <AppHeader heading="Aerobiology" subheading="Feedback" goBack={true} />

      <View style={{gap: 10, marginTop: 20}}>
        <AppText
          title={
            'Please complete the form below and a member of our team will reach out to you as soon as possible.'
          }
          textSize={1.8}
          textColor={AppColors.LIGHTGRAY}
          textwidth={80}
        />

        <AppText
          title={
            'Your account number, level (free or premium), and operating system (iOS or Android) will be sent along with the data you enter.'
          }
          textSize={1.8}
          textColor={AppColors.LIGHTGRAY}
          textwidth={80}
        />
      </View>

      <View style={{gap: 10, marginTop: 20}}>
        <View>
          <AppText
            title={'Full Name'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: AppColors.LIGHTGRAY,
              paddingHorizontal: 10,
              
              padding:10,
            }}
            multiline
            onChangeText={text =>
              setFeedBackData({...feedBackData, name: text})
            }
            value={feedBackData.name}
          />
        </View>

        <View>
          <AppText
            title={'Email'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: AppColors.LIGHTGRAY,
              paddingHorizontal: 10,
              padding:10,
            }}
            onChangeText={text =>
              setFeedBackData({...feedBackData, email: text})
            }
            value={feedBackData.email}
          />
        </View>

        <View>
          <AppText
            title={'Message'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: AppColors.LIGHTGRAY,
              paddingHorizontal: 10,
              height: responsiveHeight(20),
              textAlign:'left',
              textAlignVertical: 'top'
            }}
            onChangeText={text =>
              setFeedBackData({...feedBackData, message: text})
            }
            value={feedBackData.message}
          />
        </View>

        <AppButton
          title={'SUBMIT'}
          handlePress={() => setFeedBack()}
          RightColour={AppColors.rightArrowCOlor}
          isLoading={isLoader}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
     </SafeAreaView>
  );
};

export default FeedBack;
