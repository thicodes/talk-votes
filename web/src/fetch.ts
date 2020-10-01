//https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export const fetcher = async (
  endpoint: string,
  { body, ...customConfig }: RequestInit = {}
) => {
  // const token = window.localStorage.getItem(localStorageKey);
  const headers: HeadersInit = { "content-type": "application/json" };
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }
  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  const response = await fetch(
    `http://localhost:4000${endpoint}`,
    // `${process.env.REACT_APP_API_URL}/${endpoint}`,
    config
  );
  return await response.json();
  // return window
  //   .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
  //   .then(async (response) => {
  //     if (response.status === 401) {
  //       // logout();
  //       // window.location.assign(window.location);
  //       return;
  //     }
  //     const data = await response.json();
  //     if (response.ok) {
  //       return data;
  //     } else {
  //       return Promise.reject(data);
  //     }
  //   });
};
