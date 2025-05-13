import {View, Text, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { responsiveFontSize, responsiveWidth } from '../../../utils/Responsive_Dimensions';

const EnterOtp = () => {
const CELL_COUNT = 4;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
        <View
      style={{
        padding: 20,
        backgroundColor: AppColors.WHITE,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <AppText
          title={'Enter Verification Code'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
        <AppText
          title={'We can help to recover your account'}
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
        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />
      </View>

      <AppButton title={'Submit'} RightColour={AppColors.WHITE} />
    </View>
  )
}

export default EnterOtp



const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: responsiveWidth(20),
    height: 40,
    lineHeight: 38,
    fontSize: responsiveFontSize(5),
    borderWidth: 0,
    borderBottomWidth:1,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: AppColors.BLUE,
  },
});