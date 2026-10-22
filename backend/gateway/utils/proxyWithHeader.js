// import proxy from "express-http-proxy"

// export const proxyWithHeader =(serviceUrl)=>{
//  return proxy(serviceUrl,{
//     proxyReqOptDecorator:(proxyReqOpts, req)=>{
//       console.log("Gateway proxy destination:", serviceUrl);
//       console.log("Incoming path:", req.originalUrl);
//       console.log("Authenticated user:", req.user?._id);

//      if(req.user){
//         proxyReqOpts.headers["x-user-id"]= req.user?._id
//      }
//      return proxyReqOpts
//     }
// })
// }


import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqPathResolver: (req) => {
      const path = req.originalUrl.replace(/^\/api\/project/, "");
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
