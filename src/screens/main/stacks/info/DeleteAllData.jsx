import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../../../components/AppTextComps/AppText';
import AppColors from '../../../../utils/AppColors';
import AppHeader from '../../../../components/AppHeader';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../../utils/Responsive_Dimensions';
import AppButton from '../../../../components/AppButton';
import BASE_URL from '../../../../utils/BASE_URL';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { deleteAllData } from '../../../../redux/Slices/MedicationSlice';
import { persistor } from '../../../../redux/store';

const DeleteAllData = () => {
  const data = useSelector(state => state.auth.user);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch()

  const DeletemyAllData = () => {
    setLoader(true);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${data.id}/remove_all_data`,
      headers: {},
    };

    axios
      .request(config)
      .then(async response => {
        // console.log(JSON.stringify(response.data));
        dispatch(deleteAllData())
          await persistor.purge(); // 2. clear persisted storage
          await persistor.flush(); // 3. force-flush queued writes

        setLoader(false);

        Toast.show({
          type: 'success',
          text1: 'All user data deleted',
        });
      })
      .catch(error => {
        dispatch(deleteAllData())
        console.log(error);
        setLoader(false);
      });
  };
  return (
    <View style={{padding: 20}}>
      <AppHeader goBack={true} heading="Delete All Data" />

      <View
        style={{
          height: responsiveHeight(100),
          justifyContent: 'center',
          gap: 20,
        }}>
        <AppButton
          title={'Yes, delete my data'}
          RightColour={AppColors.rightArrowCOlor}
          handlePress={() =>
            Alert.alert(
              'Confirm Delete',
              'This will permanently delete all your data. Are you sure you want to delete all your data? ',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Yes',
                  onPress: () => DeletemyAllData(),
                  style: 'destructive',
                },
              ],
              {cancelable: true},
            )
          }
          isLoading={loader}
        />

        <View
          style={{
            flexDirection: 'row',
            width: responsiveWidth(80),
            alignSelf: 'center',
          }}>
          <AppText
            title={'Note:'}
            textFontWeight
            textColor={AppColors.BLACK}
            textSize={1.7}
          />
          <AppText
            textSize={1.7}
            title={
              'This will send a request to irrevocably delete all your data. Are you sure you want to do this?'
            }
            textColor={AppColors.LIGHTGRAY}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteAllData;
