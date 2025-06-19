import axios from "axios";
import BASE_URL from "../utils/BASE_URL";

export const AddCityApi = async (userid, cityname, lat, lng) => {


  let data = JSON.stringify({
    data: {
      lat: JSON.stringify(lat),
      lng: JSON.stringify(lng),
      city_name: cityname,
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/allergy_data/v1/user/${userid}/set_cities`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data
  } catch (error) {
    console.log("error", error);
    return { error: true, details: error?.response?.data || error.message };
  }
};
