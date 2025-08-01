import Geocoder from 'react-native-geocoding';


export const GetCityName = async (lat, lng) => {
  try {
    const json = await Geocoder.from({ latitude: lat, longitude: lng });
    if (json.results.length > 0) {

      console.log("json..,", json)
      const addressComponents = json.results[0].address_components;

      // find locality (city)
      const cityComponent = addressComponents.find(c =>
        c.types.includes('locality')
      );

      console.log("cityComponent",cityComponent)

      if (cityComponent?.long_name) {
        return cityComponent.long_name; // e.g. Karachi
      }

      // fallback: sometimes city is in administrative_area_level_2
      const adminArea = addressComponents.find(c =>
        c.types.includes('administrative_area_level_2')
      );
      console.log("adminArea",adminArea)
      if (adminArea) {
        return adminArea.long_name;
      }
    }
    return null;
  } catch (err) {
    console.log('Geocoding error:', err);
    return null;
  }
};