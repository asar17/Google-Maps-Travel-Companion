import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
//api function for fetch details of restaurant
import {getPlacesData} from '../../../api/index'

const initialState={
    loading:false,
    childClicked:null,
    details:[],
    filteredPlaces:[],
    coordinates:{
        lat:0,
        lng:0
       },
    bounds:null,
    error:''
}
//fetch data from rapid API of restaurant by bounds depend on user's current location
export const fetchRestaurantDetails=createAsyncThunk('restaurantDetails/fetchRestaurantDetails',async({bounds,type})=>{
             return   getPlacesData({bounds,type})
})


//create slice
const restaurantDetailsSlice=createSlice({
    name:'restaurantDetails',
    initialState,
    reducers:{
        //reset coordinates
        setCoordinates:(state,action)=>{
            state.coordinates.lat=action.payload.lat
            state.coordinates.lng=action.payload.lng
        },
        //reset bounds
        setBounds:(state,action)=>{
            state.bounds=action.payload
        },
        //determine which restaurant is clicked
        setChildClicked:(state,action)=>{
            state.childClicked=action.payload.childClicked
        },
        setFilteredPlaces:(state,action)=>{
            state.filteredPlaces=action.payload.filteredPlaces
        }
    },
    //reset details 
    extraReducers:(builder)=>{
        builder.addCase(fetchRestaurantDetails.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchRestaurantDetails.fulfilled,(state,action)=>{
            state.loading=false
            state.details=action.payload.filter((place)=>place.name&&place.num_reviews>0)
            state.error=''
        })
        builder.addCase(fetchRestaurantDetails.rejected,(state,action)=>{
            state.loading=false
            state.details=[]
            state.error=action.payload.message
        })

    }
  
})
export default restaurantDetailsSlice.reducer
export const {setCoordinates,setBounds,setChildClicked,setFilteredPlaces}=restaurantDetailsSlice.actions
