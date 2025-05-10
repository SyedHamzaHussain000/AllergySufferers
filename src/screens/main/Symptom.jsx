import {View, Text, FlatList, Image, Dimensions} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';
import AppImages from '../../assets/images/AppImages';
import {responsiveHeight} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import { LineChart, PieChart } from 'react-native-chart-kit';
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
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <View style={{padding: 20}}>
      <AppHeader heading="Symptom" Rightheading="Today" subheading="Tracker" />

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

{/* <LineChart
  data={data}
  width={screenWidth}
  height={256}
  verticalLabelRotation={30}
  chartConfig={chartConfig}
  bezier
/> */}

<View style={{marginTop: 10}}>
          <AppText
            title={'Tips & Tricks'}
            textSize={3}
            textColor={AppColors.BLACK}
            textFontWeight
          />
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
                <AppText title={"Allergy Tip"} textFontWeight textSize={1.5}/>
                <AppText title={" - Check pollen counts on your app in the morning and try to say indoors when they’re high."} textColor={"#777777"} textSize={1.5}/>
        </View>

    </View>
  );
};

export default Symptom;
