import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import  Rating  from "@material-ui/lab/Rating";

import useStyles from "./styles";
import mapStyles from "./mapStyles";

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
  const classes = useStyles();
  const isdesktop = useMediaQuery("(min-width:600px)");

  // const onChildClick = () => {};
  console.log(weatherData);

  return (
    <div className={classes.mapContainer} styles={{width:'100vh', position : 'fixed'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI:true, zoomControl:true, styles:mapStyles}}
        center={coordinates}      
        onChange={(e)=>{
          setCoordinates({lat:e.center.lat, lng:e.center.lng})
          setBounds({ne:e.marginBounds.ne, sw:e.marginBounds.sw})
        }}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {
          places?.map((place, i)=>(
            <div
            className={classes.markerContainer}
            key={i}
            lat={Number(place.latitude)} 
            lng={Number(place.longitude)}
            >
            {
              !isdesktop? (
              <LocationOnOutlinedIcon color="primary" fontSize="large"/> ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant='subtitle2' gutterBottom >
                  {place.name}
                  </Typography>
                  <img src={place.photo? place.photo.images.large.url : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"} alt={place.name} />
                <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
            </div>
          ))
        }
        {
          weatherData && 
            <div lat={weatherData?.coords?.lat} lng={weatherData?.coords?.lng}>
              <img height={100} src={ weatherData.weather? (`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`) : (`https://openweathermap.org/img/wn/10d@2x.png`)} alt="" />
            </div>
          
        }
      </GoogleMapReact>
    </div>
  );
};

export default Map;
