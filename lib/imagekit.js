const ImageKit = require("imagekit");
// const { default: ImageKit } = require("imagekit-javascript");

var imagekit = new ImageKit({
  publicKey: "public_2OGgN8CyrJXReq/hoxxoQmNeibI=",
  urlEndpoint: "https://ik.imagekit.io/brahmastabagus",
  // authenticationEndpoint: "http://www.yourserver.com/auth",
  privateKey: "private_lsv3SeJsjtQapNnQLuYGGkEJQHo=",
});

module.exports = imagekit