const path = require("path");

function nosotros_page(req, res) {
  res.sendFile(path.join(__dirname,'..','..','..','public','html','nosotros.html'))
}

module.exports = nosotros_page;
