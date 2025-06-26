const express = require('express')
const empleadoRouter = express.Router()

//declaramos un objeto de nuestro modelo
let Empleado = require('../models/Empleado')

//agregar un nuevo empleado
empleadoRouter.route('/agregar').post((req, res) => {
    Empleado.create(req.body)
        .then((data) => {
            console.log('Se agrego correctamente')
    res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})

//obtenemos todos los empleados
empleadoRouter.route('/empleados').get((req, res) => {
    Empleado.find()
    .then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})

//obtenemos un solo empleado por su ID
empleadoRouter.route('/empleado/:id').get((req, res) => {
    Empleado.findById(req.params.id)
    .then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})

//actualizamos un empleado
empleadoRouter.route('/actualizar/:id').put((req, res) => {
    Empleado.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    )
    .then((data) => {
        console.log('El empleado se actualizo correctamente')
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
        res.status(500).send(error)
    })
})

//eliminamos un empleado
empleadoRouter.route('/eliminar/:id').delete((req, res) => {
    Empleado.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('El empleado se elimino correctamente')
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})

module.exports = empleadoRouter;