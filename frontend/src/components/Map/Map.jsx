import React  from 'react'
import {MapContainer,TileLayer,Marker,Popup,useMap} from 'react-leaflet';
import styles from './Map.module.css';
import "leaflet/dist/leaflet.css";
const Map = ({weatherData}) => {
    const coordinates =[];
    console.log('recieved ',(weatherData!=null?weatherData.weatherReport.coord.lat:'empty objecct'));
    if(weatherData!=null){
        coordinates[0] = weatherData.weatherReport.coord.lat;
        coordinates[1]= weatherData.weatherReport.coord.lon;
        console.log('updated coordinates ', coordinates);

    }
    else{
        return;
    }
 

  return (
      <div className={`${styles.MapParent}`}>

        <MapContainer 
      center={coordinates}
      zoom={15}
      className={`${styles.MapScreen}`}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
        <Marker position={coordinates}>
        <Popup>Weather here</Popup>
      </Marker>
      <ChangeView coordinates={coordinates}/>
      </MapContainer>
      </div>

  )
}

export default Map;
//cutsom component to change map's view 
const ChangeView = ({coordinates})=>{
    const map = useMap();

            map.setView(coordinates);
    return null;
}