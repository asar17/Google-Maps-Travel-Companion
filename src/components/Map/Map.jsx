import React,{useState} from 'react';
import GoogleMapReact from 'google-map-react';
import useStyles from './styles'
//import {GoogleMap} from 'react-google-maps'
import {useSelector,useDispatch} from 'react-redux'
import {setCoordinates,setBounds,setChildClicked} from '../../app/features/placesDetails/restaurantDetailsSlice'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import {Typography,useMediaQuery,Paper} from '@material-ui/core'
import { useEffect } from 'react';
import mapStyles from '../../mapStyles';


const Map =()=>{
  const [places,setPlaces]=useState([])
  //in large screen
  const isDesktop = useMediaQuery('(min-width:600px)');
  const dispatch=useDispatch()
  //select styles
  const classes=useStyles();
  //select {coordinates,bounds,details,filteredPlaces} of restaurants from state of restaurantDetailsSlice
  const {coordinates,bounds,details,filteredPlaces}=useSelector((state)=>{
    return state.restaurantDetails
  })

  //to switch between filteredPlaces and All places
  useEffect(()=>{
    if(filteredPlaces?.length){
      setPlaces(filteredPlaces)
    }
    else{
      setPlaces(details)
    }
  },[filteredPlaces,details])
  
 
//console.log(places)

    return(
        <div className={classes.mapContainer}>
          <GoogleMapReact 
            bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
            //defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            optionS={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
            onChange={(e)=>
                         {
                           dispatch(setCoordinates({lat:e.center.lat,lng:e.center.lng}))
                           dispatch(setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw}))
                         }
                     }
             onChildClick={(child)=>dispatch(setChildClicked({childClicked:child}))}
          >
            {/*map through palces to show them in map */}
            { places?.map((place,index)=>(
                <div
                  className={classes.markerContainer}
                  lat={Number(place?.latitude)}
                  lng={Number(place?.longitude)}
                  key={index}
                >
                    {
                     !isDesktop?
                        (<LocationOnIcon color='primary' fontSize='large'/>)
                        :
                        /*Paper asct as div but has backgroundColor property 
                          elevation property to make extra shadow */
                        (
                          <Paper elevation={3} className={classes.paper}>
                            <Typography className={classes.name} variant='subtitle2' gutterBottom>
                                {place.name}
                            </Typography>
                            <img
                              className={classes.pointer}
                              src={
                                  place.photo?
                                  (place.photo.images.large.url)
                                  :
                                  ('https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg')
                              }
                              alt={place.name}
                            />
                            <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                          </Paper>
                        )
                    }
                </div>
            ))}

          </GoogleMapReact>
        </div>
    )
}
export default Map