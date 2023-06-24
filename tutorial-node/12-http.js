const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("<h1>Welcome to our home page</h1>");
    return;
  }
  if (req.url === "/about") {
    res.end("<h1>Here is about page</h1>");
    return;
  }

  res.end(
    `<h1>Oops !</h1>
     <p>We can't seem to find the page your looking for</p>
     <a href="/">Back Home</a>`
  );
});

server.listen(3000, () => {
  console.log("************SERVER RUNNING ON 3000************");
});