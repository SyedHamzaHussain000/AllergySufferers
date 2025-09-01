import axios from 'axios';
import BASE_URL from '../utils/BASE_URL';

export default async function GetAllLocation(userId) {
  console.log("get_cities",userId)
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/allergy_data/v1/user/${userId}/get_cities`,
      headers: {},
    };

    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    return error;
  }
}
