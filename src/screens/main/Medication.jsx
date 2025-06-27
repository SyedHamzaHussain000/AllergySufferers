import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
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

const Medication = ({navigation}) => {
  const sliderRef = useRef(null);
  const userData = useSelector(state => state.auth.user);
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

  const setMedicationLoading = (id, isLoading) => {
    setMedicationLoadingMap(prev => ({...prev, [id]: isLoading}));
  };

  const getActiveMedication = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_medications_active`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
          },
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
    const baseDate = moment(selectedDate ? selectedDate : new Date, 'YYYY-MM-DD');

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
          const formattedLabel = moment(entry.date, 'MMMM, DD YYYY').format('MMM DD');
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
    try {
      const data = JSON.stringify({
        medication_id: item.id,
        date: selecteddate,
        units: 1,
      });

      await axios.post(
        `${BASE_URL}/allergy_data/v1/user/${userData.id}/add_medication_units`,
        data,
        {headers: {'Content-Type': 'application/json'}},
      );

      await getActiveMedication();
      await generateMedicationSlides();
    } catch (error) {
      console.log(error);
    }
    setMedicationLoading(item.id, false);
  };

  const removeMedication = async item => {
    setMedicationLoading(item.id, true);
    try {
      const data = JSON.stringify({
        medication_id: item.id,
        date: moment().format('YYYY-MM-DD'),
        units: 1,
      });

      await axios.post(
        `${BASE_URL}/allergy_data/v1/user/${userData.id}/remove_medication_units`,
        data,
        {headers: {'Content-Type': 'application/json'}},
      );

      await getActiveMedication();
      await generateMedicationSlides();
    } catch (error) {
      console.log(error);
    }
    setMedicationLoading(item.id, false);
  };

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getActiveMedication();
      generateMedicationSlides();
    });

    return nav;
  }, [navigation]);


    useEffect(() => {
    if (sliderRef.current && MedicationnRecord.length > 0) {
      // Jump to the last slide
      sliderRef.current.goToSlide(MedicationnRecord.length - 1, false); // false = don't trigger onSlideChange
    }
  }, [MedicationnRecord]);
  


  console.log("medication loader", Medicationloader)

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

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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

          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            maximumDate={new Date()}
            onConfirm={selectedDate => {
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

          {loader && <ActivityIndicator size={'large'} color={AppColors.BLACK} />}
          <>
            {
              Medicationloader && (
                <ActivityIndicator size={'large'} color={AppColors.BLACK} />
              )
            }
            </>
          {MedicationnRecord.length > 0 && (
            <AppIntroSlider
            ref={sliderRef}
              data={MedicationnRecord}
              showNextButton={false}
              showPrevButton={false}
              showDoneButton={false}
              renderItem={({item}) => (
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 16}}>{item.title}</Text>
                  <BarChart
                    data={item.barData}
                    barWidth={10}
                    frontColor="#E23131"
                    showLine={false}
                    initialSpacing={0}
                    xAxisLabelTextStyle={{
                      fontSize: 10,
                      color: '#000',
                      fontWeight: '400',
                      width: 40,
                    }}
                    barBorderRadius={2}
                    isAnimated={true}
                    maxValue={8}
                    stepValue={1}
                    hideDataPoints={false}
                    spacing={20}
                    formatYLabel={label => parseFloat(label).toFixed(0)}
                  />
                </View>
              )}

              dotStyle={{backgroundColor: '#ccc'}}
              activeDotStyle={{backgroundColor: AppColors.BLACK}}
            />
          )}

          <View style={{marginTop: 20}}>
            <AppButton
              title={'Go TO DATA VISUALIZER'}
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
