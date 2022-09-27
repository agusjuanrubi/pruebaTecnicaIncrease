import axios from "axios";

export function traerClientes() {
    return async function (dispatch) {
      var json = await axios.get(`http://localhost:3001/api/getClientInfo`);
       
      return dispatch({ type: "GET_ClIENTES", payload: json.data });
    };
  }

  export function mostrarInfoCliente(params) {
    console.log('llegue', params)
    return async function (dispatch) {
        console.log('id', params.id)
      var json = await axios.get(`http://localhost:3001/api/getClientInfo/${params.id}`);
      console.log('llegue')
      return dispatch({ type: "GET_INFO_CLIENTE", payload: json.data });
    };
  }