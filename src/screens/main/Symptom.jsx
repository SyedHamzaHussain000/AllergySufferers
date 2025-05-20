import {View, Text, FlatList, Image, Dimensions, TouchableOpacity} from 'react-native';
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
import { useSelector } from 'react-redux';
const Symptom = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;

  const [symtomsData, setSymtomsData] = useState(null);
  const [systomsNumber, setSymtomsNumber] = useState()

  const userData = useSelector(state => state)

  const mojis = [
    {id: 5, img: AppImages.Star, title: 'Very Good'},
    {id: 4, img: AppImages.Hello, title: 'Good'},
    {id: 3, img: AppImages.Bored, title: 'Okay'},
    {id: 2, img: AppImages.Pain, title: 'Bad'},
    {id: 1, img: AppImages.Mask, title: 'Very Bad'},
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

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getSymtomsData();
    });

    return nav;
  }, [navigation]);

  const getSymtomsData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.auth?.user?.id}/rest_get_symptom_records`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        const sorted = response.data.symptoms.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );

        const labels = sorted.map(item => {
          const formatDate = moment(item.date, 'MMMM, DD YYYY').format('MMM D');
          return formatDate;
        });

        const values = sorted.map(item => parseFloat(item.symptom_level));

        setSymtomsData({
          labels,
          datasets: [{data: values, strokeWidth: 2}],
        });
      })
      .catch(error => {
        console.log(error);
      });
  };



  const setApiSymtomsData = (id) => {

    setSymtomsNumber(id)

    const todayDate = moment().format('YYYY-MM-DD');
    let data = JSON.stringify({
      level: id,
      date: todayDate,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData?.auth?.user?.id}/set_symptom_record`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        getSymtomsData()
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={{padding: 20, backgroundColor: AppColors.WHITE, flex: 1}}>
      <AppHeader heading="Symptom" Rightheading="Today" subheading="Tracker" />

      <View>
        <FlatList
          data={mojis}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 5, marginTop: 20}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={()=>setApiSymtomsData(item.id)}>
                <Image
                  source={item.img}
                  style={{
                    height: responsiveHeight(item.id == systomsNumber ?  10 :8),
                    width: responsiveHeight(item.id == systomsNumber ?  10 :8),
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
          withVerticalLines={false}
          bezier
          withHorizontalLabels={false}
        />

        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            height: responsiveHeight(30),
            width: responsiveWidth(10),
            left: 10,
          }}>
          <FlatList
            data={mojis}
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
  );
};

export default Symptom;
