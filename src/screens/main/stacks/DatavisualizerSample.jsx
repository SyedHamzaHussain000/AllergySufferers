import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Animated,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import AppHeader from '../../../components/AppHeader';
// import {BarChart, LineChart} from 'react-native-chart-kit';
import AppColors from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import AppText from '../../../components/AppTextComps/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BASE_URL from '../../../utils/BASE_URL';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from 'react-native-gifted-charts';
import AppImages from '../../../assets/images/AppImages';
import SubscribeBar from '../../../components/SubscribeBar';
import GetAllLocation from '../../../global/GetAllLocation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiCallWithUserId} from '../../../global/ApiCall';
import {
  addUnitToActiveMedicaton,
  removeUnitToActiveMedicaton,
  setActiveCity,
} from '../../../redux/Slices/MedicationSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DatavisualizerSample = ({navigation}) => {
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const userData = useSelector(state => state.auth.user);
  const expireDate = useSelector(state => state.auth.expireDate);
  const allActiveMedicationRedux = useSelector(
    state => state.medications.ActiveMedications,
  );
  const AllCities = useSelector(state => state?.medications?.allMyCity);
  const activeCity = useSelector(state => state?.medications?.ActiveCity);

  const [type, setType] = useState('allergens');
  const [medicationData, setMedicationsData] = useState();

  const [takingMedications, setTakingMedications] = useState([]);
  const [todayPollensData, setTodayPollensData] = useState([]);
  const [MedicationnRecord, setMedicationnRecord] = useState([]);

  // console.log('MedicationnRecord', MedicationnRecord);

  const [pollenLoader, setPollenLoader] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selecteddate, setSelectedDate] = useState(
    moment().local().format('YYYY-MM-DD'),
  );

  const colours = ['lightblue', 'lightgreen'];
  const insets = useSafeAreaInsets();

  const [open, setOpen] = useState(false);

  const [PrimaryLineData, setPrimaryLineData] = useState([]);
  const [SecondaryLineData, setSecondaryLineData] = useState([]);

  const [medicationLoadingMap, setMedicationLoadingMap] = useState({});

  const [loadingItemId, setLoadingItemId] = useState(null);

  const [DataVisualizerLoader, setDataVisualizerLoader] = useState(false);
  const [allSymtoms, setAllSymtoms] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [allCities, setAllCities] = useState([]);
  const [pickedCity, setPickedCity] = useState();
  const [AllDayNumber, setAllDayNumber] = useState([]);
  const [activeDate, setActiveDate] = useState(null);

  // console.log("allCities",AllCities[0])

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getAllAllergens();

      // getSelectedAllergens(activeCity);

      if (!activeCity) {
        NewActiveCity();
      }
    });

    return nav;
  }, [navigation]);

  useEffect(() => {
    getSelectedAllergens(activeCity);
  }, [activeCity]);

  useEffect(() => {
    if (allActiveMedicationRedux.length > 0) {
      getMedicationRecords(selecteddate, allActiveMedicationRedux);
    }
  }, [allActiveMedicationRedux]);

  useEffect(() => {
    // getSelectedAllergens(activeCity);

    if (type == 'medication') {
      getMedicationApi();
    }
  }, [selecteddate, activeCity]);

  const NewActiveCity = () => {
    // console.log("activeCity",AllCities)
    // Alert.alert("ative med new")
    // return

    if (!activeCity) {
      dispatch(setActiveCity(AllCities[0]));
      return;
    } else {
      console.log('active city is exist');
    }
  };

  const setMedicationLoading = (id, isLoading) => {
    setMedicationLoadingMap(prev => ({...prev, [id]: isLoading}));
  };

  const getAllAllergens = () => {
    setType('allergens');
    setActiveDate(null);
    setPollenLoader(true);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_all_allergens`,
      headers: {'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0'},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setPollenLoader(false);
        setTodayPollensData(response.data);
      })
      .catch(error => {
        console.log(error);
        setPollenLoader(false);
      });
  };

  const getMedicationApi = () => {
    setType('medication');
    setPollenLoader(true);

    let data = JSON.stringify({
      date: moment(selecteddate).format('YYYY-MM-DD'),
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_medications_active`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(async response => {
        setMedicationsData(response?.data?.data);
        setPollenLoader(false);
        const MedicationData = await ApiCallWithUserId(
          'post',
          'get_active_date',
          userData?.id,
        );
        const activeDateStr = MedicationData?.active_date
          ? MedicationData?.active_date
          : moment(new Date()).format('YYYY-MM-DD');
        setActiveDate(new Date(activeDateStr));
        // console.log("Active Date:", activeDateStr);
      })
      .catch(error => {
        setPollenLoader(false);
        console.log(error);
      });
  };

  const MAX_BARS_PER_DATE = 10;

  const getMedicationRecords = (ewformateddate, allActiveMedicationRedux) => {
    const end = moment(new Date());
    const start = moment(allActiveMedicationRedux[0].date || new Date());

    setStartDate(start);
    setEndDate(end);

    const dayNumbers = [];
    let current = start.clone();

    while (current.isSameOrBefore(end)) {
      dayNumbers.push(current.date());
      current.add(1, 'day');
    }

    setAllDayNumber(dayNumbers);

    // ✅ Data from Redux instead of API
    //   const allentriesArr = allActiveMedicationRedux || [];

    const groupedByDate = {};

    allActiveMedicationRedux.forEach(entry => {
      const formattedDate = moment(entry.date).format('D'); // ✅ outputs just "25", "27", etc.
      if (!groupedByDate[formattedDate]) {
        groupedByDate[formattedDate] = [];
      }
      groupedByDate[formattedDate].push({
        value: parseInt(entry.units) || 0,
        frontColor: entry.frontColor,
      });
    });

    const barData = [];

    Object.entries(groupedByDate).forEach(([date, bars]) => {
      const group = [];

      bars.forEach((bar, index) => {
        group.push({
          value: bar.value,
          frontColor: bar.frontColor,
          label: index === 0 ? date : '',
          labelWidth: 0,
          labelTextStyle: {color: 'gray'},
          spacing: 0,
        });
      });

      const paddingCount = MAX_BARS_PER_DATE - group.length;
      for (let i = 0; i < paddingCount; i++) {
        group.push({
          value: 0,
          frontColor: 'transparent',
          spacing: responsiveWidth(6.7), // → outputs 27.49 in logs
          labelWidth: 0,
        });
      }

      barData.push(...group);
    });

    setMedicationnRecord(barData);
  };

  const getDataVisualizer = async (selecallergens, city) => {
    // console.log("city ? city : AllCities[0]", city ? city : AllCities[0])

    // console.log("city",city)
    if (!selecallergens || selecallergens.length === 0) {
      // no allergens selected, clear chart data
      setPrimaryLineData([]);
      setSecondaryLineData([]);
      setLoadingItemId(null);
      return;
    }

    // const getCity = await AsyncStorage.getItem('isCity');
    // const parseCity = JSON.parse(getCity);

    setPickedCity(AllCities[0]);

    // if (getCity) {
    setDataVisualizerLoader(true);
    const allergenParams = selecallergens
      .map(
        item => `scientific_names[]=${encodeURIComponent(item.allergen_name)}`,
      )
      .join('&');
    // console.log('selecteddate', selecteddate, 'allergenParams', allergenParams);

    const dateis = moment(allActiveMedicationRedux[0]?.date).format(
      'YYYY-MM-DD',
    );

    const pickLat = city
      ? city?.lat
      : activeCity
      ? activeCity.lat
      : AllCities[0]?.lat;
    const pickLng = city
      ? city?.lng
      : activeCity
      ? activeCity.lng
      : AllCities[0]?.lng;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${
        userData?.id
      }/data_visualizer?lat=${
        city ? city?.lat : activeCity ? activeCity.lat : AllCities[0]?.lat
      }&lng=${
        city ? city?.lng : activeCity ? activeCity.lng : AllCities[0]?.lng
      }&start_date=${dateis}&${allergenParams}`,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };

    axios
      .request(config)
      .then(response => {
        const apiData = response.data;
        console.log('api data of symptoms', apiData);
        setAllSymtoms(apiData.symptom_level);
        const chartLineData = {};
        Object.keys(apiData).forEach(key => {
          if (key !== 'dates' && key !== 'symptom_level') {
            chartLineData[key] = apiData[key].map(val => ({value: val}));
          }
        });

        //edited code
        const first = selecallergens[0];
        const second = selecallergens[1];

        setPrimaryLineData(chartLineData[first?.allergen_name] || []);
        setSecondaryLineData(chartLineData[second?.allergen_name] || []);

        colours[0] = first?.chartColor || 'lightblue';
        colours[1] = second?.chartColor || 'lightgreen';
        setLoadingItemId(null);
        // ....................

        setDataVisualizerLoader(false);
      })
      .then(response => {
        setDataVisualizerLoader(false);
        setLoadingItemId(null);
      })
      .catch(error => {
        setDataVisualizerLoader(false);
        setLoadingItemId(null);
        console.log(error);
      });
    // } else {
    //   console.log('add city');
    // }
  };

  const addAllergens = item => {
    setPollenLoader(true);

    if (takingMedications.length == 2) {
      setPollenLoader(false);
      return Alert.alert(
        'Limit Reached',
        `You can only view 2 allergens at a time. Please remove one of: ${takingMedications
          .map(item => item.allergen_name)
          .join(', ')}.`,
      );
    }

    let data = JSON.stringify({
      data: {
        allergen_name: item.name,
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/set_allergens`,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setPollenLoader(false);
        getSelectedAllergens(activeCity);
      })
      .catch(error => {
        console.log(error);
        setPollenLoader(false);
      });
  };

  const getSelectedAllergens = city => {
    // setActiveDate(null)

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_allergens`,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };

    axios
      .request(config)
      .then(response => {
        console.log('allergens', response.data.allergens);

        //edited code
        const coloredAllergens = assignColorsToAllergens(
          response.data.allergens,
          colours,
        );

        // getDataVisualizer(response.data.allergens);
        // setTakingMedications(response.data.allergens);

        //edited code
        getDataVisualizer(coloredAllergens, city);
        setTakingMedications(coloredAllergens);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteAllergens = async item => {
    // console.log("item", item, takingMedications,"Primarylinedata", PrimaryLineData, "SecondaryLineData", SecondaryLineData)
    // Alert.alert("alldsadlsaldas")
    // return
    if (!item?.id) {
      console.warn('Invalid allergen item. Skipping delete.');
      return;
    }

    setLoadingItemId(item.id);

 


    try {
      const data = JSON.stringify({
        allergen_id: item.id,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/delete_allergen`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      await axios.request(config);

          const updatedAllergens = takingMedications.filter(
        med => med.id !== item.id,
      );

      setTakingMedications(updatedAllergens);

      // console.log('updatedAllergens', updatedAllergens);
   
      // 🧠 Update graph based on remaining allergens
      if (updatedAllergens.length === 0) {
        setPrimaryLineData([]);
        setSecondaryLineData([]);
      } else {
        getDataVisualizer(updatedAllergens);
      }
    } catch (error) {
      console.error('Error deleting allergen:', error);
      setLoadingItemId(null);
    } finally {
      // setLoadingItemId(null);
    }
  };

  const addMedication = async item => {
    dispatch(addUnitToActiveMedicaton(item));
  };

  const removeMedication = async item => {
    dispatch(removeUnitToActiveMedicaton(item));
  };

  const assignColorsToAllergens = (allergens, colors) => {
    return allergens.map((item, index) => ({
      ...item,
      chartColor: colors[index % colors.length],
    }));
  };

  const getLocation = async type => {
    setType(type);

    // if (userData.email) {
    //   const res = await GetAllLocation(userData.id);
    //   console.log('res', res);

    //   setAllCities(res.cities);
    // } else {
    //   setAllCities();
    // }
  };

  // console.log("loadingItemId",loadingItemId)

  const SelectLocation = async city => {
    // await AsyncStorage.setItem('isCity', JSON.stringify(city));
    dispatch(setActiveCity(city));
    // getSelectedAllergens(city);
  };

  const chartSpacing = responsiveWidth(28); // You can tweak this value as needed

  // console.log('chartSpacing', chartSpacing);q

  const emojiMap = {
    1: AppImages.Hello,
    2: AppImages.Mask,
    3: AppImages.Pain,
    4: AppImages.Star,
    5: AppImages.Bored,
  };

  const NewPro = [{value: 0}, {value: 2}, {value: 3}];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
          backgroundColor: AppColors.WHITE,
          paddingBottom: 200,
          // paddingBottom: insets.bottom + 40,
        }}>
        <AppHeader
          heading="Data Visualizer"
          Rightheading="Today"
          subheading="Your Data, Visualized"
          goBack
          selecteddate={selecteddate}
          setOpen={() => setOpen(true)}
        />

        {startDate && endDate && (
          <View style={{marginTop: 20, marginBottom: 20}}>
            <AppText
              title={`${moment(startDate).format('MMM DD')} - ${moment(
                endDate,
              ).format('MMM DD')}`}
              textSize={2}
              textColor={AppColors.BLACK}
              textAlignment={'center'}
            />
          </View>
        )}

        {expireDate ? (
          <>
            {DataVisualizerLoader == true ? (
              <View
                style={{
                  // height: responsiveHeight(30),
                  minHeight: responsiveHeight(30),
                  position: 'relative',
                  paddingBottom: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={'large'} color={AppColors.BLACK} />
              </View>
            ) : (
              <View
                style={{
                  minHeight: responsiveHeight(30),
                  paddingBottom: 20,
                  // position: 'absolute',
                }}>
                {MedicationnRecord?.length > 0 ? (
                  <View>
                    <ScrollView
                      contentContainerStyle={{minWidth: responsiveWidth(100)}}
                      style={{marginLeft: 10}}
                      horizontal={true}>
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          marginLeft: responsiveWidth(15),
                          flexDirection: 'row',
                          zIndex: 100,
                        }}>
                        {allSymtoms.map(item => {
                          const emojiMap = {
                            1: AppImages.Mask,
                            2: AppImages.Pain,
                            3: AppImages.Bored,
                            4: AppImages.Hello,
                            5: AppImages.Star,
                          };

                          return (
                            // <View
                            //   style={{
                            //     width: chartSpacing,
                            //     alignItems: 'center',
                            //   }}>
                            <View
                              style={{
                                width: responsiveWidth(30),

                                alignItems: 'flex-start',
                                // borderWidth:1,
                              }}>
                              <Image
                                source={emojiMap[item]}
                                style={{
                                  height: 30,
                                  width: 30,
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          );
                        })}
                      </View>

                      <BarChart
                        data={MedicationnRecord || []}
                        barWidth={7}
                        frontColor="#E23131" // bar color
                        showLine={
                          // true
                          PrimaryLineData.length > 0 ||
                          SecondaryLineData.length > 0
                        }
                        // xAxisLabelTexts={[]}
                        lineData={PrimaryLineData || []}
                        lineData2={SecondaryLineData || []}
                        lineConfig={{
                          color: colours[0],
                          thickness: 2,
                          curved: false,
                          dataPointsColor: colours[0],
                          spacing: chartSpacing,
                          // textColor: 'red',
                          initialSpacing: responsiveWidth(15),
                        }}
                        lineConfig2={{
                          color: colours[1],
                          thickness: 2,
                          curved: false,
                          dataPointsColor: colours[1],
                          spacing: chartSpacing,
                          initialSpacing: responsiveWidth(15),
                        }}
                        // xAxisIndicesWidth={responsiveWidth(28)}
                        // yAxisLabelTexts={[
                        //   '0',
                        //   ' ',
                        //   '2',
                        //   ' ',
                        //   '4',
                        //   ' ',
                        //   '6',
                        //   ' ',
                        //   '8',
                        // ]}
                        showYAxisIndices={false}
                        showVerticalLines={false}
                        hideYAxisText={true}
                        yAxisThickness={0}
                        // hideXAxisText={true}
                        // xAxisLabelTexts={[]} // extra safety
                        // xAxisLabelTextStyle={{
                        //   color: 'transparent',
                        //   fontSize: 0,
                        // }}
                        barBorderRadius={2}
                        isAnimated={true}
                        noOfSections={8}
                        spacing={responsiveWidth(7.5)}
                        formatYLabel={label => parseFloat(label).toFixed(0)}
                        stepValue={1}
                      />

                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          bottom: Platform.OS == 'ios' ? 0 : -5,
                          backgroundColor: AppColors.WHITE,
                          width: responsiveWidth(100),
                          height: responsiveHeight(2),
                        }}
                      />

                      <View
                        style={{
                          flexDirection: 'row',
                          position: 'absolute',
                          zIndex: 100,
                          bottom: -5,
                          marginLeft: responsiveWidth(17.5),
                        }}>
                        {AllDayNumber?.map(item => {
                          return (
                            <View
                              style={{
                                backgroundColor: 'white',
                                width: responsiveWidth(30),
                              }}>
                              <AppText title={item} textSize={2} />
                            </View>
                          );
                        })}
                      </View>
                    </ScrollView>

                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        // bottom: responsiveHeight(1),
                        // backgroundColor: AppColors.rightArrowCOlor,
                        left: responsiveWidth(1.9),
                        gap: Platform.OS == 'ios' ? 30 : 27,
                        justifyContent: 'space-between',
                        borderRightWidth: 1,
                        paddingRight: 5,
                      }}>
                      <AppText
                        title={8}
                        textSize={2}
                        textColor={AppColors.LIGHTGRAY}
                      />
                      <AppText
                        title={6}
                        textSize={2}
                        textColor={AppColors.LIGHTGRAY}
                      />
                      <AppText
                        title={4}
                        textSize={2}
                        textColor={AppColors.LIGHTGRAY}
                      />
                      <AppText
                        title={2}
                        textSize={2}
                        textColor={AppColors.LIGHTGRAY}
                      />
                      <AppText
                        title={0}
                        textSize={2}
                        textColor={AppColors.LIGHTGRAY}
                      />
                    </View>

                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        right: 0,
                        // minWidth: responsiveWidth(13.5),
                        //  justifyContent: 'space-between',
                        // paddingVertical: responsiveHeight(1),
                        // justifyContent: 'flex-start',,
                        height: responsiveHeight(30),
                        top: '37%',
                        gap: 10,
                      }}>
                      <AppText
                        // style={{
                        //   position: 'absolute',
                        //   top: '31%',
                        // }}
                        title={'Very \nHigh'}
                        textSize={1.5}
                      />
                      <AppText
                        //                   style={{
                        //   position: 'absolute',
                        //   top: '44.5%',
                        // }}
                        title={'High'}
                        textSize={1.5}
                      />

                      <AppText
                        //                    style={{
                        //   position: 'absolute',
                        //   top: '53%',
                        // }}
                        title={'Moderate'}
                        textSize={1.5}
                      />
                      <AppText
                        // style={{
                        //   position: 'absolute',
                        //   top: '62%'
                        // }}
                        title={'Low'}
                        textSize={1.5}
                      />
                    </View>
                  </View>
                ) : (
                  <AppText title={'No data available'} textSize={2} />
                )}
              </View>
            )}

        

            <View style={{gap: 20}}>
              <View >
                <AppText title={'Allergens'} textSize={2} textFontWeight />
                <FlatList
                  data={takingMedications}
                  keyExtractor={item => item?.id?.toString()}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        minHeight: responsiveHeight(6),
                        width: responsiveWidth(90),
                        // maxWidth: 400,
                        paddingVertical: 10,
                        borderRadius: 10,
                        borderColor: AppColors.LIGHTGRAY,
                        backgroundColor: colours[index],
                        flexDirection: 'row',
                        marginTop: 5,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: 0,
                        paddingLeft:5,

                        borderWidth: 1,
                      }}
                      // style={{
                      //   height: responsiveHeight(6),
                      //   width: responsiveWidth(90),
                      //   borderWidth: 1,
                      //   borderRadius: 10,
                      //   borderColor: AppColors.LIGHTGRAY,
                      //   marginTop: 5,
                      //   backgroundColor: colours[index],
                      //   flexDirection: 'row',
                      //   justifyContent: 'space-between',
                      //   alignItems: 'center',
                      //   paddingHorizontal: 20,
                      // }}
                    >

                      <AppText title={item.allergen_name} textSize={1.5}  textwidth={65}  />


                      {loadingItemId === item.id ? (
                        <ActivityIndicator
                          size="small"
                          color={AppColors.LIGHTGRAY}
                        />
                      ) : (
                        <TouchableOpacity onPress={() => deleteAllergens(item)} style={{  padding:10, width:responsiveWidth(25), alignItems:'flex-end', justifyContent:'cennter', paddingRight:30}}>
                          <AntDesign
                            name="minus"
                            size={responsiveFontSize(2)}
                            color={AppColors.LIGHTGRAY}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                />
              </View>

              {activeCity && (
                <View style={{gap: 10}}>
                  <AppText title={'City'} textSize={2} textFontWeight />
                  <View
                    style={{
                      // height: 50,
                      minHeight: responsiveHeight(6),
                      width: responsiveWidth(90),
                      // maxWidth: 400,
                      alignSelf: 'center',
                      backgroundColor: AppColors.PEACHCOLOUR,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                    }}>
                    <AppText
                      title={
                        activeCity?.city_name
                          ? activeCity?.city_name
                          : AllCities[0]?.city_name
                      }
                      textSize={2}
                      textFontWeight
                      textColor={AppColors.BLACK}
                    />
                  </View>
                </View>
              )}
            </View>

            <View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => getAllAllergens()}
                  style={{
                    // height: responsiveHeight(5),
                    // width: responsiveWidth(44),
                    minHeight: responsiveHeight(5.5),
                    paddingVertical: 10,
                    width: '48%',
                    backgroundColor:
                      type == 'allergens'
                        ? AppColors.BTNCOLOURS
                        : AppColors.WHITE,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AppText
                    title={'ALLERGENS'}
                    textColor={
                      type == 'allergens' ? AppColors.WHITE : AppColors.BLACK
                    }
                    textSize={2}
                    textFontWeight
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => getMedicationApi()}
                  style={{
                    // height: responsiveHeight(5),
                    // width: responsiveWidth(44),
                    minHeight: responsiveHeight(5.5),
                    paddingVertical: 10,
                    width: '48%',
                    borderWidth: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      type == 'medication'
                        ? AppColors.BTNCOLOURS
                        : AppColors.WHITE,
                  }}>
                  <AppText
                    title={'MEDICATIONS'}
                    textColor={
                      type == 'medication' ? AppColors.WHITE : AppColors.BLACK
                    }
                    textSize={2}
                    textFontWeight
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => getLocation('Add Location')}
                style={{
                  width: responsiveWidth(90),
                  // maxWidth: 400,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    type === 'Add Location'
                      ? AppColors.BTNCOLOURS
                      : AppColors.WHITE,
                  marginTop: 10,
                  paddingVertical: 12,
                }}
                // style={{
                //   height: responsiveHeight(5),
                //   width: responsiveWidth(90),
                //   borderWidth: 1,
                //   borderRadius: 10,
                //   alignItems: 'center',
                //   justifyContent: 'center',
                //   backgroundColor:
                //     type == 'Add Location'
                //       ? AppColors.BTNCOLOURS
                //       : AppColors.WHITE,
                //   marginTop: 10,
                // }}
              >
                <AppText
                  title={'Change Location'}
                  textColor={
                    type == 'Add Location' ? AppColors.WHITE : AppColors.BLACK
                  }
                  textSize={2}
                  textFontWeight
                />
              </TouchableOpacity>
            </View>

            {pollenLoader && (
              <View style={{marginTop: 30}}>
                <ActivityIndicator size={'large'} color={AppColors.BLACK} />
              </View>
            )}
            {type == 'medication' ? (
              <View>
                <FlatList
                  data={allActiveMedicationRedux.filter(
                    item => item.date === selecteddate,
                  )}
                  contentContainerStyle={{
                    gap: 10,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          borderWidth: 2.5,
                          borderRadius: 10,
                          borderColor: item.frontColor,
                          height: responsiveHeight(6),
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          justifyContent: 'space-between',
                        }}>
                        <AppText
                          title={item.name}
                          textSize={1.6}
                          textColor={AppColors.BLACK}
                        />

                        {medicationLoadingMap[item?.id] ? (
                          <ActivityIndicator
                            size={'small'}
                            color={AppColors.BLACK}
                          />
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() => removeMedication(item)}>
                              <AntDesign
                                name={'minus'}
                                size={responsiveFontSize(2)}
                                color={AppColors.LIGHTGRAY}
                              />
                            </TouchableOpacity>

                            <AppText
                              title={item?.units || 0}
                              textColor={AppColors.LIGHTGRAY}
                              textSize={2.5}
                            />

                            <TouchableOpacity
                              onPress={() => addMedication(item)}>
                              <AntDesign
                                name={'plus'}
                                size={responsiveFontSize(2)}
                                color={AppColors.LIGHTGRAY}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    );
                  }}
                />
              </View>
            ) : type == 'allergens' ? (
              <View>
                <FlatList
                  data={todayPollensData?.sort((a, b) =>
                    a.common_name.localeCompare(b.common_name),
                  )}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => pollenLoader == true ? console.log("adding"): addAllergens(item)}
                        style={{
                          // height: responsiveHeight(6),
                          minHeight: responsiveHeight(6),
                          maxWidth: 400,
                          // width: responsiveWidth(90),
                          width: '100%',
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: AppColors.LIGHTGRAY,
                          marginTop: 5,
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                          paddingHorizontal: 20,
                        }}>
                        <AntDesign
                          name={'pluscircle'}
                          size={responsiveFontSize(2.5)}
                          color={AppColors.BTNCOLOURS}
                        />
                        <AppText title={item.common_name} textSize={1.5} />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ) : (
              <View>
                <FlatList
                  data={AllCities}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => SelectLocation(item)}
                        style={{
                          height: responsiveHeight(6),
                          width: responsiveWidth(90),
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: AppColors.LIGHTGRAY,
                          marginTop: 5,
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                          paddingHorizontal: 20,
                        }}>
                        <AntDesign
                          name={'pluscircle'}
                          size={responsiveFontSize(2.5)}
                          color={AppColors.BTNCOLOURS}
                        />

                        <AppText title={item.city_name} textSize={1.5} />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </>
        ) : (
          <View
            style={{height: responsiveHeight(30), justifyContent: 'center'}}>
            <SubscribeBar
              title="Subscribe Now to access data visualizer"
              title2={'Unlock Full Access to data visualizer'}
              handlePress={() => navigation.navigate('Subscription')}
            />
          </View>
        )}
      </ScrollView>

          <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              minimumDate={
                allActiveMedicationRedux.length > 0
                  ? moment(allActiveMedicationRedux[0]?.date).local()
                  : moment().local()
              }
              // minimumDate={allActiveMedicationRedux[0]?.date ? new Date(allActiveMedicationRedux[0]?.date) :  new Date() }
              maximumDate={new Date(moment().local())}
              onConfirm={selectedDate => {
                setDate(selectedDate);
                setOpen(false);
                const today = moment().startOf('day');
                const picked = moment(selectedDate).startOf('day');
                const formattedDate = picked.format('YYYY-MM-DD');

                setSelectedDate(formattedDate);
                // getMedicationRecords(formattedDate);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
    </SafeAreaView>
  );
};

export default DatavisualizerSample;
