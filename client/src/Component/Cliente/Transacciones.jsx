import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function TablaClientes({ cliente }) {
  let columns = [
    { field: "id", width: 300 },
    { field: "Monto" },
    { field: "Estado" },
  ];

  let rows = cliente.transacciones.map((transaccion) => {
    return {
      id: transaccion.idTransaccion,
      Monto: transaccion.monto,
      Estado: transaccion.tipo,
    };
  });
  return (
    <>
      <h4>Transacciones</h4>
      <div style={{ height: 450, width: "50%", marginLeft: "300px" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </>
  );
}
