import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../../../components/AppHeader';
import AppText from '../../../../components/AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../../utils/Responsive_Dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppColors from '../../../../utils/AppColors';
import Entypo from 'react-native-vector-icons/Entypo';
import AppButton from '../../../../components/AppButton';
import SocialAuthButton from '../../../../components/SocialAuthButton';
import AppTextInput from '../../../../components/AppTextInput';
import Octicons from 'react-native-vector-icons/Octicons';
import BASE_URL from '../../../../utils/BASE_URL';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppImages from '../../../../assets/images/AppImages';
import Toast from 'react-native-toast-message';
import { setRemoveCity } from '../../../../redux/Slices/MedicationSlice';

const ManageCities = ({navigation}) => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.auth.user);
  const allMyCity = useSelector(state => state?.medications?.allMyCity);
  const [loader, setLoader] = useState(false);
  const [cities, setCities] = useState([]);

  console.log("allMyCity",allMyCity)

    const [activeMedication, setActiveMedication] = useState(allMyCity);
  

  useEffect(() => {
    // const nav = navigation.addListener('focus', () => {
      // getAllCities();
      setActiveMedication(allMyCity)
    // });
    // return nav;
  }, [allMyCity]);

  // const getAllCities = () => {

  //   if(activeMedication.length == 5){
  //     Toast.show({
  //       type:'error',
  //       text1:"You can add up to 5 cities only. Please remove one to add a new city."
  //     })
  //     return
  //   }
  //   setLoader(true);
  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: `${BASE_URL}/allergy_data/v1/user/${userdata.id}/get_cities`,
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then(response => {
  //       console.log(JSON.stringify(response.data));

  //       // dispatch()
  //       setLoader(false);
  //       setActiveMedication(response?.data?.cities);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setLoader(false);
  //     });
  // };

  const deleteActiveMedication = item => {

    dispatch(setRemoveCity(item))
    return
    setLoader(true);
    let data = JSON.stringify({
      city_id: item.id,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userdata.id}/delete_city`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        getAllCities();
        Alert.alert('Success', 'City deleted successfully');
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 20}}>
        <AppHeader
          heading="Manage City"
          icon={
            <Entypo
              name={'location-pin'}
              size={responsiveFontSize(2.5)}
              color={AppColors.BTNCOLOURS}
            />
          }
          goBack
        />

        {loader && <ActivityIndicator size={'large'} color={AppColors.BLACK} />}

        {activeMedication ? (
          <NestableScrollContainer>
            <NestableDraggableFlatList
              data={activeMedication}
              contentContainerStyle={{gap: 10}}
              renderItem={({item, drag, isActive}) => {
                console.log('itemmm', item);
                return (
                  <TouchableOpacity onLongPress={drag}>
                    <AppTextInput
                      inputPlaceHolder={item.city_name}
                      inputWidth={75}
                      arrowDelete={
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              'Delete City',
                              'Are you sure you want to delete this city?',
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: () => deleteActiveMedication(item),
                                },
                              ],
                              {cancelable: false},
                            )
                          }>
                          <MaterialCommunityIcons
                            name={'delete'}
                            size={responsiveFontSize(2.5)}
                            color={AppColors.LIGHTGRAY}
                          />
                        </TouchableOpacity>
                      }
                      rightLogo={
                        <View style={{marginTop: 4}}>
                          <Image
                            source={AppImages.updown}
                            style={{
                              height: 14,
                              width: 14,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      }
                    />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              onDragEnd={({data}) => setActiveMedication(data)}
              dragEnabled={true}
              activationDistance={10}
            />
          </NestableScrollContainer>
        ) : null}

        <View style={{marginTop: 20, gap: 10}}>
          <AppButton
            title={'Add city'}
            bgColor={AppColors.BTNCOLOURS}
            RightColour={AppColors.rightArrowCOlor}
            handlePress={() => navigation.navigate('AddCity')}
          />
          <AppButton
            title={'Manage pollens'}
            bgColor={AppColors.BTNCOLOURS}
            RightColour={AppColors.rightArrowCOlor}
            handlePress={() => navigation.navigate('ManagePollens')}
          />
          <AppButton
            title={'Manage medications'}
            bgColor={AppColors.BTNCOLOURS}
            RightColour={AppColors.rightArrowCOlor}
            handlePress={() => navigation.navigate('ManageMedications')}
          />
          {/* <AppButton title={'Manage push notifications'} bgColor={AppColors.BTNCOLOURS} RightColour={AppColors.rightArrowCOlor}  /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageCities;
