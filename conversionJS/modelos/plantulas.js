"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plantula = void 0;
var mongoose_1 = require("mongoose");
var plantulaSchema = new mongoose_1.Schema({
    nombre: {
        unique: true,
        type: String,
        required: [true, 'El nombre de la plántula es obligatorio']
    },
    descripcion: {
        type: String,
    },
    foto: {
        type: String,
    },
});
exports.Plantula = mongoose_1.model('Plantula', plantulaSchema);
