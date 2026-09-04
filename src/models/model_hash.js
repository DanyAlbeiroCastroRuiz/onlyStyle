const bcrypt = require("bcrypt");

class Passwd {
    constructor(contrasena, rounds, hash_db) {
        this.contrasena = contrasena;
        this.rounds = rounds;
        this.hash_db=hash_db
    }

    async generarHash() {
        try {
            const hash = await bcrypt.hash(this.contrasena, this.rounds);
            return hash;
        } catch (err) {
            throw new Error("Algo falló en la generación del hash");
        }
    }
    async compareHash(){
        try {
            const ok = await bcrypt.compare(this.contrasena, this.hash_db);
            
            return ok;
        } catch (err) {
            throw new Error("Error al comaprar el hash");
        }
    }
}

module.exports = Passwd;