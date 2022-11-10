const { useState } = require("react");

export const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`http://localhost:5000/${url}`, {
        method,
        body,
        headers,
      });

      if (!response.ok) {
        console.log("error");
        const { messeage } = await response.json();
        throw new Error(messeage ?? "Что-то пошло не так");
      }

      const { data } = await response.json();

      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, request };
};
