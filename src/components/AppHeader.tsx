import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import BackIcon from './AppTextComps/BackIcon';
import { useNavigation } from '@react-navigation/native';

type props = {
  heading?: string;
  subheading?: string;
  Rightheading?: string;
  icon?: any;
  goBack?: boolean;
  date?: string;
  setOpen: (open: boolean) => void;
  selecteddate?: any;
  skipButton?: boolean
};

const AppHeader = ({
  Rightheading,
  heading,
  subheading,
  icon,
  goBack,
  date,
  setOpen,
  selecteddate,
  skipButton
}: props) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS == "android" ?  30 : 0
      }}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {goBack && (
            <View style={{marginRight: 10}}>
              <BackIcon />
            </View>
          )}

          {icon}
          <AppText
            title={heading}
            textFontWeight
            textSize={2.5}
            textColor={AppColors.BLACK}
          />
        </View>
        <AppText title={subheading} textColor={'#777777'} textSize={2} />
      </View>

      {
        skipButton ? (
          <TouchableOpacity onPress={()=> navigation.goBack()} style={{backgroundColor:AppColors.BTNCOLOURS, paddingHorizontal:20, paddingVertical:5, borderRadius:10}}>
            <AppText title={"Skip"} textSize={2} textColor={AppColors.WHITE} />
          </TouchableOpacity>
        ):(

      <TouchableOpacity onPress={setOpen}>
        <AppText
          title={Rightheading}
          textFontWeight
          textSize={2}
          textColor={AppColors.BLACK}
        />
        {selecteddate && (
          <AppText
            title={selecteddate}
            textColor={AppColors.BLACK}
            textSize={1.5}
          />
        )}
      </TouchableOpacity>
        )
      }

    </View>
  );
};

export default AppHeader;
