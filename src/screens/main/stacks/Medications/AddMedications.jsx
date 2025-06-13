import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
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
import {useSelector} from 'react-redux';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoaderMode from '../../../../components/LoaderMode';
const AddMedications = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const [medicationData, setMedicationsData] = useState();
  const [MedicationLoader, setMedciationLoader] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getMedicationApi();
    });
    return nav;
  }, [navigation]);

  const getMedicationApi = () => {
    setMedciationLoader(true);
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
        setMedciationLoader(false);
      })
      .catch(error => {
        console.log(error);
        setMedciationLoader(false);
      });
  };

  const AddMedicationActive = medicationdata => {
    setMedciationLoader(true);
    let data = JSON.stringify({
      data: [medicationdata.id],
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/set_medications`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setMedciationLoader(false);
      })
      .catch(error => {
        setMedciationLoader(false);
        console.log(error);
      });
  };

   const filteredMedications = medicationData?.filter(item =>
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  );


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 20}}>
        <AppHeader
          heading="Add Medication"
          icon={
            <Entypo
              name={'location-pin'}
              size={responsiveFontSize(2.5)}
              color={AppColors.BTNCOLOURS}
            />
          }
          goBack
        />

        {MedicationLoader && <LoaderMode />}

        <View style={{gap: 10}}>
          <AppTextInput
            inputPlaceHolder={'Search Medications'}
            textInput={true}
            onChangeText={text => setSearch(text)}
          />
          <FlatList
            data={filteredMedications}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: 20, paddingBottom: 300}}
            renderItem={({item, index}) => {
              console.log('item', item);
              return (
                <TouchableOpacity
                  onPress={() => AddMedicationActive(item)}
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
                    borderBottomWidth:
                      index == medicationData?.length - 1 ? 1 : 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <View>
                      <AntDesign
                        name={'pluscircle'}
                        size={responsiveFontSize(2.5)}
                        color={AppColors.BTNCOLOURS}
                      />
                    </View>

                    <AppText
                      title={item.name}
                      textSize={2}
                      textColor={AppColors.BLACK}
                      textFontWeight
                      textwidth={70}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMedications;
