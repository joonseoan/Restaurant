const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("/guests", { target: "http://localhost:9000/" }),
    proxy("/loginGuestbooks", { target: "http://localhost:9000/" }),
    proxy("/guests/*", { target: "http://localhost:9000/" }),
    proxy("/billing", { target: "http://localhost:9000/" }),
    proxy("/billing/*", { target: "http://localhost:9000/" })
  );
};
