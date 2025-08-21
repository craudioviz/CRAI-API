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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ CRAI is live and listening on port ${PORT}`));
