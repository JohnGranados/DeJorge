import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Server from './clases/server';
import plantulaRutas from './rutas/plantulasRutas';

const server = new Server();

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Cors
server.app.use((cors({ origin: true, credentials: true })));

//Rutas
server.app.use('/plantula',plantulaRutas);

//Conectar BD
mongoose.connect(
    'mongodb+srv://ProsperarPlantas:SvVRjnpf1R7jINQk@prosperarplantas.smfah.mongodb.net/ProsperarPlantas?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useFindAndModify:false
    },
    (err) => {
        if(err) throw "error BDDDDDDD";
        console.log("Base de datos funcionando");
    }
)

//Levantar servidor
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`)
})