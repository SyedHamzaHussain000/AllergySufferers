import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import {BarChart} from 'react-native-chart-kit';
import AppButton from '../../components/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Medication = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;

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

  const data = {
    labels: ['Mar 16', 'Mar 18', 'Mar 20', 'Mar 22'],
    datasets: [
      {
        data: [3, 0, 1, 1],
        colors: [
          () => '#E74C3C', // red
          () => '#E74C3C',
          () => '#E74C3C',
          () => '#E74C3C',
        ],
      },
      {
        data: [2, 1, 2, 2],
        colors: [
          () => '#2ECC71', // green
          () => '#2ECC71',
          () => '#2ECC71',
          () => '#2ECC71',
        ],
      },
    ],
    barColors: ['#E74C3C', '#2ECC71'],
  };

  return (
    <View style={{padding: 20, backgroundColor: AppColors.WHITE, flex: 1}}>
      <AppHeader
        heading="Medication"
        Rightheading="Today"
        subheading="Tracker"
      />

      <View>
        <FlatList
          data={[1, 2]}
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
                  title={'Advil Cold and Sinus'}
                  textSize={1.6}
                  textColor={AppColors.LIGHTGRAY}
                />

                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <TouchableOpacity>
                    <AntDesign
                      name={'minus'}
                      size={responsiveFontSize(2)}
                      color={AppColors.LIGHTGRAY}
                    />
                  </TouchableOpacity>

                  <AppText
                    title={'0'}
                    textColor={AppColors.LIGHTGRAY}
                    textSize={2.5}
                  />

                  <TouchableOpacity>
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
      </View>

      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        fromZero
        withCustomBarColorFromData={true}
        flatColor={true}
        showBarTops={false}
      />

      <View style={{marginTop: 20}}>
        <AppButton
          title={'Go TO DATA VISUALIZER'}
          RightColour={AppColors.rightArrowCOlor}
          handlePress={()=> navigation.navigate("DataVisualizer")}
        />
      </View>
    </View>
  );
};

export default Medication;
