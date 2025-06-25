import {View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../../../components/AppHeader';
import AppText from '../../../../components/AppTextComps/AppText';
import {responsiveFontSize, responsiveWidth} from '../../../../utils/Responsive_Dimensions';
import AppColors from '../../../../utils/AppColors';
import axios from 'axios';
import AppTextInput from '../../../../components/AppTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BASE_URL from '../../../../utils/BASE_URL';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
const Notification = ({navigation}) => {

const userData = useSelector(state => state.auth.user);
  const [allPollens, setALlPollens] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);

  const [PollenLoader, setPollenApiLoader] = useState(false);
  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getAllPollens();
    });

    return nav;
  }, [navigation]);

  const getAllPollens = () => {
    setLoader(true);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/get_allergy_data`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        setALlPollens(response?.data?.pollens_list);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  return (
    <View style={{padding: 20}}>
      <AppHeader heading="Push Notification" goBack={true} />

      <View style={{padding: 10, borderWidth: 1, borderRadius: 10, gap: 10}}>
        <AppText
          title={'Daily Pollen Notification'}
          textSize={2}
          textFontWeight
        />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            {id: 1, name: 'Low'},
            {id: 2, name: 'Moderate'},
            {id: 3, name: 'High'},
            {id: 4, name: 'Very High'},
          ]}
          contentContainerStyle={{gap: 5}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  height: 30,
                  paddingHorizontal: 20,
                  borderColor: AppColors.BLACK,
                  borderWidth: 1,
                  borderRadius: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText title={item.name} textSize={1.7} />
              </TouchableOpacity>
            );
          }}
        />
      </View>


      
      





          <View style={{marginTop:20}}/>


          <AppTextInput
            inputPlaceHolder={'Search Pollens'}
            textInput={true}
            onChangeText={res => setSearch(res)}
            value={search}
          />

        {loader && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          </View>
        )}

        {PollenLoader && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
              marginBottom: 40,
            }}>
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          </View>
        )}

        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
          {allPollens
            .filter(
              item =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.common_name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((item, index) => (
              <TouchableOpacity 
                style={{
                  padding: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: AppColors.BLACK,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View >
                  <AppText
                    title={item.name}
                    textSize={2}
                    textFontWeight
                    textwidth={70}
                  />
                  <AppText title={item.common_name} textSize={1.8} textwidth={70}/>
                </View>

                <View >
                  <AntDesign
                    name={'pluscircle'}
                    size={responsiveFontSize(3)}
                    color={AppColors.BTNCOLOURS}
                  />
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <Toast />




    </View>
  );
};

export default Notification;
