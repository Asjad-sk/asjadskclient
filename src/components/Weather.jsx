import React from "react";
import Sidebar from "./Sidebar";
import "../Style/Weather.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getCitydata } from "../api/weatherApi";
import { WiCloud, WiCloudy, WiDayFog, WiDaySunny } from "weather-icons-react";

const Weather = () => {
  const [searchvalue, setsearchvalue] = useState("mumbai");
  const [showSidebar, setShowSidebar] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const dispatch = useDispatch();
  const [unit, setUnit] = useState("metric");

  const handleSearch = async () => {
    try {
      const response = await dispatch(getCitydata({ searchvalue, unit }));
      setWeatherData(response.payload.data);
    } catch (error) {
      console.error("Error fetching city data:", error.message);
    }
  };
  useEffect(() => {
    // Fetch weather data for Mumbai when the component mounts
    handleSearch();
  }, []); 
  console.log(weatherData);


  return (
    <div className="Home-container">
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />   

      <div
        className="headerfiles"
        style={{
          width: showSidebar ? "calc(100% - 30%)" : "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: showSidebar ? "30%" : "0",
          transition: "all 0.5s",
        }}
      >
        <div
          className="head1"
          style={{
            width: showSidebar ? "calc(100%-30%)" : "100%",
          }}
        >
          <input
            type="text"
            placeholder="Select city "
            className="input-box"
            value={searchvalue}
            onChange={(e) => setsearchvalue(e.target.value)}
          />
          <FaSearch className="search-icon" onClick={handleSearch } />
        </div>

        <div
          className="weather-main"
          style={{
            width: showSidebar ? "calc(100%-30%)" : "100%",
            height: "85%",
            background: "linear-gradient(to right, #87CEEB, #4169E1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "rgba(255, 255, 255, 0.8)" }}>WELCOME TO</h1>
          <h1 style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            WEATHER FORECAST
          </h1>

          {weatherData ? (
            <div
              className="weather-cart"
              style={{
                width: "50%",
                height: "80%",
                background: "rgba(255, 255, 255, 0.1)",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="weather-carthead">
                <h2
                  style={{ color: "rgba(255, 255, 255, 0.8)" }}
                  className="weather-city"
                >
                  CITY:{searchvalue}
                </h2>
              </div>
              <div className="">
                <div className="weather-cart-img">
                  <div className="weather-cart-img">
                    {weatherData.list[0].weather[0].main === "Clear" && (
                      <WiDaySunny style={{ width: "30%", height: "30%",margin:"10px" }} />
                    )}
                    {weatherData.list[0].weather[0].main === "Clouds" && (
                      <WiCloud style={{ width: "30%", height: "30%",margin:"10px" }} />
                    )}
                    {weatherData.list[0].weather[0].main === "Cloudy" && (
                      <WiCloudy style={{ width: "30%", height: "30%",margin:"10px" }} />
                    )}
                    {weatherData.list[0].weather[0].main === "Fog" && (
                      <WiDayFog style={{ width: "30%", height: "30%",margin:"10px" }} />
                    )}
                    {weatherData.list[0].weather[0].main === "Smoke" && (
                      <WiDayFog style={{ width: "30%", height: "30%",margin:"10px" }} />
                    )}
                  </div>
                </div>
                <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  Temperature: {weatherData.list[0].main.temp - 273.15}°C
                </p>
                <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  Weather: {weatherData.list[0].weather[0].description}
                </p>
              </div>

              {/* Add more details as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
