const path = require("path");

function admin_page(req, res) {
  res.sendFile(path.join(__dirname, "../../../public/html/admin.html"));
}

module.exports = admin_page;
