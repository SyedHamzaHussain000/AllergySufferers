import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
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
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"

const ManageMedications = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);

  const [activeMedication, setActiveMedication] = useState([]);
  const [loader, setLoader] = useState(false);

  const [data3, setData3] = useState([1, 2, 3, 4]);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getActiveMedication();
    });
    return nav;
  }, [navigation]);

  const getActiveMedication = () => {
    setLoader(true);
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
        console.log(JSON.stringify(response.data));
        setLoader(false);
        setActiveMedication(response.data.data);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const deleteActiveMedication = medicationdata => {

    setLoader(true);
    let data = JSON.stringify({
      data: medicationdata?.id,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/delete_medication`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        getActiveMedication();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{padding: 20}}>
        <AppHeader
          heading="Manage Medications"
          icon={
            <Entypo
              name={'location-pin'}
              size={responsiveFontSize(2.5)}
              color={AppColors.BTNCOLOURS}
            />
          }
          goBack
        />

        <View style={{marginTop: 20, gap: 10}}>
          <AppButton
            title={'Add MEDICATION'}
            bgColor={AppColors.BTNCOLOURS}
            RightColour={AppColors.rightArrowCOlor}
            handlePress={() => navigation.navigate('AddMedications')}
          />
        </View>

        <View style={{gap: 10}}>
          <AppText
            textSize={'Active Medication'}
            textColor={AppColors.BLACK}
            textFontWeight
          />

          {loader && (
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          )}

          {activeMedication ? (
            <NestableScrollContainer>
              <NestableDraggableFlatList
                data={activeMedication}
                contentContainerStyle={{gap: 10}}
                renderItem={({item, drag, isActive}) => {
                  return (
                    <TouchableOpacity onLongPress={drag}>
                      <AppTextInput
                        inputPlaceHolder={item.name}
                        inputWidth={75}
                        arrowDelete={
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                'Delete Medication',
                                'Are you sure you want to delete this medication?',
                                [
                                  {
                                    text: 'Cancel',
                                    onPress: () =>
                                      console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'OK',
                                    onPress: () => deleteActiveMedication(item),
                                  },
                                ],
                                {cancelable: false},
                              )
                            }>
                            <MaterialCommunityIcons
                              name={'delete'}
                              size={responsiveFontSize(2.5)}
                              color={AppColors.LIGHTGRAY}
                            />
                          </TouchableOpacity>
                        }
                        rightLogo={
                          <Octicons
                            name={'arrow-switch'}
                            size={responsiveFontSize(2.5)}
                            color={AppColors.LIGHTGRAY}
                          />
                        }
                      />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
                onDragEnd={({data}) => setActiveMedication(data)}
                dragEnabled={true}
                activationDistance={10}
              />
            </NestableScrollContainer>
          ) : null}

          {/* <AppTextInput inputPlaceHolder={"Advil Cold and Sinus"} inputWidth={75} rightLogo={<Octicons name={"arrow-switch"} size={responsiveFontSize(2)} color={AppColors.LIGHTGRAY} />}/>
         <AppTextInput inputPlaceHolder={"A Generic Brand"} inputWidth={75} rightLogo={<Octicons name={"arrow-switch"} size={responsiveFontSize(2)} color={AppColors.LIGHTGRAY} />}/> */}
        </View>
      </View>
    </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ManageMedications;
