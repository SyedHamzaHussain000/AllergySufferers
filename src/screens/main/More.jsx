import {View, Text, FlatList, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {responsiveFontSize} from '../../utils/Responsive_Dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppButton from '../../components/AppButton';
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
const More = ({navigation}) => {
    const userData = useSelector(state => state.auth.user);

  const pollens = [
    {id: 1, name: 'App Settings', top: true, onPress: ()=> navigation.navigate("AppSetting")},
    {id: 2, name: 'Data Visualizer', onPress: ()=> navigation.navigate("DataVisualizer")},
    {id: 3, name: 'Help'},
    {id: 4, name: 'Send Feedback', onPress: ()=> navigation.navigate("FeedBack")},
    {id: 5, name: 'Account'},
    {id: 6, name: 'Tips & Tricks', onPress: ()=> navigation.navigate("TipsTrick")},
    {id: 7, name: 'Pollen Information for Canada', bottom: true, onPress: ()=> navigation.navigate("PollenInfoForCad")},
  ];

  return (
    <SafeAreaView style={{flex:1}}> 
    <View style={{padding: 20}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader heading="More" icon={<Entypo name={"location-pin"} size={responsiveFontSize(2.5)} color={AppColors.BTNCOLOURS}/>}/>

        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          <AppText title={`Account ID: ${userData?.id}`} textSize={2} />
          <AppText title={'App Version: 2.0.108'} textSize={2} />
        </View>

        <View
          style={{
            padding: 10,
            backgroundColor: '#3D56F0',
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20,
          }}>
          <AppText
            title={'Subscription Status: Premium'}
            textColor={AppColors.WHITE}
            textSize={2}
            textFontWeight
          />
        </View>

        <View style={{marginBottom: 20}}>
          <FlatList
            data={pollens}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={item.onPress}
                  activeOpacity={0.8}
                  style={{
                    borderWidth: 1, 
                    borderTopRightRadius: item.top ? 10 : 0,
                    borderTopLeftRadius: item.top ? 10 : 0,
                    borderBottomRightRadius: item.bottom ? 10 : 0,
                    borderBottomLeftRadius: item.bottom ? 10 : 0,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: item.bottom ? 1 : 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <AppText
                      title={item.name}
                      textSize={2}
                      textColor={AppColors.BLACK}
                      textFontWeight
                    />
                  </View>

                  <FontAwesome6
                    name={'circle-arrow-right'}
                    size={responsiveFontSize(2.5)}
                    color={'#032198'}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <AppButton
          title={'Forecasting explanation'}
          bgColor={AppColors.BTNCOLOURS}
          RightColour={'#3D56F0'}
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
            <TouchableOpacity onPress={()=> navigation.navigate("PrivacyPolicy")}>
          <AppText
            title={'Privacy Policy'}
            textColor={AppColors.BLACK}
            textSize={1.5}
            />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigation.navigate("TermsCondition")}>
          <AppText
            title={'Terms & Conditions'}
            textColor={AppColors.BLACK}
            textSize={1.5}
            />
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default More;
