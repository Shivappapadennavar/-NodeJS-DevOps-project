const express = require("express");
const app = express();

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Node Backend 🚀" });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
