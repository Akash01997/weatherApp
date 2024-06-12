// ApiContext.js

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const ApiContext = React.createContext();

export const useApiContext = () => useContext(ApiContext);

function ApiProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("Pune");
  const [searchText, setSearchText] = useState("");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
 
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=65523c9d178e4968bda101614241206&q="${searchQuery}"&dt=2023-05-04&lang=tr&aqi=yes`;
  const geoUrl = `https://api.weatherapi.com/v1/current.json?key=65523c9d178e4968bda101614241206&q=${lat},${long}&dt=2023-05-04&lang=tr&aqi=yes`;
  const searchApiUrl = `https://api.weatherapi.com/v1/search.json?key=65523c9d178e4968bda101614241206&q="${searchText}"`;

  const fetchData = () => {
    const options = {
      method: "GET",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setAlert(true);
        setError(err);
        console.clear();
      });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [fetchData]); // Include fetchData in the dependency array

  const fetchSearch = async () => {
    try {
      const res = await axios.get(searchApiUrl);
      setSearchData(res.data);
    } catch (err) {
      setAlert(true);
      setError(err);
      console.clear();
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [searchApiUrl, fetchSearch]); // Include searchApiUrl and fetchSearch in the dependency array
  
  const fetchLocation = async () => {
    try {
      const res = await axios.get(geoUrl);
      setData(res.data);
    } catch (err) {
      setAlert(true);
      setError(err);
      console.clear();
    }
  };

  return (
    <ApiContext.Provider
      value={{
        data,
        loading,
        searchQuery,
        setSearchQuery,
        searchData,
        setSearchData,
        setSearchText,
        searchText,
        fetchData,
        alert,
        setAlert,
        error,
        setError,
        setLat,
        setLong,
        fetchLocation,
        lat,
        long
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
