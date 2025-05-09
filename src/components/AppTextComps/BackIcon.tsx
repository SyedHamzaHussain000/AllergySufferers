import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveFontSize} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
const BackIcon = () => {
  return (
    <TouchableOpacity>
      <Ionicons
        name={'arrow-back'}
        size={responsiveFontSize(3)}
        color={AppColors.WHITE}
      />
    </TouchableOpacity>
  );
};

export default BackIcon;
