import { useState, useEffect } from "react";
import apiClient from "../api-client";

export default function useData(path, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiClient.get(path)
      .then(response => {
        setLoading(false);
        setData(response.data);
      })
      .catch(err =>{
        setLoading(false);
        setError(err.response);
      })

  }, [path])

  return [data, isLoading, error]
}