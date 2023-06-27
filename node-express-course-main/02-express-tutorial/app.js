const http = require("http");
const { readFileSync } = require("fs");

//get all files

const homePage = readFileSync("./navbar-app/index.html");
const homeStyle= readFileSync("./navbar-app/styles.css");
const homeImage = readFileSync("./navbar-app/logo.svg");
const homeLogic = readFileSync("./navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  console.log("=========USER HTI THE SERVER===========");

  console.log(req.method);
  console.log(req.url);

  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
  } else if (req.url === "/contact") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>CONTACT PAGE<h1/>");
  }
   else if (req.url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyle);
  } 
   else if (req.url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
  } 
   else if (req.url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
  } 
   else if (req.url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>ABOUT PAGE<h1/>");
  } 


  
  
  
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>ERROR PAGE<h1/>");
  }

  res.end();
});

server.listen(3000, (req, res) => {
  console.log("*********SERVER CONNECTED 3000 *********");
});
