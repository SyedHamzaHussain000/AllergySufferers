import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import {setCurrentLatLng} from '../redux/Slices/AuthSlice';

export const GetCurrentLocation = userId => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Lat:', latitude, 'Lng:', longitude);

        resolve({latitude, longitude});
      },
      error => {
        console.error('Location error:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};
