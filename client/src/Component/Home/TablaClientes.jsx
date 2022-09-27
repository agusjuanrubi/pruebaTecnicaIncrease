import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

export default function TablaClientes({ clientes }) {
  let navigate = useNavigate();

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <button
          variant="contained"
          color="primary"
          size="small"
          width="40px"
          style={{ marginLeft: 16 }}
          onClick={(e) => handleOnCellClick(params)}
        >
          ver Cliente
        </button>
      </strong>
    );
  };

  async function handleOnCellClick(params) {
    console.log(params);
    navigate("/" + params.id);
  }
  let columns = [
    { field: "id" },
    { field: "Email" },
    { field: "Nombre" },
    { field: "Apellido" },
    { field: "Ocupacion", width: 200 },
    { field: "Pais" },
    { field: "Direccion" },
    { field: "CP" },
    { field: "Telefono" },
    {
      field: "seleccionar",
      renderCell: renderDetailsButton,
      width: 200,
      disableClickEventBubbling: true,
    },
  ];

  let rows = clientes.map((cliente) => {
    return {
      id: cliente.id,
      Email: cliente.email,
      Nombre: cliente.first_name,
      Apellido: cliente.last_name,
      Ocupacion: cliente.job,
      Pais: cliente.country,
      Direccion: cliente.address,
      CP: cliente.zip_code,
      Telefono: cliente.phone,
    };
  });
  return (
    <>
      
      <div style={{ height: 650, width: "95%", marginLeft: "20px" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          renderCell={(e) => renderDetailsButton(e)}
        />
      </div>
    </>
  );
}
