import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../../components/AppHeader';
// import {BarChart, LineChart} from 'react-native-chart-kit';
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
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from 'react-native-gifted-charts';

const DataVisualizer = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const userData = useSelector(state => state.auth.user);

  const [type, setType] = useState('allergens');
  const [medicationData, setMedicationsData] = useState();

  const [takingMedications, setTakingMedications] = useState([]);
  const [todayPollensData, setTodayPollensData] = useState([]);
  const [MedicationnRecord, setMedicationnRecord] = useState([]);

  const [pollenLoader, setPollenLoader] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selecteddate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const colours = ['lightblue', 'lightgreen'];

  const [open, setOpen] = useState(false);

  const [PrimaryLineData, setPrimaryLineData] = useState([]);
  const [SecondaryLineData, setSecondaryLineData] = useState([]);

  const [medicationLoadingMap, setMedicationLoadingMap] = useState({});

  const [loadingItemId, setLoadingItemId] = useState(null);

  const [DataVisualizerLoader, setDataVisualizerLoader] = useState(false);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getAllAllergens();
      getMedicationRecords();
      getSelectedAllergens();
    });

    return nav;
  }, [navigation]);

  useEffect(() => {
    getSelectedAllergens();
  }, [selecteddate]);

  const setMedicationLoading = (id, isLoading) => {
    setMedicationLoadingMap(prev => ({...prev, [id]: isLoading}));
  };

  const getAllAllergens = () => {
    setType('allergens');
    setPollenLoader(true);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_all_allergens`,
      headers: {'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0'},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setPollenLoader(false);
        setTodayPollensData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getMedicationApi = () => {
    setType('medication');
    setPollenLoader(true);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medications_active`,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };

    axios
      .request(config)
      .then(response => {
        setMedicationsData(response?.data?.data);
        setPollenLoader(false);
      })
      .catch(error => {
        setPollenLoader(false);
        console.log(error);
      });
  };

  const getMedicationRecords = ewformateddate => {
    const end = moment(ewformateddate ? ewformateddate : new Date());
    const start = moment(ewformateddate ? ewformateddate : new Date()).subtract(
      6,
      'days',
    );

    const data = JSON.stringify({
      start_date: start.format('YYYY-MM-DD'),
      end_date: end.format('YYYY-MM-DD'),
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medication_records`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        const allentriesArr = response.data.entries.items || [];

        // console.log('allentriuesaarr', response.data);

        // const grouped = {};

        // allentriesArr.forEach(entry => {
        //   const label = moment(entry.date, 'MMMM, DD YYYY').format('MMM DD');

        //   if (entry.medication_id) {
        //     if (!grouped[label]) {
        //       grouped[label] = 1;
        //     } else {
        //       grouped[label]++;
        //     }
        //   }
        // });
        // console.log("grouped============>>", grouped)
        const seenDates = new Set();
        const barData = [];

        allentriesArr.forEach(entry => {
          const formattedDate = moment(entry.date, 'MMMM, DD YYYY').format(
            'MMM DD',
          );
          const value = parseInt(entry.units) || 0;

          if (!seenDates.has(entry.date)) {
            seenDates.add(entry.date);
            barData.push({
              value,
              label: formattedDate,
              spacing: 2,
              frontColor: entry.frontColor,
              labelWidth: 30,
            });
          } else {
            barData.push({
              value,
              spacing: 0,
              frontColor: entry.frontColor,
            });
          }
        });

        // ✅ Remove spacing from the last item before each new label
        for (let i = 0; i < barData.length - 1; i++) {
          const current = barData[i];
          const next = barData[i + 1];

          if (!current.label && next.label && 'spacing' in current) {
            delete current.spacing;
          }
        }

        // Optional: Also remove spacing from the very last item if it has no label
        const lastItem = barData[barData.length - 1];
        if (lastItem && !lastItem.label && 'spacing' in lastItem) {
          delete lastItem.spacing;
        }

        // ✅ Ensure a dummy item exists after each label if next item is another label or nothing
        for (let i = 0; i < barData.length; i++) {
          const current = barData[i];
          const next = barData[i + 1];

          if (current.label && (!next || next.label)) {
            // Insert a dummy
            barData.splice(i + 1, 0, {
              value: 0,
              frontColor: 'transparent',
            });
          }
        }

        setMedicationnRecord(barData);
      })
      .catch(error => {
        // setLoader(false)
        console.log('what no found ?', error);
      });

    return;
    // const end = moment(ewformateddate ? ewformateddate : new Date());
    // const start = moment(ewformateddate ? ewformateddate : new Date()).subtract(
    //   7,
    //   'days'
    // );

    // let data = JSON.stringify({
    //   start_date: start.format('YYYY-MM-DD'),
    //   end_date: end.format('YYYY-MM-DD'),
    // });

    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_medication_records`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Cache-Control': 'no-cache',
    //     Pragma: 'no-cache',
    //     Expires: '0',
    //   },
    //   data: data,
    // };

    // axios
    //   .request(config)
    //   .then(response => {
    //     const allentriesArr = response.data.entries.items;

    //     console.log("allentriuesaarr", allentriesArr)

    //     // const grouped = {};

    //     // allentriesArr.forEach(entry => {
    //     //   const label = moment(entry.date, 'MMMM, DD YYYY').format('MMM DD');

    //     //   if (entry.medication_id) {
    //     //     if (!grouped[label]) {
    //     //       grouped[label] = 1;
    //     //     } else {
    //     //       grouped[label]++;
    //     //     }
    //     //   }
    //     // });
    //     // console.log("grouped============>>", grouped)
    //     const seenDates = new Set();
    //     const barData = [];

    //     allentriesArr.forEach(entry => {
    //       const formattedDate = moment(entry.date, 'MMMM, DD YYYY').format(
    //         'MMM DD',
    //       );
    //       const value = parseInt(entry.units) || 0;

    //       if (!seenDates.has(entry.date)) {
    //         seenDates.add(entry.date);
    //         barData.push({
    //           value,
    //           label: formattedDate,
    //           spacing: 2,
    //           frontColor: entry.frontColor,
    //           labelWidth: 30,
    //         });
    //       } else {
    //         barData.push({
    //           value,
    //           spacing: 0,
    //           frontColor: entry.frontColor,
    //         });
    //       }
    //     });

    //     // ✅ Remove spacing from the last item before each new label
    //     for (let i = 0; i < barData.length - 1; i++) {
    //       const current = barData[i];
    //       const next = barData[i + 1];

    //       if (!current.label && next.label && 'spacing' in current) {
    //         delete current.spacing;
    //       }
    //     }

    //     // Optional: Also remove spacing from the very last item if it has no label
    //     const lastItem = barData[barData.length - 1];
    //     if (lastItem && !lastItem.label && 'spacing' in lastItem) {
    //       delete lastItem.spacing;
    //     }

    //     // ✅ Ensure a dummy item exists after each label if next item is another label or nothing
    //     for (let i = 0; i < barData.length; i++) {
    //       const current = barData[i];
    //       const next = barData[i + 1];

    //       if (current.label && (!next || next.label)) {
    //         // Insert a dummy
    //         barData.splice(i + 1, 0, {
    //           value: 0,
    //           frontColor: 'transparent',
    //         });
    //       }
    //     }

    //     console.log("barData", barData)
    //     setMedicationnRecord(barData);
    //   })
    //   .catch(error => {
    //     // setLoader(false)
    //     console.log('what no found ?', error);
    //   });
  };
  

  const getDataVisualizer = selecallergens => {

    
    
    if (!selecallergens || selecallergens.length === 0) {
  
      // no allergens selected, clear chart data
      setPrimaryLineData([]);
      setSecondaryLineData([]);
      return;
    }
    setDataVisualizerLoader(true);
    const allergenParams = selecallergens
      .map(
        item => `scientific_names[]=${encodeURIComponent(item.allergen_name)}`,
      )
      .join('&');
    // console.log('selecteddate', selecteddate, 'allergenParams', allergenParams);


    const dateis = moment(selecteddate)
      .subtract('days', 6)
      .format('YYYY-MM-DD');

    // console.log('dateis', dateis);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/data_visualizer?lat=45.420057199999995&lng=-75.7003397&start_date=${dateis}&${allergenParams}`,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };

    axios
      .request(config)
      .then(response => {
        const apiData = response.data;


        const chartLineData = {};
        Object.keys(apiData).forEach(key => {
          if (key !== 'dates') {
            chartLineData[key] = apiData[key].map(val => ({value: val}));
          }
        });

        const allergenNames = Object.keys(chartLineData);

        console.log("allergenNames",chartLineData[allergenNames[0]], allergenNames)

        setPrimaryLineData(chartLineData[allergenNames[0]] || []);
        setSecondaryLineData(chartLineData[allergenNames[1]] || []);
        setDataVisualizerLoader(false);
      })
      .then(response => {
      
        setDataVisualizerLoader(false);
      })
      .catch(error => {
        setDataVisualizerLoader(false);
        console.log(error);
      });
  };

  const addAllergens = item => {
    setPollenLoader(true);

    if (takingMedications.length == 2) {
      setPollenLoader(false);
      return Alert.alert(
        'Limit Reached',
        `You can only view 2 allergens at a time. Please remove one of: ${takingMedications
          .map(item => item.allergen_name)
          .join(', ')}.`,
      );
    }

    let data = JSON.stringify({
      data: {
        allergen_name: item.name,
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/set_allergens`,
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
        setPollenLoader(false);
        // console.log(JSON.stringify(response.data));
        getSelectedAllergens();
      })
      .catch(error => {
        console.log(error);
        setPollenLoader(false);
      });
  };

  const getSelectedAllergens = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_allergens`,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };

    axios
      .request(config)
      .then(response => {
        console.log('allergens', response.data.allergens);
        getDataVisualizer(response.data.allergens);
        setTakingMedications(response.data.allergens);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteAllergens = item => {
    setLoadingItemId(item.id); // start loader

    let data = JSON.stringify({
      allergen_id: item.id,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/delete_allergen`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        // Remove the item from local state
        // const updatedList = takingMedications.filter(med => med.id !== item.id);
        // setTakingMedications(updatedList);
        getSelectedAllergens();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoadingItemId(null); // stop loader
      });
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

      await getMedicationApi();
      await getMedicationRecords(selecteddate);
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

      await getMedicationApi();
      await getMedicationRecords(selecteddate);
    } catch (error) {
      console.log(error);
    }
    setMedicationLoading(item.id, false);
  };



      console.log("selecallergens!!!!!!!!!!!!-------------->>>>>>>>>>",PrimaryLineData, SecondaryLineData)


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
          setOpen={() => setOpen(true)}
        />
      {/* {
        console.log("MedicationnRecord",MedicationnRecord)
      } */}

        {DataVisualizerLoader == true ? (
          <ActivityIndicator size={'large'} color={AppColors.BLACK} />
        ):(

        <View>
          {MedicationnRecord?.length > 0 ? (
            <View>
              <BarChart
                data={MedicationnRecord || []}
                barWidth={10}
                frontColor="#E23131" // bar color
                showLine
                lineData={PrimaryLineData}
                lineData2={SecondaryLineData}
                lineConfig={{
                  color: "lightblue",
                  thickness: 2,
                  curved: false,
                  dataPointsColor: "lightblue",
                  spacing: 60,
                }}
                lineConfig2={{
                  color: "lightgreen",
                  thickness: 2,
                  curved: false,
                  dataPointsColor: "lightgreen",
                  spacing: 60,
                }}
                xAxisLabelTextStyle={{
                  fontSize: 10, // 👈 smaller font size
                  color: '#000', // optional, customize color
                  fontWeight: '400', // optional
                  labelWidth: 80,
                }}
                barBorderRadius={2}
                isAnimated={true}
                
                noOfSections={7}
                spacing={40}
                formatYLabel={label => parseFloat(label).toFixed(0)}
                stepValue={1}
              />

              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  right: 0,
                  bottom: 40, 
                  gap: 11,
                }}>
                <AppText title={'Very High'} textSize={1.7} />
                <AppText title={'High'} textSize={1.7} />
                <AppText title={'Moderate'} textSize={1.7} />
                <AppText title={'Low'} textSize={1.7} />
              </View>
            </View>
          ) : (
            <AppText title={'No data available'} textSize={2} />
          )}
        </View>
        )}

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor: 'transparent',
          }}>
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
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <View
                style={{
                  height: responsiveHeight(6),
                  width: responsiveWidth(90),
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: AppColors.LIGHTGRAY,
                  marginTop: 5,
                  backgroundColor: colours[index],
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}>
                <AppText title={item.allergen_name} textSize={1.5} />

                {loadingItemId === item.id ? (
                  <ActivityIndicator size="small" color={AppColors.LIGHTGRAY} />
                ) : (
                  <TouchableOpacity onPress={() => deleteAllergens(item)}>
                    <AntDesign
                      name="minus"
                      size={responsiveFontSize(2)}
                      color={AppColors.LIGHTGRAY}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => getAllAllergens()}
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
            {/* <FlatList
              data={medicationData}
              contentContainerStyle={{marginTop: 20, paddingBottom: 100}}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      backgroundColor: item.frontColor,
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
            /> */}

            <FlatList
              data={medicationData}
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
                      <ActivityIndicator
                        size={'small'}
                        color={AppColors.BLACK}
                      />
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => removeMedication(item)}>
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
          </View>
        ) : (
          <View>
            <FlatList
              data={todayPollensData}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => addAllergens(item)}
                    style={{
                      height: responsiveHeight(6),
                      width: responsiveWidth(90),
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: AppColors.LIGHTGRAY,
                      marginTop: 5,
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                      paddingHorizontal: 20,
                    }}>
                    <AntDesign
                      name={'pluscircle'}
                      size={responsiveFontSize(2.5)}
                      color={AppColors.BTNCOLOURS}
                    />

                    <AppText title={item.common_name} textSize={1.5} />
                  </TouchableOpacity>
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
