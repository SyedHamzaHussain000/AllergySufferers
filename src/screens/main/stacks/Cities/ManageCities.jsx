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
  ScrollView,
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
import { setRemoveCity, setSortCity } from '../../../../redux/Slices/MedicationSlice';
import { ApiCallWithUserId } from '../../../../global/ApiCall';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const ManageCities = ({navigation}) => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.auth.user);
  const allMyCity = useSelector(state => state?.medications?.allMyCity);
  const [loader, setLoader] = useState(false);
  const [cities, setCities] = useState([])
  const [activeMedication, setActiveMedication] = useState();


console.log('myAllCities ====>',allMyCity)

  useEffect(()=>{
    const nav = navigation.addListener('focus', ()=>{
      getAllCities()
    })

    return nav
  },[navigation])

  console.log("filterCities",allMyCity)
  const getAllCities = () => {

    
    setLoader(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userdata?.id}/get_cities`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));

        // dispatch()

        // const filterCities = allMyCity.filter((res)=> res.currentLocation == true)


        // setLoader(false);
        // setActiveMedication([...filterCities ,...response?.data?.cities]);

        const filterCities = allMyCity.filter(res => res.currentLocation === true);

setLoader(false);

const apiCities = response?.data?.cities || [];

// check if currentLocation already exists in API
const mergedCities = filterCities.length
  ? [
      ...filterCities.filter(
        city =>
          !apiCities.some(apiCity => apiCity.city_name === city.city_name)
      ),
      ...apiCities,
    ]
  : apiCities;

setActiveMedication(mergedCities);


      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const deleteActiveMedication = item => {

    setLoader(true);
    dispatch(setRemoveCity(item))

    let data = JSON.stringify({
      city_id: item.id,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userdata?.id}/delete_city`,
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

  const sortingCities  = async (data) => {

    const sortCitiesApi = await ApiCallWithUserId('post', 'sort_cities', userdata?.id, {"data": data} )
    dispatch(setSortCity(data))

  }

  //   const sortingCities = async (data) => {
  //     // return console.log(data)
  //   try {
  //     const updatedCities = data.map((city, index) => ({
  //       ...city,
  //       currentLocation: index === 0, 
  //     }));

  //     const sortPayload = { data: updatedCities };
  //     const sortRes = await ApiCallWithUserId(
  //       'post',
  //       'sort_cities',
  //       userdata?.id,
  //       sortPayload,
  //     );

  //     console.log("sort_cities response:", sortRes);

  //     const topCity = updatedCities[0];
  //     const setCityPayload = JSON.stringify({
  //       lat: topCity.lat,
  //       lng: topCity.lng,
  //       city_name: topCity.city_name,
  //       currentLocation: true,
  //     });

  //     let config = {
  //       method: 'post',
  //       maxBodyLength: Infinity,
  //       url: `${BASE_URL}/allergy_data/v1/user/${userdata?.id}/set_cities`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       data: setCityPayload,
  //     };

  //     const setCityRes = await axios.request(config);
  //     console.log("set_cities response:", setCityRes.data);

  //     dispatch(setSortCity(updatedCities));
  //     setActiveMedication(updatedCities);

  //     Toast.show({
  //       type: 'success',
  //       text1: `Current city updated to ${topCity.city_name}`,
  //       position: 'bottom',
  //     });

  //   } catch (err) {
  //     console.log("Error in sortingCities:", err);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Failed to update cities',
  //     });
  //   }
  // };


  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 20, paddingBottom:200}}>
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
              renderItem={({item,index, drag, isActive,}) => {

                return (
                  <TouchableOpacity onLongPress={drag}>
                    <AppTextInput
                      inputPlaceHolder={item.city_name}
                      inputWidth={70}
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
                        <View style={{marginTop: 4, flexDirection:'row'}}>
                          {

                          }
                          <FontAwesome
                          
                          name={"bell"}
                          size={responsiveFontSize(2)}
                          color={AppColors.BLACK}
                          />
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
              onDragEnd={({data}) => {sortingCities(data), setActiveMedication(data)} }
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageCities;
