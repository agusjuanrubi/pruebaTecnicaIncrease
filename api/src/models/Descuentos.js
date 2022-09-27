const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('descuentos', {
    idDescuento: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull: false,
    },
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false    
    }
  });
};
