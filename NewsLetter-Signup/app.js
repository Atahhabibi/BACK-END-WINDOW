const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: "true" }));

app.listen(3000, (req, res) => {
  console.log("SERVER LISTENING ON PORT 3000");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  //   const url = "https://us21.api.mailchimp.com/3.0/lists/b4e38f9930";

  //   const options = {
  //     method: "POST",
  //     auth: "atah:41d846a006f7909d5742663be481b5fc-us21",
  //   };

  //   const request = https.request(url, options, (response) => {
  //     response.on("data", (data) => {
  //       console.log(JSON.parse(data));
  //     });
  //   });

  //   request.write(jsonData);
  //   request.end();

  const client = require("@mailchimp/mailchimp_marketing");

  client.setConfig({
    apiKey: "41d846a006f7909d5742663be481b5fc-us21",
    server: "us21",
  });

  const run = async () => {
    const response = await client.lists.batchListMembers(
      "b4e38f9930",
      jsonData
    );

    console.log(response.statusCode);

    if (response.error_count === 0) {
      res.sendFile(`${__dirname}/sucess.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }
  };

  run();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

//apiKey

//41d846a006f7909d5742663be481b5fc-us21

//listID
//b4e38f9930
