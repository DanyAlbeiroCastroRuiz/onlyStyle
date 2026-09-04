const path = require("path");

function perfil_page(req, res) {
  res.sendFile(path.join(__dirname,'..','..','..','public','html','perfil.html'))
}

module.exports = perfil_page;
