import { useState, useEffect } from "react";



export function useFetch<T>(
  url: string,
  method: "GET" | "POST" = "GET", // default to GET
  body: object | null = null // only used for POST requests
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const options: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        };

        // If the method is POST, attach the body to the request
        if (method === "POST" && body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result: T = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]); // Re-run effect if the `url`, `method`, or `body` changes

  return { data, loading, error };
}
