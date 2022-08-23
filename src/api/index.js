import React from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'


    
 export const  getPlacesData=async({bounds,type})=>{
     
   
    try {
                
                //restaurant API
                const URL=`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
                const options = {
                params: {
                    bl_latitude: bounds?.sw?.lat,
                    tr_latitude: bounds?.ne?.lat,
                    bl_longitude: bounds?.sw?.lng,
                    tr_longitude: bounds?.ne?.lng,
                },
                headers: { 
                    'X-RapidAPI-Key':process.env.REACT_APP_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
                };
      

                const {data:{data}}=await axios.get(URL,options)
                return data
        }
    catch(error){
                 console.log(error)
        }         
    
}


 
