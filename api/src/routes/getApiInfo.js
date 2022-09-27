const { Router } = require("express");
const axios = require("axios");
const token = "1234567890qwertyuiopasdfghjklzxcvbnm";
const { Cliente, Pagos, Transacciones, Descuentos } = require("../db");

//esta funcion la use para testear mientras no habia conexion del front.
const router = Router();
const getApiInfo = async () => {
  try {
    let url = await axios.get(
      `https://increase-transactions.herokuapp.com/file.txt`,
      {
        headers: {
          Authorization: "Bearer " + token, 
          "Content-Type": "text/plain",
        },
      }
    );
    let file = url.data;

    return file;
  } catch (e) {
    return e;
  }
};
let clientes = [];
let cliente = {
  info: {},
  registro_1: {
    idPago: "",
    moneda: "",
    montoTotal: "",
    totalDescuentos: "",
    totalConDescuentos: "",
  },
  registro_2: [],
  registro_3: [],
  registro_4: {
    fechaDePago: "",
    idCliente: "",
  },
};
function parseRegistro1(linea, cliente) {
  cliente.registro_1.idPago = linea.substring(1, 33);
  cliente.registro_1.moneda =
    linea.substring(33 + 3 + 2, 33 + 3 + 3) === "0" ? "ARS" : "USD";
  cliente.registro_1.montoTotal =
    parseFloat(linea.substring(33 + 3 + 3, 33 + 3 + 3 + 13)) / 100;
  cliente.registro_1.totalDescuentos =
    parseFloat(linea.substring(33 + 3 + 3 + 13, 33 + 3 + 3 + 13 + 13)) / 100;
  cliente.registro_1.totalConDescuentos =
    parseFloat(
      linea.substring(33 + 3 + 3 + 13 + 13, 33 + 3 + 3 + 13 + 13 + 13)
    ) / 100;
}
function parseRegistro2(linea, cliente) {
  let registro_2 = {
    idTransaccion: "",
    monto: "",
    tipo: "",
  };
  registro_2.idTransaccion = linea.substring(1, 33);
  registro_2.monto = parseFloat(linea.substring(33, 33 + 15)) / 100;
  registro_2.tipo =
    linea.substring(linea.length - 1, linea.length) === "1"
      ? "Aprobado"
      : "Rechazado";

  cliente.registro_2.push(registro_2);
}
function parseRegistro3(linea, cliente) {
  let tipo = linea.substring(linea.length - 1, linea.length);
  if (tipo === "0") {
    tipo = "IVA";
  } else if (tipo === "1") {
    tipo = "Retenciones";
  } else if (tipo === "2") {
    tipo = "Comisiones";
  } else if (tipo === "3") {
    tipo = "Costos Extra";
  } else if (tipo === "4") {
    tipo = "Ingresos Brutos";
  } else {
    tipo = error;
  }
  let registro_3 = {
    idDescuento: "",
    monto: "",
    tipo: "",
  };
  registro_3.idDescuento = linea.substring(1, 33);
  registro_3.monto = parseFloat(linea.substring(33, 33 + 13)) / 100;
  registro_3.tipo = tipo;
  cliente.registro_3.push(registro_3);
}
function parseRegistro4(linea, cliente) {
  var dateString = linea.substring(linea.length - 32 - 8, linea.length - 32);
  var year = dateString.substring(0, 4);
  var month = dateString.substring(4, 6);
  var day = dateString.substring(6, 8);

  var fechaJS = new Date(year, month - 1, day);

  cliente.registro_4.fechaDePago = fechaJS;
  cliente.registro_4.idCliente = linea.substring(
    linea.length - 32,
    linea.length
  );
}
let apiError = false;
let apiErrorids = [];
async function datosClientes(cliente) {
  let id = cliente.registro_4.idCliente;

  try {
    let url = await axios.get(
      `https://increase-transactions.herokuapp.com/clients/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          "Content-Type": "text/plain",
        },
      }
    );
    let clientInfo = url.data;

    cliente.info = clientInfo;

    //console.log("una", cliente.info.id);
  } catch (e) {
    apiError = true;
    cliente.info = {
      id: id,
      email: "increase API connection error",
      first_name: "increase API connection error",
      last_name: "increase API connection error",
      job: "increase API connection error",
      country: "increase API connection error",
      address: "increase API connection error",
      zip_code: "increase API connection error",
      phone: "increase API connection error",
    };
    apiErrorids.push(id);
  }
}

async function guardarEnDb(cliente) {
  try {
    await Cliente.create({
      id: cliente.info.id,
      email: cliente.info.email,
      first_name: cliente.info.first_name,
      last_name: cliente.info.last_name,
      job: cliente.info.job,
      country: cliente.info.country,
      address: cliente.info.address,
      zip_code: cliente.info.zip_code,
      phone: cliente.info.phone,
    });

    await Pagos.create({
      idPago: cliente.registro_1.idPago,
      moneda: cliente.registro_1.moneda,
      montoTotal: cliente.registro_1.montoTotal,
      totalDescuentos: cliente.registro_1.totalDescuentos,
      totalConDescuentos: cliente.registro_1.totalConDescuentos,
      fechaDePago: cliente.registro_4.fechaDePago,
      clienteId: cliente.info.id,
    });

    let transacciones = cliente.registro_2.map((t) => {
      return {
        idTransaccion: t.idTransaccion,
        monto: t.monto,
        tipo: t.tipo,
        clienteId: cliente.info.id,
      };
    });
    await Transacciones.bulkCreate(transacciones);

    let descuentos = cliente.registro_3.map((d) => {
      return {
        idDescuento: d.idDescuento,
        monto: d.monto,
        tipo: d.tipo,
        clienteId: cliente.info.id,
      };
    });
    await Descuentos.bulkCreate(descuentos);
  } catch (error) {
    console.log(error);
  }
}

/* async function getInfoWithError(apiErrorids){
    try {
        apiErrorids.forEach((id)=>{
            await datosCliente
        })
    } catch (error) {
        
    }
} */
async function executeGetApiInfo() {
  try {
    let file = await getApiInfo();
    //let handled = await handleFile(file)
    let porLinea = [file].toString().split(/\n/);
    //let handleSplit = [file].toString().split('')

    for (let i = 0; i < porLinea.length; i++) {
      //console.log('porLiena',porLinea[i]);
      let tipo = porLinea[i][0];
      linea = porLinea[i];

      if (tipo === "1") {
        parseRegistro1(linea, cliente);
      } else if (tipo === "2") {
        parseRegistro2(linea, cliente);
      } else if (tipo === "3") {
        parseRegistro3(linea, cliente);
      } else if (tipo === "4") {
        parseRegistro4(linea, cliente);
        //aca tengo todos los datos de un cliente. hago la llamada  ala api con el endpoint cliente,
        //y con eso me guardo toda la info del cliente+ registros
        await datosClientes(cliente);

        await guardarEnDb(cliente);
        console.log(apiErrorids);

        clientes.push(cliente);
        cliente = {
          info: {},
          registro_1: {
            idPago: "",
            moneda: "",
            montoTotal: "",
            totalDescuentos: "",
            totalConDescuentos: "",
          },
          registro_2: [],
          registro_3: [],
          registro_4: {
            fechaDePago: "",
            idCliente: "",
          },
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
}
router.get("/", async (req, res, next) => {
  try {
    let file = await getApiInfo();
    //let handled = await handleFile(file)
    let porLinea = [file].toString().split(/\n/);
    //let handleSplit = [file].toString().split('')

    for (let i = 0; i < porLinea.length; i++) {
      //console.log('porLiena',porLinea[i]);
      let tipo = porLinea[i][0];
      linea = porLinea[i];

      if (tipo === "1") {
        parseRegistro1(linea, cliente);
      } else if (tipo === "2") {
        parseRegistro2(linea, cliente);
      } else if (tipo === "3") {
        parseRegistro3(linea, cliente);
      } else if (tipo === "4") {
        parseRegistro4(linea, cliente);
        //aca tengo todos los datos de un cliente. hago la llamada  ala api con el endpoint cliente,
        //y con eso me guardo toda la info del cliente+ registros
        await datosClientes(cliente);

        await guardarEnDb(cliente);
        console.log(apiErrorids);

        clientes.push(cliente);
        cliente = {
          info: {},
          registro_1: {
            idPago: "",
            moneda: "",
            montoTotal: "",
            totalDescuentos: "",
            totalConDescuentos: "",
          },
          registro_2: [],
          registro_3: [],
          registro_4: {
            fechaDePago: "",
            idCliente: "",
          },
        };
      }
    }

    res.send(clientes);
  } catch (error) {
    res.send(error.data);
  }
});

module.exports = router;
