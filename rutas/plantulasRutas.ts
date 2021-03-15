import { Router, Request, Response} from "express";
import { CallbackError } from "mongoose";

import { Plantula } from "../modelos/plantula";

const plantulaRutas = Router();

//Crear Categoria
plantulaRutas.post('/crear',(req: Request,res: Response)=>{
    const plantula = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fotoSemillero: req.body.fotoSemillero,
        fotoCosecha: req.body.fotoCosecha
    };
    
//Grabar CATEGORIA en BD
    Plantula.create(plantula).then(plantulaDB => {
        res.json({
            ok: true,
            plantula:plantulaDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })
});
//Ver Categorias
plantulaRutas.get('/todos',(req: Request,res: Response)=>{
    Plantula.find({specialty: req.query.type}).then(function(plantula) {
        res.json(plantula);
    }).catch(function(error){
        console.log("Error al mostrar las plantulas" + error);
    });
});

//BuscarCategoria
plantulaRutas.post('/buscar', (req: any, res: Response) => {
    var idPlantula = req.body.idPlantula;
    Plantula.findOne({_id: idPlantula}, (err: any,plantulaDB: any) => {
        if(err) throw err;
        if(!plantulaDB){
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado la plantula'
            });
        }else{
            return res.json({
                "ok": true,
                "plantula": plantulaDB
            });
        }
    });
});

plantulaRutas.put("/modificar",(req: any,res: any) => {
    //res.json({msg: "funcionaaaaaa!!!"});
    var idPlantula = req.body.idPlantula;
    const plantula = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fotoSemillero: req.body.fotoSemillero,
        fotoCosecha: req.body.fotoCosecha,
    }
    Plantula.findByIdAndUpdate(idPlantula, plantula, { new: true }, (err, plantulaDB) => {
        if (err) throw err;
        if (!plantulaDB) {
            return res.json({
                ok: false,
                mensaje: 'Datos inválidos'
            });
        };
        return res.json({
            ok: true,
            plantula: plantulaDB
        });
    });
});

plantulaRutas.delete("/eliminar",(req: Request,res: Response) => {
    let idPlantula = req.body.idPlantula;

    Plantula.findById(idPlantula, (err: any, plantula: any) => {
        if(err) res.status(500).send({
            ok: false,
            msg: "Error al eliminar plántula"
        });
        plantula.remove((err: any) => {
            if(err) res.status(500).send({
                ok: false,
                msg: "Error al eliminar plántula"
            })
            res.status(200).send({
                ok: true,
                mensaje: 'Borrado exitosamente'
            })
        });
    })
});

export default plantulaRutas;