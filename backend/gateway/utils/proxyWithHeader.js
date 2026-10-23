
import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqPathResolver: (req) => {
      const path = req.originalUrl.replace(
        /^\/api\/(?:project|file)/,
        ""
      );

      console.log("Gateway proxy destination:", serviceUrl);
      console.log("Incoming path:", req.originalUrl);
      console.log("Forwarded path:", path || "/");

      return path || "/";
    },

    proxyReqOptDecorator: (proxyReqOpts, req) => {
      if (req.user?._id) {
        proxyReqOpts.headers["x-user-id"] = String(req.user._id);
      }

      return proxyReqOpts;
    },
  }); 
};
