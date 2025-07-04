import axios from 'axios';

export default GetLocation = async (lat, lng) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD3LZ2CmmJizWJlnW4u3fYb44RJvVuxizc`,
      headers: {},
    };

    const res = await axios.request(config);
    return res;
  } catch (error) {}
};
