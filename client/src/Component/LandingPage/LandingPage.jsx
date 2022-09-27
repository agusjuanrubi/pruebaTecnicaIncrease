import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div />
      <div>
        <h1>Prueba tecnica increase.app</h1>
        <h3>Agustin Juan Rubi</h3>
        <Link to={"/home"}>
          <button>
            hace click para ver la integración del sistema de saldos con el de transacciones
          </button>
        </Link>
      </div>
    </div>
  );
}
