import axios from 'axios';
import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config(); -> this method also works
import 'dotenv/config';
import cors from 'cors';
const API_KEY = process.env.API_KEY;
const app = express();
app.use(cors());
app.use(express.json());
let PORT  = process.env.PORT;

app.post('/weather',async (req,res)=>{
    try {
        let lat='';
        let lon='';
        console.log('city name is : ',req.body.cityName);
        console.log('locationData : ',req.body.locationData);
        
        if(req.body.cityName){
        //converting cityname to its latitude and longitude
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.cityName}&appid=${API_KEY}`);
             lat=response.data[0].lat;
             lon = response.data[0].lon;
           console.log('converted cityname to its lat and lon');
        }
        else{
            lat=req.body.locationData.latitudeData;
            lon=req.body.locationData.longitudeData;
        }
    //    getting data of the city based on latitude and longitude
       const newResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
       console.log(newResponse.data);
        res.status(200).json({weatherReport:newResponse.data});
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message:err.message});
        
    }
})

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
    
})