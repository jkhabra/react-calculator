const config = {
  apiUrl: process.env.REACT_APP_RUN_FROM_DC_URL || window.location.origin,
};

if (process.env.NODE_ENV === "production") {
  config.apiUrl = "http://liveapi.com";
}

export default config;
