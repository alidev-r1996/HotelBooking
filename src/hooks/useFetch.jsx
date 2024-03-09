import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, query = " ") => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    fetch(`${url}/?${query}`)
      .then((res) => res.json())
      .then((data) => {
        // new Promise((resolve) => {
          // setTimeout(() => resolve(1), 1000);
        // }).then(() => {
          setIsLoading(false);
          setData(data);
        // });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError("Somthing Get Wrong!");
      });
  }, [url,query]);

  return { data, isLoading, isError };
};

export default useFetch;
