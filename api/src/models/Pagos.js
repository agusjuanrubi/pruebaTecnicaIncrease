const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pagos", {
    idPago: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    moneda:{
        type: DataTypes.STRING,
        allowNull: false,  
    },
    montoTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalDescuentos: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalConDescuentos: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fechaDePago: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};
