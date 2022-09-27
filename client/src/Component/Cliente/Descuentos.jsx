import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function TablaClientes({ cliente }) {
  let columns = [
    { field: "id", width: 300 },
    { field: "Monto" },
    { field: "Razon" },
  ];

  let rows = cliente.descuentos?.map((descuento) => {
    return {
      id: descuento.idDescuento,
      Monto: descuento.monto,
      Razon: descuento.tipo,
    };
  });
  return (
    <>
      <h4>Descuentos</h4>
      <div style={{ height: 300, width: "50%", marginLeft: "300px" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </>
  );
}
