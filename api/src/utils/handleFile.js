/* function* clientMaker(file) {
  let i = 0;
  console.log(file[0][0]);

  while (file[0][0] < 5) i++;
  console.log("files,", file[i]);
  yield file[i];

   return clientMaker(newFile).next().value;
} */



const handleFile = (file) => {
  let lineas = [file].toString().split(/\n/);
  let agrupado = [];
  
  let i = 0;
  let fin = false;

/*   for(let i = 0; i <lineas.length; i++){

      let clientes = {}
      if(lineas[i][0]!==4){
        
        if(lineas[i][0]===1){
            clientes.regristro_1.idPago = 
        }
      }else{
        console.log('soy 4')
      }
  } */
  while (!fin) {
    let cliente = { datosPago: [],
    datosTransacciones:[],
datosDescuentos:[],
datoCliente:[] };
    while (lineas[i][0] !== 4) {
      if (lineas[i][0] === 1) {
        let datoPago = {}; //todo
        cliente.datosPago.push(datoPago);
      }
    
    }
    cliente.id = ""; //parsear
    clientes.push(cliente);
    i++;
    if (i > lineas.length) {
      fin = true;
    }
  }
  return agrupado;
};

module.exports = { handleFile };
