import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppImages from '../../assets/images/AppImages';
import SpeedoMeter from '../../components/SpeedoMeter';
import SelectionButton from '../../components/SelectionButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import axios from 'axios';
import BASE_URL from '../../utils/BASE_URL';
import DatePicker from 'react-native-date-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';

const Home = ({navigation}) => {
  const useData = useSelector(state => state.auth);

  const pollens = [
    {id: 1, name: 'Total Spores', top: true},
    {id: 2, name: 'Leptosphaeria etc.'},
    {id: 3, name: 'Elm'},
    {id: 4, name: 'Misc. Deuteromycota'},
    {id: 5, name: 'Misc. Basidiomycota'},
    {id: 6, name: 'Misc. Ascomycota'},
    {id: 7, name: 'Epicoccum'},
    {id: 8, name: 'Boxelder, Maple'},
    {id: 9, name: 'Diatrypaceae'},
    {id: 10, name: 'Cedar, Cypress, Juniper, Thu...'},
    {id: 11, name: 'Cladosporium'},
    {id: 12, name: 'Botrytis'},
    {id: 13, name: 'Aspergillus, Penicillium'},
    {id: 14, name: 'Alternaria'},
    {id: 15, name: 'Alder'},
    {id: 16, name: 'Smuts'},
    {id: 17, name: 'Aspen, Poplar'},
    {id: 18, name: 'Pleospora'},
    {id: 19, name: 'Powdery mildew', bottom: true},
  ];

  const [selected, setSelected] = useState('Today');
  const [PastPollenData, setPastPollenData] = useState();
  const [pollenData, setPollenData] = useState();
  const [FuturePollenData, setFuturePollenData] = useState();

  const [todayPollensData, setTodayPollensData] = useState();
  const [pollenLoader, setPollenLoader] = useState(false);

  //data states
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [PastDate, setPastDate] = useState(
    moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
  );
  const [FutureDate, setFutureDate] = useState(
    moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
  );

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getPollensData();
    });

    return nav;
  }, [navigation]);

  const getPollensData = () => {
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

        const past = response?.data?.forecast?.[city]?.past;
        const today = response?.data?.forecast?.[city]?.today;
        const future = response?.data?.forecast?.[city]?.future;

        setPollenData(response.data);

        setPastPollenData(past);
        setTodayPollensData(today);
        setFuturePollenData(future);

        setPollenLoader(false);
      })
      .catch(error => {
        console.log(error);
        setPollenLoader(false);
      });
  };

  const getThBgColour = level => {
    switch (level) {
      case 'Very High':
        return '#D72626';
      case 'High':
        return '#F26D24';
      case 'Moderate':
        return '#FDEB48';
      case 'Low':
        return '#99C817';
      default:
        return '#99C817';
    }
  };

  return (
    <LinearGradient
      colors={[
        getThBgColour(
          selected == 'Past'
            ? PastPollenData?.[PastDate]?.label
            : selected == 'Future'
            ? FuturePollenData?.[FutureDate]?.label
            : todayPollensData?.label,
        ),
        AppColors.WHITE,
      ]}
      // colors={[animatedColor, AppColors.WHITE]} // 🎯 animated start, static end
      style={{
        height: responsiveHeight(100),
        width: responsiveWidth(100),
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
          padding: 20,
          marginTop: Platform.OS == 'ios' ? 30 : 0,
        }}
        showsVerticalScrollIndicator={false}>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={selectedDate => {
            setOpen(false);
            const today = moment().startOf('day');
            const picked = moment(selectedDate).startOf('day');
            const formattedDate = picked.format('YYYY-MM-DD');

            if (picked.isAfter(today)) {
              if (FuturePollenData?.[formattedDate]?.label) {
                console.log('formated', formattedDate);
                setFutureDate(formattedDate);
                setSelected('Future');
              } else {
                Alert.alert(
                  'No Forecast Available',
                  'We couldn’t find any allergen forecast data for the selected date. Please try another day.',
                );
              }
            } else if (picked.isBefore(today)) {
              if (PastPollenData?.[formattedDate]?.label) {
                setPastDate(formattedDate);
                setSelected('Past');
              } else {
                Alert.alert(
                  'Unavailable Date',
                  'Data is only available for the past 7 days. Please select a more recent date.',
                );
              }
            } else {
              setSelected('Today');
            }
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Ionicons
          name={'notifications-outline'}
          size={responsiveFontSize(3)}
          color={AppColors.BLUE}
          style={{alignSelf: 'flex-end'}}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <FontAwesome6
              name={'location-dot'}
              size={responsiveFontSize(2)}
              color={AppColors.BLUE}
              style={{marginTop: 6}}
            />
            <View>
              {pollenLoader == true ? (
                <ActivityIndicator size={'small'} color={AppColors.BLACK} />
              ) : (
                <AppText
                  title={pollenData?.user?.locations?.closest?.name}
                  textSize={2.5}
                  textFontWeight
                />
              )}
              <AppText
                title={'Allergen Forecast'}
                textSize={2}
                textColor={'#777777'}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => setOpen(true)}>
            <AppText title={'Today'} textFontWeight textSize={2} />
            {pollenLoader == true ? (
              <ActivityIndicator size={'small'} color={AppColors.BLACK} />
            ) : (
              <AppText
                title={
                  selected == 'Past'
                    ? PastPollenData?.[PastDate]?.date_label
                    : selected == 'Future'
                    ? FuturePollenData?.[FutureDate]?.date_label
                    : pollenData?.today?.text
                }
                textColor={'#777777'}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20, gap: 20, height: responsiveHeight(35)}}>
          <AppText
            title={'Total Accumulated Pollen'}
            textAlignment={'center'}
            textSize={2.5}
            textColor={AppColors.BLACK}
            textFontWeight
          />

          <SpeedoMeter
            TextBottom={
              selected == 'Past'
                ? PastPollenData?.[PastDate]?.label
                : selected == 'Future'
                ? FuturePollenData?.[FutureDate]?.label
                : todayPollensData?.label
            }
          />
        </View>

        <View style={{flexDirection: 'row', gap: 5}}>
          <FlatList
            data={todayPollensData?.current}
            horizontal
            contentContainerStyle={{gap: 20}}
            renderItem={({item}) => {
              console.log('item', item);
              return (
                <View style={{gap: 10}}>
                  <AppText
                    title={item.name}
                    textAlignment={'center'}
                    textSize={1.5}
                    textColor={AppColors.BLACK}
                    textFontWeight
                  />

                  <SpeedoMeter
                    imgWeight={30}
                    imgHeight={10}
                    speedometerWidth={30}
                    imageTop={-10}
                    TextBottom={item?.level == 1 ? "Low" : item?.level == 2 ? "Moderate" : item?.level == 3 ? "High" : item?.level == 4 ? "Very High" : null  }
                    TempreaturePriority={'Moderate'}
                    
                    TempreaturePriorityFontSize={1.6}
                  />
                </View>
              );
            }}
          />
        </View>

        <View style={{flexDirection: 'row', gap: 10, marginBottom: 20}}>
          <SelectionButton
            title="Past"
            setSelected={() => setSelected('Past')}
            selected={selected}
          />

          <SelectionButton
            title="Today"
            setSelected={() => setSelected('Today')}
            selected={selected}
          />

          <SelectionButton
            title="Future"
            setSelected={() => setSelected('Future')}
            selected={selected}
          />
        </View>

        <AppText
          title={'Report displays all pollen and spores currently in the air.'}
          textAlignment={'center'}
          textSize={2}
          textwidth={70}
          textColor={AppColors.TEXTCOLOR}
        />

        {pollenLoader == true ? (
          <ActivityIndicator size={'large'} color={AppColors.BLACK} />
        ) : (
          <FlatList
            data={todayPollensData?.current}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderTopRightRadius: index == 0 ? 10 : 0,
                    borderTopLeftRadius: index == 0 ? 10 : 0,
                    borderBottomRightRadius:
                      index == todayPollensData?.current?.length - 1 ? 10 : 0,
                    borderBottomLeftRadius:
                      index == todayPollensData?.current?.length - 1 ? 10 : 0,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth:
                      index == todayPollensData?.current?.length - 1 ? 1 : 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 200,
                        borderWidth: 1,
                        borderColor: '#4C9E00',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 200,
                          backgroundColor: '#4C9E00',
                        }}
                      />
                    </View>

                    <AppText
                      title={item.name}
                      textSize={2}
                      textColor={AppColors.BLACK}
                      textFontWeight
                    />
                  </View>

                  <AntDesign
                    name={'plus'}
                    size={responsiveFontSize(2.5)}
                    color={'#777777'}
                  />
                </View>
              );
            }}
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;
