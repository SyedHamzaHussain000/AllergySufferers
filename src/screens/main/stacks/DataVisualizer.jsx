import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../../components/AppHeader';
import {BarChart} from 'react-native-chart-kit';
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
const DataVisualizer = () => {
  const screenWidth = Dimensions.get('window').width;
  const userData = useSelector(state => state.auth.user);

  const [type, setType] = useState('');
  const [medicationData, setMedicationsData] = useState();

  const [takingMedications, setTakingMedications] = useState([]);

  const pollens = [
    {id: 1, name: 'Cladosporium', top: true},
    {id: 2, name: 'Low - Mar 28th, 2025', bottom: true},
  ];

  const getMedicationApi = () => {
    setType('medication');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medications`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setMedicationsData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getAllergensApi = () => {
    setType('allergens');
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

  const data = {
    labels: ['Mar 16', 'Mar 18', 'Mar 20', 'Mar 21', 'Mar 22', 'Mar 23'],
    datasets: [
      {
        data: [3, 2, 1, 1, 3, 5],
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
    barColors: ['#E74C3C', '#2ECC71'],
  };

  return (
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
      />

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
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
          onPress={() => getAllergensApi()}
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
            textColor={type == 'allergens' ? AppColors.WHITE : AppColors.BLACK}
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
            textColor={type == 'medication' ? AppColors.WHITE : AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={medicationData}
        contentContainerStyle={{marginTop: 20, paddingBottom: 100}}
        renderItem={({item, index}) => {
          console.log('item', item);
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
                borderBottomWidth: index == medicationData?.length - 1 ? 1 : 0,
              }}>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
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
    </ScrollView>
  );
};

export default DataVisualizer;
