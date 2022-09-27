import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { traerClientes } from "../../redux/actions";
import TablaClientes from "./TablaClientes";

export default function Home() {
  const dispatch = useDispatch();

  let clientes = useSelector((state) => state.clientes);
  useEffect(() => {
    dispatch(traerClientes());
  }, [dispatch]);

  /*  function handleClick(e){
        dispatch(mostrarInfoCliente(id))
    } */
  return (
    <div>
      <h5>Clientes</h5>
      <TablaClientes clientes={clientes} />
    </div>
  );
}
