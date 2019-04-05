const PROXY_CONFIG = {
  "/api": {
    "target": "http://localhost:3004",
    "changeOrigin": true,
    "secure": false
  }
};

module.exports = PROXY_CONFIG;