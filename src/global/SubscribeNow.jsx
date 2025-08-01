import axios from "axios";
import BASE_URL from "../utils/BASE_URL";

const SubscribeNow = async(subscriptionType, userId) => {


  let data = new FormData();
  data.append('duration', subscriptionType);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/allergy_data/v1/user/${userId}/set_premium`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  };

    const reponse = await axios.request(config)

    return reponse.data
    
};

export default SubscribeNow;
