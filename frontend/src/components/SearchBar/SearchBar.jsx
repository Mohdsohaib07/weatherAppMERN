import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import styles from './SearchBar.module.css';
import { useSnackbar } from 'notistack';
const SearchBar = ({weatherData,setWeatherData}) => {
  const[inputData,setInputData]= useState('');
  const[cityName,setCityName]=useState();
 
  const {enqueueSnackbar}= useSnackbar();

  const  handleSubmit= async ()=>{
    if(inputData==""){
      enqueueSnackbar('please enter valid data',{
        autoHideDuration: 2000,
        variant:"info",
        anchorOrigin:{horizontal:"center",vertical:"top"}
      });
      return;
    }
    const response = await axios.post('http://localhost:8080/weather',{cityName:inputData});
    console.log(response.data);
     setWeatherData(response.data);
    
    setInputData('');
  }
  useEffect(()=>{
    if(weatherData){
      console.log('city name updated');
  setCityName(weatherData.weatherReport.name);}
  },[weatherData]);
  return (
    <div className={`${styles.masterContainer}`}>
    <div className={`${styles.parentContainer}`}>
      <input type="text" placeholder='Search for a City' value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
      <button className={`${styles.icon}`} onClick={handleSubmit}>
      <IoSearch />
      </button>

    </div>
    <h1 style={{textTransform:'capitalize'}}>{cityName}</h1>
    </div>
  )
}

export default SearchBar
