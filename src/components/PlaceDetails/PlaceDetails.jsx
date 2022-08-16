import React,{useState,useEffect,createRef} from 'react' 
import {useSelector} from 'react-redux'
import useStyles from './styles'
import {Card,CardMedia,CardActions,Button,CardContent,Typography,Box,Chip} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';


const PlaceDetails=({detail,selected,refProp})=>{
    //console.log('selceted',selected)
    //import styles as custom Hook
    const classes=useStyles()  
    //to scroll to the clicked restaurant
    if(selected) refProp?.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    return(
        
               //elevation property to make extra shadow  
               <Card  elevation={6}>
                   {/*cardMedia for image selfClose tag hase 3 attribute [style/image/title]*/}
                   <CardMedia
                   style={{height:350}}
                   image={
                       detail?.photo?
                       detail?.photo?.images?.large?.url
                       :
                       'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                    
                    }
                   title={detail?.name}
                   />
                   
                   <CardContent>
                       {/*gutterBottom property for extra margin */}
                       {/*to print the name of restaurant */}
                       <Typography gutterBottom variant='h5'>{detail?.name}</Typography>

                       {/* Box for display Rating*/}
                       <Box display='flex' justifyContent='space-between'>
                           <Rating value={Number(detail?.rating)}readOnly/>
                           <Typography gutterBottom variant='subtitle1'>out of {detail?.num_reviews} reviews</Typography>
                       </Box>

                       {/* Box for display Price */}
                       <Box display='flex' justifyContent='space-between'>
                           <Typography variant='subtitle1'>Price</Typography>
                           <Typography gutterBottom variant='subtitle1'>{detail?.price_level}</Typography>
                       </Box>

                       {/* box for display Ranking */}
                       <Box display='flex' justifyContent='space-between'>
                           <Typography variant='subtitle1'>Ranking</Typography>
                           <Typography gutterBottom variant='p'>{detail?.ranking}</Typography>
                       </Box>

                       {/*map through all awards of restaurant */}
                       {detail?.awards?.map((award)=>(
                           <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
                               <img src={award?.images?.small} alt={award?.display_name}/>
                               <Typography variant='subtitle2' color='textSecondary'>{award?.display_name}</Typography>
                           </Box>
                       ))}

                       {/*map through cuisine which type of food does eacg restaurant perpare*/}
                       {detail?.cuisine?.map(({name})=>(
                           <Chip key={name} size='small' label={name} className={classes.chip}>
                               {name}
                           </Chip>
                       ))}

                       {/* to know the address of restaurant*/}
                       {detail?.address&&
                           (
                             <Typography style={{fontSize:'10px'}} gutterBottom variant='p' color='textSecondry' className={classes.subtitle}>
                                 <LocationOnIcon/> {detail?.address}
                             </Typography>
                           )
                       }

                        {/* to know the phone number of restaurant*/}
                        {detail?.phone&&
                           (
                             <Typography  gutterBottom variant='p' color='textSecondry' className={classes.spacing}>
                                 <PhoneIcon/> {detail?.phone}
                             </Typography>
                           )
                       }

                       {/*CardAction act Container for Buttons*/}
                       <CardActions>
                           {/*to rediect to the website of restaurant */}
                           <Button size='small' color='primary' onClick={()=>window.open(detail?.web_url,'_blank')}>
                               Trip Advisor
                           </Button>
                           <Button size='small' color='primary' onClick={()=>window.open(detail?.website,'_blank')}>
                               Website
                           </Button>

                       </CardActions>
                   </CardContent>
               </Card>
             )
}
export default PlaceDetails
