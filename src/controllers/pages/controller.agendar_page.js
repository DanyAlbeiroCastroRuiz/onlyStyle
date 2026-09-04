const path = require("path");

function agendar_page(req, res) {
  res.sendFile(path.join(__dirname, "../../../public/html/agendar.html"));
}

module.exports = agendar_page;
