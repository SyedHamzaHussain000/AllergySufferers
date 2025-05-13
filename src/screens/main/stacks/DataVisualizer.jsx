import {View, Text, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import AppHeader from '../../../components/AppHeader';
import {BarChart} from 'react-native-chart-kit';
import AppColors from '../../../utils/AppColors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils/Responsive_Dimensions';
import AppText from '../../../components/AppTextComps/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign'
const DataVisualizer = () => {
  const screenWidth = Dimensions.get('window').width;

    const pollens = [
    {id:1, name: "Cladosporium", top: true},
    {id:2, name: "Low - Mar 28th, 2025", bottom:true },
  ]


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
    <View style={{padding: 20, flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="Data Visualizer"
        Rightheading="Today"
        subheading="Your Data, Visualized"
      />

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:20
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

      <View style={{height:responsiveHeight(6), width:responsiveWidth(90), borderWidth:1, borderRadius:10, borderColor:AppColors.LIGHTGRAY,  marginTop:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:20}}>
            <AppText title={"HAMILTON"}/>
            <AntDesign
            name={"plus"}
            size={responsiveFontSize(2)}
            color={AppColors.LIGHTGRAY}
            
            />
      </View>

      <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-between'}}>
        <TouchableOpacity style={{height:responsiveHeight(5), width:responsiveWidth(44), backgroundColor:AppColors.BTNCOLOURS, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
            <AppText title={"ALLERGENS"} textColor={AppColors.WHITE} textSize={2} textFontWeight/>
        </TouchableOpacity>


         <TouchableOpacity style={{height:responsiveHeight(5), width:responsiveWidth(44),borderWidth:1,  borderRadius:10, alignItems:'center', justifyContent:'center'}}>
            <AppText title={"MEDICATIONS"} textColor={AppColors.LIGHTGRAY} textSize={2} textFontWeight/>
        </TouchableOpacity>
      </View>


         <FlatList
      data={pollens}
      contentContainerStyle={{marginTop:20}}
      renderItem={({item})=>{
        return(
          <View style={{borderWidth:1, borderTopRightRadius: item.top ? 10 : 0, borderTopLeftRadius: item.top ? 10 : 0, borderBottomRightRadius: item.bottom ? 10 : 0, borderBottomLeftRadius: item.bottom ? 10 : 0, padding:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth: item.bottom ? 1 :0 }}>
            <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
      
            <AntDesign
            name={"pluscircle"}
            size={responsiveFontSize(2.5)}
            color={AppColors.BTNCOLOURS}
            
            />

              <AppText title={item.name} textSize={2} textColor={AppColors.BLACK} textFontWeight/>
            </View>


          </View>
        )
      }}
      
      />
      
    </View>
  );
};

export default DataVisualizer;
