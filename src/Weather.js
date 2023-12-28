import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./Weather.css";



export default function Weather() {
  const [ready, setReady] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [cityInput, setCityInput] = useState("");  
  const [lastUpdated, setLastUpdated] = useState(null); 


    function fetchWeatherData(city) {   
    let apiKey = "c9c7oc64f71481aa1fa0f40af020b3t6";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
        console.log(response.data);
      setWeatherData({
        temperature: response.data.daily[0].temperature.day,
        wind: response.data.daily[0].wind.speed,
        humidity: response.data.daily[0].temperature.humidity,
        description: response.data.daily[0].condition.description,
        icon: response.data.daily[0].condition.icon_url,
        city: response.data.city,
        daily: response.data.daily
      });
      //console.log(weatherData);
     // console.log(response.data.daily[0].condition.description)

     setLastUpdated(new Date());


      setReady(true);
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
        // Handle the error, e.g., display an error message to the user
      });
  };


  useEffect(() => {
    fetchWeatherData("London");
    }, []); 


  function handleInputChange(event) {
    setCityInput(event.target.value);
  }
  
  function handleSubmit(event) {
   event.preventDefault();

    fetchWeatherData(cityInput);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  const { temperature, humidity, city, daily, description, wind, icon } = weatherData;

  return (
    <div>
      <form onSubmit ={handleSubmit}>
        <input
          type="search"
          name="q"
          placeholder="Enter your location....."
          className="w-50 rounded-pill text-center"
          value = {cityInput}   
          onChange={handleInputChange}
        />
        <input type="submit" id="search" className="rounded-pill"  />
      </form>
      <div className="col-container">
        <div className="row">
          <div className="col-3 city-name">
            <h1>{city}</h1>
            <p className="text-muted">last updated: {lastUpdated.toLocaleString()}
            </p>
          </div>
          <div className="col-6 weather-icon">
            <img
              src={icon}
              alt="cloudy"
              className="main-icon"
            />
            <span>{Math.round(temperature)}ºC</span>
            <p className="weather-description">{description}</p>
          </div>
          <div className="col-3 ">
            <ul className="city-weather-forecast">
              <span className="text-muted">
                <li>Humidity: {humidity}%</li>
                <li>Wind: {Math.round(wind)}km/h</li>
              </span>
            </ul>
          </div>
        </div>
      </div>
      <div className="forecast-container">
        <div className="row">
        {daily.slice(0,6).map((day, index) => (// loop through the array index 0 until 5
            <div key={index} className="col-2">
              <strong>{new Date(day.time*1000).toLocaleDateString("en-GB", { weekday: "short" })}</strong> 
              <img
                src={day.condition.icon_url}
                width="100"
                height="100"
                alt="weather icon"
              />
              <div>
                <span className="weather-forecast-temp-max">
                  <strong>{Math.round(day.temperature.maximum)}º</strong>
                </span>
                <span className="weather-forecast-temp-min">{Math.round(day.temperature.minimum)}º</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
