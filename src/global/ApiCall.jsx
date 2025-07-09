import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'
import BASE_URL from '../utils/BASE_URL';

export const ApiCall = async(method, endpoint, data) => {
   try {
       let config = {
        method: method,
        url: `${BASE_URL}/allergy_data/v1/user/${endpoint}`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };  
       await axios.create(config)
    } catch (error) {
     return error
    } 
}


export const ApiCallWithUserId = async(method, endpoint, data, userId) => {
   try {
       let config = {
        method: method,
        url: `${BASE_URL}/allergy_data/v1/user/${userId}/endpoint`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };  
       await axios.create(config)
    } catch (error) {
     return error
    } 
}
