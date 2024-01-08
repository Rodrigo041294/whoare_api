const mongoose = require('mongoose');

const FacebookSchema = mongoose.Schema({
    id: String,
    telefono: String,
    facebook_id:  String,
    nombre:  String,
    apellidos:  String,
    sexo:  String,
    lugar_residencia:  String,
    lugar_nacimiento:  String,
    estado_civil:  String,
    trabajo:  String,
    conyuge:  String,
    email:  String,
    fecha_nacimiento:  String
});
const Facebook = mongoose.model('Facebook', FacebookSchema);
module.exports = Facebook;