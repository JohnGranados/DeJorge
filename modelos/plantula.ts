import {Schema, model, Document} from 'mongoose';

const plantulaSchema = new Schema({
    nombre: {
        unique: true,
        type:String,
        required: [true, 'El nombre de la plántula es obligatorio']
    },
    descripcion: {
        type:String,
    },
    fotoSemillero: {
        type:String,
    },
    fotoCosecha: {
        type:String,
    }
});
 
 interface IYo extends Document{
     nombre: String;
     descripcion: String;
     fotoSemillero: String;
     fotoCosecha: String;
 }
 
 export const Plantula = model<IYo>('Plantula',plantulaSchema);