const express = require("express");

const app = express();
app.use(express.json());

let users = [];

app.get("/home", (req, res) => {
  try {
    console.log("Req received");
    res.send({
      message: "Response received!",
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/add-todo", (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    res.send({
      message: "Response",
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(4000, () => {
  console.log("====================================");
  console.log("Server up at: " + 4000);
  console.log("====================================");
});
