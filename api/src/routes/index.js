const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getApiInfo = require("./getApiInfo");
const getClientInfo = require('./getClientInfo');
const getDescuentos = require('./getDescuentos');
const getTransacciones = require('./getTransacciones');
const getPago = require('./getPago')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/getApiInfo", getApiInfo);
router.use('/getClientInfo', getClientInfo)
//router.use('/getTransacciones', getTransacciones)
//router.use('/getDescuentos', getDescuentos)
//router.use('/getPago', getPago)

module.exports = router;
