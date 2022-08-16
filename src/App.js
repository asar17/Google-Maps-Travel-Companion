import React,{useState,useEffect,useCallback} from 'react'
import {CssBaseline,Grid} from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import {fetchRestaurantDetails,setCoordinates} from './app/features/placesDetails/restaurantDetailsSlice'
import {useDispatch,useSelector} from 'react-redux'
import {getPlacesData} from './api/index'
import {setType} from './app/features/type/typeSlice.js'

const App=()=>{
    const dispatch=useDispatch()
    //select bounds of restaurants from state of restaurantDetailsSlice
    const {bounds}=useSelector((state)=>{
        return state.restaurantDetails
    })
    //select the type of the place
    const type=useSelector((state)=>{
    return state.type2.type
    })
    //select the rating
    const rating=useSelector((state)=>{
    return state.rating.rating
    })
    //fetch details of restaurants after the page loaded depends on user's current position 
        //1
        const fetchRestaurant=useCallback(async()=>{
            dispatch(fetchRestaurantDetails(await {bounds,type}))
        },[bounds,dispatch,type])
        //2
        useEffect(()=>{
            fetchRestaurant()
        },[fetchRestaurant])
        //3
       useEffect(()=>{
            //to fecth user's current location
            navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            //set coordinates of the map equal coordinates of the user's current position
            dispatch(setCoordinates({lat:latitude,lng:longitude}))
           })
         },[dispatch])
    return(
        <>
        {/*for many css property such as border-box or padding etc..*/}
        <CssBaseline/>
        <Header/>
        {/* spacing for margins */}
        <Grid container spacing={3} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List/>
            </Grid>
            <Grid item xs={12} md={8}>
                <Map/>
            </Grid>
        </Grid>
        </>
    )
}
export default App;