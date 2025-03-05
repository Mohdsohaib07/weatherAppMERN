import React from 'react'
import styles from './WeatherResult.module.css'
const WeatherResult = ({weatherData=''}) => {
  function convertToCelcuis(value){
    return Math.floor(value-273.15);
  }
  function showIcon(){
  let data = weatherData.weatherReport.weather[0].id;
    console.log(data);
    let icon='';
  
if(data>=200 && data<=232){icon = '11d'}
else if( data>=300 && data<=321){icon = '09d'}
else if( data>=500 && data<=504){icon = '10d'}
else if( data>=511 && data<=519){icon = '13d'}
else if( data>=520 && data<=531){icon = '09d'}
else if(  data>=600 && data<=622){icon = '13d'}
else if(  data>=701 && data<=781){icon = '50d'}
else if(data==800){icon = '01d'}
else if(data==801){icon = '02d'}
else if(data==802){icon = '03d'}
else if(data==803){icon = '04d'}
else if(data==804){icon = '04d'}
else{
  icon='02d'
}
 return icon
   }
  return (
    <div className={`${styles.weather_container}`}>
      <div className={`${styles.top_section}`}>
          <h2>Current Weather</h2>
      </div>
      <div className={`${styles.second_section}`}>
      <div className={`${styles.left_area}`}>
        <div className={`${styles.imagecontainer}`}><img style={{height:'100%',width:'100%'}} src={(weatherData!=null ?`https://openweathermap.org/img/wn/${showIcon()}@2x.png`:'/weather.svg')} alt="weather image" />
        </div>
        <h2 style={{fontSize:"80px"}}>{!weatherData?'':convertToCelcuis(weatherData.weatherReport.main.temp)}°C</h2>
      </div>
      <div className={`${styles.right_area}`}>
        <h3>{!weatherData?'':weatherData.weatherReport.weather[0].main}</h3>
        <p>feels like {!weatherData?'':convertToCelcuis(weatherData.weatherReport.main.feels_like)}°</p>
      </div>
      </div>
      <div className={`${styles.third_section}`}>Expect {!weatherData?'':weatherData.weatherReport.weather[0].description}, The high will be {!weatherData?'':convertToCelcuis(weatherData.weatherReport.main.temp_max)}°.</div>
 
    </div>
  )
}

export default WeatherResult;
