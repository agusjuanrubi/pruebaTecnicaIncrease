const { Router } = require("express");
const { Cliente, Pagos, Transacciones, Descuentos } = require("../db");

const router = Router();

router.get('/', async (req, res, next)=>{
    try {
        const clientes = await Cliente.findAll();
        if (clientes.length === 0)
          return res.status(404).send({ message: "no se encontraron clientes" });
        res.status(200).send(clientes);
      } catch (e) {
        next(e);
      }
})

router.get('/:id', async(req,res, next)=>{
    let {id}= req.params
    try {
       
       const cliente = await Cliente.findByPk(id,{include:[{model: Pagos, where:{clienteId:id}}, {model:Transacciones, where:{clienteId:id}},{model:Descuentos, where:{clienteId:id}} ]}) 
       if (!cliente) return res.status(404).send({ message: "Info del cliente no encontrada" });
       res.status(200).send(cliente);
    } catch (error) {
        next(error)
    }
})

module.exports= router;