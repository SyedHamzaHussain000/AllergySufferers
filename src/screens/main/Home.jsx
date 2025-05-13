import {View, Text, Image, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
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
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
  DangerPath,
} from 'react-native-cool-speedometer';
import AppImages from '../../assets/images/AppImages';
import SpeedoMeter from '../../components/SpeedoMeter';
import SelectionButton from '../../components/SelectionButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Home = () => {
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

  const [selected, setSelected] = useState('');

  return (
    <LinearGradient
      colors={[AppColors.BGCOLOURS, AppColors.WHITE]}
      style={{
        height: responsiveHeight(100),
        width: responsiveWidth(100),
        padding: 15,
      }}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
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
              <AppText title={'Hamilton'} textSize={2.5} textFontWeight />
              <AppText
                title={'Allergen Forecast'}
                textSize={2}
                textColor={'#777777'}
              />
            </View>
          </View>

          <View>
            <AppText title={'Today'} textFontWeight textSize={2} />
            <AppText title={'March 27th 2025'} textColor={'#777777'} />
          </View>
        </View>

        <View style={{marginTop: 20, gap: 20, height: responsiveHeight(35)}}>
          <AppText
            title={'Total Accumulated Pollen'}
            textAlignment={'center'}
            textSize={2.5}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <SpeedoMeter />
        </View>

        <View style={{flexDirection: 'row', gap: 5}}>
          <View style={{gap: 10}}>
            <AppText
              title={'BOXELDER, M'}
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
              TextBottom={-110}
              TempreaturePriority={'Moderate'}
              TempreaturePriorityFontSize={1.6}
            />
          </View>

          <View style={{gap: 10}}>
            <AppText
              title={'CEDAR, CYPR...'}
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
              TextBottom={-110}
              TempreaturePriority={'High'}
              TempreaturePriorityFontSize={1.6}
            />
          </View>

          <View style={{gap: 10}}>
            <AppText
              title={'ELM'}
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
              TextBottom={-110}
              TempreaturePriority={'Very High'}
              TempreaturePriorityFontSize={1.6}
            />
          </View>
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

        <FlatList
          data={pollens}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderTopRightRadius: item.top ? 10 : 0,
                  borderTopLeftRadius: item.top ? 10 : 0,
                  borderBottomRightRadius: item.bottom ? 10 : 0,
                  borderBottomLeftRadius: item.bottom ? 10 : 0,
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: item.bottom ? 1 : 0,
                }}>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
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
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;
