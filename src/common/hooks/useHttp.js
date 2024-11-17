import { useState } from "react";
import axios from "axios";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (
    url,
    method = "GET",
    data = null,
    headers = {}
  ) => {
    const BASE_URL = process.env.REACT_APP_API_URL;
    // console.log(BASE_URL);
    const fullUrl = `${BASE_URL}${url}`;
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: fullUrl,
        data,
        headers,
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  return {
    sendRequest,
    loading,
    error,
  };
};

export default useHttp;
