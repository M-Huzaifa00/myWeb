const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  let firstName = req.body.fname;
  let lastName = req.body.lname;
  let email = req.body.email;

  let data = {
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
  let jsonData = JSON.stringify(data);

  let options = {
    method: "POST",
    auth: "huzaifa:8267bb212ab7321b243826aaa05d585b-us21",
  };

  app.post("/fail",(req,res)=>{
    res.redirect("/");
  })

  const url = `https://us21.api.mailchimp.com/3.0/lists/876ae7f5ac`;

  const mailchimpRequest = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/fail.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  mailchimpRequest.write(jsonData);
  mailchimpRequest.end();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Server started at port: 3000");
});
