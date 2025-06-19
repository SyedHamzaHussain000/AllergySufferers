import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
// import {BarChart} from 'react-native-chart-kit';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from 'react-native-gifted-charts';
import AppButton from '../../components/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BASE_URL from '../../utils/BASE_URL';
import {useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const Medication = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;

  const userData = useSelector(state => state.auth.user);
  const [allMedication, setAllMedication] = useState([]);
  const [MedicationnRecord, setMedicationnRecord] = useState([]);
        
  const [Medication , setMedicationLoader] = useState(false)
  const [loader, setLoader] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selecteddate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [open, setOpen] = useState(false);

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines
    },
  };

  console.log('MedicationnRecord', MedicationnRecord);

  const data = {
    labels: MedicationnRecord?.map(item =>
      moment(item.date, 'MMM, DD YYYY').format('MMM D'),
    ),
    datasets: [
      {
        data: MedicationnRecord?.map(item => parseInt(item?.units || 0)),
        colors: MedicationnRecord.flatMap(() => [
          () => '#E74C3C', // color for unitsA
          () => '#3498DB', // color for unitsB
        ]),
      },
    ],
  };

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      try {
        getActiveMedication();
        getMedicationRecords();
      } catch (error) {}
    });

    return nav;
  }, [navigation]);

  const getActiveMedication = () => {
    setLoader(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_medications_active`,
      headers: {'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0'},
    };

    axios
      .request(config)
      .then(response => {
        // console.log('................................', response.data.data);
        setAllMedication(response?.data?.data);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const getMedicationRecords = ewformateddate => {

    console.log("called ......")
    setMedicationLoader(true)
    setLoader(true);
    let data = JSON.stringify({
      date: moment(ewformateddate ? ewformateddate : selecteddate).format('YYYY-MM-DD'),
        // .subtract(7, 'days')
        
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

        const slicedata = response.data.entries.items;


        const seenDates = new Set();
        const barData = [];

        slicedata.forEach(entry => {
          const formattedDate = moment(entry.date, 'MMMM, DD YYYY').format(
            'MMM DD',
          );
          const value = parseInt(entry.units) || 0;

          if (!seenDates.has(entry.date)) {
            seenDates.add(entry.date);
            barData.push({
              value,
              label: formattedDate,
              spacing: 3,
              frontColor: entry.frontColor
            });
          } else {
            barData.push({
              value,
              frontColor: entry.frontColor,
              spacing:0
            });
          }
        });

        setMedicationnRecord(barData);
        setLoader(false);
        setMedicationLoader(false)
      })
      .catch(error => {
        setLoader(false);
        setMedicationLoader(false)
        console.log(error);
      });
  };

  const addMedication = item => {

    setLoader(true);
    let data = JSON.stringify({
      medication_id: item.id,
      date: selecteddate,
      units: 1,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/add_medication_units`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));

        getActiveMedication();
        getMedicationRecords();

        // getMedicationRecords();
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const removeMedication = item => {
    const formatedDate = moment(new Date()).format('YYYY-MM-DD');

    setLoader(true);
    let data = JSON.stringify({
      medication_id: item.id,
      date: formatedDate,
      units: 1,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/remove_medication_units`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        // setTimeout(() => {
        getActiveMedication();
        getMedicationRecords();
        // }, 7000);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

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

        <View>
          {loader == true ? (
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          ) : (
            <FlatList
              data={allMedication}
              contentContainerStyle={{gap: 10, marginTop: 20, marginBottom: 20}}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: '#37BC07',
                      height: responsiveHeight(6),
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      justifyContent: 'space-between',
                    }}>
                    <AppText
                      title={item.name}
                      textSize={1.6}
                      textColor={AppColors.LIGHTGRAY}
                    />

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
                        title={item?.units ? item?.units : 0}
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
                  </View>
                );
              }}
            />
          )}
        </View>

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


        {
          Medication == true &&( 
            <ActivityIndicator size={'large'} color={AppColors.BLACK}/>
          )
        }

        {MedicationnRecord.length > 0 && (
          // <BarChart
          //   data={MedicationnRecord}
          //   width={screenWidth * 0.9}
          //   height={220}
          //   chartConfig={chartConfig}
          //   fromZero
          //   withCustomBarColorFromData={true}
          //   flatColor={true}
          //   showBarTops={false}
          // />

          <BarChart
            data={MedicationnRecord}
            barWidth={10}
            frontColor="#E23131" // bar color
            showLine={false}
            xAxisLabelTextStyle={{
              fontSize: 10, // 👈 smaller font size
              color: '#000', // optional, customize color
              fontWeight: '400', // optional
              width:30
            }}
            barBorderRadius={2}
            isAnimated={true}
            noOfSections={7}
            spacing={30}
          />
        )}

        <View style={{marginTop: 20}}>
          <AppButton
            title={'Go TO DATA VISUALIZER'}
            RightColour={AppColors.rightArrowCOlor}
            handlePress={() => navigation.navigate('DataVisualizer')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Medication;
