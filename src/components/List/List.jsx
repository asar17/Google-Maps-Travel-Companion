import React,{useEffect,createRef,useState} from 'react';
import useStyles from './styles'
import {CircularProgress,Typography,FormControl,InputLabel,Select,MenuItem,Grid} from '@material-ui/core'
import {useSelector,useDispatch} from 'react-redux'
import {setType} from '../../app/features/type/typeSlice.js'
import {setRating} from '../../app/features/rating/ratingSlice.js'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import {setFilteredPlaces} from '../../app/features/placesDetails/restaurantDetailsSlice'

const List =()=>{
  const [places,setPlaces]=useState([]);
  const [elRef,setElRef]=useState([])
  const dispatch=useDispatch()
  const classes=useStyles()
  //select the type
  const type2=useSelector((state)=>{
       return state.type2.type
  })
  //select the rating
  const rating=useSelector((state)=>{
    return state.rating.rating
  })
  //console.log('rating',rating)
  //select [loading,details,childClicked] of restaurants from state of restaurantDetailsSlice 
  const {loading,details,childClicked,filteredPlaces}=useSelector((state)=>{
    return state.restaurantDetails
  })

      
       useEffect(() => {
         const ref=Array(details.length).fill().map((_,index)=>elRef[index]||createRef())
         setElRef(ref)
      }, [details]);

      //to filter places depend on Rating
      useEffect(()=>{
        dispatch(setFilteredPlaces({filteredPlaces:details.filter((detail)=>detail.rating>rating)}))

      },[rating])
      //to filter places depend on Type
      useEffect(()=>{
        dispatch(setFilteredPlaces({filteredPlaces:details?.filter((detail)=>detail?.category?.key===type2)}))
      },[type2])
      //to switch between filteredPlaces and All places
      useEffect(()=>{
        if(filteredPlaces?.length){
          setPlaces(filteredPlaces)
        }
        else{
          setPlaces(details)
        }
      },[filteredPlaces,details])
      
  
    return(
        <div className={classes.container}>
          <Typography variant='h4'>
            Restaurants, Hotels & Attraction around you
          </Typography>
         {loading?
         (
           <div className={classes.loading}>
             <CircularProgress size='5rem'/>
           </div>
         ):
         (
           <>
            {/*choose Type*/}
            <FormControl  className={classes.formControl} style={{width:'70px',marginBottom:'20px'}}>
              <InputLabel>Type</InputLabel>
              <Select value={type2} onChange={(e)=>dispatch(setType({type:e.target.value}))}>
                <MenuItem value='restaurants'>Restaurant</MenuItem>
                <MenuItem value='hotels'>Hotels</MenuItem>
                <MenuItem value='attractions'>Attraction</MenuItem>
              </Select>
            </FormControl>
            {/*choose Rating */}
            <FormControl  className={classes.formControl} style={{width:'70px',marginLeft:'15px'}}>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={(e)=>dispatch(setRating({rating:e.target.value}))}>
                <MenuItem value={0} >All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
            {/*print places */}
            <Grid container spacing={3} className={classes.list}>
                {
                    places?.map((place,index)=>{

                      return(
                        <Grid ref={elRef[index]} item xs={12} >
                            <PlaceDetails  detail={place} selected={Number(childClicked)===index} refProp={elRef[index]}/>
                        </Grid> 
                        )
                    })
              }
            </Grid>
           </>
         )}
        </div>
    )
}
export default List
//{filteredPlaces?.length?filteredPlaces:detail}