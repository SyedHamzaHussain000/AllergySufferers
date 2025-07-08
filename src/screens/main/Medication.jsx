import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
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

const Medication = ({navigation}) => {
  const sliderRef = useRef(null);
  const userData = useSelector(state => state.auth.user);

  const expireDate = useSelector(state => state.auth.expireDate);

  const [allMedication, setAllMedication] = useState([]);
  const [MedicationnRecord, setMedicationnRecord] = useState([]);
  const [medicationLoadingMap, setMedicationLoadingMap] = useState({});
  const [loader, setLoader] = useState(false);
  const [Medicationloader, setMedicationLoader] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selecteddate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [open, setOpen] = useState(false);

  const [sliderScrollEnabled, setSliderScrollEnabled] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const setMedicationLoading = (id, isLoading) => {
    setMedicationLoadingMap(prev => ({...prev, [id]: isLoading}));
  };

  const getActiveMedication = async () => {
    setLoader(true);
    try {

      let data = JSON.stringify({
  "date": "2025-06-06"
});

      const response = await axios.get(
        `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_medications_active`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
          },
          data : data
        },
          

      );
      setAllMedication(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const generateMedicationSlides = async selectedDate => {
    setMedicationLoader(true);
    const slides = [];
    const baseDate = moment(
      selectedDate ? selectedDate : new Date(),
      'YYYY-MM-DD',
    );

    try {
      for (let i = 0; i < 3; i++) {
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
          const formattedLabel = moment(entry.date, 'MMMM, DD YYYY').format(
            'D',
          );
          const value = parseInt(entry.units) || 0;

          if (!seenDates.has(entry.date)) {
            seenDates.add(entry.date);
            barData.push({
              value,
              label: formattedLabel,
              spacing: 0,
              frontColor: entry.frontColor || '#E23131',
              labelWidth: 30,
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

  const addMedication = async item => {
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
        start_date: start.format('YYYY-MM-DD'),
        end_date: end.format('YYYY-MM-DD'),
        units: 1,
      });

      await axios.post(
        `${BASE_URL}/allergy_data/v1/user/${userData.id}/add_medication_units`,
        data,
        {headers: {'Content-Type': 'application/json'}},
      );

      setMedicationLoader(false);
      setMedicationLoading(item.id, false);

      await getActiveMedication();
      await generateMedicationSlides();
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
      keyExtractor={(item) => item.id.toString()}
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
}, [allMedication, medicationLoadingMap]); // Re-render only if data or loading state changes


const memoizedSlider = useMemo(() => {
  if (MedicationnRecord.length === 0) return null;

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
                width: 40,
              }}
              width={responsiveWidth(100)}
              barBorderRadius={2}
              isAnimated={true}
              maxValue={8}
              stepValue={1}
              hideDataPoints={false}
              spacing={5}
              formatYLabel={(label) => parseFloat(label).toFixed(0)}
            />
          </View>
        )}
        dotStyle={{backgroundColor: '#ccc', marginTop: 50}}
        activeDotStyle={{backgroundColor: AppColors.BLACK, marginTop: 50}}
      />
    </View>
  );
}, [MedicationnRecord]);


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
            {
              memoizedMedicationList
            }
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
                <>
                {
                  memoizedSlider
                }
                </>
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
