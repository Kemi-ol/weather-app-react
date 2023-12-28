import React , {useState} from "react";
import "./Weather.css";
import axios from "axios";
 import "bootstrap/dist/css/bootstrap.css";

 export default function Weather (){
   const [ready, setReady] = useState(false);
   const [weatherData, setWeatherData]= useState({});
   function handleResponse(response) {
     //console.log(response.data);
      let weather = response.data;
      console.log(weather);
     weather.map(function (weatherData) {
        return (
          <div className="col-3">
            <ul className="city-weather-forecast">
              <li>{weatherData.humidity}</li>
              <li>{weatherData.wind}</li>
              <li>{weatherData.description}</li>
            </ul>
          </div>
        );
      });
      
     setWeatherData({
       temperature: response.data.temp,
       wind: response.data.wind,
       humidity: response.data.humidity,
       description: response.data.description,
       icon: response.data.icon,
       //date: "Monday 10:00",
       city: response.data.city,
     });
     setReady(true);
    }
     if (ready) {
       return (
         <div>
           <form>
             <input
               type="search"
               name="q"
               placeholder="Enter your location....."
               className="w-50 rounded-pill text-center"
             />
             <input type="submit" id="search" className="rounded-pill" />
           </form>
           <div className="col-container">
             <div className="row">
               <div className="col-3 city-name">
                 <h1>{weatherData.city}</h1>
                 <p className="text-muted">last updated:</p>
               </div>
               <div className="col-6 weather-icon">
                 <img
                   src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                   alt="cloudy"
                   className="main-icon"
                 />
                 <span>{weatherData.temperature}ºC</span>
                 <p className="weather-description">Cloudy</p>
               </div>
               <div className="col-3 ">
                 <ul className="city-weather-forecast">
                   <span className="text-muted">
                     <li>humidity</li>
                     <li>wind</li>
                     <li>precipitation</li>
                   </span>
                 </ul>
               </div>
             </div>
           </div>
           <div className="forecast-container">
             <div className="row">
               <div className="col-2">
                 <strong>Monday</strong>

                 <img
                   src=" https://openweathermap.org/img/wn/10d@2x.png"
                   width="30"
                   height="30"
                   alt="weather icon"
                 />
                 <div>
                   <span className="weather-forecast-temp-max">
                     <strong>10º</strong>
                   </span>
                   <span className="weather-forecast-temp-min"> 5º</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       );
     } 
     else {
       let apiKey = "c9c7oc64f71481aa1fa0f40af020b3t6";
       let city = "London";
       let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
       axios.get(apiUrl).then(handleResponse);
       return "Loading...." 
   }
  }

