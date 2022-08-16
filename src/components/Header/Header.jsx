import React,{useState} from 'react';
import {AppBar,Toolbar,Typography,InputBase,Box} from '@material-ui/core'
import {Autocomplete} from '@react-google-maps/api'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles.js'
import {useDispatch,useSelector} from 'react-redux'
import {setCoordinates} from '../../app/features/placesDetails/restaurantDetailsSlice'
const Header =()=>{
    const dispatch=useDispatch()
    const [autocomplete,setAutocomplete]=useState(null)
    //import styles as custom Hook
    const classes=useStyles()
    //select {coordinates} of restaurants from state of restaurantDetailsSlice
     const {coordinates}=useSelector((state)=>{
      return state.restaurantDetails
    })
    //to make auto compelte by two props [onLoad,onPlaceChange]
    const onLoad=(autoC)=>setAutocomplete(autoC)
    const onPlaceChanged=()=>{
      const lat=autocomplete.getPlace().geometry.location.lat();
      const lng=autocomplete.getPlace().geometry.location.lng();
      dispatch(setCoordinates({lat,lng}))
    }
    return(
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                {/* variant take the tag you determine such as h1,h5 or p */}
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                {/* Box like div but has property display flex */}
                <Box display='flex'>
                    <Typography variant='h6' className={classes.title}>
                        Explore New Places
                    </Typography>
                    {/*AutoComplete places in InputBase from API */}
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder='Search....' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                   </Autocomplete> 
                </Box>
            </Toolbar>
        </AppBar>
         
            
    )
}
export default Header