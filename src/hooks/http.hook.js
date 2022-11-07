const { useCallback, useState } = require("react");

export const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
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
          const { messeage } = await response.json();
          throw new Error(messeage ?? "Что-то пошло не так");
        }

        const { data } = await response.json();
        console.log(data);

        setLoading(false);

        return data;
      } catch (error) {}
    },
    []
  );

  return { loading, request };
};
