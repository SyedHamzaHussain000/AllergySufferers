import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import BASE_URL from '../../../utils/BASE_URL';
import axios from 'axios';
import ShowError from '../../../utils/ShowError';

const EnterOtp = ({navigation, route}) => {
  const {email} = route.params;
  const CELL_COUNT = 6;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [loader, setLoader] = useState(false);

  const VerifyOtpApi = () => {
    if (value.length != 6) {
      Alert.alert('Otp Required', 'Please enter your otp');
      return;
    }
    setLoader(true);

    let data = new FormData();
    data.append('email', email);
    data.append('otp', value);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/verify-otp`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log('res', JSON.stringify(response.data));
        if (response.data.status == 'success') {
          ShowError(response.data.message, 1000);
          navigation.navigate('EnternewPassword', {email: email});
          setLoader(false);
        } else {
          ShowError('Please enter a correct code', 1000);
          setLoader(false);
        }
      })
      .catch(error => {
        ShowError(error?.response?.data?.message, 1000);
        setLoader(false);
        console.log(error.response);
      });
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: AppColors.WHITE,
        flex: 1,
        justifyContent: 'center',
        gap: 30,
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <AppText
          title={'Enter Verification Code'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
        <AppText
          title={'Reset your password'}
          textColor={AppColors.LIGHTGRAY}
          textSize={1.8}
        />
      </View>

      <View>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({
            android: 'sms-otp',
            default: 'one-time-code',
          })}
          testID="my-code-input"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>

      <AppButton
        title={'Submit'}
        RightColour={AppColors.WHITE}
        handlePress={() => VerifyOtpApi()}
        isLoading={loader}
      />
    </View>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: responsiveWidth(10),
    height: 40,
    lineHeight: 38,
    fontSize: responsiveFontSize(4),
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#000000',
    textAlign: 'center',
    color: AppColors.BTNCOLOURS,
  },
  focusCell: {
    borderColor: AppColors.BLUE,
  },
});
