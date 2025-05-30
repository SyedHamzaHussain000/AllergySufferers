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


const Symptom = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;

  const [symtomsData, setSymtomsData] = useState();
  const [systomsNumber, setSymtomsNumber] = useState();

  const [loader, setLoader] = useState(false)

  const userData = useSelector(state => state?.auth?.user);

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

  console.log('first');

  const symtomsArrayData = [
    {
      labels: [],
      datasets: [{data: []}],
    },
  ];

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getSymtomsData();
    });

    return nav;
  }, [navigation]);

  const getSymtomsData = () => {
    setLoader(true)
    let config = {  
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/get_symptom_records`,
      headers: {},
    };

    axios
      .request(config)
      .then(async  response => {
        // console.log('symptoms', response.data.symptoms);
        const datasort = response.data.symptoms

        const lastFive = datasort.slice(-5);
        const symtomsArrayData = {
            labels: await lastFive.map(item =>   moment(item.date, 'MMM, DD YYYY').format('MMM D')),
            datasets: [
              {
                data: await lastFive.map(item => parseInt(item.symptom_level))
              },
            ],
          }

        setSymtomsData(symtomsArrayData)
          
          setTimeout(() => {

            setLoader(false)
          },10000)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setApiSymtomsData = id => {
    setSymtomsNumber(id);

    setLoader(true)
    
    const todayDate = moment().format('YYYY-MM-DD');

    let data = JSON.stringify({
      level: id,
      date: todayDate,
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

        getSymtomsData();
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <View style={{padding: 20, backgroundColor: AppColors.WHITE, flex: 1}}>
        <AppHeader
          heading="Symptom"
          Rightheading="Today"
          subheading="Tracker"
        />
          
        <View>
          {
            loader ?
            <ActivityIndicator size={'large'} color={AppColors.BLACK}/>
            :
          <FlatList
            data={mojis}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 5, marginTop: 20}}
            renderItem={({item}) => {
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
          }
        </View>

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
            data={symtomsData || {labels: [], datasets: [{data: []}]}}
            width={screenWidth * 0.89}
            height={responsiveHeight(30)}
            verticalLabelRotation={0}
            chartConfig={chartConfig}
            withShadow={false}
            withVerticalLines={true}
            bezier
            withHorizontalLabels={false}
            segments={5} 
            yAxisInterval={5}
            yAxisLabel='0'
            
            

          />

          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              height: responsiveHeight(30),
              width: responsiveWidth(10),
              left: 10,
              marginBottom:35,
            }}>
            <FlatList
              data={mojis}
            inverted
              contentContainerStyle={{gap: 15 ,}}
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

        <View style={{marginTop: 20}}>
          <AppButton
            title={'Go TO DATA VISUALIZER'}
            RightColour={AppColors.rightArrowCOlor}
          />
        </View>
        <View style={{marginTop: 30}}>
          <AppText
            title={'Tips & Tricks'}
            textSize={3}
            textColor={AppColors.BLACK}
            textFontWeight
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <AppText title={'Allergy Tip'} textFontWeight textSize={1.5} />
          <AppText
            title={
              ' - Check pollen counts on your app in the morning and try to say indoors when they’re high.'
            }
            textColor={'#777777'}
            textSize={1.5}
            textwidth={70}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Symptom;
