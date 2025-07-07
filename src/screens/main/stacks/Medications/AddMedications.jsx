import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
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
import Toast from 'react-native-toast-message';
const AddMedications = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const [medicationData, setMedicationsData] = useState([]);
  const [MedicationLoader, setMedciationLoader] = useState(false);

  const [search, setSearch] = useState('');

  const [customMecication, setCustomMedication] = useState("")
  const [customMecicationLoader, setCustomMedicationLoader] = useState(false)
  const [addYourMedication, SetAddYourMedication] = useState(false);

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
    if (medicationdata.id === 6082) {
      console.log('other', medicationdata);
      SetAddYourMedication(true);
      return;
    }

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
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setMedciationLoader(false);
        Toast.show({
          type: 'success',
          text1: 'Medication added successfully',
        });
      })
      .catch(error => {
        setMedciationLoader(false);
        console.log(error);
      });
  };

  const AddCustomMedication = () => {

    if(customMecication == ""){
     return  Alert.alert("Please type a medication name")
    }

    setCustomMedicationLoader(true)
    

    

    let data = JSON.stringify({
      custom_medication: customMecication,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/set_medication_custom`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));

        setCustomMedicationLoader(false)
        SetAddYourMedication(false)
        getMedicationApi()
        
      })
      .catch(error => {
        console.log(error);
        setCustomMedicationLoader(false)
        SetAddYourMedication(false)
        getMedicationApi()
      });
  };
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

        <Modal
          visible={addYourMedication}
          style={{padding: 20}}
          animationType="fade">
          <View style={{padding: 20}}>
            <TouchableOpacity
              style={{height: 30, width: 30}}
              onPress={() => SetAddYourMedication(false)}>
              <AppText title={'X'} textSize={3} />
            </TouchableOpacity>
            <AppText title={'Add Medication'} textSize={3} textFontWeight />

            <TextInput
              placeholder="Enter your medication name here"
              style={{
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                color: AppColors.BLACK,
                marginTop: 20,
              }}
              onChangeText={(txt)=>{
                setCustomMedication(txt)
              }}
              value={customMecication}
            />

            <View style={{marginTop: 20}}>
              <AppButton
                title={'Add Medication'}
                handlePress={() => AddCustomMedication()}
                isLoading={customMecicationLoader}
              />
            </View>
          </View>
        </Modal>

        <View style={{gap: 10}}>
          <AppTextInput
            inputPlaceHolder={'Search Medications'}
            textInput={true}
            onChangeText={text => setSearch(text)}
          />

          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 220}}>
            {medicationData?.length > 0 ? (
              <>
                {medicationData
                  ?.filter(item =>
                    item.name
                      .toLowerCase()
                      .includes(search.trim().toLowerCase()),
                  )
                  .map((item, index) => {
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
                  })}
              </>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 20,
                }}>
                <AppText title={'Please buy a subscription'} textSize={2.2} />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMedications;
