import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const ApiContext = createContext();

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

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=65523c9d178e4968bda101614241206&q=${searchQuery}&dt=2023-05-04&lang=tr&aqi=yes`;
  const geoUrl = `https://api.weatherapi.com/v1/current.json?key=65523c9d178e4968bda101614241206&q=${lat},${long}&dt=2023-05-04&lang=tr&aqi=yes`;
  const searchApiUrl = `https://api.weatherapi.com/v1/search.json?key=65523c9d178e4968bda101614241206&q=${searchText}`;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setAlert(true);
      setError(err);
      console.clear();
    }
  }, [apiUrl]); // Include apiUrl in the dependency array

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchData]);

  const fetchSearch = useCallback(async () => {
    try {
      const res = await axios.get(searchApiUrl);
      setSearchData(res.data);
    } catch (err) {
      setAlert(true);
      setError(err);
      console.clear();
    }
  }, [searchApiUrl]); // Include searchApiUrl in the dependency array

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);
  
  const fetchLocation = useCallback(async () => {
    try {
      const res = await axios.get(geoUrl);
      setData(res.data);
    } catch (err) {
      setAlert(true);
      setError(err);
      console.clear();
    }
  }, [geoUrl]); // Include geoUrl in the dependency array

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