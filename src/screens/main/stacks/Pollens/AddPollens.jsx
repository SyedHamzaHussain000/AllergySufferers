import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../../../components/AppHeader';
import AppText from '../../../../components/AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../../utils/Responsive_Dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppColors from '../../../../utils/AppColors';
import Entypo from 'react-native-vector-icons/Entypo';
import AppButton from '../../../../components/AppButton';
import SocialAuthButton from '../../../../components/SocialAuthButton';
import AppTextInput from '../../../../components/AppTextInput';
import Octicons from 'react-native-vector-icons/Octicons';
import BASE_URL from '../../../../utils/BASE_URL';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
const AddPollens = ({navigation}) => {
  const [allPollens, setALlPollens] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getAllPollens();
    });

    return nav;
  }, [navigation]);

  const getAllPollens = () => {
    setLoader(true);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/get_allergy_data`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        setALlPollens(response?.data?.pollens_list);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  return (
    <View style={{padding: 20}}>
      <AppHeader
        heading="Add Pollens"
        icon={
          <Entypo
            name={'location-pin'}
            size={responsiveFontSize(2.5)}
            color={AppColors.BTNCOLOURS}
          />
        }
        goBack
      />

      <View style={{gap: 10}}>
        <AppTextInput
          inputPlaceHolder={'Search Pollens'}
          textInput={true}
          onChangeText={res => setSearch(res)}
          value={search}
        />
      </View>

      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
        {allPollens
          .filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) || 
            item.common_name.toLowerCase().includes(search.toLowerCase()) 
          )
          .map((item, index) => (
            <View
              style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: AppColors.BLACK,
                marginTop: 10,
                flexDirection:'row', 
                alignItems:'center',
                justifyContent:'space-between'
              }}>
                <View>
              <AppText title={item.name} textSize={2} textFontWeight textwidth={70} />
              <AppText title={item.common_name} textSize={1.8} />
                </View>

              <TouchableOpacity>

                <AntDesign
                name={"pluscircle"}
                size={responsiveFontSize(3)}
                color={AppColors.BTNCOLOURS}
                />
                </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default AddPollens;
