import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Alert,
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
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import AppIntroSlider from 'react-native-app-intro-slider';
import SubscribeBar from '../../components/SubscribeBar';
import {ApiCallWithUserId} from '../../global/ApiCall';
import {
  addUnitToActiveMedicaton,
  removeUnitToActiveMedicaton,
  setActiveMedication,
} from '../../redux/Slices/AuthSlice';

const MedicationSample = ({navigation}) => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);

  const expireDate = useSelector(state => state.auth.expireDate);
  const allActiveMedicationRedux = useSelector(
    state => state.auth.ActiveMedications,
  );
  const allMyCurrentMeds = useSelector(state => state.auth.MyCurrentMeds);

  const filtering = allActiveMedicationRedux.filter(
    med => med.date == '2025-07-24',
  );

  const [allMedication, setAllMedication] = useState([]);
  const [MedicationnRecord, setMedicationnRecord] = useState([]);
  const [medicationLoadingMap, setMedicationLoadingMap] = useState({});
  const [loader, setLoader] = useState(false);
  const [Medicationloader, setMedicationLoader] = useState(false);
  const [activeDate, setActiveDate] = useState(null);

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

  useEffect(() => {
    // getActiveMedication();
    // setAllMedicationToRedux();
    generateMedicationSlides(selecteddate);
  }, [selecteddate, allActiveMedicationRedux]);

  //old static
  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      setAllMedicationToRedux();
      // generateMedicationSlides();
    });
    return nav;
  }, []);

  const setAllMedicationToRedux = async () => {

    const currentDate = moment().format('YYYY-MM-DD');

    if (allActiveMedicationRedux.length > 0) {
      const allergenLastDate =
        allActiveMedicationRedux[allActiveMedicationRedux?.length - 1]?.date;

      if (allergenLastDate == currentDate) {
        
        
      } else {
        const dateArray = generateDateRangeArray(allergenLastDate, currentDate);

        const toAdd = [];

        dateArray.forEach(date => {
          allMyCurrentMeds.forEach(med => {
            toAdd.push({
              ...med,
              date: date,
              units: 0,
            });
          });
        });

        const mergeDates = [...allActiveMedicationRedux, ...toAdd];

        dispatch(setActiveMedication(mergeDates));
      }

    } else {
      console.log('in else');
      const activeDateStr = allActiveMedicationRedux?.[0]?.date || moment(new Date()).format('YYYY-MM-DD');
      const dateArray = generateDateRangeArray(activeDateStr, currentDate);

      const toAdd = [];

      dateArray.forEach(date => {
        allMyCurrentMeds.forEach(med => {
          toAdd.push({
            ...med,
            date: date,
            units: 0,
          });
        });
      });

      // console.log('toAdd', toAdd);
      dispatch(setActiveMedication(toAdd));
      // generateMedicationSlides(selecteddate);
    }
  };

  const stucture = [
    {value: 0, label: '22', spacing: 0, frontColor: '#6C2777', labelWidth: 0},
    {value: 0, spacing: 0, frontColor: '#FADD42'},
    {value: 0, spacing: 0, frontColor: '#875AFB'},
    {value: 0, frontColor: '#731D14'},
     {value: 0, label: '23', spacing: 0, frontColor: '#6C2777', labelWidth: 0},
    {value: 0, spacing: 0, frontColor: '#FADD42'},
    {value: 0, spacing: 0, frontColor: '#875AFB'},
    {value: 0, frontColor: '#731D14'},
  ];




  const generateMedicationSlides = selectedDate => {
    setMedicationLoader(true);
    if (allActiveMedicationRedux?.length == 0) {
      return;
    }


    try {
      const activeDateStr =
        allActiveMedicationRedux?.[0]?.date ||
        moment(new Date()).format('YYYY-MM-DD');

      setActiveDate(new Date(activeDateStr));

      const activeDate = moment(activeDateStr, 'YYYY-MM-DD');
      const baseDate = moment(
        selectedDate ? selectedDate : new Date(),
        'YYYY-MM-DD',
      );

      // Step 2: Calculate number of weeks
      const diffInDays = baseDate.diff(activeDate, 'days');
      const numberOfWeeks = Math.ceil((diffInDays + 1) / 7);

      const slides = [];

      for (let i = 0; i < numberOfWeeks; i++) {
        const end = moment(baseDate).subtract(i * 7, 'days');
        const start = moment(baseDate).subtract(i * 7 + 6, 'days');

        // Filter medications for the current week
        const entries = allActiveMedicationRedux.filter(item => {
          const itemDate = moment(item.date, 'YYYY-MM-DD');
          return itemDate.isBetween(
            start.clone().subtract(1, 'day'),
            end.clone().add(1, 'day'),
          );
        });

        const seenDates = new Set();
        const barData = [];

        entries.forEach(entry => {
          const formattedLabel = moment(entry.date, 'YYYY-MM-DD').format('D');
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

        // Adjust spacing and add transparent bars
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

  const generateDateRangeArray = (startDateStr, endDateStr) => {
    const startDate = moment(startDateStr, 'YYYY-MM-DD');
    const endDate = moment(endDateStr, 'YYYY-MM-DD');

    const dateArray = [];

    while (startDate.isSameOrBefore(endDate)) {
      dateArray.push(startDate.format('YYYY-MM-DD'));
      startDate.add(1, 'day');
    }

    return dateArray;
  };

  const addMedication = async item => {
    dispatch(addUnitToActiveMedicaton(item));

    // generateMedicationSlides(); // Update graph only
  };

  const removeMedication = async item => {
    dispatch(removeUnitToActiveMedicaton(item));

    //  generateMedicationSlides(); // Update graph only
  };

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

  const memoizedMedicationList = () => {
    // useMemo(() => {
    if (allActiveMedicationRedux.length === 0) return null;

    const filteredMedication = allActiveMedicationRedux.filter(
      item => item.date === selecteddate,
    );

    return (
      <FlatList
        data={filteredMedication}
        contentContainerStyle={{
          gap: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
        keyExtractor={item => item?.id?.toString()}
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
  };
  // }, [allActiveMedicationRedux, medicationLoadingMap, selecteddate]);

  const memoizedSlider = () => {
    // useMemo(() => {
    // if (MedicationnRecord.length === 0) return null;

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
              {/* {console.log('item.......', item.barData)} */}
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
  };
  // }, [MedicationnRecord]);

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
              {memoizedMedicationList()}

              {loader && (
                <ActivityIndicator size={'large'} color={AppColors.BLACK} />
              )}
              <>
                {Medicationloader && (
                  <ActivityIndicator size={'large'} color={AppColors.BLACK} />
                )}
              </>
              {MedicationnRecord.length > 0 && <>{memoizedSlider()}</>}
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

export default MedicationSample;
