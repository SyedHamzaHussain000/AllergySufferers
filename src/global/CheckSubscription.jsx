import axios from "axios";
import { Alert } from "react-native";

export default CheckSubscription = async (userId) => {


    try {
        
    
         let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/allergy_data/v1/user/${userId}/check_premium`,
        headers: {},
      };

    const response = await  axios.request(config)    
    return response?.data
    } catch (error) {
     console.log("error")
     return error   
    }
}