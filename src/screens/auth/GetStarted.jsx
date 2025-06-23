import {View, Text} from 'react-native';
import React, {useState} from 'react';
import BackgroundScreen from '../../components/AppTextComps/BackgroundScreen';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import AppButton from '../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import BASE_URL from '../../utils/BASE_URL';
import axios from 'axios';
import {setSubscription} from '../../redux/Slices/AuthSlice';
import moment from 'moment';

const GetStarted = ({navigation}) => {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [subLoader, setSubLoader] = useState(false);
  const checkLoginandPremium = () => {
    if (userData?.email) {
      setSubLoader(true);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/allergy_data/v1/user/${userData?.id}/check_premium`,
        headers: {},
      };

      axios
        .request(config)
        .then(response => {
          console.log('Subscription data: ', response.data);

          setSubLoader(false);
          const expiry = response?.data?.expiry;



          if (response.data) {
            const isExpired = moment().isAfter(
              moment(expiry, 'YYYY-MM-DD'),
            );

            dispatch(
              setSubscription({
                isExpired: isExpired,
                expiry: expiry,
              }),
            );


            if (isExpired == false) {
              navigation.navigate('Main');
            } else {
              navigation.navigate('Subscription');
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      navigation.navigate('Subscription');
    }
  };

  return (
    <BackgroundScreen>
      <View style={{flex: 0.98, justifyContent: 'space-between'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AppText
            title={'Allergy Sufferers'}
            textColor={AppColors.WHITE}
            textSize={4}
            textFontWeight
          />
        </View>

        <AppButton
          bgColor={AppColors.WHITE}
          title={'GET STARTED'}
          textColor={AppColors.BTNCOLOURS}
          textSize={2}
          handlePress={() => checkLoginandPremium()}
          isLoading={subLoader}
          loadingColour={AppColors.PRIMARY}
        />
      </View>
    </BackgroundScreen>
  );
};

export default GetStarted;
