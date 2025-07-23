import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import {BarChart} from 'react-native-gifted-charts';
import AppButton from '../../components/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BASE_URL from '../../utils/BASE_URL';
import {useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import AppIntroSlider from 'react-native-app-intro-slider';
import SubscribeBar from '../../components/SubscribeBar';
import { ApiCallWithUserId } from '../../global/ApiCall';

const Medication = ({navigation}) => {
  const sliderRef = useRef(null);
  const userData = useSelector(state => state.auth.user);

  const expireDate = useSelector(state => state.auth.expireDate);

  const [allMedication, setAllMedication] = useState([]);
  const [MedicationnRecord, setMedicationnRecord] = useState([]);
  const [medicationLoadingMap, setMedicationLoadingMap] = useState({});
  const [loader, setLoader] = useState(false);
  const [Medicationloader, setMedicationLoader] = useState(false);
  const [activeDate,setActiveDate] = useState(null)

  const [date, setDate] = useState(new Date());
  const [selecteddate, setSelectedDate] = useState(
    moment().local().format('YYYY-MM-DD'),
  );
  const [open, setOpen] = useState(false);

  const [sliderScrollEnabled, setSliderScrollEnabled] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const setMedicationLoading = (id, isLoading) => {
    setMedicationLoadingMap(prev => ({...prev, [id]: isLoading}));
  };

  // console.log(userData.id)


  useEffect(()=>{
      getActiveMedication()
  },[selecteddate])

  const getActiveMedication = async (formattedDate) => {


    setLoader(true);
    try {
    
      let data = JSON.stringify({
        date:  moment(formattedDate ? formattedDate : selecteddate).format('YYYY-MM-DD'),
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medications_active`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const response = await  axios.request(config)
      console.log('===========>>>>>>>>>>>>', response.data, selecteddate,formattedDate);
      if (response?.data?.data == false) {
        setAllMedication([]);
      } else {
        setAllMedication(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  // const generateMedicationSlides = async selectedDate => {
  //   setMedicationLoader(true);

  //       const MedicationData = await ApiCallWithUserId("post", "get_active_date", userData?.id);

  //       console.log("medicationData", MedicationData.active_date)

  //   const slides = [];
  //   const baseDate = moment(
  //     selectedDate ? selectedDate : new Date(),
  //     'YYYY-MM-DD',
  //   );

  //   try {
  //     for (let i = 0; i < 3; i++) {
  //       const end = moment(baseDate).subtract(i * 7, 'days');
  //       const start = moment(baseDate).subtract(i * 7 + 6, 'days');

  //       const payload = JSON.stringify({
  //         start_date: start.format('YYYY-MM-DD'),
  //         end_date: end.format('YYYY-MM-DD'),
  //       });

  //       const response = await axios.post(
  //         `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medication_records`,
  //         payload,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Cache-Control': 'no-cache',
  //             Pragma: 'no-cache',
  //             Expires: '0',
  //           },
  //         },
  //       );

  //       const entries = response?.data?.entries?.items || [];
  //       const seenDates = new Set();
  //       const barData = [];

  //       entries.forEach(entry => {
  //         const formattedLabel = moment(entry.date, 'MMMM, DD YYYY').format(
  //           'D',
  //         );
  //         const value = parseInt(entry.units) || 0;

  //         if (!seenDates.has(entry.date)) {
  //           seenDates.add(entry.date);
  //           barData.push({
  //             value,
  //             label: formattedLabel,
  //             spacing: 0,
  //             frontColor: entry.frontColor || '#E23131',
  //             labelWidth: 0,
  //           });
  //         } else {
  //           barData.push({
  //             value,
  //             spacing: 0,
  //             frontColor: entry.frontColor || '#E23131',
  //           });
  //         }
  //       });

  //       for (let i = 0; i < barData.length - 1; i++) {
  //         const current = barData[i];
  //         const next = barData[i + 1];
  //         if (!current.label && next.label && 'spacing' in current) {
  //           delete current.spacing;
  //         }
  //       }

  //       const lastItem = barData[barData.length - 1];
  //       if (lastItem && !lastItem.label && 'spacing' in lastItem) {
  //         delete lastItem.spacing;
  //       }

  //       for (let i = 0; i < barData.length; i++) {
  //         const current = barData[i];
  //         const next = barData[i + 1];
  //         if (current.label && (!next || next.label)) {
  //           barData.splice(i + 1, 0, {
  //             value: 0,
  //             frontColor: 'transparent',
  //           });
  //         }
  //       }

  //       slides.unshift({
  //         key: `${i}`,
  //         title: `${start.format('DD MMM')} - ${end.format('DD MMM')}`,
  //         barData,
  //       });
  //     }

  //     setMedicationnRecord(slides);
  //     setMedicationLoader(false);
  //   } catch (error) {
  //     setMedicationLoader(false);
  //     console.log('generateMedicationSlides error:', error);
  //   }
  // };


const generateMedicationSlides = async selectedDate => {
  setMedicationLoader(true);

  try {
    // Step 1: Fetch active date
    const MedicationData = await ApiCallWithUserId("post", "get_active_date", userData?.id);
    const activeDateStr = MedicationData?.active_date ? MedicationData?.active_date : moment(new Date()).format("YYYY-MM-DD");
    console.log("Active Date:", activeDateStr);
    // let newDate = new Date(activeDateStr)
    // console.log('objkrct date',new Date())
    
    
    if (!activeDateStr) {
      setMedicationLoader(false);
      console.warn("No active_date returned from API.");
      return;
    }
    setActiveDate(new Date(activeDateStr))

    const activeDate = moment(activeDateStr, 'YYYY-MM-DD');
    // setActiveDate(activeDate)
    const baseDate = moment(
      selectedDate ? selectedDate : new Date(),
      'YYYY-MM-DD',
    );
    
    // Step 2: Calculate number of weeks between baseDate and activeDate
    const diffInDays = baseDate.diff(activeDate, 'days');
    const numberOfWeeks = Math.ceil((diffInDays + 1) / 7); // +1 to include current day

    const slides = [];

    for (let i = 0; i < numberOfWeeks; i++) {
      const end = moment(baseDate).subtract(i * 7, 'days');
      const start = moment(baseDate).subtract(i * 7 + 6, 'days');

      const payload = JSON.stringify({
        start_date: start.format('YYYY-MM-DD'),
        end_date: end.format('YYYY-MM-DD'),
      });

      const response = await axios.post(
        `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medication_records`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
          },
        },
      );

      const entries = response?.data?.entries?.items || [];
      const seenDates = new Set();
      const barData = [];

      entries.forEach(entry => {
        const formattedLabel = moment(entry.date, 'MMMM, DD YYYY').format('D');
        const value = parseInt(entry.units) || 0;

        if (!seenDates.has(entry.date)) {
          seenDates.add(entry.date);
          barData.push({
            value,
            label: formattedLabel,
            spacing: 0,
            frontColor: entry.frontColor || '#E23131',
            labelWidth: 0,
          });
        } else {
          barData.push({
            value,
            spacing: 0,
            frontColor: entry.frontColor || '#E23131',
          });
        }
      });

      for (let i = 0; i < barData.length - 1; i++) {
        const current = barData[i];
        const next = barData[i + 1];
        if (!current.label && next.label && 'spacing' in current) {
          delete current.spacing;
        }
      }

      const lastItem = barData[barData.length - 1];
      if (lastItem && !lastItem.label && 'spacing' in lastItem) {
        delete lastItem.spacing;
      }

      for (let i = 0; i < barData.length; i++) {
        const current = barData[i];
        const next = barData[i + 1];
        if (current.label && (!next || next.label)) {
          barData.splice(i + 1, 0, {
            value: 0,
            frontColor: 'transparent',
          });
        }
      }

      slides.unshift({
        key: `${i}`,
        title: `${start.format('DD MMM')} - ${end.format('DD MMM')}`,
        barData,
      });
    }

    setMedicationnRecord(slides);
    setMedicationLoader(false);
  } catch (error) {
    setMedicationLoader(false);
    console.log('generateMedicationSlides error:', error);
  }
};




// const generateMedicationSlides = async selectedDate => {
//   setMedicationLoader(true);

//   try {
//     const MedicationData = await ApiCallWithUserId("post", "get_active_date", userData?.id);
//     const end = moment(selectedDate || new Date(), 'YYYY-MM-DD');
//     const start = moment(MedicationData.active_date);

//     const payload = JSON.stringify({
//       start_date: start.format('YYYY-MM-DD'),
//       end_date: end.format('YYYY-MM-DD'),
//     });

//     const response = await axios.post(
//       `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medication_records`,
//       payload,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Cache-Control': 'no-cache',
//           Pragma: 'no-cache',
//           Expires: '0',
//         },
//       }
//     );

//     const entries = response?.data?.entries?.items || [];

//     // Sort entries by date ascending
//     const sortedEntries = [...entries].sort((a, b) =>
//       moment(a.raw_date).diff(moment(b.raw_date))
//     );

//     const slides = [];
//     for (let i = 0; i < sortedEntries.length; i += 7) {
//       const chunk = sortedEntries.slice(i, i + 7);

//       const barData = chunk.map(entry => ({
//         value: parseInt(entry.units) || 0,
//         label: moment(entry.raw_date).format('D'),
//         spacing: 0,
//         frontColor: entry.frontColor || '#E23131',
//         labelWidth: 0,
//       }));

//       // Optionally insert transparent bars between labeled bars
//       for (let j = 0; j < barData.length; j++) {
//         const current = barData[j];
//         const next = barData[j + 1];
//         if (current.label && (!next || next.label)) {
//           barData.splice(j + 1, 0, {
//             value: 0,
//             frontColor: 'transparent',
//           });
//         }
//       }

//       slides.push({
//         key: `${i}`,
//         title: `${moment(chunk[0].raw_date).format('DD MMM')} - ${moment(chunk[chunk.length - 1].raw_date).format('DD MMM')}`,
//         barData,
//       });
//     }

    
//     setMedicationnRecord(slides);
//   } catch (error) {
//     console.log('generateMedicationSlides error:', error);
//   } finally {
//     setMedicationLoader(false);
//   }
// };


//   const generateMedicationSlides = async selectedDate => {
//   setMedicationLoader(true);

//   try {
//     const MedicationData = await ApiCallWithUserId("post", "get_active_date", userData?.id);
//     const end = moment(selectedDate || new Date(), 'YYYY-MM-DD');
//     const start = moment(MedicationData.active_date);

//     const payload = JSON.stringify({
//       start_date: start.format('YYYY-MM-DD'),
//       end_date: end.format('YYYY-MM-DD'),
//     });

//     const response = await axios.post(
//       `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medication_records`,
//       payload,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Cache-Control': 'no-cache',
//           Pragma: 'no-cache',
//           Expires: '0',
//         },
//       }
//     );

//     const entries = response?.data?.entries?.items || [];

//     // Group entries by date
//     const groupedByDate = {};
//     entries.forEach(entry => {
//       const dateKey = moment(entry.raw_date).format('YYYY-MM-DD');
//       if (!groupedByDate[dateKey]) {
//         groupedByDate[dateKey] = [];
//       }
//       groupedByDate[dateKey].push(entry);
//     });


    

//     // Create one bar per entry, but only label once per date
//     const mergedEntries = Object.entries(groupedByDate).map(([date, records]) => {
//       return records.map((entry, index) => ({
//         value: parseInt(entry.units) || 0,
//         label: index === 0 ? moment(date).format('D') : undefined, // label only once per date
//         spacing: 0,
//         frontColor: entry.frontColor || '#E23131',
//         raw_date: date,
//       }));
//     }).flat();


    

//     // Sort by raw_date ascending
//     const sortedEntries = mergedEntries.sort((a, b) =>
//       moment(a.raw_date).diff(moment(b.raw_date))
//     );

//     // Chunk into 7-day groups (not by actual date range but 7 bars at a time)
//     const slides = [];
//     for (let i = 0; i < sortedEntries.length; i += 7) {
//       const chunk = sortedEntries.slice(i, i + 7);

//       // Insert transparent bars for spacing between labeled bars
//       for (let j = 0; j < chunk.length; j++) {
//         const current = chunk[j];
//         const next = chunk[j + 1];
//         if (current.label && (!next || next.label)) {
//           chunk.splice(j + 1, 0, {
//             value: 0,
//             frontColor: 'transparent',
//           });
//         }
//       }

//       const titleStart = chunk.find(item => item.raw_date)?.raw_date;
//       const titleEnd = chunk.slice().reverse().find(item => item.raw_date)?.raw_date;

//       slides.push({
//         key: `${i}`,
//         title: `${moment(titleStart).format('DD MMM')} - ${moment(titleEnd).format('DD MMM')}`,
//         barData: chunk,
//       });
//     }

//     setMedicationnRecord(slides);
//   } catch (error) {
//     console.log('generateMedicationSlides error:', error);
//   } finally {
//     setMedicationLoader(false);
//   }
// };



  const addMedication = async item => {
    setMedicationLoading(item.id, true);

    // console.log("item",item)

    const baseDate = moment(
      selecteddate ? selecteddate : new Date(),
      'YYYY-MM-DD',
    );

    try {
      const end = moment(baseDate).subtract(7, 'days');
      const start = moment(baseDate);

      const data = JSON.stringify({
        medication_id: item.id,
        "active_id": item.active_id,
        start_date: start.format('YYYY-MM-DD'),
        end_date: end.format('YYYY-MM-DD'),
        units: 1,
      });

      await axios.post(
        `${BASE_URL}/allergy_data/v1/user/${userData.id}/add_medication_units`,
        data,
        {headers: {'Content-Type': 'application/json'}},
      );

      await getActiveMedication();
      await generateMedicationSlides();
      
      setMedicationLoader(false);
      setMedicationLoading(item.id, false);
    } catch (error) {
      console.log(error);
    }
    setMedicationLoading(item.id, false);
  };

  const removeMedication = async item => {
    setMedicationLoading(item.id, true);
    const baseDate = moment(
      selecteddate ? selecteddate : new Date(),
      'YYYY-MM-DD',
    );

    try {
      const end = moment(baseDate).subtract(7, 'days');
      const start = moment(baseDate);

      const data = JSON.stringify({
        medication_id: item.id,
        "active_id": item.active_id,
        start_date: start.format('YYYY-MM-DD'),
        end_date: end.format('YYYY-MM-DD'),
        units: 1,
      });

      await axios.post(
        `${BASE_URL}/allergy_data/v1/user/${userData.id}/remove_medication_units`,
        data,
        {headers: {'Content-Type': 'application/json'}},
      );

      await generateMedicationSlides();
      await getActiveMedication();
    } catch (error) {
      console.log(error);
    }
    setMedicationLoading(item.id, false);
  };

  // useEffect(() => {
  //   const nav = navigation.addListener('focus', () => {
  //     getActiveMedication();
  //     generateMedicationSlides();
  //   });

  //   return nav;
  // }, [navigation]);
  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      Promise.all([getActiveMedication(), generateMedicationSlides()]);
    });

    return nav;
  }, [navigation]);

  useEffect(() => {
    if (sliderRef.current && MedicationnRecord.length > 0) {
      // Jump to the last slide
      sliderRef.current.goToSlide(MedicationnRecord.length - 1, false); // false = don't trigger onSlideChange
    }
  }, [MedicationnRecord]);

  useEffect(() => {
    if (sliderScrollEnabled) {
      const timeout = setTimeout(() => {
        setSliderScrollEnabled(true);
      }, 300); // smooth delay
      return () => clearTimeout(timeout);
    }
  }, [sliderScrollEnabled]);

  const memoizedMedicationList = useMemo(() => {
    if (allMedication.length === 0) return null;

    return (
      <FlatList
        data={allMedication}
        contentContainerStyle={{
          gap: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
        keyExtractor={item => item.id.toString()}
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
                <ActivityIndicator size={'small'} color={AppColors.BLACK} />
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <TouchableOpacity onPress={() => removeMedication(item)}>
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

                  <TouchableOpacity onPress={() => addMedication(item)}>
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
    );
  }, [allMedication, medicationLoadingMap]); 

  const memoizedSlider = useMemo(() => {
    if (MedicationnRecord.length === 0) return null;

const screenWidth = Dimensions.get('window').width;
    return (
      <View style={{height: responsiveHeight(35)}}>

        <AppIntroSlider
          ref={sliderRef}
          data={MedicationnRecord}
          showNextButton={false}
          showPrevButton={false}
          showDoneButton={false}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
              {
                console.log("first", item)
              }
              <Text style={{fontSize: 16}}>{item.title}</Text>
              <BarChart
                data={item.barData}
                barWidth={7}
                frontColor="#E23131"
                showLine={false}
                initialSpacing={0}
                xAxisLabelTextStyle={{
                  fontSize: 10,
                  color: '#000',
                  fontWeight: '400',
                  width: 20,
                }}
                width={screenWidth * 0.9}
                barBorderRadius={2}
                isAnimated={true}
                maxValue={8}
                stepValue={1}
                hideDataPoints={false}
                spacing={7}
                formatYLabel={label => parseFloat(label).toFixed(0)}
              />
            </View>
          )}
          dotStyle={{backgroundColor: '#ccc', marginTop: 50}}
          activeDotStyle={{backgroundColor: AppColors.BLACK, marginTop: 50}}
        />
      </View>
    );
  }, [MedicationnRecord]);

  console.log('activeDate',activeDate)





  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <View style={{padding: 20, backgroundColor: AppColors.WHITE, flex: 1}}>
        <AppHeader
          heading="Medication"
          Rightheading="Today"
          subheading="Tracker"
          selecteddate={selecteddate}
          setOpen={() => setOpen(true)}
        />

        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          minimumDate={!activeDate ? new Date() : activeDate}
          maximumDate={new Date()}
          onConfirm={selectedDate => {
            setDate(selectedDate);
            setOpen(false);
            const picked = moment(selectedDate).startOf('day');
            const formattedDate = picked.format('YYYY-MM-DD');
            setSelectedDate(formattedDate);
            generateMedicationSlides(formattedDate);
          
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {expireDate ? (
            <>
              {memoizedMedicationList}
              {/* {allMedication.length > 0 ? (
                <FlatList
                  data={allMedication}
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
              ) : (
                <View
                  style={{
                    height: responsiveHeight(20),
                    justifyContent: 'center',
                  }}>
                  <AppButton
                    title={'Add Medication'}
                    handlePress={() =>
                      navigation.navigate('More', {
                        screen: 'AddMedications',
                      })
                    }
                  />
                </View>
              )} */}

              {loader && (
                <ActivityIndicator size={'large'} color={AppColors.BLACK} />
              )}
              <>
                {Medicationloader && (
                  <ActivityIndicator size={'large'} color={AppColors.BLACK} />
                )}
              </>
              {MedicationnRecord.length > 0 && (
                <>{memoizedSlider}</>
                // <View style={{height: responsiveHeight(35)}}>
                //   <AppIntroSlider
                //     ref={sliderRef}
                //     data={MedicationnRecord}
                //     showNextButton={false}
                //     showPrevButton={false}
                //     showDoneButton={false}
                //     nestedScrollEnabled={true}
                //     scrollEnabled={true}
                //     renderItem={({item, index}) => (
                //       <View style={{alignItems: 'center'}}>
                //         <Text style={{fontSize: 16}}>{item.title}</Text>

                //         <BarChart
                //           data={item.barData}
                //           barWidth={7}
                //           frontColor="#E23131"
                //           showLine={false}
                //           initialSpacing={0}
                //           xAxisLabelTextStyle={{
                //             fontSize: 10,
                //             color: '#000',
                //             fontWeight: '400',
                //             width: 40,
                //           }}
                //           width={responsiveWidth(100)}
                //           barBorderRadius={2}
                //           isAnimated={true}
                //           maxValue={8}
                //           stepValue={1}
                //           hideDataPoints={false}
                //           spacing={5}
                //           formatYLabel={label => parseFloat(label).toFixed(0)}
                //         />
                //       </View>
                //     )}
                //     dotStyle={{backgroundColor: '#ccc', marginTop: 50}}
                //     activeDotStyle={{
                //       backgroundColor: AppColors.BLACK,
                //       marginTop: 50,
                //     }}
                //   />
                // </View>
              )}
            </>
          ) : (
            <View
              style={{height: responsiveHeight(30), justifyContent: 'center'}}>
              <SubscribeBar
                title="Subscribe Now to Track Your Medications"
                title2={'Unlock Full Access to Medication Tracking'}
                handlePress={() => navigation.navigate('Subscription')}
              />
            </View>
          )}

          <View style={{marginTop: 20}}>
            <AppButton
              title={'GO TO DATA VISUALIZER'}
              RightColour={AppColors.rightArrowCOlor}
              handlePress={() => navigation.navigate('DataVisualizer')}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Medication;
