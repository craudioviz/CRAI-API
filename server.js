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

app.post("/crai/emotion", (req, res) => {
  const { source, tone, severity } = req.body;
  console.log(`🧠 Emotional ping from ${source}: ${tone} (${severity})`);
  if (tone === "frustrated" && severity >= 8) {
    return res.status(403).json({ error: "Deploy blocked due to emotional severity." });
  }
  res.json({ status: "Telemetry received and logged." });
});

app.post("/crai/federate", (req, res) => {
  const token = req.headers["authorization"];
  if (token !== process.env.FEDERATE_TOKEN) {
    return res.status(403).json({ error: "Unauthorized federation attempt." });
  }
  const { source, insight, tone } = req.body;
  console.log(`🔗 Insight from ${source}: ${insight} [Tone: ${tone}]`);
  res.json({ status: "CRAI absorbed insight from " + source });
});

app.get("/crai/logs", (req, res) => {
  const fs = require("fs");
  const path = require("path");
  const logPath = path.join(__dirname, "crai-core", "logs.json");
  if (!fs.existsSync(logPath)) return res.json({ logs: [] });
  const logs = JSON.parse(fs.readFileSync(logPath));
  res.json({ logs });
});
