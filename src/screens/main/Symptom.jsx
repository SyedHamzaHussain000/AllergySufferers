import {View, Text, FlatList, Image, Dimensions} from 'react-native';
import React from 'react';
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
const Symptom = () => {
  const screenWidth = Dimensions.get('window').width;
  const mojis = [
    {id: 1, img: AppImages.Mask, title: 'Very Bad'},
    {id: 2, img: AppImages.Pain, title: 'Bad'},
    {id: 3, img: AppImages.Bored, title: 'Okay'},
    {id: 4, img: AppImages.Hello, title: 'Good'},
    {id: 5, img: AppImages.Star, title: 'Very Good'},
  ];

  const data = {
    labels: ['Mar16', 'Mar17', 'Mar18', 'Mar19', 'Mar20', 'Mar21'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],

        strokeWidth: 2, // optional
      },
    ],
  };
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
              <View>
                <Image
                  source={item.img}
                  style={{
                    height: responsiveHeight(8),
                    width: responsiveHeight(8),
                    resizeMode: 'contain',
                  }}
                />
                <AppText
                  title={item.title}
                  textAlignment={'center'}
                  textSize={1.5}
                  textFontWeight
                />
              </View>
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
          data={data}
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
