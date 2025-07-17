import {View, Text} from 'react-native';
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
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const DeleteAllData = () => {
  const data = useSelector(state => state.auth.user);
  const [loader, setLoader] = useState(false);

  const DeleteAllData = () => {
    setLoader(true);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${data.id}/remove_all_data`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setLoader(false);
        Toast.show({
          type:"success",
          text1:"All user data deleted"
        })
      })
      .catch(error => {
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
          handlePress={() => DeleteAllData()}
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
