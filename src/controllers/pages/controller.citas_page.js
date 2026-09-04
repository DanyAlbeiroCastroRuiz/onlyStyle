const path = require("path");

function citas_page(req, res) {
  res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'html', 'citas.html'));
}

module.exports = citas_page;
