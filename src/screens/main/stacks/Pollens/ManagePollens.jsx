import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
const ManagePollens = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const [myPollens, setMyPollens] = useState([]);

  const [Loader, setLoader] = useState(false);

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
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/get_pollens`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setMyPollens(response.data.data);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const deletePolles = (item) => {
    setLoader(true)

    let data = JSON.stringify({
      data: item.id,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userData.id}/delete_pollen`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        getAllPollens()
      })
      .catch(error => {
        console.log(error);
            setLoader(false)

      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{padding: 20}}>
          <AppHeader
            heading="Manage Pollens"
            icon={
              <Entypo
                name={'location-pin'}
                size={responsiveFontSize(2.5)}
                color={AppColors.BTNCOLOURS}
              />
            }
            goBack
          />
          {Loader == true ? (
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          ) : null}

          {myPollens ? (
            <NestableScrollContainer>
              <NestableDraggableFlatList
                data={myPollens}
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
                                    onPress: () => deletePolles(item),
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
                onDragEnd={({data}) => setMyPollens(data)}
                dragEnabled={true}
                activationDistance={10}
              />
            </NestableScrollContainer>
          ) : null}

          <View style={{marginTop: 20, gap: 10}}>
            <AppButton
              title={'Add Pollens'}
              bgColor={AppColors.BTNCOLOURS}
              RightColour={AppColors.rightArrowCOlor}
              handlePress={() => navigation.navigate('AddPollens')}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ManagePollens;
