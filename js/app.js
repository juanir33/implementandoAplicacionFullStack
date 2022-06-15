const axiosClient = axios.create({ baseURL: "http://localhost:3000" });
const selector = (tag) => {
  return document.querySelector(tag);
};
/**
 * Metodo para traer todos los campos de la base de datos y listarlos en una tabla.
 */
const getAll = async () => {
  try {
    const response = await axiosClient.get("/caballeros");
    const json = await response.data;
    console.log(json);
    json.forEach((seiya) => {
      let row = document.createElement("tr");

      row.innerHTML = `           
            <td class="col-sm-2 col-md-2 col-lg-1">${seiya.nombre}</td>
            <td class="col-sm-2 col-md-2 col-lg-1">${seiya.constelacion}</td>
            <td class="col-sm-2 col-md-2 col-lg-1">${seiya.armadura}</td>
            <td class="col-sm-2 col-md-2 col-lg-1"><div >
            <button onclick="isAlive(${seiya.id})" id="isAliveBtn${
        seiya.id
      }" class="${
        seiya.isAlive ? "btn btn-success" : "btn btn-danger"
      }"></button>
            </div></td>
            <td class="col-sm-2 col-md-2 col-lg-1">
            <section class="d-flex  justify-content-center align-items-center btnOpciones">
            <div class="opacityIMG_Button imgHover">
            <button onclick="eliminarSeiya(${
              seiya.id
            })" class="btn btn-danger m-1" title="Eliminar Caballero"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="opacityIMG_Button imgHover">
            <button onclick="editarDatosSeiya(${
              seiya.id
            })" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#seiyaModal" title="Editar Caballero"><i class="fas fa-list-alt"></i></button>
            </div>
            
            
            </section>
            
            `;
      row.className = "paddingTr tablaColorText";
      const table = document.querySelector("#cuerpoTabla");
      table.append(row);
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * Metodo post y put,  si se tiene el parametro id en el input oculto del formulario, realiza una edicion de personaje; de lo contrario genera uno nuevo
 * @param {*} event  evento para evitar la recarga de la pagina en el submit del formulario
 */
const agregarCaballero = async (event) => {
  event.preventDefault();
  selector(".modal-title").textContent = "Nuevo Caballero";
  let name = selector("#seiyaName").value;
  let constel = selector("#seiyaConstelacion").value;
  let armadura = selector("#seiyaArmadura").value;
  let id = selector("#seiyaId").value;
  let bodyData = {
    nombre: name,
    constelacion: constel,
    armadura: armadura,
  };
  try {
    if (!id) {
      let { data } = await axiosClient.post("/caballeros", bodyData);
    } else {
      let { data } = await axiosClient.put(`/caballeros/${id}`, bodyData);
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * Metodo para completar los campos del formulario modal para poder editar un caballero.
 * @param {*} id id del caballero
 */
const editarDatosSeiya = async (id) => {
  try {
    selector(".modal-title").textContent = "Editar Caballero";
    let response = await axiosClient.get("/caballeros");
    let seiyas = await response.data;
    seiyas.forEach((seiya) => {
      if (seiya.id === id) {
        selector("#seiyaName").value = seiya.nombre;
        selector("#seiyaConstelacion").value = seiya.constelacion;
        selector("#seiyaArmadura").value = seiya.armadura;
        selector("#seiyaId").value = seiya.id;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * Metodo para poder eliminar un caballero de la base de datos.
 * @param {*} id id del caballero
 */
const eliminarSeiya = (id) => {
  try {
    Swal.fire({
      title: "¿Eliminar Caballero?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Santo eliminado",
          showConfirmButton: true,
        }).then(async (results) => {
          if (results.isConfirmed)
            await axiosClient.delete(`/caballeros/${id}`);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function limpiarCamposModal() {
  selector(".modal-title").textContent = "Nuevo Caballero";
  selector("#seiyaName").value = "";
  selector("#seiyaConstelacion").value = "";
  selector("#seiyaArmadura").value = "";
}

const isAlive = async (id) => {
  const { data } = await axiosClient.get(`/caballeros`);

  data.forEach((seiya) => {
    if (seiya.id === id) {
      if (!seiya.isAlive) {
        Swal.fire({
          title: "¿Cambiar estado?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Guardar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            let body = {
              nombre: seiya.nombre,
              constelacion: seiya.constelacion,
              armadura: seiya.armadura,
              id: seiya.id,
              isAlive: true,
            };
            await axiosClient.put(`/caballeros/${seiya.id}`, body);

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Estado actualizado",
              showConfirmButton: false,
              timer: 1100,
            });
          }
        });
      } else {
        Swal.fire({
          title: "¿Cambiar estado?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Guardar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            let body = {
              nombre: seiya.nombre,
              constelacion: seiya.constelacion,
              armadura: seiya.armadura,
              id: seiya.id,
              isAlive: false,
            };
            await axiosClient.put(`/caballeros/${seiya.id}`, body);

            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Dead",
              showConfirmButton: false,
              timer: 1100,
            });
          }
        });
      }
    }
  });
};
document.addEventListener("DOMContentLoaded", getAll);
