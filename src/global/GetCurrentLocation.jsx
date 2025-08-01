import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';

export const GetCurrentLocation = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Allergy Sufferers',
        message: 'Allergy sufferers want to access your location',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('granted', granted);

      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          pos => {
            console.log("poosition", pos);
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          err => reject(err),
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
    } else {
      {
        console.log('Location permission denied');
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
