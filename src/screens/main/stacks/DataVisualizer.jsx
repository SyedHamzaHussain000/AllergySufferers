import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../../components/AppHeader';
import {BarChart, LineChart} from 'react-native-chart-kit';
import AppColors from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import AppText from '../../../components/AppTextComps/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BASE_URL from '../../../utils/BASE_URL';
import {useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const DataVisualizer = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const userData = useSelector(state => state.auth.user);

  const [type, setType] = useState('allergens');
  const [medicationData, setMedicationsData] = useState();

  const [takingMedications, setTakingMedications] = useState([]);
  const [todayPollensData, setTodayPollensData] = useState();
  const [MedicationnRecord, setMedicationnRecord] = useState([]);

  const [pollenLoader, setPollenLoader] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selecteddate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getPollensData();
      getMedicationRecords();
    });

    return nav;
  }, [navigation]);

  const getPollensData = () => {
    setType('allergens');
    setPollenLoader(true);

    let data = new FormData();
    data.append('lat', '43.65107');
    data.append('lng', '-79.347015');
    data.append('email', 'john@example.com');
    data.append('tense', 'past');

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

        const city = res?.user?.locations?.closest?.name;

        const today = response?.data?.forecast?.[city]?.today;

        setTodayPollensData(today);

        setPollenLoader(false);
      })
      .catch(error => {
        console.log(error);
        setPollenLoader(false);
      });
  };

  const getMedicationApi = () => {
    setType('medication');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medications_active`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setMedicationsData(response?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

   const getMedicationRecords = ewformateddate => {
    // setLoader(true);
    let data = JSON.stringify({
      date: ewformateddate ? ewformateddate : selecteddate,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medication_records`,
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
        console.log(JSON.stringify(response.data));

        const slicedata = response.data.entries.items.slice(-5);
        setMedicationnRecord(slicedata);
        // setLoader(false)
      })
      .catch(error => {
        // setLoader(false)
        console.log(error);
      });
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      paddingLeft: 0, // add this
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines
    },
  };

  const linechartConfig = {
    backgroundColor: 'rgba(0,0,0,0)',
    backgroundGradientFrom: 'rgba(0,0,0,0)',
    backgroundGradientTo: 'rgba(0,0,0,0)',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // your line color
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
    style: {
      borderRadius: 16,
      paddingLeft: 0,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
    },
  };

  const data = {
    labels: MedicationnRecord?.map(item =>
      moment(item.date, 'MMM, DD YYYY').format('MMM D'),
    ),
    datasets: [
      {
        data: MedicationnRecord?.map(item => parseInt(item?.units || 0)),
        colors: [
          () => '#D9B61A',
          () => '#B768F9',
          () => '#21B777',
          () => '#50837A',
          () => '#FFCBCF',
          () => '#032198',
        ],
      },
    ],
  };



  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
          backgroundColor: AppColors.WHITE,
        }}>
        <AppHeader
          heading="Data Visualizer"
          Rightheading="Today"
          subheading="Your Data, Visualized"
          goBack
          selecteddate={selecteddate}
          setOpen={()=> setOpen(true)}
        />

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor: 'transparent',
          }}>
          <BarChart
            data={data}
            width={screenWidth * 0.86}
            height={220}
            chartConfig={chartConfig}
            fromZero
            withCustomBarColorFromData={true}
            flatColor={true}
            showBarTops={false}
            yLabelsOffset={50}
            style={{backgroundColor: 'red'}}
          />

          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            maximumDate={new Date()}
            onConfirm={selectedDate => {
              setOpen(false);
              const today = moment().startOf('day');
              const picked = moment(selectedDate).startOf('day');
              const formattedDate = picked.format('YYYY-MM-DD');
              setSelectedDate(formattedDate);

              getMedicationRecords(formattedDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <View>
          <FlatList
            data={takingMedications}
            renderItem={({item}) => {
              console.log('item', item);
              return (
                <View
                  style={{
                    height: responsiveHeight(6),
                    width: responsiveWidth(90),
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: AppColors.LIGHTGRAY,
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                  }}>
                  <AppText title={item.name} textSize={1.5} />
                  <TouchableOpacity
                    onPress={() =>
                      setTakingMedications(prev =>
                        prev.filter(med => med.id !== item.id),
                      )
                    }>
                    <AntDesign
                      name={'minus'}
                      size={responsiveFontSize(2)}
                      color={AppColors.LIGHTGRAY}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => getPollensData()}
            style={{
              height: responsiveHeight(5),
              width: responsiveWidth(44),
              backgroundColor:
                type == 'allergens' ? AppColors.BTNCOLOURS : AppColors.WHITE,
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
              height: responsiveHeight(5),
              width: responsiveWidth(44),
              borderWidth: 1,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                type == 'medication' ? AppColors.BTNCOLOURS : AppColors.WHITE,
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
        {pollenLoader && (
          <View style={{marginTop: 30}}>
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          </View>
        )}
        {type == 'medication' ? (
          <View>
            <FlatList
              data={medicationData}
              contentContainerStyle={{marginTop: 20, paddingBottom: 100}}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      borderTopRightRadius: index == 0 ? 10 : 0,
                      borderTopLeftRadius: index == 0 ? 10 : 0,
                      borderBottomRightRadius:
                        index == medicationData?.length - 1 ? 10 : 0,
                      borderBottomLeftRadius:
                        index == medicationData?.length - 1 ? 10 : 0,
                      padding: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottomWidth:
                        index == medicationData?.length - 1 ? 1 : 0,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          setTakingMedications(prev => {
                            const alreadyExists = prev.some(
                              med => med.id === item.id,
                            ); // Assuming `id` is unique
                            if (alreadyExists) return prev; // Don't add it again
                            return [...prev, item]; // Add only if it doesn't exist
                          })
                        }>
                        <AntDesign
                          name={'pluscircle'}
                          size={responsiveFontSize(2.5)}
                          color={AppColors.BTNCOLOURS}
                        />
                      </TouchableOpacity>

                      <AppText
                        title={item.name}
                        textSize={2}
                        textColor={AppColors.BLACK}
                        textFontWeight
                        textwidth={70}
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <View>
            <FlatList
              data={todayPollensData?.current}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      height: responsiveHeight(6),
                      width: responsiveWidth(90),
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: AppColors.LIGHTGRAY,
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                    }}>
                    <AppText title={item.name} textSize={1.5} />
                  </View>
                );
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DataVisualizer;
