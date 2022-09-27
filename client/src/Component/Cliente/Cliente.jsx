import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mostrarInfoCliente } from "../../redux/actions";
import { useParams } from "react-router-dom";
import Transacciones from "./Transacciones";
import Descuentos from "./Descuentos";
import { Link } from "react-router-dom";

export default function Cliente() {
  const id = useParams();

  const dispatch = useDispatch();
  const cliente = useSelector((state) => state.cliente);
  const [showPago, setShowPago] = useState(false);
  const [showTransacciones, setShowTransacciones] = useState(false);
  const [showDescuentos, setShowDescuentos] = useState(false);
  const [cobrado, setCobrado] = useState(false);
  const [diasParaCobro, setDiasParaCobro] = useState(0);
  useEffect(() => {
    dispatch(mostrarInfoCliente(id));
  }, [dispatch, id]);

  function compareDates(fechaDePago) {
    const year = fechaDePago.substring(0, 4);
    const month = fechaDePago.substring(5, 7);
    const day = fechaDePago.substring(8, 10);

    if (new Date().getTime() > new Date(year, month - 1, day).getTime()) {
      setCobrado(true);
    }
    if (cobrado === true) {
      setDiasParaCobro(
        Math.ceil(
          (new Date().getTime() - new Date(year, month - 1, day).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );
    } else {
      setDiasParaCobro(
        Math.ceil(
          (new Date(year, month - 1, day).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );
    }
  }

  function handlePagos(e) {
    e.preventDefault(e);
    setShowPago(!showPago);
    compareDates(cliente.pago.fechaDePago);
  }

  function handleTransacciones(e) {
    e.preventDefault(e);
    setShowTransacciones(!showTransacciones);
  }
  function handleDescuentos(e) {
    e.preventDefault(e);
    setShowDescuentos(!showDescuentos);
  }
  console.log(diasParaCobro);
  return (
    <div>
      <Link to={'/home'}>
        <button>Volver</button>
      </Link>
      {!cliente ? null : (
        <>
          <h1>Informacion del cliente</h1>
          <ul>Nombre: {cliente.first_name}</ul>
          <ul> Apellido: {cliente.last_name}</ul>
          <ul>id: {cliente.id}</ul>
          <ul> Email: {cliente.email}</ul>
          <ul> Ocupacion: {cliente.job}</ul>
          <ul>Pais: {cliente.country}</ul>
          <ul>Direccion: {cliente.address}</ul>
          <ul>CP: {cliente.zip_code}</ul>
          <ul>Telefono: {cliente.phone}</ul>
          <button onClick={(e) => handlePagos(e)}> ver Pagos</button>
          <button onClick={(e) => handleTransacciones(e)}>
            {" "}
            ver Transacciones
          </button>
          <button onClick={(e) => handleDescuentos(e)}>ver Descuentos</button>
          {showPago && (
            <div>
              <h3>Datos de Pagos</h3>
              <p>
                situacion de cobro:{" "}
                {cobrado ? "  monto cobrado" : "monto a cobrar"}
              </p>
              <p>Fecha de Pago: {cliente.pago.fechaDePago}</p>
              <p>Dias al Cobro: {diasParaCobro} dias</p>
              <p>
                Monto Total: {cliente.pago.montoTotal}
                {cliente.pago.moneda}
              </p>
              <p>
                Descuentos: {cliente.pago.totalDescuentos}
                {cliente.pago.moneda}
              </p>
              <p>
                Razones de descuento:{" "}
                {cliente.descuentos.map((descuento) => descuento.tipo + ", ")}
              </p>
              <p>
                Descuentos: {cliente.pago.totalDescuentos}
                {cliente.pago.moneda}
              </p>
              <p>
                Total : {cliente.pago.totalDescuentos}
                {cliente.pago.moneda}
              </p>
            </div>
          )}

          {showTransacciones && <Transacciones cliente={cliente} />}
          {showDescuentos && <Descuentos cliente={cliente} />}
        </>
      )}
    </div>
  );
}
