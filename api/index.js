import express from "express"
import cors from 'cors';
import productsRouter from "../src/routes/products.routes.js"
import authRouter from '../src/routes/auth.routes.js'
import {authentication} from "../src/middleware/authentication.js"
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./src/data/data.js"; // o ../data/data.js según ruta real
import 'dotenv/config';

const app= express();
const PORT = process.env.PORT || 3000;

// app.use(cors());                   // Configuración básica: Permitir todos los orígenes, usar solo p' pruebas internas
const corsOptions = {                 // Configuración avanzada: Permitir dominios específicos
    origin: ['http://localhost:3000', 'https://midominio.com'], //Dominios permitidos, solo frontend desde ese puerto puede acceder   
    methods: ['GET', 'POST', 'PUT', 'DELETE'],   // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],    // Encabezados permitidos
    exposedHeaders: ['Content-Length'],         //Encabezados visibles al cliente
    credentials: true,                  // Permitir cookies o credenciales
    maxAge: 600,                       //cache preflight
    optionsSuccessStatus: 204        //respuesta preflight exitosa

};
app.use(cors(corsOptions));
app.use(express.json()); //transforma el body a JSON

app.use('/api' , authRouter );

// app.use(authentication)

app.use((req, res ,next)=>{
   console.log(`Datos recibidos: ${req.method}, ${req.url} `); //intercepta c/solicitud q entra al servidor , ejecuta lo q le digo y le da paso con next
   next();
})

app.use('/api', authentication, productsRouter);

app.get('/api', (req, res) => {
  res.send('API funcionando correctamente');
});

app.get("/", (req, res) => {
  res.send("Ruta pública: cualquiera puede verla");
});

// Middleware para manejar errores 404 debe ir al final
app.use((req, res, next) => {
res.status(404).send('Recurso no encontrado o ruta inválida');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log("Servidor local"));
}


