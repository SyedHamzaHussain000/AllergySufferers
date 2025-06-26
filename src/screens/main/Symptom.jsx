import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
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
import {LineChart} from 'react-native-chart-kit';
import AppButton from '../../components/AppButton';
import axios from 'axios';
import BASE_URL from '../../utils/BASE_URL';
import moment from 'moment';
import {useSelector} from 'react-redux';
import LoaderMode from '../../components/LoaderMode';
import DatePicker from 'react-native-date-picker';
import {AllergyTips} from '../../utils/AllergyTips';
import AppIntroSlider from 'react-native-app-intro-slider';

const Symptom = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;

  const [randomTip, setRandomTip] = useState(null);

  const [symtomsData, setSymtomsData] = useState();
  const [systomsNumber, setSymtomsNumber] = useState();

  //start date states
  const [open, setOpen] = useState(false);
  const [selecteddate, setSelectedDate] = useState(
    moment().subtract(5, 'days').format('YYYY-MM-DD'),
  );

  const [date, setDate] = useState(new Date());
  //start date states
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [endopen, setEndOpen] = useState(false);

  const [loader, setLoader] = useState(false);

  console.log('endDate', endDate, 'startDate', selecteddate);

  const userData = useSelector(state => state?.auth?.user);
  const [graphSlides, setGraphSlides] = useState([]);

  const mojis = [
    {id: 1, img: AppImages.Mask, title: 'Very Bad'},
    {id: 2, img: AppImages.Pain, title: 'Bad'},
    {id: 3, img: AppImages.Bored, title: 'Okay'},
    {id: 4, img: AppImages.Hello, title: 'Good'},
    {id: 5, img: AppImages.Star, title: 'Very Good'},
  ];

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `black`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines
    },
  };

  const symtomsArrayData = [
    {
      labels: [],
      datasets: [
        {data: []},
        {
          data: [5], // min
        },
        {
          data: [5], // max
        },
      ],
    },
  ];

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      setLoader(true);
      generateGraphSlides(); // 👈
      // getSymtomsData();

      const random =
        AllergyTips[Math.floor(Math.random() * AllergyTips.length)];
      setRandomTip(random);
    });

    return nav;
  }, [navigation]);

  const getSymtomsData = ewformateddate => {
    setLoader(true);
    let data = JSON.stringify({
      start_date: moment(ewformateddate ? ewformateddate : selecteddate)
        .subtract('days', 6)
        .format('YYYY-MM-DD'), //fromat Ymd
      end_date: endDate,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_symptom_records`,
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
      .then(async response => {
        console.log('datasorted', response.data);

        const datasort = response.data.symptoms;

        const lastFive = datasort.slice(-5);
        const symtomsArrayData = {
          labels: await lastFive.map(item =>
            moment(item.date, 'MMM, DD YYYY').format('MMM D'),
          ),
          datasets: [
            {
              data: await lastFive.map(item => parseInt(item.symptom_level)),
            },

            {
              data: [1],
              withDots: false,
            },

            {
              data: [5],
              withDots: false,
            },
          ],
        };

        setSymtomsData(symtomsArrayData);
        setLoader(false);
      })
      .catch(error => {
        console.log(error.message);
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const setApiSymtomsData = id => {
    setSymtomsNumber(id);

    setLoader(true);
    try {
      const todayDate = moment().format('YYYY-MM-DD');

      let data = JSON.stringify({
        level: id,
        date: selecteddate,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/set_symptom_record`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          // getSymtomsData();
          generateGraphSlides(selecteddate)
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  const generateGraphSlides = async (selectedDate) => {
    setLoader(true);
    const slides = [];
    const today = moment(selectedDate ? selectedDate : new Date());

    for (let i = 0; i < 3; i++) {
      const end = moment(today)
        .subtract(i * 7, 'days')
        .format('YYYY-MM-DD');
      const start = moment(today)
        .subtract(i * 7 + 6, 'days')
        .format('YYYY-MM-DD');

      const response = await axios.post(
        `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_symptom_records`,
        JSON.stringify({
          start_date: start,
          end_date: end,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = response?.data?.symptoms || [];

      const labels = data.map(item =>
        moment(item.date, 'MMM, DD YYYY').format('MMM D'),
      );

      const values = data.map(item => parseInt(item.symptom_level));

      const chartData = {
        labels: labels,
        datasets: [
          {data: values},
          {data: [1], withDots: false},
          {data: [5], withDots: false},
        ],
      };

      slides.unshift({
        key: `${i}`,
        title: `${moment(start).format('DD MMM')} - ${moment(end).format(
          'DD MMM',
        )}`,
        chartData,
      });
    }

    setGraphSlides(slides);
    setLoader(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <View style={{padding: 20, backgroundColor: AppColors.WHITE, flex: 1}}>
        <AppHeader
          heading="Symptom"
          Rightheading="Today"
          subheading="Tracker"
          selecteddate={selecteddate}
          setOpen={() => setOpen(!open)}
        />

        {
          //start date
        }
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

            // getSymtomsData(formattedDate);
            generateGraphSlides(formattedDate)
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        {
          //End date
        }

        <DatePicker
          modal
          open={endopen}
          date={date}
          mode="date"
          maximumDate={new Date()}
          onConfirm={selectedDate => {
            setEndOpen(false);
            const today = moment().startOf('day');
            const picked = moment(selectedDate).startOf('day');
            const formattedDate = picked.format('YYYY-MM-DD');
            setEndDate(formattedDate);

            // getSymtomsData(formattedDate);
            generateGraphSlides(formattedDate)
          }}
          onCancel={() => {
            setEndOpen(false);
          }}
        />

        <View>
          {loader ? (
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          ) : (
            <FlatList
              data={mojis}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 5, marginTop: 20}}
              renderItem={({item}) => {

                // console.log("emojis data", graphSlides[0])
                return (
                  <TouchableOpacity onPress={() => setApiSymtomsData(item.id)}>
                    <Image
                      source={item.img}
                      style={{
                        height: responsiveHeight(
                          item.id == systomsNumber ? 10 : 8,
                        ),
                        width: responsiveHeight(
                          item.id == systomsNumber ? 10 : 8,
                        ),
                        resizeMode: 'contain',
                      }}
                    />
                    <AppText
                      title={item.title}
                      textAlignment={'center'}
                      textSize={1.5}
                      textFontWeight
                    />
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>

        {/* <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            paddingTop: 20,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LineChart
            data={symtomsData || {labels: [], datasets: [{data: []}]}}
            width={screenWidth * 0.89}
            height={responsiveHeight(32)}
            verticalLabelRotation={0}
            chartConfig={chartConfig}
            withShadow={false}
            withVerticalLines={true}
            bezier
            withHorizontalLabels={false}
            segments={5}
            yAxisInterval={5}
            yAxisLabel="0"
          />

          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              height: responsiveHeight(30),
              width: responsiveWidth(10),
              left: 10,
              marginBottom: 35,
            }}>
            <FlatList
              data={mojis}
              inverted
              contentContainerStyle={{gap: 15}}
              renderItem={({item}) => {
                return (
                  <Image
                    source={item.img}
                    style={{
                      height: responsiveHeight(4),
                      width: responsiveHeight(4),
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                  />
                );
              }}
            />
          </View>
        </View> */}
        {
          console.log('graphSlides',graphSlides[0])
        }
        <AppIntroSlider
          data={graphSlides}
          showNextButton={false}
          showDoneButton={false}
          showPrevButton={false}
          activeDotStyle={{backgroundColor: AppColors.PRIMARY, marginTop:  responsiveHeight(12)}}
          dotStyle={{marginTop: responsiveHeight(12), backgroundColor: AppColors.LIGHTGRAY}}
          renderItem={({item}) => {

            console.log("item..", item)
            return (
              <View
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingTop: 20,
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <LineChart
                  data={item?.chartData || {labels: [], datasets: [{data: []}]}}
                  width={screenWidth * 0.89}
                  height={responsiveHeight(32)}
                  verticalLabelRotation={0}
                  chartConfig={chartConfig}
                  withShadow={false}
                  withVerticalLines={true}
                  bezier
                  withHorizontalLabels={false}
                  segments={5}
                  yAxisInterval={5}
                  fromZero={true}
                  yAxisLabel="0"
  
                />

                <View
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    height: responsiveHeight(30),
                    width: responsiveWidth(10),
                    left: 10,
                    marginBottom: 130,
                  }}>
                  <FlatList
                    data={mojis}
                    inverted
                    contentContainerStyle={{gap: 6}}
                    renderItem={({item}) => {
                      return (
                        <Image
                          source={item.img}
                          style={{
                            height: responsiveHeight(4),
                            width: responsiveHeight(4),
                            resizeMode: 'contain',
                            alignSelf: 'center',
                          }}
                        />
                      );
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
        {/* <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            paddingTop: 20,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LineChart
            data={symtomsData || {labels: [], datasets: [{data: []}]}}
            width={screenWidth * 0.89}
            height={responsiveHeight(32)}
            verticalLabelRotation={0}
            chartConfig={chartConfig}
            withShadow={false}
            withVerticalLines={true}
            bezier
            withHorizontalLabels={false}
            segments={5}
            yAxisInterval={5}
            yAxisLabel="0"
          />

          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              height: responsiveHeight(30),
              width: responsiveWidth(10),
              left: 10,
              marginBottom: 35,
            }}>
            <FlatList
              data={mojis}
              inverted
              contentContainerStyle={{gap: 15}}
              renderItem={({item}) => {
                return (
                  <Image
                    source={item.img}
                    style={{
                      height: responsiveHeight(4),
                      width: responsiveHeight(4),
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                  />
                );
              }}
            />
          </View>
        </View> */}

        <View style={{marginTop: 20}}>
          <AppButton
            title={'Go TO DATA VISUALIZER'}
            RightColour={AppColors.rightArrowCOlor}
            handlePress={() => navigation.navigate('DataVisualizer')}
          />
        </View>
        <View style={{marginTop: 10}}>
          <AppText
            title={'Tips & Tricks'}
            textSize={3}
            textColor={AppColors.BLACK}
            textFontWeight
          />
        </View>
        
        {
           randomTip?.id == 26 ?
           null :

        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            Allergy tip #{randomTip?.id}
          </Text>
          <Text style={{fontSize: responsiveFontSize(1.8), color: '#333'}}>
            {randomTip?.tip}
          </Text>
        </View>
        }
      </View>
    </SafeAreaView>
  );
};

export default Symptom;
