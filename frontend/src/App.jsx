import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherResult from './components/WeatherResult/WeatherResult'
import axios from 'axios';


function App() {
const [weatherData,setWeatherData]= useState(null);

async function getData(){  
  try {
    //using geolocation api to get user's current location
     navigator.geolocation.getCurrentPosition(async (position)=>{
      console.log('latitude is : ' + position.coords.latitude+" " + 'longitutde is : '+position.coords.longitude);
      const locationData ={latitudeData:position.coords.latitude,
                            longitudeData:position.coords.longitude
                           }
       const response = await axios.post('http://localhost:8080/weather',{locationData});
       console.log('response : ',response.data);
       
       setWeatherData( response.data);
      });      
  } 
  catch (error) {
   console.error(error.message);
  } 
}

useEffect(()=>{
  //to fetch user's data when the component first mounts
  getData();
  
  
},[]);
useEffect(()=>{
  if(weatherData){
    
    console.log('weather data is : ',weatherData);
  }
  else{
    console.log('no weather data available');
    
  }
},[weatherData]);

  return (
    <div className='App'>
      <h1>Weather Today</h1>
      <SearchBar weatherData={weatherData}  setWeatherData={setWeatherData}/>
      <WeatherResult weatherData={weatherData} />
    </div>
  )
}
export default App
