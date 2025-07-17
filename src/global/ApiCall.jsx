import { View, Text, Alert } from 'react-native'
import React from 'react'
import axios from 'axios'
import BASE_URL from '../utils/BASE_URL';
// import { useSelector } from 'react-redux';




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
            const res = await axios(config); // ✅ use axios or axios.request


        return res
    
    } catch (error) {
     return error
    } 
}


export const ApiCallWithUserId = async(method, endpoint, userId,data) => {
   try {

       let config = {
        method: method,
        url: `${BASE_URL}/allergy_data/v1/user/${userId}/${endpoint}`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data ? data : ''
        }

        const res = await axios(config)
       return res.data
    } catch (error) {
        console.log("error api call by userid", error)
     return error
    } 
}
