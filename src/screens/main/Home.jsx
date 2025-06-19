import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppImages from '../../assets/images/AppImages';
import SpeedoMeter from '../../components/SpeedoMeter';
import SelectionButton from '../../components/SelectionButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import axios from 'axios';
import BASE_URL from '../../utils/BASE_URL';
import DatePicker from 'react-native-date-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Animatable from 'react-native-animatable';
import AppButton from '../../components/AppButton';
import {GetCurrentLocation} from '../../global/GetCurrentLocation';
import {AddCityApi} from '../../global/AddCityApi';
// import AddCityApi from '../../global/AddCityApi';

const Home = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);

  const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
      backgroundColor: '#22bcb5',
    },
  ];

  const [selected, setSelected] = useState('Today');
  const [PastPollenData, setPastPollenData] = useState();
  const [pollenData, setPollenData] = useState();
  const [FuturePollenData, setFuturePollenData] = useState();

  const [todayPollensData, setTodayPollensData] = useState();
  const [pollenLoader, setPollenLoader] = useState(false);

  //data states
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [activePollen, setActivePollen] = useState([]);
  const [activeLoader, setActiveLoader] = useState(false);

  const [PastDate, setPastDate] = useState(
    moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
  );
  const [FutureDate, setFutureDate] = useState(
    moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
  );

  const [ispastArray, setIsPastArray] = useState([]);
  const [isfutureArray, setIsFutureArray] = useState([]);

  const [AllCities, setAllCities] = useState([]);
  const [loadCities, setLoadCities] = useState(false);

  // console.log("AllCities",AllCities)
  useEffect(() => {
    const nav = navigation.addListener('focus', async () => {
      if (userData) {
        
        getActivePollens();
        getAllCities();
      } else {
        setLoadCities(true);
        const currentLatLng = await GetCurrentLocation();
        getPollensDataLatLng(currentLatLng?.latitude, currentLatLng?.longitude);
      }
    });

    return nav;
  }, [navigation]);

  const getPollensData = (allcities, newindex) => {

    
    setPollenLoader(true);
    let data = new FormData();
    data.append('lat', allcities[newindex ? newindex : 0]?.lat);
    data.append('lng', allcities[newindex ? newindex : 0]?.lng);
    data.append('email', userData?.email);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/get_allergy_data`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        const res = response.data;

        
        const city = res?.user?.locations?.closest?.name

        
        const past = response?.data?.forecast?.[city]?.past;
        const today = response?.data?.forecast?.[city]?.today;
        const future = response?.data?.forecast?.[city]?.future;

        const pastArray = Object.entries(past).map(([date, data]) => ({
          key: date,
          ...data,
        }));

        const futureArray = Object.entries(future).map(([date, data]) => ({
          key: date,
          ...data,
        }));

        setPollenData(response.data);

        setPastPollenData(past);
        setTodayPollensData(today);
        setFuturePollenData(future);

        setIsPastArray(pastArray);
        setIsFutureArray(futureArray);        
        
        setPollenLoader(false);
        setLoadCities(false)
        

      })
      .catch(error => {
        console.log(error);
        setPollenLoader(false);
      });
  };


  const getPollensDataLatLng = (Lat, Lng) => {
    setPollenLoader(true);
    setLoadCities(true);
    let data = new FormData();
    data.append('lat', Lat);
    data.append('lng', Lng);
    // data.append('email', userData?.email);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/get_allergy_data`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(async response => {
        const res = response.data;

        const city = res?.user?.locations?.closest?.name;

        console.log("city",city)
        const newCityObj = {
          id: 1,
          lat: Lat,
          lng: Lng,
          city_name: city,
        };

        if(userData){
          console.log("userData...............",userData)
          const res = await AddCityApi(userData.id, city, Lat, Lng);
          
            console.log("Response is ........ =====>", res)


          if (res.status) {
            console.log("Something went wrong", res.details);
            return getAllCities()
          } else {
            console.log("City added successfully", res);
          }

        }

        setAllCities([newCityObj]);

        const past = response?.data?.forecast?.[city]?.past;
        const today = response?.data?.forecast?.[city]?.today;
        const future = response?.data?.forecast?.[city]?.future;

        const pastArray = Object.entries(past).map(([date, data]) => ({
          key: date,
          ...data,
        }));

        const futureArray = Object.entries(future).map(([date, data]) => ({
          key: date,
          ...data,
        }));

        setPollenData(response.data);

        setPastPollenData(past);
        setTodayPollensData(today);
        setFuturePollenData(future);

        setIsPastArray(pastArray);
        setIsFutureArray(futureArray);

        setPollenLoader(false);
        setLoadCities(false);
      })
      .catch(error => {
        console.log(error);
        setPollenLoader(false);
        setLoadCities(false);
      });
  };

  const getThBgColour = level => {
    switch (level) {
      case 'Very High':
        return '#D72626';
      case 'High':
        return '#F26D24';
      case 'Moderate':
        return '#FDEB48';
      case 'Low':
        return '#99C817';
      default:
        return '#99C817';
    }
  };

  const getActivePollens = () => {
    setActiveLoader(true);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_pollens`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log('resesdsadsajkkdasbhkk', response.data);

        setActivePollen(response.data.data);
        setActiveLoader(false);
      })
      .catch(error => {
        console.log(error);
        setActiveLoader(false);
      });
  };

  const getAllCities = () => {
    setLoadCities(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_cities`,
      headers: {},
    };

    axios
      .request(config)
      .then(async response => {
        console.log(JSON.stringify(response.data));
        setAllCities(response.data.cities);
        if (response?.data?.cities?.length > 0) {
          getPollensData(response.data.cities, 0);
          setLoadCities(false);
        }else{
          const currentLatLng = await GetCurrentLocation();
        getPollensDataLatLng(currentLatLng?.latitude, currentLatLng?.longitude);

        }
      })
      .catch(error => {
        console.log(error);
        setLoadCities(false);
        setPollenLoader(false);
      });
  };

  return (
    <>
      <LinearGradient
        colors={[
          getThBgColour(
            selected == 'Past'
              ? PastPollenData?.[PastDate]?.label
              : selected == 'Future'
              ? FuturePollenData?.[FutureDate]?.label
              : todayPollensData?.label,
          ),
          AppColors.WHITE,
        ]}
        // colors={[animatedColor, AppColors.WHITE]} // 🎯 animated start, static end
        style={{
          height: responsiveHeight(100),
          width: responsiveWidth(100),
        }}>
        {loadCities == true ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}>
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
            {userData ? (
              <AppText
                title={'Fetching pollen data please wait...'}
                textSize={2}
              />
            ) : (
              <AppText
                title={'Fetching current location data please wait...'}
                textSize={2}
              />
            )}
          </View>
        ) : (
          <>
            {AllCities.length > 0 ? (
              <ScrollView
                nestedScrollEnabled
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 100,
                  padding: 20,
                  marginTop: Platform.OS == 'ios' ? 30 : 0,
                }}
                showsVerticalScrollIndicator={false}>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  onConfirm={selectedDate => {
                    setOpen(false);
                    const today = moment().startOf('day');
                    const picked = moment(selectedDate).startOf('day');
                    const formattedDate = picked.format('YYYY-MM-DD');

                    if (picked.isAfter(today)) {
                      if (FuturePollenData?.[formattedDate]?.label) {
                        console.log('formated', formattedDate);
                        setFutureDate(formattedDate);
                        setSelected('Future');
                      } else {
                        Alert.alert(
                          'No Forecast Available',
                          'We couldn’t find any allergen forecast data for the selected date. Please try another day.',
                        );
                      }
                    } else if (picked.isBefore(today)) {
                      if (PastPollenData?.[formattedDate]?.label) {
                        setPastDate(formattedDate);
                        setSelected('Past');
                      } else {
                        Alert.alert(
                          'Unavailable Date',
                          'Data is only available for the past 7 days. Please select a more recent date.',
                        );
                      }
                    } else {
                      setSelected('Today');
                    }
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <Ionicons
                  name={'notifications-outline'}
                  size={responsiveFontSize(3)}
                  color={AppColors.BLUE}
                  style={{alignSelf: 'flex-end'}}
                />
                {loadCities == true ? (
                  <>
                    <ActivityIndicator size={'large'} color={AppColors.BLACK} />
                  </>
                ) : (
                  <AppIntroSlider
                    data={AllCities}
                    activeDotStyle={{
                      backgroundColor: AppColors.BLUE,
                      marginTop: 20,
                    }}
                    dotStyle={{
                      backgroundColor: AppColors.LIGHTGRAY,
                      marginTop: 20,
                    }}
                    showDoneButton={false}
                    showNextButton={false}
                    onSlideChange={index => getPollensData(AllCities, index)}
                    renderItem={({item, index}) => {
                      return (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View style={{flexDirection: 'row', gap: 5}}>
                              <FontAwesome6
                                name={'location-dot'}
                                size={responsiveFontSize(2)}
                                color={AppColors.BLUE}
                                style={{marginTop: 6}}
                              />
                              <View>
                                {pollenLoader == true ? (
                                  <ActivityIndicator
                                    size={'small'}
                                    color={AppColors.BLACK}
                                  />
                                ) : (
                                  <AppText
                                    title={
                                      pollenData?.user?.locations?.closest?.name
                                    }
                                    textSize={2.5}
                                    textFontWeight
                                  />
                                )}
                                <AppText
                                  title={'Allergen Forecast'}
                                  textSize={2}
                                  textColor={'#777777'}
                                />
                              </View>
                            </View>

                            <TouchableOpacity onPress={() => setOpen(true)}>
                              <AppText
                                title={'Today'}
                                textFontWeight
                                textSize={2}
                              />
                              {pollenLoader == true ? (
                                <ActivityIndicator
                                  size={'small'}
                                  color={AppColors.BLACK}
                                />
                              ) : (
                                <AppText
                                  title={
                                    selected == 'Past'
                                      ? PastPollenData?.[PastDate]?.date_label
                                      : selected == 'Future'
                                      ? FuturePollenData?.[FutureDate]
                                          ?.date_label
                                      : pollenData?.today?.text
                                  }
                                  textColor={'#777777'}
                                />
                              )}
                            </TouchableOpacity>
                          </View>

                          <View
                            style={{
                              marginTop: 20,
                              gap: 20,
                              height: responsiveHeight(35),
                            }}>
                            <AppText
                              title={'Total Accumulated Pollen'}
                              textAlignment={'center'}
                              textSize={2.5}
                              textColor={AppColors.BLACK}
                              textFontWeight
                            />

                            <SpeedoMeter
                              TextBottom={
                                selected == 'Past'
                                  ? PastPollenData?.[PastDate]?.label
                                  : selected == 'Future'
                                  ? FuturePollenData?.[FutureDate]?.label
                                  : todayPollensData?.label
                              }
                            />
                          </View>
                        </>
                      );
                    }}
                  />
                )}

                <View style={{flexDirection: 'row', gap: 5}}>
                  {activeLoader == true ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: responsiveWidth(90),
                        marginTop: 50,
                      }}>
                      <ActivityIndicator
                        size={'large'}
                        color={AppColors.BLACK}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      {todayPollensData?.current?.length > 0 ? (
                        <FlatList
                          data={activePollen}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{
                            gap: 20,
                            flexDirection: 'row',
                          }}
                          renderItem={({item}) => {
                            const index = todayPollensData?.current.findIndex(
                              p => p.scientific_name === item.name,
                            );
                            const todayPollenInAir = todayPollensData?.current;
                            return (
                              <View style={{gap: 10}}>
                                <AppText
                                  title={item.name}
                                  textAlignment={'center'}
                                  textSize={1.5}
                                  textColor={AppColors.BLACK}
                                  textFontWeight
                                />

                                <SpeedoMeter
                                  imgWeight={30}
                                  imgHeight={10}
                                  speedometerWidth={30}
                                  imageTop={-10}
                                  TextBottom={
                                    todayPollenInAir[index]?.level == 1
                                      ? 'Low'
                                      : todayPollenInAir[index]?.level == 2
                                      ? 'Moderate'
                                      : todayPollenInAir[index]?.level == 3
                                      ? 'High'
                                      : todayPollenInAir[index]?.level == 4
                                      ? 'Very High'
                                      : 'None'
                                  }
                                  TempreaturePriority={'Moderate'}
                                  TempreaturePriorityFontSize={1.6}
                                />
                              </View>
                            );
                          }}
                        />
                      ) : (
                        <FlatList
                          data={activePollen}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{
                            gap: 20,
                            flexDirection: 'row',
                          }}
                          renderItem={({item}) => {
                            return (
                              <View style={{gap: 10}}>
                                <AppText
                                  title={item.name}
                                  textAlignment={'center'}
                                  textSize={1.5}
                                  textColor={AppColors.BLACK}
                                  textFontWeight
                                />

                                <SpeedoMeter
                                  imgWeight={30}
                                  imgHeight={10}
                                  speedometerWidth={30}
                                  imageTop={-10}
                                  TextBottom={
                                    item?.level == 1
                                      ? 'Low'
                                      : item?.level == 2
                                      ? 'Moderate'
                                      : item?.level == 3
                                      ? 'High'
                                      : item?.level == 4
                                      ? 'Very High'
                                      : null
                                  }
                                  TempreaturePriority={'Moderate'}
                                  TempreaturePriorityFontSize={1.6}
                                />
                              </View>
                            );
                          }}
                        />
                      )}
                    </View>
                  )}
                </View>

                <View style={{flexDirection: 'row', gap: 10, marginBottom: 20}}>
                  <SelectionButton
                    title="Past"
                    setSelected={() => setSelected('Past')}
                    selected={selected}
                  />

                  <SelectionButton
                    title="Today"
                    setSelected={() => setSelected('Today')}
                    selected={selected}
                  />

                  <SelectionButton
                    title="Future"
                    setSelected={() => setSelected('Future')}
                    selected={selected}
                  />
                </View>

                <AppText
                  title={
                    'Report displays all pollen and spores currently in the air.'
                  }
                  textAlignment={'center'}
                  textSize={2}
                  textwidth={70}
                  textColor={AppColors.TEXTCOLOR}
                />

                {pollenLoader == true ? (
                  <ActivityIndicator size={'large'} color={AppColors.BLACK} />
                ) : (
                  <>
                    {selected == 'Past' ? (
                      <FlatList
                        data={ispastArray}
                        renderItem={({item, index}) => {
                          return (
                            <View
                              style={{
                                borderWidth: 1,
                                borderTopRightRadius: index == 0 ? 10 : 0,
                                borderTopLeftRadius: index == 0 ? 10 : 0,
                                borderBottomRightRadius:
                                  index == ispastArray?.length - 1 ? 10 : 0,
                                borderBottomLeftRadius:
                                  index == ispastArray?.length - 1 ? 10 : 0,
                                padding: 20,

                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                borderBottomWidth:
                                  index == ispastArray?.length - 1 ? 1 : 0,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  gap: 10,
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 200,
                                    borderWidth: 1,
                                    borderColor: '#4C9E00',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <View
                                    style={{
                                      height: 15,
                                      width: 15,
                                      borderRadius: 200,
                                      backgroundColor: '#4C9E00',
                                    }}
                                  />
                                </View>

                                <AppText
                                  title={item.key}
                                  textSize={2}
                                  textColor={AppColors.BLACK}
                                  textFontWeight
                                />
                              </View>

                              <ScrollView
                                horizontal
                                style={{
                                  flexDirection: 'row',
                                  marginTop: 20,
                                  rowGap: 20,
                                }}>
                                <View style={{gap: 10}}>
                                  <AppText
                                    title={'Total Spores'}
                                    textAlignment={'center'}
                                    textSize={1.5}
                                    textColor={AppColors.BLACK}
                                    textFontWeight
                                  />

                                  <SpeedoMeter
                                    imgWeight={30}
                                    imgHeight={10}
                                    speedometerWidth={30}
                                    imageTop={-10}
                                    TextBottom={
                                      item.total_spores == 1
                                        ? 'Low'
                                        : item.total_spores == 2
                                        ? 'Moderate'
                                        : item.total_spores == 3
                                        ? 'High'
                                        : item.total_spores == 4
                                        ? 'Very High'
                                        : 'Low'
                                    }
                                    TempreaturePriorityFontSize={1.6}
                                  />
                                </View>

                                <View style={{gap: 10, marginLeft: 20}}>
                                  <AppText
                                    title={'Total Trees'}
                                    textAlignment={'center'}
                                    textSize={1.5}
                                    textColor={AppColors.BLACK}
                                    textFontWeight
                                  />

                                  <SpeedoMeter
                                    imgWeight={30}
                                    imgHeight={10}
                                    speedometerWidth={30}
                                    imageTop={-10}
                                    TextBottom={
                                      item.total_trees == 1
                                        ? 'Low'
                                        : item.total_trees == 2
                                        ? 'Moderate'
                                        : item.total_trees == 3
                                        ? 'High'
                                        : item.total_trees == 4
                                        ? 'Very High'
                                        : 'Low'
                                    }
                                    TempreaturePriorityFontSize={1.6}
                                  />
                                </View>

                                <View style={{gap: 10, marginLeft: 20}}>
                                  <AppText
                                    title={'Total Grasses'}
                                    textAlignment={'center'}
                                    textSize={1.5}
                                    textColor={AppColors.BLACK}
                                    textFontWeight
                                  />

                                  <SpeedoMeter
                                    imgWeight={30}
                                    imgHeight={10}
                                    speedometerWidth={30}
                                    imageTop={-10}
                                    TextBottom={
                                      item.total_grasses == 1
                                        ? 'Low'
                                        : item.total_grasses == 2
                                        ? 'Moderate'
                                        : item.total_grasses == 3
                                        ? 'High'
                                        : item.total_grasses == 4
                                        ? 'Very High'
                                        : 'Low'
                                    }
                                    TempreaturePriorityFontSize={1.6}
                                  />
                                </View>

                                <View style={{gap: 10, marginLeft: 20}}>
                                  <AppText
                                    title={'Total Weeds'}
                                    textAlignment={'center'}
                                    textSize={1.5}
                                    textColor={AppColors.BLACK}
                                    textFontWeight
                                  />

                                  <SpeedoMeter
                                    imgWeight={30}
                                    imgHeight={10}
                                    speedometerWidth={30}
                                    imageTop={-10}
                                    TextBottom={
                                      item.total_weeds == 1
                                        ? 'Low'
                                        : item.total_weeds == 2
                                        ? 'Moderate'
                                        : item.total_weeds == 3
                                        ? 'High'
                                        : item.total_weeds == 4
                                        ? 'Very High'
                                        : 'Low'
                                    }
                                    TempreaturePriorityFontSize={1.6}
                                  />
                                </View>
                              </ScrollView>
                            </View>
                          );
                        }}
                      />
                    ) : selected == 'Today' ? (
                      <FlatList
                        data={todayPollensData?.current}
                        renderItem={({item, index}) => {
                          return (
                            <View
                              style={{
                                borderWidth: 1,
                                borderTopRightRadius: index == 0 ? 10 : 0,
                                borderTopLeftRadius: index == 0 ? 10 : 0,
                                borderBottomRightRadius:
                                  index == todayPollensData?.current?.length - 1
                                    ? 10
                                    : 0,
                                borderBottomLeftRadius:
                                  index == todayPollensData?.current?.length - 1
                                    ? 10
                                    : 0,
                                padding: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottomWidth:
                                  index == todayPollensData?.current?.length - 1
                                    ? 1
                                    : 0,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  gap: 10,
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 200,
                                    borderWidth: 1,
                                    borderColor: '#4C9E00',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <View
                                    style={{
                                      height: 15,
                                      width: 15,
                                      borderRadius: 200,
                                      backgroundColor: '#4C9E00',
                                    }}
                                  />
                                </View>

                                <AppText
                                  title={item.name}
                                  textSize={2}
                                  textColor={AppColors.BLACK}
                                  textFontWeight
                                />
                              </View>
                            </View>
                          );
                        }}
                      />
                    ) : selected == 'Future' ? (
                      <FlatList
                        data={isfutureArray}
                        renderItem={({item, index}) => {
                          return (
                            <View
                              style={{
                                borderWidth: 1,
                                borderTopRightRadius: index == 0 ? 10 : 0,
                                borderTopLeftRadius: index == 0 ? 10 : 0,
                                borderBottomRightRadius:
                                  index == isfutureArray?.length - 1 ? 10 : 0,
                                borderBottomLeftRadius:
                                  index == isfutureArray?.length - 1 ? 10 : 0,
                                padding: 20,
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                borderBottomWidth:
                                  index == isfutureArray?.length - 1 ? 1 : 0,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  gap: 10,
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 200,
                                    borderWidth: 1,
                                    borderColor: '#4C9E00',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <View
                                    style={{
                                      height: 15,
                                      width: 15,
                                      borderRadius: 200,
                                      backgroundColor: '#4C9E00',
                                    }}
                                  />
                                </View>

                                <AppText
                                  title={item.key}
                                  textSize={2}
                                  textColor={AppColors.BLACK}
                                  textFontWeight
                                />
                              </View>

                              <ScrollView
                                horizontal
                                style={{
                                  flexDirection: 'row',
                                  marginTop: 20,
                                  rowGap: 20,
                                }}>
                                <View style={{gap: 10}}>
                                  <AppText
                                    title={'Total Spores'}
                                    textAlignment={'center'}
                                    textSize={1.5}
                                    textColor={AppColors.BLACK}
                                    textFontWeight
                                  />

                                  <SpeedoMeter
                                    imgWeight={30}
                                    imgHeight={10}
                                    speedometerWidth={30}
                                    imageTop={-10}
                                    TextBottom={
                                      item.total_spores == 1
                                        ? 'Low'
                                        : item.total_spores == 2
                                        ? 'Moderate'
                                        : item.total_spores == 3
                                        ? 'High'
                                        : item.total_spores == 4
                                        ? 'Very High'
                                        : 'Low'
                                    }
                                    TempreaturePriorityFontSize={1.6}
                                  />
                                </View>

                                <View style={{gap: 10, marginLeft: 20}}>
                                  <AppText
                                    title={'Total Trees'}
                                    textAlignment={'center'}
                                    textSize={1.5}
                                    textColor={AppColors.BLACK}
                                    textFontWeight
                                  />

                                  <SpeedoMeter
                                    imgWeight={30}
                                    imgHeight={10}
                                    speedometerWidth={30}
                                    imageTop={-10}
                                    TextBottom={
                                      item.total_trees == 1
                                        ? 'Low'
                                        : item.total_trees == 2
                                        ? 'Moderate'
                                        : item.total_trees == 3
                                        ? 'High'
                                        : item.total_trees == 4
                                        ? 'Very High'
                                        : 'Low'
                                    }
                                    TempreaturePriorityFontSize={1.6}
                                  />
                                </View>

                                <View style={{gap: 10, marginLeft: 20}}>
                                  <AppText
                                    title={'Total Grasses'}
                                    textAlignment={'center'}
                                    textSize={1.5}
                                    textColor={AppColors.BLACK}
                                    textFontWeight
                                  />

                                  <SpeedoMeter
                                    imgWeight={30}
                                    imgHeight={10}
                                    speedometerWidth={30}
                                    imageTop={-10}
                                    TextBottom={
                                      item.total_grasses == 1
                                        ? 'Low'
                                        : item.total_grasses == 2
                                        ? 'Moderate'
                                        : item.total_grasses == 3
                                        ? 'High'
                                        : item.total_grasses == 4
                                        ? 'Very High'
                                        : 'Low'
                                    }
                                    TempreaturePriorityFontSize={1.6}
                                  />
                                </View>

                                <View style={{gap: 10, marginLeft: 20}}>
                                  <AppText
                                    title={'Total Weeds'}
                                    textAlignment={'center'}
                                    textSize={1.5}
                                    textColor={AppColors.BLACK}
                                    textFontWeight
                                  />

                                  <SpeedoMeter
                                    imgWeight={30}
                                    imgHeight={10}
                                    speedometerWidth={30}
                                    imageTop={-10}
                                    TextBottom={
                                      item.total_weeds == 1
                                        ? 'Low'
                                        : item.total_weeds == 2
                                        ? 'Moderate'
                                        : item.total_weeds == 3
                                        ? 'High'
                                        : item.total_weeds == 4
                                        ? 'Very High'
                                        : 'Low'
                                    }
                                    TempreaturePriorityFontSize={1.6}
                                  />
                                </View>
                              </ScrollView>
                            </View>
                          );
                        }}
                      />
                    ) : null}
                  </>
                )}
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 15,
                }}>
                <AppText
                  title={'No Cities Found'}
                  textSize={2.5}
                  textColor={AppColors.BLACK}
                />
                <AppButton
                  textColor={AppColors.WHITE}
                  textFontWeight
                  title={'Please add city'}
                  textSize={2}
                  handlePress={() => navigation.navigate('AddCity')}
                />
              </View>
            )}
          </>
        )}
      </LinearGradient>
    </>
  )
};

export default Home;
