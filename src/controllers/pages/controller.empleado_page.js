const path = require("path");

function empleado_page(req, res) {
  res.sendFile(path.join(__dirname,'..','..','..','public','html','empleado.html'))
}

module.exports = empleado_page;
