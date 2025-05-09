import {View, Text, FlatList} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { responsiveFontSize } from '../../utils/Responsive_Dimensions';
const More = () => {
  const pollens = [
    {id: 1, name: 'App Settings', top: true},
    {id: 2, name: 'Data Visualizer'},
    {id: 3, name: 'Help'},
    {id: 4, name: 'Send Feedback'},
    {id: 5, name: 'Account'},
    {id: 6, name: 'Tips & Tricks'},
    {id: 7, name: 'Pollen Information for Canada', bottom: true},
  ];

  return (
    <View style={{padding: 20}}>
      <AppHeader heading="More" />

      <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
        <AppText title={'Account ID: 2157945'} textSize={2} />
        <AppText title={'App Version: 2.0.108'} textSize={2} />
      </View>

      <View
        style={{
          padding: 10,
          backgroundColor: '#3D56F0',
          borderRadius: 10,
          marginTop: 20,
        }}>
        <AppText
          title={'Subscription Status: Premium'}
          textColor={AppColors.WHITE}
          textSize={2}
          textFontWeight
        />
      </View>

      <View style={{}}>
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
      </View>
    </View>
  );
};

export default More;
