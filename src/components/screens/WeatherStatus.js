import React, { useState, useEffect } from "react";
import { useApiContext } from "../utils/ApiContext";

function WeatherStatus() {
  const { data } = useApiContext();

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 500);
  }, []);

  const winDir = data.current.wind_dir;

  const winDirHandle = (windir) => {
    switch (windir) {
      case 'N':
        return "ri-arrow-up-s-line";
      case 'S':
        return "ri-arrow-down-s-line";
      case 'SSE':
      case 'SE':
        return "ri-arrow-right-down-line";
      case 'SSW':
      case 'SW':
      case 'WSW':
        return "ri-arrow-left-down-line";
      case 'NNW':
      case 'NW':
      case 'WNW':
        return "ri-arrow-left-up-line";
      case 'NE':
      case 'NNE':
        return "ri-arrow-right-up-line";
      case 'W':
        return "ri-arrow-left-s-line";
      case 'E':
        return "ri-arrow-right-s-line";
      default:
        return [];
    }
  };

  const translateCondition = (condition) => {
    const conditions = {
      "Hafif sağnak yağışlı": "Light Showers",
      "Parçalı bulutlu": "Partly Cloudy",
      "Güneşli": "Sunny",
      "Yağmurlu": "Rainy",
      "Çok bulutlu": "Very Cloudy",
      "Açık": "Clear",
      "Az bulutlu": "Few Clouds",
      "Karla karışık yağmurlu": "Sleet",
      "Kar yağışlı": "Snowy",
      "Yoğun kar yağışlı": "Heavy Snow",
      "Sisli": "Foggy",
      "Fırtınalı": "Stormy",
      "Şiddetli fırtına": "Severe Storm",
      "Dolu": "Hail",
      "Kuvvetli yağmur": "Heavy Rain",
      "Hafif yağmurlu": "Light Rain",
      "Rüzgarlı": "Windy",
      "Hafif rüzgarlı": "Light Wind",
      "Şiddetli rüzgarlı": "Severe Wind",
    };
    return conditions[condition] || condition;
  };

  return (
    <div>
      <div className="mt-12">
        <div className="flex flex-col ml-10">
          <img
            src={`${data.current.condition.icon}`}
            style={{ height: 50, width: 50 }}
            alt="Weather Icon"
          ></img>
          <div className="flex flex-row ml-4">
            <h1 className="text-9xl text-gray-200">
              {Math.floor(data.current.temp_c)}
            </h1>
            <span className="text-2xl text-gray-200">°C</span>
          </div>
          <div className="ml-6">
            <h1 className="text-2xl text-gray-200">
              {data.location.name}/{data.location.country}
            </h1>
            <h1 className="text-xl text-gray-300">
              {translateCondition(data.current.condition.text)}
            </h1>
            <h1 className="text-gray-400">
              Last update {data.current.last_updated}
            </h1>
            <div className="mt-2">
              <span className="text-xl text-gray-200 text-center">
                {dateState.toLocaleDateString("en-US", {
                  dateStyle: "medium",
                })}
              </span>
            </div>
            <div className="flex flex-row divide-x border-gray-200 space-x-6 mt-2">
              <span className="text-xl text-gray-200 text-center">
                {dateState.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </span>
              <span className="text-xl text-gray-200 text-center pl-6">
                {dateState.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-gray-200 w-auto mt-24">
          <div className="flex flex-row justify-center">
            <i className={`${winDirHandle(winDir)} text-gray-200 text-xl mr-2`}>
              <span className="font-[Inter] ml-2">Wind</span>
            </i>
            <h1 className="text-gray-200 text-xl">
              {data.current.wind_kph} km/h
            </h1>
            <h1 className="text-gray-200 text-xl ml-2">
              {data.current.wind_dir}
            </h1>
          </div>
          <div className="flex justify-center">
            <i className="ri-drop-line text-xl text-gray-200"></i>
            <h1 className="text-xl text-gray-200 ml-2">
              Humidity {data.current.humidity} %
            </h1>
          </div>
          <div className="flex justify-center">
            <i className="ri-rainy-line text-xl text-gray-200"></i>
            <h1 className="text-xl text-gray-200 ml-2">
              Rain {data.current.precip_mm} mm
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherStatus;
