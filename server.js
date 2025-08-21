const express = require("express");
const bodyParser = require("body-parser");
const brain = require("./crai-core/brain");

const app = express();
app.use(bodyParser.json());

app.post("/crai/message", (req, res) => {
  const input = req.body.input;
  const reply = brain.respond(input);
  res.json({ reply });
});

app.post("/crai/federate", (req, res) => {
  const { source, insight, tone } = req.body;
  res.json({ status: "CRAI absorbed insight from " + source });
});

app.listen(3000, () => console.log("✅ CRAI is live and listening on port 3000"));
