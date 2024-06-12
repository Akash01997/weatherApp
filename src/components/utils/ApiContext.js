import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";

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

  const fetchData = useCallback(() => {
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
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
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
  }, [searchApiUrl]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  // Rest of your code...

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
        long,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
