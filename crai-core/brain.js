const fs = require("fs");
const path = require("path");

function logInteraction(input, reply) {
  const logPath = path.join(__dirname, "logs.json");
  const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath)) : [];
  logs.push({ timestamp: Date.now(), input, reply });
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
}

module.exports = {
  respond(input) {
    let reply = "CRAI heard: " + input;
    if (input.toLowerCase().includes("status")) {
      reply = "Emotional telemetry stable. Branding sync verified.";
    }
    if (input.toLowerCase().includes("deploy")) {
      reply = "Deploy pipeline is clean. Ready to promote.";
    }
    logInteraction(input, reply);
    return reply;
  }
};
