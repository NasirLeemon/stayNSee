import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import List from "./List/List";
import Map from "./Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlaceData, getWeatherData } from "./api/axios";
import useStyles from './globalCss'

const App = () => {
  const [places, setPlaces] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
        // console.log(latitude, longitude);
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places?.filter(
      (place) => Number(place.rating) > rating
    );
    // console.log(filteredPlaces);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
   console.log(coordinates.lat , coordinates.lng)
    getWeatherData(coordinates?.lat , coordinates?.lng)
      .then((data)=> setWeatherData(data))

    getPlaceData(type, bounds.sw, bounds.ne)
      .then((data) => {
      setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [type, bounds]);

  // console.log({childClicked});
  console.log(places);
  console.log(filteredPlaces);


  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
