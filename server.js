const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

//conexion con la bd
mongoose
    //.connect('mongodb://127.0.0.1:27017/empleados')
    .connect('mongodb+srv://jennyrpti22:gregui18priv@cluster0.jmro6ib.mongodb.net/empleados?retryWrites=true&w=majority&appName=Cluster0')
    .then((x) => {
        console.log(`Conectado exitosamente a la base de datos: "${x.connections[0].name}"`);
    })
    .catch((error) => {
        console.error('Error al conectarse a Mongo:', error.reason)
    })

//configurar el servidor web
const empleadoRutas =require('./routes/empleado.routes')
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)

app.use(cors())

app.use('/api', empleadoRutas)

//habilitamos el puerto
const port = process.env.PORT || 4000

const server = app.listen(port, () => {
    console.log('Servidor escuchando en el puerto: ' + port)
})

//manejador de error 404
app.use((req, res, next) => {
    next(createError(404))
})

//manejador de errores
app.use((err, req, res, next) => {
    console.log(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})