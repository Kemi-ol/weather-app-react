import React from "react";
import "./Weather.css";

 
 import "bootstrap/dist/css/bootstrap.css";
 export default function Weather (){
    return (
      <div class="container">
        <form>
          <input type="search" name="q" placeholder="Enter your Location" />
          <input type="submit" id="search" />
        </form>
        <div className="col-container">
          <div className="row">
            <div className="col-3">
              <h1>City </h1>
              <p>last updated:</p>
            </div>
            <div className="col-6">
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt="cloudy" className="main-icon"
              />
              <span>temp</span>
              <a href="#0" className="active">
                {" "}
                ºC
              </a>
              <span>
                |<a href="#0">ºF</a>
              </span>
              <p>Cloudy</p>
            </div>
            <div className="col-3">
              <ul>
                <li>humidity</li>
                <li>wind</li>
                <li>precipitation</li>
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