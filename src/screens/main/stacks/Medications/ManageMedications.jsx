import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image,
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
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppImages from '../../../../assets/images/AppImages';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {ApiCallWithUserId} from '../../../../global/ApiCall';
import {
  deleteActiveMedication,
  removeCurrentActiveMedication,
  RemoveUpdateMedicationListOnEveryDate,
} from '../../../../redux/Slices/MedicationSlice';
import Toast from 'react-native-toast-message';
// import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"

const ManageMedications = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const allActiveMedicationRedux = useSelector(
    state => state.medications.MyCurrentMeds,
  );
  const ActiveMedications = useSelector(
    state => state.medications.ActiveMedications,
  );

  const [activeMedication, setActiveMedication] = useState([]);
  const [loader, setLoader] = useState(false);

  const [data3, setData3] = useState([1, 2, 3, 4]);

  const [date, setDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(null);
  const [selecteddate, setSelectedDate] = useState(
    moment().local().format('YYYY-MM-DD'),
  );
  const [open, setOpen] = useState(false);



  const deleteActiveMedicationRedux = async medData => {
    // dispatch( deleteActiveMedication(medData))
    
    // return
    dispatch(RemoveUpdateMedicationListOnEveryDate(medData));
    dispatch(removeCurrentActiveMedication(medData));

    // return
    
    const deleteMed = await ApiCallWithUserId('post', 'delete_medication', userData?.id, {"data":medData.id})
    
    console.log("deleteMed : ",deleteMed)
    Toast.show({
      type:'success',
      text1: 'Medication Deleted',
      position: 'bottom',
      visibilityTime: 800,
    })
    // console.log("deleteMed", medData.id)
    // return
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{padding: 20}}>
          <AppHeader
            heading={`Manage ${'\n'}Medications`}
            goBack
            
          />

          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            minimumDate={activeDate ? activeDate : new Date()}
            maximumDate={new Date()}
            onConfirm={selectedDate => {
              setDate(selectedDate);
              setOpen(false);
              const picked = moment(selectedDate).startOf('day');
              const formattedDate = picked.format('YYYY-MM-DD');
              setSelectedDate(formattedDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <View style={{gap: 10}}>
            <AppText
              textSize={'Active Medication'}
              textColor={AppColors.BLACK}
              textFontWeight
            />

            {/* {loader && (
              <ActivityIndicator size={'large'} color={AppColors.BLACK} />
            )} */}

            {allActiveMedicationRedux ? (
              <NestableScrollContainer>
                <NestableDraggableFlatList
                  data={allActiveMedicationRedux}
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
                                      onPress: () =>
                                        deleteActiveMedicationRedux(item),
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
                            <View style={{marginTop: 4}}>
                              <Image
                                source={AppImages.updown}
                                style={{
                                  height: 14,
                                  width: 14,
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
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
          </View>

          <View style={{marginTop: 20, gap: 10}}>
            <AppButton
              title={'Add MEDICATION'}
              bgColor={AppColors.BTNCOLOURS}
              RightColour={AppColors.rightArrowCOlor}
              handlePress={() => navigation.navigate('AddMedications')}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ManageMedications;
