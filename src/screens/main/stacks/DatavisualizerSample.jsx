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
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  setActiveMedication,
} from '../../../redux/Slices/MedicationSlice';
import {useFocusEffect} from '@react-navigation/native';
import Svg, {Circle, G, Polyline, Rect} from 'react-native-svg';

const DatavisualizerSample = ({navigation}) => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state?.auth?.user);
  const expireDate = useSelector(state => state?.auth?.expireDate);
  const allActiveMedicationRedux = useSelector(
    state => state?.medications?.ActiveMedications,
  );
  const AllCities = useSelector(state => state?.medications?.allMyCity);
  const activeCity = useSelector(state => state?.medications?.ActiveCity);

  // console.log("userData", userData)
  // console.log("expireDate", expireDate)
  // console.log("allActiveMedicationRedux", allActiveMedicationRedux)
  // console.log("AllCities", AllCities)
  // console.log("activeCity", activeCity)

  const [type, setType] = useState('allergens');
  const [medicationData, setMedicationsData] = useState();

  const [activeCityLocalState, setactiveCityLocalState] = useState();

  const [takingMedications, setTakingMedications] = useState([]);
  const [todayPollensData, setTodayPollensData] = useState([]);
  const [MedicationnRecord, setMedicationnRecord] = useState([]);

  const [pollenLoader, setPollenLoader] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selecteddate, setSelectedDate] = useState(
    moment().local().format('YYYY-MM-DD'),
  );

  const colours = [
    '#4A90E2', // Blue
    '#50E3C2', // Teal
    '#F5A623', // Orange
    '#D0021B', // Red
    '#7ED321', // Green
  ];

  const [open, setOpen] = useState(false);

  const [PrimaryLineData, setPrimaryLineData] = useState([]);
  const [SecondaryLineData, setSecondaryLineData] = useState([]);

  // ew
  const [thirdLineData, setthirdLineData] = useState([]);
  const [fourthLineData, setfourthLineData] = useState([]);
  const [FifthLineData, setFifthLineData] = useState([]);

  const [medicationLoadingMap, setMedicationLoadingMap] = useState({});

  const [loadingItemId, setLoadingItemId] = useState(null);

  const [DataVisualizerLoader, setDataVisualizerLoader] = useState(false);
  const [allSymtoms, setAllSymtoms] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [pickedCity, setPickedCity] = useState();
  const [AllDayNumber, setAllDayNumber] = useState([]);
  const [activeDate, setActiveDate] = useState(null);

  const [savingDataLoader, setSavingDataLoader] = useState(false);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      // getAllAllergens();

      // getSelectedAllergens(activeCity);

      if (!activeCity) {
        NewActiveCity();
      } else {
        // getSelectedAllergens(activeCity);
      }
    });

    return nav;
  }, [navigation]);

  useEffect(() => {
    getSelectedAllergens(activeCity);
  }, [activeCity, MedicationnRecord, allActiveMedicationRedux]);

  useEffect(() => {
    if (expireDate) {
      if (allActiveMedicationRedux?.length === 0) {
        getApiDataAndSaveToRedux();
      }
    }
  }, [allActiveMedicationRedux]);

  useFocusEffect(
    useCallback(() => {
      getSelectedAllergens(activeCity);

      // Alert.alert("runninnng use focus")
    }, [activeCity, allActiveMedicationRedux, MedicationnRecord]),
  );

  // console.log("allActiveMedicationRedux",allActiveMedicationRedux)

  // Alert.alert("activeCity",activeCity.city_name)

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

  const getApiDataAndSaveToRedux = async () => {
    if (allActiveMedicationRedux.length === 0) {
      setSavingDataLoader(true);

      // Alert.alert("This function calls getApiDataAndSaveToRedux")
      const getActiveMedicationData = await ApiCallWithUserId(
        'post',
        'get_medication_records',
        userData?.id,
      );

      if (getActiveMedicationData?.entries?.items?.length > 0) {
        console.log(
          'getActiveMedicationData',
          getActiveMedicationData?.entries?.items,
        );
        dispatch(setActiveMedication(getActiveMedicationData?.entries?.items));
        setSavingDataLoader(false);
      } else {
        setSavingDataLoader(false);
      }
      return;
    }
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
        // console.log(JSON.stringify(response.data));
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

  // working ********
  // const getMedicationRecords = (ewformateddate, allActiveMedicationRedux) => {
  //   if (!allActiveMedicationRedux || allActiveMedicationRedux.length === 0) {
  //     setMedicationnRecord([]);
  //     return;
  //   }

  //   const end = moment(); // today
  //   const start = moment().local().subtract(6, 'day'); // last 7 days

  //   setStartDate(start);
  //   setEndDate(end);

  //   // ✅ sirf last 7 din ka data lo
  //   const filteredData = allActiveMedicationRedux.filter(entry =>
  //     moment(entry.date, 'YYYY-MM-DD').isBetween(start, end, 'day', '[]'),
  //   );

  //   setStartDate(filteredData[0]?.date);
  //   // console.log('filteredData', filteredData);

  //   const dayNumbers = [];
  //   let current = start.clone();

  //   while (current.isSameOrBefore(end)) {
  //     dayNumbers.push(current.date());
  //     current.add(1, 'day');
  //   }

  //   setAllDayNumber(dayNumbers);

  //   // ✅ Group by date
  //   const grouped = {};
  //   filteredData.forEach(entry => {
  //     if (!grouped[entry.date]) {
  //       grouped[entry.date] = [];
  //     }
  //     grouped[entry.date].push(entry);
  //   });

  //   const barData = [];

  //   Object.keys(grouped).forEach(date => {
  //     const group = grouped[date];
  //     group.forEach((entry, idx) => {
  //       const formattedLabel = moment(entry.date, 'YYYY-MM-DD').format('D');
  //       const value = parseInt(entry.units) || 0;
  //       const isLast = idx === group.length - 1;

  //       barData.push({
  //         value,
  //         ...(idx === 0 && {label: formattedLabel}), // ✅ only first entry of date gets label
  //         spacing: isLast ? 30 : 0, // ✅ spacing after last entry of that date
  //         frontColor: entry.frontColor || '#E23131',

  //         labelWidth: 30,
  //       });
  //     });
  //   });

  //   setMedicationnRecord(barData);
  // };

  // console.log("medicationRecord",MedicationnRecord)

  const getMedicationRecords = (ewformateddate, allActiveMedicationRedux) => {
    if (!allActiveMedicationRedux || allActiveMedicationRedux.length === 0) {
      setMedicationnRecord([]);
      return;
    }

    const end = moment(); // today
    const start = moment().local().subtract(6, 'day'); // last 7 days

    setStartDate(start);
    setEndDate(end);

    // ✅ sirf last 7 din ka data lo
    const filteredData = allActiveMedicationRedux.filter(entry =>
      moment(entry.date, 'YYYY-MM-DD').isBetween(start, end, 'day', '[]'),
    );

    setStartDate(filteredData[0]?.date);

    // ✅ Group by date
    const grouped = {};
    filteredData.forEach(entry => {
      if (!grouped[entry.date]) {
        grouped[entry.date] = [];
      }
      grouped[entry.date].push(entry);
    });

    // ✅ Ab proper grouped structure banao
    const barData = Object.keys(grouped).map(date => {
      const group = grouped[date];
      const formattedLabel = moment(date, 'YYYY-MM-DD').format('D');

      return {
        label: formattedLabel,
        meds: group.map((entry, idx) => ({
          value: parseInt(entry.units) || 0,
          spacing: idx === group.length - 1 ? 30 : 0,
          frontColor: entry.frontColor || '#E23131',
          labelWidth: 30,
        })),
      };
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
      setthirdLineData([]);
      setfourthLineData([]);
      setFifthLineData([]);
      setLoadingItemId(null);
      return;
    }

    // const getCity = await AsyncStorage.getItem('isCity');
    // const parseCity = JSON.parse(getCity);

    console.log('first', allActiveMedicationRedux);

    setPickedCity(AllCities[0]);

    // if (getCity) {
    setDataVisualizerLoader(true);
    const allergenParams = selecallergens
      .map(
        item => `scientific_names[]=${encodeURIComponent(item.allergen_name)}`,
      )
      .join('&');

    // Get date 7 days ago (start point)
    const previousSevenDate = moment().local().subtract(6, 'days');
    // Convert your API date to moment
    const targetDate = moment(allActiveMedicationRedux[0]?.date).local();
    // Check if it's before 7 days ago
    const checkDateIsBefore = targetDate.isBefore(previousSevenDate);

    const dateis =
      allActiveMedicationRedux.length > 0 && !checkDateIsBefore
        ? moment(allActiveMedicationRedux[0]?.date).local().format('YYYY-MM-DD')
        : moment().local().subtract(6, 'day').format('YYYY-MM-DD');

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
        activeCityLocalState
          ? activeCityLocalState?.lat
          : city
          ? city?.lat
          : activeCity
          ? activeCity.lat
          : AllCities[0]?.lat
      }&lng=${
        activeCityLocalState
          ? activeCityLocalState?.lng
          : city
          ? city?.lng
          : activeCity
          ? activeCity.lng
          : AllCities[0]?.lng
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
        const chartLineData = {};
        Object.keys(apiData).forEach(key => {
          if (key !== 'dates' && key !== 'symptom_level') {
            chartLineData[key] = apiData[key].map(val => ({value: val}));
          }
        });

        console.log('selecallergens', selecallergens);
        //edited code
        const first = selecallergens[0];
        const second = selecallergens[1];
        const third = selecallergens[2];
        const fourth = selecallergens[3];
        const fifth = selecallergens[4];

        // console.log("first",first, second )

        const ambrosiaData = buildLineData(
          chartLineData[first?.allergen_name],
          MedicationnRecord,
        );
        const miscData = buildLineData(
          chartLineData[second?.allergen_name],
          MedicationnRecord,
        );
        // new
        const FRAXINUSData = buildLineData(
          chartLineData[third?.allergen_name],
          MedicationnRecord,
        );
        const HELICOMYCESData = buildLineData(
          chartLineData[fourth?.allergen_name],
          MedicationnRecord,
        );
        const MISCELLANEOUSData = buildLineData(
          chartLineData[fifth?.allergen_name],
          MedicationnRecord,
        );

        const getSymtomsData = buildSymtomsData(
          apiData.symptom_level,
          MedicationnRecord,
        );

        // setAllSymtoms(apiData.symptom_level);
        setAllSymtoms(getSymtomsData);
        // console.log( " ambrosiaData",  ambrosiaData, "miscData",miscData )

        setPrimaryLineData(ambrosiaData || []);
        setSecondaryLineData(miscData || []);
        setthirdLineData(FRAXINUSData || []);
        setfourthLineData(HELICOMYCESData || []);
        setFifthLineData(MISCELLANEOUSData || []);

        colours[0] = first?.chartColor || '#4A90E2';
        colours[1] = second?.chartColor || '#50E3C2';
        colours[2] = third?.chartColor || '#F5A623';
        colours[3] = fourth?.chartColor || '#D0021B';
        colours[4] = fifth?.chartColor || '#7ED321';

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

  const buildLineData = (pollenArray, medicationRecord) => {
    const lineData = [];
    let pollenIndex = 0;
    let currentDateMeds = 0;

    medicationRecord.forEach(bar => {
      currentDateMeds++;

      if (bar.label) {
        // ✅ New date ka point banate hain
        if (pollenArray && pollenArray[pollenIndex] !== undefined) {
          lineData.push({
            value: pollenArray[pollenIndex].value, // 👈 yaha .value add karo
            spacing: currentDateMeds == 1 ? 0 : currentDateMeds, // meds count for this date
          });
        }
        pollenIndex++;
        currentDateMeds = 0; // reset counter for next date
      }
    });

    return lineData;
  };

  const buildSymtomsData = (pollenArray, medicationRecord) => {
    const lineData = [];
    let pollenIndex = 0;
    let currentDateMeds = 0;

    medicationRecord.forEach(bar => {
      currentDateMeds++;

      if (bar.label) {
        // ✅ New date ka point banate hain
        if (pollenArray && pollenArray[pollenIndex] !== undefined) {
          lineData.push({
            value: pollenArray[pollenIndex], // 👈 yaha .value add karo
            spacing: currentDateMeds == 1 ? 0 : currentDateMeds, // meds count for this date
          });
        }
        pollenIndex++;
        currentDateMeds = 0; // reset counter for next date
      }
    });

    return lineData;
  };

  const addAllergens = item => {
    setPollenLoader(true);

    if (takingMedications.length == 5) {
      setPollenLoader(false);
      return Alert.alert(
        'Limit Reached',
        `You can only view 5 allergens at a time. Please remove one of: ${takingMedications
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
    setLoadingItemId(item.id);
    if (!item?.id) {
      console.warn('Invalid allergen item. Skipping delete.');
      return;
    }

    const updatedAllergens = takingMedications.filter(
      med => med.id !== item.id,
    );

    setTakingMedications(updatedAllergens);

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
    setactiveCityLocalState(city);
    dispatch(setActiveCity(city));
    // getSelectedAllergens(city);
  };

  const chartSpacing = responsiveWidth(20); // You can tweak this value as needed

  const emojiMap = {
    1: AppImages.Hello,
    2: AppImages.Mask,
    3: AppImages.Pain,
    4: AppImages.Star,
    5: AppImages.Bored,
  };

  const NewPro = [{value: 0}, {value: 2}, {value: 3}];

  // Chart height in px (same as <Svg height>)
  const chartHeight = 200;

  // Y scale → converts value (0–8) to pixel (bottom → top)
  const maxYValue = 8; // highest pollen/medication level
  const scaleY = value => chartHeight - (value / maxYValue) * chartHeight;

  const lineData = PrimaryLineData?.map((d, i) => ({
    x: i == 0 ? 0.1 * responsiveWidth(30) : i * responsiveWidth(30),
    y: scaleY(d.value),
  }));

  // Convert to string for Polyline
  const points = lineData?.map(p => `${p.x},${p.y}`).join(' ');

  const secondLineData = SecondaryLineData?.map((d, i) => ({
    x: i == 0 ? 0.1 * responsiveWidth(30) : i * responsiveWidth(30),
    y: scaleY(d.value),
  }));
  const secondpoints = secondLineData?.map(p => `${p.x},${p.y}`).join(' ');

  //third
  const newthirdLineData = thirdLineData?.map((d, i) => ({
    x: i == 0 ? 0.1 * responsiveWidth(30) : i * responsiveWidth(30),
    y: scaleY(d.value),
  }));
  const thirdpoints = newthirdLineData?.map(p => `${p.x},${p.y}`).join(' ');

  //fourth
  const newfourthLineData = fourthLineData?.map((d, i) => ({
    x: i == 0 ? 0.1 * responsiveWidth(30) : i * responsiveWidth(30),
    y: scaleY(d.value),
  }));
  const fourthpoints = newfourthLineData?.map(p => `${p.x},${p.y}`).join(' ');

  //fifth
  const newfifithLineData = FifthLineData?.map((d, i) => ({
    x: i == 0 ? 0.1 * responsiveWidth(30) : i * responsiveWidth(30),
    y: scaleY(d.value),
  }));
  const fifthpoints = newfifithLineData?.map(p => `${p.x},${p.y}`).join(' ');

  const symtomsData = allSymtoms?.map((d, i) => ({
    value: d?.value,
    spacing: d?.spacing + 80,
  }));

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
        />

        {savingDataLoader && (
          <ActivityIndicator size={'small'} color={AppColors.BLACK} />
        )}

        {expireDate ? (
          <>
            {startDate && endDate && (
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText
                  title={`${moment(startDate).format('MMM DD')} - ${moment(
                    endDate,
                  ).format('MMM DD')}`}
                  textSize={2}
                  textColor={AppColors.BLACK}
                  textAlignment={'center'}
                />

                <TouchableOpacity
                  style={{padding: 20}}
                  onPress={() => getSelectedAllergens(activeCity)}>
                  <Ionicons
                    name="reload"
                    size={responsiveFontSize(3)}
                    color={AppColors.BLACK}
                  />
                </TouchableOpacity>
              </View>
            )}

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
                      contentContainerStyle={{}}
                      style={{marginLeft: 10}}
                      horizontal={true}>
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          marginLeft: responsiveWidth(3),
                          flexDirection: 'row',
                          zIndex: 100,
                        }}>
                        {symtomsData.map((item, index) => {
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
                                width: responsiveWidth(29),
                                alignItems: 'flex-start',
                                // borderWidth:1,
                                // backgroundColor:'red'
                              }}>
                              <Image
                                source={emojiMap[item.value]}
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

                      {/* <BarChart
                        data={MedicationnRecord || []}
                        barWidth={7}
                        barStyle={{
                          backgroundColor: 'gray',
                        }}
                        frontColor="#E23131" // bar color
                        // showLine={
                        //   // true
                        //   PrimaryLineData.length > 0 ||
                        //   SecondaryLineData.length > 0
                        // }
                        // // xAxisLabelTexts={[]}
                        // lineData={primaryLanecustom || []}
                        // lineData2={SecondaryLineData || []}
                        showLine={false}
                        // lineConfig={{
                        //   color: colours[0],
                        //   thickness: 2,
                        //   curved: false,
                        //   dataPointsColor: colours[0],
                        //   // spacing: chartSpacing,
                        //   // textColor: 'red',
                        //   initialSpacing: responsiveWidth(5),
                        // }}
                        // lineConfig2={{
                        //   color: colours[1],
                        //   thickness: 2,
                        //   curved: false,
                        //   dataPointsColor: colours[1],
                        //   // spacing: chartSpacing,
                        //   initialSpacing: responsiveWidth(5),
                        // }}
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
                        // spacing={responsiveWidth(9)}
                        initialSpacing={responsiveWidth(0)} // same for all
                        formatYLabel={label => parseFloat(label).toFixed(0)}
                        stepValue={1}
                      /> */}

                      {/* <View
                        style={{
                          marginTop: 20,
                          
                          // backgroundColor: 'green',
                        }}>
                        <Svg
                          height={responsiveHeight(28)}
                          width={responsiveWidth(200)} // adjust depending on scroll
                        >
                          {MedicationnRecord.map((item, index) => {
                            console.log("item.spacing",item.spacing)
                            const barWidth = 7;
                            const spacing = item.spacing;
                            const chartHeight = responsiveHeight(25); // total chart height
                            const maxValue = 8; // since you show 0,2,4,6,8
                            const scaleY = chartHeight / maxValue;

                            const barHeight = item?.value * scaleY;
                            // const x = index * (barWidth + spacing);

                            const x = index * (barWidth );
                            const y = chartHeight - barHeight;

                            return (
                              <Rect
                                key={index}
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                fill={item.frontColor}
                                rx={2}
                              />
                            );
                          })}
                        </Svg>
                      </View> */}

                      {/* <Svg
                        height={responsiveHeight(28)}
                        width={responsiveWidth(200)}>
                        {MedicationnRecord.map((item, index) => {
                          console.log("item.label",item.label)
                          const barWidth = 7;
                          const chartHeight = responsiveHeight(25);
                          const maxValue = 8;
                          const scaleY = chartHeight / maxValue;

                          const barHeight = item.value * scaleY;

                          // --- calculate X with group gap ---
                          const spacing = 10; // normal spacing between bars
                          const groupGap = 40; // gap after each date group

                          // Find how many groups have already passed
                          const groupsBefore = Math.floor(index / 8); // since max 8 bars per date
                          const x =  index * item.spacing
                          const y = chartHeight - barHeight;

                          return (
                            <Rect
                              key={index}
                              x={x}
                              y={y}
                              width={barWidth}
                              height={barHeight}
                              fill={item.frontColor}
                              rx={2}
                            />
                          );
                        })}
                      </Svg> */}

                      <View>
                        {/* <FlatList
                          data={MedicationnRecord}
                          horizontal
                          contentContainerStyle={{
                            width: responsiveWidth(200),
                            spacing: 20,
                            height: 220,
                            alignItems: 'flex-end',
                            marginBottom: 20,
                            marginLeft: responsiveWidth(3.5),
                          }}
                          renderItem={({item, index}) => {
                            // console.log("itemm", item)
                            return (
                              <View
                                style={{
                                  height: responsiveHeight(item?.value * 3.4),
                                  width: 8,
                                  marginRight: item.spacing,
                                  backgroundColor: item?.frontColor,
                                }}
                              />
                            );
                          }}
                        /> */}
                        <FlatList
                          data={MedicationnRecord} // [{label: '11', meds: [...]}, {label: '12', meds: [...]}]
                          horizontal
                          keyExtractor={item => item.label}
                          contentContainerStyle={{
                            width: responsiveWidth(200),
                            spacing: 20,
                            height: 220,
                            alignItems: 'flex-end',
                            marginBottom: 20,
                            marginLeft: responsiveWidth(3.5),
                          }}
                          renderItem={({item}) => (
                            <View
                              style={{
                                width: responsiveWidth(29), // fixed slot per day
                                alignItems: 'center',
                              }}>
                              {/* Bars */}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'flex-end',
                                }}>
                                {item?.meds?.map((m, idx) => (
                                  <View
                                    key={idx}
                                    style={{
                                      height:
                                        m.value > 0
                                          ? responsiveHeight(m.value * 3.4)
                                          : 0,
                                      width: 8,
                                      marginRight: m.spacing,
                                      backgroundColor:
                                        m.value > 0
                                          ? m.frontColor
                                          : 'transparent',
                                    }}
                                  />
                                ))}
                              </View>
                            </View>
                          )}
                        />
                      </View>

                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 11,
                          marginLeft: responsiveWidth(4),
                        }}>
                        <Svg
                          width={responsiveWidth(200)}
                          height={responsiveHeight(28)}>
                          <Polyline
                            points={points}
                            stroke={colours[0]}
                            strokeWidth="2"
                            fill="none"
                          />
                          {lineData.map((p, i) => (
                            <Circle
                              key={i}
                              cx={p.x}
                              cy={p.y}
                              r="4"
                              fill={colours[0]}
                            />
                          ))}
                        </Svg>
                      </View>

                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 100,
                          marginLeft: responsiveWidth(3),
                          bottom: -0,
                        }}>
                        <FlatList
                          data={MedicationnRecord?.filter(res => res.label)}
                          contentContainerStyle={{
                            marginLeft: responsiveWidth(3),
                          }}
                          horizontal
                          renderItem={({item, index}) => {
                            return (
                              <View style={{width: responsiveWidth(30)}}>
                                <AppText title={item.label} textSize={2} />
                              </View>
                            );
                          }}
                        />
                      </View>

                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 11,
                          marginLeft: responsiveWidth(4),
                        }}>
                        <Svg
                          width={responsiveWidth(200)}
                          height={responsiveHeight(28)}>
                          <Polyline
                            points={secondpoints}
                            stroke={colours[1]}
                            strokeWidth="2"
                            fill="none"
                          />
                          {secondLineData.map((p, i) => (
                            <Circle
                              key={i}
                              cx={p.x}
                              cy={p.y}
                              r="4"
                              fill={colours[1]}
                            />
                          ))}
                        </Svg>
                      </View>

                      {
                        //third graph lines
                      }
                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 11,
                          marginLeft: responsiveWidth(4),
                        }}>
                        <Svg
                          width={responsiveWidth(200)}
                          height={responsiveHeight(28)}>
                          <Polyline
                            points={thirdpoints}
                            stroke={colours[2]}
                            strokeWidth="2"
                            fill="none"
                          />
                          {thirdLineData.map((p, i) => (
                            <Circle
                              key={i}
                              cx={p.x}
                              cy={p.y}
                              r="4"
                              fill={colours[2]}
                            />
                          ))}
                        </Svg>
                      </View>

                       {
                        //fourth graph lines
                      }
                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 11,
                          marginLeft: responsiveWidth(4),
                        }}>
                        <Svg
                          width={responsiveWidth(200)}
                          height={responsiveHeight(28)}>
                          <Polyline
                            points={fourthpoints}
                            stroke={colours[3]}
                            strokeWidth="2"
                            fill="none"
                          />
                          {fourthLineData.map((p, i) => (
                            <Circle
                              key={i}
                              cx={p.x}
                              cy={p.y}
                              r="4"
                              fill={colours[3]}
                            />
                          ))}
                        </Svg>
                      </View>


                        {
                        //fifth graph lines
                      }
                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 11,
                          marginLeft: responsiveWidth(4),
                        }}>
                        <Svg
                          width={responsiveWidth(200)}
                          height={responsiveHeight(28)}>
                          <Polyline
                            points={fifthpoints}
                            stroke={colours[4]}
                            strokeWidth="2"
                            fill="none"
                          />
                          {FifthLineData.map((p, i) => (
                            <Circle
                              key={i}
                              cx={p.x}
                              cy={p.y}
                              r="4"
                              fill={colours[4]}
                            />
                          ))}
                        </Svg>
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
                        top: '30%',
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
              <View>
                <AppText title={'Allergens'} textSize={2} textFontWeight />
                <FlatList
                  data={takingMedications}
                  keyExtractor={item => item?.id?.toString()}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        minHeight: responsiveHeight(6),
                        width: responsiveWidth(90),
                        paddingVertical: 10,
                        borderRadius: 10,
                        borderColor: AppColors.LIGHTGRAY,
                        backgroundColor: colours[index],
                        flexDirection: 'row',
                        marginTop: 5,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: 0,
                        paddingLeft: 5,
                        borderWidth: 1,
                      }}>
                      <AppText
                        title={item.allergen_name}
                        textSize={1.5}
                        textwidth={65}
                      />

                      {loadingItemId == item?.id ? (
                        <View style={{paddingRight: 20}}>
                          <ActivityIndicator
                            size={'large'}
                            color={AppColors.WHITE}
                          />
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => deleteAllergens(item)}
                          style={{
                            padding: 10,
                            width: responsiveWidth(25),
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingRight: 30,
                            minHeight: responsiveHeight(6),
                          }}>
                          <AntDesign
                            name="minus"
                            size={responsiveFontSize(3)}
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
                        activeCityLocalState
                          ? activeCityLocalState?.city_name
                          : activeCity?.city_name
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
                        onPress={() =>
                          pollenLoader == true
                            ? console.log('adding')
                            : addAllergens(item)
                        }
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
          <View style={{justifyContent: 'center', marginTop: 20}}>
            <SubscribeBar
              title="Subscribe now to correlate pollen and spore levels with medication and symptoms"
              title2={
                'With a premium subscription, overly daily symptoms and medication intake with local pollen and spore data, which can help you uncover hidden connections between environmental triggers and your health. By analyzing these correlations, you can see what might be causing your allergies or triggers. Understanding these patterns is key to managing your symptoms more effectively and improving your quality of life.'
              }
              handlePress={() => navigation.navigate('Subscription')}
              img={AppImages.Datavisiualizer}
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
