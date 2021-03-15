"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var plantula_1 = require("../modelos/plantula");
var plantulaRutas = express_1.Router();
//Crear Categoria
plantulaRutas.post('/crear', function (req, res) {
    var plantula = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fotoSemillero: req.body.fotoSemillero,
        fotoCosecha: req.body.fotoCosecha
    };
    //Grabar CATEGORIA en BD
    plantula_1.Plantula.create(plantula).then(function (plantulaDB) {
        res.json({
            ok: true,
            plantula: plantulaDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Ver Categorias
plantulaRutas.get('/todos', function (req, res) {
    plantula_1.Plantula.find({ specialty: req.query.type }).then(function (plantula) {
        res.json(plantula);
    }).catch(function (error) {
        console.log("Error al mostrar las plantulas" + error);
    });
});
//BuscarCategoria
plantulaRutas.post('/buscar', function (req, res) {
    var idPlantula = req.body.idPlantula;
    plantula_1.Plantula.findOne({ _id: idPlantula }, function (err, plantulaDB) {
        if (err)
            throw err;
        if (!plantulaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado la plantula'
            });
        }
        else {
            return res.json({
                "ok": true,
                "plantula": plantulaDB
            });
        }
    });
});
plantulaRutas.put("/modificar", function (req, res) {
    //res.json({msg: "funcionaaaaaa!!!"});
    var idPlantula = req.body.idPlantula;
    var plantula = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fotoSemillero: req.body.fotoSemillero,
        fotoCosecha: req.body.fotoCosecha,
    };
    plantula_1.Plantula.findByIdAndUpdate(idPlantula, plantula, { new: true }, function (err, plantulaDB) {
        if (err)
            throw err;
        if (!plantulaDB) {
            return res.json({
                ok: false,
                mensaje: 'Datos inválidos'
            });
        }
        ;
        return res.json({
            ok: true,
            plantula: plantulaDB
        });
    });
});
plantulaRutas.delete("/eliminar", function (req, res) {
    var idPlantula = req.body.idPlantula;
    plantula_1.Plantula.findById(idPlantula, function (err, plantula) {
        if (err)
            res.status(500).send({
                ok: false,
                msg: "Error al eliminar plántula"
            });
        plantula.remove(function (err) {
            if (err)
                res.status(500).send({
                    ok: false,
                    msg: "Error al eliminar plántula"
                });
            res.status(200).send({
                ok: true,
                mensaje: 'Borrado exitosamente'
            });
        });
    });
});
exports.default = plantulaRutas;
