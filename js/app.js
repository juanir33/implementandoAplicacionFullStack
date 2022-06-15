const axiosClient = axios.create({ baseURL: "http://localhost:3000" });
const selector = (tag) => {
  return document.querySelector(tag);
};

const getAll = async () => {
  try {
    const response = await axiosClient.get("/caballeros");
    const json = await response.data;
    console.log(json);
    json.forEach((seiya) => {
      let row = document.createElement("tr");

      row.innerHTML = `           
            <td class="col-sm-2 col-md-2 col-lg-1">${seiya.nombre}</td>
            <td class="col-sm-3 col-md-3 col-lg-1">${seiya.constelacion}</td>
            <td class="col-sm-5 col-md-5 col-lg-3">${seiya.armadura}</td>
            
            <td class="col-sm-2 col-md-2 col-lg-1">
            <section class="d-flex  justify-content-center align-items-center btnOpciones">
            <div class="opacityIMG_Button imgHover">
            <button onclick="eliminarSeiya(${seiya.id})" class="btn btn-danger m-1" title="Eliminar Caballero"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="opacityIMG_Button imgHover">
            <button onclick="editarDatosSeiya(${seiya.id})" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#seiyaModal" title="Editar Caballero"><i class="fas fa-list-alt"></i></button>
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

const agregarCaballero = async (event) => {
  event.preventDefault();
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

const editarDatosSeiya = async (id) => {
  try {
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
            position: 'center',
            icon: 'success',
            title: 'Santo eliminado',
            showConfirmButton: true,
            
            }).then(async (results) => {if (results.isConfirmed)await axiosClient.delete(`/caballeros/${id}`);})
            
        
       }})}
      
    
        
  catch (error) {
    console.log(error);
  }
};

function limpiarCamposModal() {
  selector("#seiyaName").value = "";
  selector("#seiyaConstelacion").value = "";
  selector("#seiyaArmadura").value = "";
}

document.addEventListener("DOMContentLoaded", getAll);
